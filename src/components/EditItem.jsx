import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getItem, updateItem } from '../utils/firestore';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditItem() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { collectionName, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Word state
  const [wordType, setWordType] = useState('noun');
  const [word, setWord] = useState('');
  const [english, setEnglish] = useState('');
  const [notes, setNotes] = useState('');
  const [article, setArticle] = useState('');
  const [plural, setPlural] = useState('');
  const [caseRequired, setCaseRequired] = useState('');
  const [conjugation, setConjugation] = useState({
    ich: '', du: '', erSieEs: '', wir: '', ihr: '', sieSie: ''
  });

  // Phrase state
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item = await getItem(collectionName, id);
        if (item) {
          if (collectionName === 'words') {
            setWordType(item.type || 'noun');
            setWord(item.word || '');
            setEnglish(item.english || '');
            setNotes(item.notes || '');
            setArticle(item.article || '');
            setPlural(item.plural || '');
            setCaseRequired(item.caseRequired || '');
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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (collectionName === 'words') {
        const wordData = { type: wordType, word, english, notes };
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
        if (wordData.type === 'noun' && (!wordData.article || !wordData.plural)) {
          needsReview = true;
        }
        if (wordData.type === 'verb') {
          if (!wordData.conjugation || Object.values(wordData.conjugation).some(val => !val.trim())) {
            needsReview = true;
          }
        }
        if (wordData.type === 'preposition' && !wordData.caseRequired) {
          needsReview = true;
        }
        wordData.needsReview = needsReview;

        await updateItem('words', id, wordData);
      } else {
        await updateItem('phrases', id, { phrase, english, notes });
      }
      navigate('/', { state: { tab: collectionName === 'phrases' ? 'phrases' : 'words' } });
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
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Edit {collectionName === 'words' ? 'Word' : 'Phrase'}</h2>
        
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
                <input required value={word} onChange={(e) => setWord(e.target.value)} style={{ width: '100%' }} placeholder={wordType === 'verb' ? 'e.g. essen' : wordType === 'adjective' ? 'e.g. schön' : wordType === 'adverb' ? 'e.g. schnell' : wordType === 'noun' ? 'e.g. Apfel' : wordType === 'preposition' ? 'e.g. mit' : 'e.g. aber'} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>English Meaning *</label>
                <input required value={english} onChange={(e) => setEnglish(e.target.value)} style={{ width: '100%' }} placeholder={wordType === 'verb' ? 'e.g. to eat' : wordType === 'adjective' ? 'e.g. beautiful' : wordType === 'adverb' ? 'e.g. quickly' : wordType === 'noun' ? 'e.g. Apple' : wordType === 'preposition' ? 'e.g. with' : 'e.g. but'} />
              </div>

              {wordType === 'noun' && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>Plural Form (Optional)</label>
                  <input value={plural} onChange={(e) => setPlural(e.target.value)} style={{ width: '100%' }} />
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
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: 'inherit' }} />
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
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: 'inherit' }} />
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => navigate('/', { state: { tab: collectionName === 'phrases' ? 'phrases' : 'words' } })} style={{ flex: 1, background: 'var(--border)', color: 'var(--text-color)' }}>
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
