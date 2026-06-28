import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addWord, addPhrase } from '../utils/firestore';
import { useNavigate } from 'react-router-dom';

export default function AddItem() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('word'); // 'word' | 'phrase'
  const [loading, setLoading] = useState(false);

  // Word state
  const [wordType, setWordType] = useState('noun');
  const [word, setWord] = useState('');
  const [english, setEnglish] = useState('');
  const [notes, setNotes] = useState('');
  const [article, setArticle] = useState('');
  const [plural, setPlural] = useState('');
  const [caseRequired, setCaseRequired] = useState('');
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
    
    setLoading(true);
    try {
      const wordData = { type: wordType, word, english, notes };
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
    
    setLoading(true);
    try {
      await addPhrase(currentUser.uid, { phrase, english: phraseEnglish, notes: phraseNotes });
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
            onClick={() => setTab('word')} 
            style={{ flex: 1, background: tab === 'word' ? 'var(--primary)' : 'var(--border)', color: tab === 'word' ? '#fff' : 'var(--text-color)' }}
          >
            Word
          </button>
          <button 
            onClick={() => setTab('phrase')} 
            style={{ flex: 1, background: tab === 'phrase' ? 'var(--primary)' : 'var(--border)', color: tab === 'phrase' ? '#fff' : 'var(--text-color)' }}
          >
            Phrase
          </button>
        </div>

        {tab === 'word' ? (
          <form onSubmit={handleAddWord} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Word Type</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['noun', 'verb', 'adjective', 'preposition', 'other'].map(type => (
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
              <input required value={word} onChange={(e) => setWord(e.target.value)} style={{ width: '100%' }} placeholder={wordType === 'verb' ? 'e.g. essen' : wordType === 'adjective' ? 'e.g. schön' : wordType === 'noun' ? 'e.g. Apfel' : wordType === 'preposition' ? 'e.g. mit' : 'e.g. aber'} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>English Meaning *</label>
              <input required value={english} onChange={(e) => setEnglish(e.target.value)} style={{ width: '100%' }} placeholder={wordType === 'verb' ? 'e.g. to eat' : wordType === 'adjective' ? 'e.g. beautiful' : wordType === 'noun' ? 'e.g. Apple' : wordType === 'preposition' ? 'e.g. with' : 'e.g. but'} />
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

            <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
              {loading ? 'Adding...' : 'Save Word'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleAddPhrase} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>German Phrase *</label>
              <input required value={phrase} onChange={(e) => setPhrase(e.target.value)} style={{ width: '100%' }} placeholder="e.g. Ich muss aufs Klo" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>English Meaning *</label>
              <input required value={phraseEnglish} onChange={(e) => setPhraseEnglish(e.target.value)} style={{ width: '100%' }} placeholder="e.g. I need to go to the toilet" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Notes (Optional)</label>
              <textarea value={phraseNotes} onChange={(e) => setPhraseNotes(e.target.value)} style={{ width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: 'inherit' }} placeholder="Any additional context, examples, or grammar rules..." />
            </div>
            <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
              {loading ? 'Adding...' : 'Save Phrase'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
