import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWords } from '../context/WordContext';
import { addWord, addPhrase } from '../utils/firestore';
import { useNavigate } from 'react-router-dom';
import TagsInput from './TagsInput';

export default function AddItem() {
  const { currentUser } = useAuth();
  const { words, phrases } = useWords();
  const navigate = useNavigate();
  const [tab, setTab] = useState('word'); // 'word' | 'phrase'
  const [loading, setLoading] = useState(false);
  const [duplicateError, setDuplicateError] = useState(null);
  const [tags, setTags] = useState([]);

  // Word state
  const [wordType, setWordType] = useState('noun');
  const [word, setWord] = useState('');
  const [english, setEnglish] = useState('');
  const [notes, setNotes] = useState('');
  const [article, setArticle] = useState('');
  const [plural, setPlural] = useState('');
  const [caseRequired, setCaseRequired] = useState('');
  const [relatedWords, setRelatedWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [conjugation, setConjugation] = useState({
    ich: '',
    du: '',
    erSieEs: '',
    wir: '',
    ihr: '',
    sieSie: ''
  });

  const handleConjugationChange = (field, value) => {
    setConjugation(prev => ({ ...prev, [field]: value }));
  };

  // Phrase state
  const [phrase, setPhrase] = useState('');
  const [phraseEnglish, setPhraseEnglish] = useState('');
  const [phraseNotes, setPhraseNotes] = useState('');

  const handleAddWord = async (e) => {
    e.preventDefault();
    if (!word || !english) return;
    
    const duplicate = words.find(w => w.word.trim().toLowerCase() === word.trim().toLowerCase());
    if (duplicate) {
      setDuplicateError({ type: 'word', item: duplicate });
      return;
    }

    setLoading(true);
    try {
      const wordData = { type: wordType, word, english, notes, relatedWords, tags };
      if (wordType === 'noun') {
        wordData.article = article;
        wordData.plural = plural;
      } else if (wordType === 'verb') {
        wordData.conjugation = conjugation;
      } else if (wordType === 'preposition') {
        wordData.caseRequired = caseRequired;
      }
      await addWord(currentUser.uid, wordData);
      navigate('/', { state: { tab: 'words' } });
    } catch (err) {
      console.error(err);
      alert('Failed to add word');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPhrase = async (e) => {
    e.preventDefault();
    if (!phrase || !phraseEnglish) return;
    
    const duplicate = phrases.find(p => p.phrase.trim().toLowerCase() === phrase.trim().toLowerCase());
    if (duplicate) {
      setDuplicateError({ type: 'phrase', item: duplicate });
      return;
    }

    setLoading(true);
    try {
      await addPhrase(currentUser.uid, { phrase, english: phraseEnglish, notes: phraseNotes, tags });
      navigate('/', { state: { tab: 'phrases' } });
    } catch (err) {
      console.error(err);
      alert('Failed to add phrase');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '1rem' }}>Add New Item</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button 
            onClick={() => { setTab('word'); setDuplicateError(null); }} 
            style={{ flex: 1, background: tab === 'word' ? 'var(--primary)' : 'var(--border)', color: tab === 'word' ? '#fff' : 'var(--text-color)' }}
          >
            Word
          </button>
          <button 
            onClick={() => { setTab('phrase'); setDuplicateError(null); }} 
            style={{ flex: 1, background: tab === 'phrase' ? 'var(--primary)' : 'var(--border)', color: tab === 'phrase' ? '#fff' : 'var(--text-color)' }}
          >
            Phrase
          </button>
        </div>

        {duplicateError && (
          <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #f87171' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Wait, this {duplicateError.type} already exists!</h4>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>
              You already have <strong>{duplicateError.item.word || duplicateError.item.phrase}</strong> in your list.
            </p>
            <button 
              type="button" 
              onClick={() => navigate(`/edit/${duplicateError.type === 'word' ? 'words' : 'phrases'}/${duplicateError.item.id}`)}
              style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}
            >
              Edit Existing Entry
            </button>
          </div>
        )}

        {tab === 'word' ? (
          <form onSubmit={handleAddWord} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Word Type</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['noun', 'verb', 'adjective', 'adverb', 'preposition', 'other'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setWordType(type)}
                    style={{
                      background: wordType === type ? 'var(--primary)' : 'var(--card-bg)',
                      color: wordType === type ? '#fff' : 'var(--text-color)',
                      border: `1px solid ${wordType === type ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: '20px',
                      padding: '0.5rem 1rem',
                      textTransform: 'capitalize',
                      flex: 1,
                      minWidth: '80px',
                      fontWeight: wordType === type ? '600' : '400'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {wordType === 'noun' && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Article (Optional - skip to mark for review)</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['', 'der', 'die', 'das'].map(a => {
                    const getBgColor = () => {
                      if (article !== a) return 'var(--card-bg)';
                      if (a === 'der') return 'var(--primary)';
                      if (a === 'die') return 'var(--danger)';
                      if (a === 'das') return 'var(--success)';
                      return 'var(--border)'; // Unknown selected
                    };
                    const getBorderColor = () => {
                      if (article !== a) return 'var(--border)';
                      if (a === 'der') return 'var(--primary)';
                      if (a === 'die') return 'var(--danger)';
                      if (a === 'das') return 'var(--success)';
                      return 'var(--border)'; // Unknown selected
                    };
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setArticle(a)}
                        style={{
                          background: getBgColor(),
                          color: article === a && a !== '' ? '#fff' : 'var(--text-color)',
                          border: `1px solid ${getBorderColor()}`,
                          borderRadius: '20px',
                          padding: '0.5rem 1rem',
                          flex: 1,
                          fontWeight: article === a ? '600' : '400'
                        }}
                      >
                        {a === '' ? 'Unknown' : a}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>German Word *</label>
              <input required value={word} onChange={(e) => { setWord(e.target.value); setDuplicateError(null); }} style={{ width: '100%' }} placeholder={wordType === 'verb' ? 'e.g. essen' : wordType === 'adjective' ? 'e.g. schön' : wordType === 'adverb' ? 'e.g. schnell' : wordType === 'noun' ? 'e.g. Apfel' : wordType === 'preposition' ? 'e.g. mit' : 'e.g. aber'} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>English Meaning *</label>
              <input required value={english} onChange={(e) => setEnglish(e.target.value)} style={{ width: '100%' }} placeholder={wordType === 'verb' ? 'e.g. to eat' : wordType === 'adjective' ? 'e.g. beautiful' : wordType === 'adverb' ? 'e.g. quickly' : wordType === 'noun' ? 'e.g. Apple' : wordType === 'preposition' ? 'e.g. with' : 'e.g. but'} />
            </div>

            {wordType === 'noun' && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Plural Form (Optional)</label>
                <input value={plural} onChange={(e) => setPlural(e.target.value)} style={{ width: '100%' }} placeholder="e.g. Äpfel" />
              </div>
            )}

            {wordType === 'verb' && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Conjugation (Optional)</label>
                <div className="conjugation-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '85px', flexShrink: 0, opacity: 0.8 }}>ich</div><input value={conjugation.ich} onChange={(e) => handleConjugationChange('ich', e.target.value)} style={{ width: '100%' }} /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '85px', flexShrink: 0, opacity: 0.8 }}>du</div><input value={conjugation.du} onChange={(e) => handleConjugationChange('du', e.target.value)} style={{ width: '100%' }} /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '85px', flexShrink: 0, opacity: 0.8 }}>er/sie/es</div><input value={conjugation.erSieEs} onChange={(e) => handleConjugationChange('erSieEs', e.target.value)} style={{ width: '100%' }} /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '85px', flexShrink: 0, opacity: 0.8 }}>wir</div><input value={conjugation.wir} onChange={(e) => handleConjugationChange('wir', e.target.value)} style={{ width: '100%' }} /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '85px', flexShrink: 0, opacity: 0.8 }}>ihr</div><input value={conjugation.ihr} onChange={(e) => handleConjugationChange('ihr', e.target.value)} style={{ width: '100%' }} /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '85px', flexShrink: 0, opacity: 0.8 }}>sie/Sie</div><input value={conjugation.sieSie} onChange={(e) => handleConjugationChange('sieSie', e.target.value)} style={{ width: '100%' }} /></div>
                </div>
              </div>
            )}

            {wordType === 'preposition' && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Required Case (Optional - skip to mark for review)</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['Accusative', 'Dative', 'Genitive', 'Two-Way'].map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCaseRequired(c)}
                      style={{
                        background: caseRequired === c ? 'var(--primary)' : 'var(--card-bg)',
                        color: caseRequired === c ? '#fff' : 'var(--text-color)',
                        border: `1px solid ${caseRequired === c ? 'var(--primary)' : 'var(--border)'}`,
                        borderRadius: '20px',
                        padding: '0.5rem 1rem',
                        flex: 1,
                        fontWeight: caseRequired === c ? '600' : '400'
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Notes (Optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: 'inherit' }} placeholder="Any additional context, examples, or grammar rules..." />
            </div>

            <TagsInput tags={tags} setTags={setTags} />

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Related Words (Optional)</label>
              <div style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '0.75rem', background: 'var(--bg-color)' }}>
                {relatedWords.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {relatedWords.map(id => {
                      const w = words.find(x => x.id === id);
                      if (!w) return null;
                      return (
                        <span key={id} style={{ background: 'var(--primary)', color: '#fff', padding: '0.3rem 0.6rem', borderRadius: '16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          {w.word} ({w.type})
                          <button type="button" onClick={() => setRelatedWords(prev => prev.filter(x => x !== id))} style={{ background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', lineHeight: 1 }}>&times;</button>
                        </span>
                      );
                    })}
                  </div>
                )}
                <input 
                  type="text" 
                  placeholder="Search existing words..." 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {words
                    .filter(w => !relatedWords.includes(w.id) && (w.word.toLowerCase().includes(searchTerm.toLowerCase()) || w.english.toLowerCase().includes(searchTerm.toLowerCase())) && w.word !== word)
                    .map(w => (
                      <label key={w.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-color)' }}>
                        <input 
                          type="checkbox" 
                          checked={false}
                          onChange={() => setRelatedWords(prev => [...prev, w.id])}
                        />
                        {w.article ? `${w.article} ` : ''}{w.word} ({w.type}) - <span style={{ opacity: 0.7 }}>{w.english}</span>
                      </label>
                  ))}
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
              {loading ? 'Adding...' : 'Save Word'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleAddPhrase} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>German Phrase *</label>
              <input required value={phrase} onChange={(e) => { setPhrase(e.target.value); setDuplicateError(null); }} style={{ width: '100%' }} placeholder="e.g. Ich muss aufs Klo" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>English Meaning *</label>
              <input required value={phraseEnglish} onChange={(e) => setPhraseEnglish(e.target.value)} style={{ width: '100%' }} placeholder="e.g. I need to go to the toilet" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Notes (Optional)</label>
              <textarea value={phraseNotes} onChange={(e) => setPhraseNotes(e.target.value)} style={{ width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: 'inherit' }} placeholder="Any additional context, examples, or grammar rules..." />
            </div>

            <TagsInput tags={tags} setTags={setTags} />

            <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
              {loading ? 'Adding...' : 'Save Phrase'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
