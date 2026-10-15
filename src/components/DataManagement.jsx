import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWords } from '../context/WordContext';
import { db } from '../firebase';
import { collection, writeBatch, doc, serverTimestamp } from 'firebase/firestore';
import { renameGlobalTag, deleteGlobalTag } from '../utils/firestore';
import { parseCsv } from '../utils/csv';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const CSV_HEADER = ['Collection', 'Type', 'German', 'English', 'Article', 'Plural', 'Notes', 'Tags'];

const csvColumns = [
  { name: 'Collection', required: false, example: 'word', description: '"word" or "phrase". Defaults to word.' },
  { name: 'Type', required: false, example: 'noun', description: 'noun, verb, adjective, adverb, preposition or other. Leave empty for phrases.' },
  { name: 'German', required: true, example: 'Tisch', description: 'The German word or phrase.' },
  { name: 'English', required: true, example: 'table', description: 'The translation.' },
  { name: 'Article', required: false, example: 'der', description: 'der, die or das (nouns only).' },
  { name: 'Plural', required: false, example: 'Tische', description: 'Plural form (nouns only).' },
  { name: 'Notes', required: false, example: '', description: 'Any extra notes.' },
  { name: 'Tags', required: false, example: 'möbel;a1', description: 'Separate multiple tags with a semicolon (;).' }
];

const sampleRows = [
  ['word', 'noun', 'Tisch', 'table', 'der', 'Tische', '', 'möbel;a1'],
  ['word', 'verb', 'essen', 'to eat', '', '', 'isst – aß – hat gegessen', 'a1'],
  ['word', 'adjective', 'schön', 'beautiful', '', '', '', ''],
  ['phrase', '', 'Wie geht es dir?', 'How are you?', '', '', 'informal', 'greetings']
];

function downloadCsv(rows, filename) {
  const csvContent = rows.map(e => e.map(item => `"${String(item).replace(/"/g, '""')}"`).join(",")).join("\n");
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]); // UTF-8 Byte Order Mark
  const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const cellStyle = { padding: '0.5rem', borderBottom: '1px solid var(--border)', textAlign: 'left', verticalAlign: 'top' };

export default function DataManagement() {
  const { currentUser } = useAuth();
  const { words, phrases } = useWords();
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState('');
  
  const [editingTag, setEditingTag] = useState(null);
  const [newTagName, setNewTagName] = useState('');
  const [managing, setManaging] = useState(false);

  const allTags = Array.from(new Set([
    ...words.flatMap(w => w.tags || []),
    ...phrases.flatMap(p => p.tags || [])
  ])).sort();

  const handleRenameTag = async (oldTag) => {
    const cleanNew = newTagName.trim().toLowerCase();
    if (!cleanNew || cleanNew === oldTag) {
      setEditingTag(null);
      return;
    }
    setManaging(true);
    try {
      await renameGlobalTag(currentUser.uid, oldTag, cleanNew, words, phrases);
      setMessage(`Tag "${oldTag}" successfully renamed to "${cleanNew}".`);
    } catch (err) {
      console.error(err);
      setMessage('Failed to rename tag.');
    } finally {
      setEditingTag(null);
      setManaging(false);
    }
  };

  const handleDeleteTag = async (tag) => {
    if (!window.confirm(`Are you sure you want to completely delete the tag "${tag}" from all words and phrases?`)) return;
    setManaging(true);
    try {
      await deleteGlobalTag(currentUser.uid, tag, words, phrases);
      setMessage(`Tag "${tag}" successfully deleted.`);
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete tag.');
    } finally {
      setManaging(false);
    }
  };

  const handleExport = () => {
    const rows = [CSV_HEADER];

    const sanitize = (str) => (str || '').replace(/[\r\n]+/g, ' ');

    words.forEach(w => {
      rows.push([
        'word',
        sanitize(w.type),
        sanitize(w.word),
        sanitize(w.english),
        sanitize(w.article),
        sanitize(w.plural),
        sanitize(w.notes),
        (w.tags || []).join(';')
      ]);
    });

    phrases.forEach(p => {
      rows.push([
        'phrase',
        '',
        sanitize(p.phrase),
        sanitize(p.english),
        '',
        '',
        sanitize(p.notes),
        (p.tags || []).join(';')
      ]);
    });

    downloadCsv(rows, 'deutsch_lernen_backup.csv');
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImporting(true);
    setMessage('');

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        
        const rows = parseCsv(text);
        if (rows.length <= 1) {
          setMessage('File is empty or invalid.');
          setImporting(false);
          return;
        }

        const batch = writeBatch(db);
        let addedCount = 0;
        let skippedCount = 0;
        const invalidRows = [];
        const seenInFile = new Set();

        for (let i = 1; i < rows.length; i++) {
          const rowNumber = i + 1;
          const [colType = '', type = '', german = '', english = '', article = '', plural = '', notes = '', tagsStr = ''] = rows[i].map(col => col.trim());

          if (!german || !english) {
            invalidRows.push(`row ${rowNumber} (missing ${!german ? 'German' : 'English'})`);
            continue;
          }

          const isPhrase = colType.toLowerCase() === 'phrase' || type.toLowerCase() === 'phrase';
          const fileKey = `${isPhrase ? 'phrase' : 'word'}:${german.toLowerCase()}`;
          if (seenInFile.has(fileKey)) {
            skippedCount++;
            continue;
          }
          seenInFile.add(fileKey);

          if (isPhrase) {
            const exists = phrases.find(p => p.phrase?.toLowerCase() === german.toLowerCase());
            if (exists) {
              skippedCount++;
              continue;
            }
            
            const newRef = doc(collection(db, 'phrases'));
            batch.set(newRef, {
              userId: currentUser.uid,
              phrase: german,
              english,
              notes: notes || '',
              tags: tagsStr ? tagsStr.split(';').map(t => t.trim()).filter(Boolean) : [],
              createdAt: serverTimestamp(),
              nextReviewDate: new Date().toISOString(),
              interval: 0,
              easeFactor: 2.5,
              repetitions: 0
            });
            addedCount++;
          } else {
            const exists = words.find(w => w.word?.toLowerCase() === german.toLowerCase());
            if (exists) {
              skippedCount++;
              continue;
            }

            const newRef = doc(collection(db, 'words'));
            batch.set(newRef, {
              userId: currentUser.uid,
              type: type.toLowerCase() || 'other',
              word: german,
              english,
              article: article.toLowerCase(),
              plural: plural || '',
              notes: notes || '',
              tags: tagsStr ? tagsStr.split(';').map(t => t.trim()).filter(Boolean) : [],
              needsReview: (type.toLowerCase() === 'noun' && (!article || !plural)),
              createdAt: serverTimestamp(),
              nextReviewDate: new Date().toISOString(),
              interval: 0,
              easeFactor: 2.5,
              repetitions: 0
            });
            addedCount++;
          }
        }

        if (addedCount > 0) {
          await batch.commit();
        }
        
        setMessage(
          `Import complete! Added ${addedCount} items. Skipped ${skippedCount} duplicates.` +
          (invalidRows.length ? ` Could not read ${invalidRows.length}: ${invalidRows.join(', ')}.` : '')
        );
        e.target.value = null; // reset input
      } catch (err) {
        console.error(err);
        setMessage('Error importing file.');
      } finally {
        setImporting(false);
      }
    };
    reader.readAsText(file);
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'inherit',
    textAlign: 'center',
    minWidth: '200px',
    boxSizing: 'border-box'
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Data Management</h2>
        
        {message && (
          <div style={{ padding: '1rem', background: 'var(--card-bg)', border: '1px solid var(--primary)', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {message}
          </div>
        )}

        <div style={{ display: 'grid', gap: '2rem' }}>
          <div>
            <h3>Tag Manager</h3>
            <p style={{ opacity: 0.8, marginBottom: '1rem' }}>Rename or delete tags across all your vocabulary words and phrases.</p>
            {allTags.length === 0 ? (
              <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '8px', opacity: 0.8 }}>No tags found.</div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {allTags.map(tag => (
                  <div key={tag} style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.5rem', 
                    background: 'var(--card-bg)', padding: '0.4rem 0.8rem', 
                    borderRadius: '20px', border: '1px solid var(--border)' 
                  }}>
                    {editingTag === tag ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <input 
                          autoFocus
                          value={newTagName} 
                          onChange={(e) => setNewTagName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleRenameTag(tag)}
                          style={{ width: '100px', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--primary)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
                        />
                        <button disabled={managing} onClick={() => handleRenameTag(tag)} style={{ background: 'transparent', color: 'var(--success)', padding: '0.2rem', minWidth: 'auto', display: 'flex', alignItems: 'center' }}><FiCheck size={16} /></button>
                        <button disabled={managing} onClick={() => setEditingTag(null)} style={{ background: 'transparent', color: 'var(--danger)', padding: '0.2rem', minWidth: 'auto', display: 'flex', alignItems: 'center' }}><FiX size={16} /></button>
                      </div>
                    ) : (
                      <>
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{tag}</span>
                        <div style={{ display: 'flex', gap: '0.2rem', borderLeft: '1px solid var(--border)', paddingLeft: '0.5rem' }}>
                          <button disabled={managing} onClick={() => { setEditingTag(tag); setNewTagName(tag); }} style={{ background: 'transparent', color: 'var(--primary)', padding: '0.2rem', minWidth: 'auto', display: 'flex', alignItems: 'center' }}><FiEdit2 size={16} /></button>
                          <button disabled={managing} onClick={() => handleDeleteTag(tag)} style={{ background: 'transparent', color: 'var(--danger)', padding: '0.2rem', minWidth: 'auto', display: 'flex', alignItems: 'center' }}><FiTrash2 size={16} /></button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <hr style={{ borderColor: 'var(--border)' }} />
          <div>
            <h3>Export Data</h3>
            <p style={{ opacity: 0.8, marginBottom: '1rem' }}>Download a backup of your entire vocabulary list as a CSV file.</p>
            <button onClick={handleExport} style={{ ...buttonStyle, background: 'var(--primary)', color: '#fff' }}>
              Export to CSV
            </button>
          </div>

          <div>
            <h3>Import Data</h3>
            <p style={{ opacity: 0.8, marginBottom: '1rem' }}>Upload a CSV file to add multiple words or phrases at once. Exact duplicates will be skipped automatically.</p>

            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              The first row must be a header row (it is skipped). Columns must be in this order:
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr>
                    <th style={cellStyle}>#</th>
                    <th style={cellStyle}>Column</th>
                    <th style={cellStyle}>Example</th>
                    <th style={cellStyle}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {csvColumns.map((col, i) => (
                    <tr key={col.name}>
                      <td style={{ ...cellStyle, opacity: 0.6 }}>{i + 1}</td>
                      <td style={{ ...cellStyle, fontWeight: '600', whiteSpace: 'nowrap' }}>
                        {col.name}{col.required && <span style={{ color: 'var(--danger)' }} title="Required"> *</span>}
                      </td>
                      <td style={{ ...cellStyle, whiteSpace: 'nowrap' }}><code>{col.example || '—'}</code></td>
                      <td style={{ ...cellStyle, opacity: 0.85 }}>{col.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Sample file:</p>
            <pre style={{ background: 'var(--bg-color)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.75rem', fontSize: '0.8rem', overflowX: 'auto', marginBottom: '1rem' }}>
              {[CSV_HEADER, ...sampleRows].map(row => row.join(',')).join('\n')}
            </pre>
            <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '1rem' }}>
              <span style={{ color: 'var(--danger)' }}>*</span> Required. Rows without German or English are skipped. Tip: an exported backup uses the same format.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => downloadCsv([CSV_HEADER, ...sampleRows], 'deutsch_lernen_sample.csv')}
                style={{ ...buttonStyle, background: 'var(--card-bg)', color: 'var(--primary)', border: '1px solid var(--primary)' }}
              >
                Download Sample CSV
              </button>
              <input 
                type="file" 
                accept=".csv" 
                onChange={handleImport} 
                disabled={importing}
                style={{ display: 'none' }}
                id="csv-upload"
              />
              <label 
                htmlFor="csv-upload" 
                style={{ 
                  ...buttonStyle,
                  background: 'var(--card-bg)', 
                  color: 'var(--text-color)', 
                  border: '1px solid var(--border)',
                  cursor: importing ? 'not-allowed' : 'pointer',
                }}
              >
                {importing ? 'Importing...' : 'Select CSV File'}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
