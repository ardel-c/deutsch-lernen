import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWords } from '../context/WordContext';
import { getItem, updateItem, updateWord } from '../utils/firestore';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import TagsInput from './TagsInput';
import { FiX } from 'react-icons/fi';
import RichTextEditor from './RichTextEditor';

export default function EditItem() {
  const { currentUser } = useAuth();
  const { words, phrases } = useWords();
  const navigate = useNavigate();
  const location = useLocation();
  const { collectionName, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialData, setInitialData] = useState(null);

  // Word state
  const [wordType, setWordType] = useState('noun');
  const [word, setWord] = useState('');
  const [english, setEnglish] = useState('');
  const [notes, setNotes] = useState('');
  const [article, setArticle] = useState('');
  const [plural, setPlural] = useState('');
  const [caseRequired, setCaseRequired] = useState('');
  const [relatedWords, setRelatedWords] = useState([]);
  const [oldRelatedWords, setOldRelatedWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [conjugation, setConjugation] = useState({
    ich: '', du: '', erSieEs: '', wir: '', ihr: '', sieSie: ''
  });
  const [tags, setTags] = useState([]);

  // Phrase state
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        let item = location.state?.item;
        
        if (!item) {
          if (collectionName === 'words') {
            item = words.find(w => w.id === id);
          } else if (collectionName === 'phrases') {
            item = phrases.find(p => p.id === id);
          }
        }

        if (!item) {
          item = await getItem(collectionName, id);
        }

        if (item) {
          if (collectionName === 'words') {
            setWordType(item.type || 'noun');
            setWord(item.word || '');
            setEnglish(item.english || '');
            setNotes(item.notes || '');
            setArticle(item.article || '');
            setPlural(item.plural || '');
            setCaseRequired(item.caseRequired || '');
            setRelatedWords(item.relatedWords || []);
            setOldRelatedWords(item.relatedWords || []);
            setTags(item.tags || []);
            if (item.conjugation && typeof item.conjugation === 'object') {
              setConjugation(item.conjugation);
            } else if (item.conjugation && typeof item.conjugation === 'string') {
              // fallback if it was saved as string earlier
              setConjugation({ ich: item.conjugation, du: '', erSieEs: '', wir: '', ihr: '', sieSie: '' });
            }
          } else {
            setPhrase(item.phrase || '');
            setEnglish(item.english || '');
            setNotes(item.notes || '');
            setTags(item.tags || []);
          }

          if (collectionName === 'words') {
            setInitialData({
              wordType: item.type || 'noun',
              word: item.word || '',
              english: item.english || '',
              notes: item.notes || '',
              article: item.article || '',
              plural: item.plural || '',
              caseRequired: item.caseRequired || '',
              relatedWords: item.relatedWords || [],
              tags: item.tags || [],
              conjugation: typeof item.conjugation === 'object' ? item.conjugation : (item.conjugation ? { ich: item.conjugation, du: '', erSieEs: '', wir: '', ihr: '', sieSie: '' } : { ich: '', du: '', erSieEs: '', wir: '', ihr: '', sieSie: '' })
            });
          } else {
            setInitialData({
              phrase: item.phrase || '',
              english: item.english || '',
              notes: item.notes || '',
              tags: item.tags || []
            });
          }
        }
      } catch (err) {
        console.error("Failed to load item", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [collectionName, id]);

  const handleConjugationChange = (field, value) => {
    setConjugation(prev => ({ ...prev, [field]: value }));
  };

  const checkIsDirty = () => {
    if (!initialData) return false;
    if (collectionName === 'words') {
      return wordType !== initialData.wordType ||
             word !== initialData.word ||
             english !== initialData.english ||
             notes !== initialData.notes ||
             article !== initialData.article ||
             plural !== initialData.plural ||
             caseRequired !== initialData.caseRequired ||
             JSON.stringify(relatedWords) !== JSON.stringify(initialData.relatedWords) ||
             JSON.stringify(tags) !== JSON.stringify(initialData.tags) ||
             JSON.stringify(conjugation) !== JSON.stringify(initialData.conjugation);
    } else {
      return phrase !== initialData.phrase ||
             english !== initialData.english ||
             notes !== initialData.notes ||
             JSON.stringify(tags) !== JSON.stringify(initialData.tags);
    }
  };

  const handleClose = () => {
    if (checkIsDirty()) {
      const save = window.confirm("You have unsaved changes. Do you want to save them before leaving?\n\n(Click OK to save, Cancel to discard and leave)");
      if (save) {
        handleSave({ preventDefault: () => {} });
        return;
      }
    }
    navigate('/', { state: { tab: collectionName === 'phrases' ? 'phrases' : 'words', editedId: id, fromMissingInfo: location.state?.fromMissingInfo } });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (collectionName === 'words') {
        const wordData = { type: wordType, word, english, notes, tags };
        if (wordType === 'noun') {
          wordData.article = article;
          wordData.plural = plural;
        } else if (wordType === 'verb') {
          wordData.conjugation = conjugation;
        } else if (wordType === 'preposition') {
          wordData.caseRequired = caseRequired;
        }

        // Recalculate needsReview
        let needsReview = false;
        if (wordData.type === 'noun' && !wordData.article) {
          needsReview = true;
        }
        if (wordData.type === 'preposition' && !wordData.caseRequired) {
          needsReview = true;
        }
        wordData.needsReview = needsReview;
        wordData.relatedWords = relatedWords;

        await updateWord(id, wordData, oldRelatedWords);
      } else {
        await updateItem('phrases', id, { phrase, english, notes, tags });
      }
      navigate('/', { state: { tab: collectionName === 'phrases' ? 'phrases' : 'words', fromMissingInfo: location.state?.fromMissingInfo, editedId: id, saved: true } });
    } catch (err) {
      console.error(err);
      alert('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card" style={{ position: 'relative' }}>
        <button 
          type="button"
          onClick={handleClose} 
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: '2px solid var(--danger)', borderRadius: '8px', color: 'var(--danger)', cursor: 'pointer', padding: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8, transition: 'all 0.2s' }}
          title="Close"
          onMouseOver={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
          onMouseOut={e => { e.currentTarget.style.opacity = 0.8; e.currentTarget.style.background = 'transparent'; }}
        >
          <FiX size={20} />
        </button>
        <h2 style={{ marginBottom: '1.5rem', paddingRight: '2.5rem' }}>Edit {collectionName === 'words' ? 'Word' : 'Phrase'}</h2>
        
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {collectionName === 'words' ? (
            <>
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
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>Article (Optional)</label>
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
                <input required value={word} onChange={(e) => setWord(e.target.value)} style={{ width: '100%', textTransform: wordType === 'noun' ? 'capitalize' : 'none' }} placeholder={wordType === 'verb' ? 'e.g. essen' : wordType === 'adjective' ? 'e.g. schön' : wordType === 'adverb' ? 'e.g. schnell' : wordType === 'noun' ? 'e.g. Apfel' : wordType === 'preposition' ? 'e.g. mit' : 'e.g. aber'} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>English Meaning *</label>
                <input required value={english} onChange={(e) => setEnglish(e.target.value)} style={{ width: '100%' }} placeholder={wordType === 'verb' ? 'e.g. to eat' : wordType === 'adjective' ? 'e.g. beautiful' : wordType === 'adverb' ? 'e.g. quickly' : wordType === 'noun' ? 'e.g. Apple' : wordType === 'preposition' ? 'e.g. with' : 'e.g. but'} />
              </div>

              {wordType === 'noun' && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>Plural Form (Optional)</label>
                  <input value={plural} onChange={(e) => setPlural(e.target.value)} style={{ width: '100%', textTransform: wordType === 'noun' ? 'capitalize' : 'none' }} />
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
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>Required Case (Optional)</label>
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
                <RichTextEditor value={notes} onChange={setNotes} placeholder="Any additional context, examples, or grammar rules..." />
              </div>

              <TagsInput tags={tags} setTags={setTags} />

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Related Words (Optional)</label>
                <div style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '0.75rem', background: 'var(--bg-color)' }}>
                  {relatedWords.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      {relatedWords.map(relId => {
                        const w = words.find(x => x.id === relId);
                        if (!w) return null;
                        return (
                          <span key={relId} style={{ background: 'var(--primary)', color: '#fff', padding: '0.3rem 0.6rem', borderRadius: '16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            {w.word} ({w.type})
                            <button type="button" onClick={() => setRelatedWords(prev => prev.filter(x => x !== relId))} style={{ background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', lineHeight: 1 }}>&times;</button>
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
                      .filter(w => !relatedWords.includes(w.id) && (w.word.toLowerCase().includes(searchTerm.toLowerCase()) || w.english.toLowerCase().includes(searchTerm.toLowerCase())) && w.id !== id)
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
            </>
          ) : (
            <>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>German Phrase *</label>
                <input required value={phrase} onChange={(e) => setPhrase(e.target.value)} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>English Meaning *</label>
                <input required value={english} onChange={(e) => setEnglish(e.target.value)} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Notes (Optional)</label>
                <RichTextEditor value={notes} onChange={setNotes} placeholder="Any additional context, examples, or grammar rules..." />
              </div>
              
              <TagsInput tags={tags} setTags={setTags} />
            </>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={handleClose} style={{ flex: 1, background: 'var(--border)', color: 'var(--text-color)' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} style={{ flex: 1 }}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
