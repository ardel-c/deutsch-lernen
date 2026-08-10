import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateItem, calculateNextReview } from '../utils/firestore';
import { useWords } from '../context/WordContext';
import { FiVolume2 } from 'react-icons/fi';
import FormattedText from './FormattedText';

export default function AnkiReview() {
  const { currentUser } = useAuth();
  const { words, phrases, loading } = useWords();
  
  const getArticleColor = (article) => {
    if (article === 'der') return 'var(--primary)';
    if (article === 'die') return 'var(--danger)';
    if (article === 'das') return 'var(--success)';
    return 'inherit';
  };
  const [dueItems, setDueItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewDirection, setReviewDirection] = useState('en-de'); // 'en-de' or 'de-en'
  const [typingMode, setTypingMode] = useState(false);
  const [typingInput, setTypingInput] = useState('');
  const [typingFeedback, setTypingFeedback] = useState(null); // 'correct' | 'incorrect'

  const speakGerman = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!currentUser || loading || sessionStarted) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isDue = (item) => {
      if (item.needsReview) return false;
      if (!item.nextReviewDate) return true;
      const reviewDate = new Date(item.nextReviewDate);
      reviewDate.setHours(0, 0, 0, 0);
      return reviewDate <= today;
    };
    
    const dueWords = words
      .filter(isDue)
      .map(w => ({ ...w, _collection: 'words', _question: w.english, _article: w.article, _word: w.word }));
      
    const duePhrases = phrases
      .filter(isDue)
      .map(p => ({ ...p, _collection: 'phrases', _question: p.english, _word: p.phrase }));

    setDueItems([...dueWords, ...duePhrases].sort(() => Math.random() - 0.5));
    setSessionStarted(true);
  }, [currentUser, words, phrases, loading, sessionStarted]);

  const handleRate = async (quality) => {
    const currentItem = dueItems[currentIndex];
    
    // Calculate new Anki values
    const newAnkiData = calculateNextReview(
      quality, 
      currentItem.repetitions || 0, 
      currentItem.interval || 0, 
      currentItem.easeFactor || 2.5
    );

    try {
      await updateItem(currentItem._collection, currentItem.id, newAnkiData);
    } catch (err) {
      console.error('Failed to update Anki progress', err);
    }

    setShowAnswer(false);
    setCurrentIndex(prev => prev + 1);
    setTypingInput('');
    setTypingFeedback(null);
  };

  const checkTypingAnswer = (e) => {
    e.preventDefault();
    if (!typingInput.trim()) return;

    const userInput = typingInput.trim().toLowerCase();
    
    let isCorrect = false;
    if (currentItem._collection === 'words' && currentItem._article) {
      isCorrect = userInput === `${currentItem._article} ${currentItem._word}`.toLowerCase();
    } else {
      isCorrect = userInput === currentItem._word.toLowerCase();
    }

    if (isCorrect) {
      setTypingFeedback('correct');
      // Auto rate as Good (4)
      setTimeout(() => {
        handleRate(4);
      }, 1000);
    } else {
      setTypingFeedback('incorrect');
      setShowAnswer(true);
    }
  };

  if (loading) return <div className="container">Loading review items...</div>;

  if (currentIndex >= dueItems.length) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '10vh' }}>
        <h2>🎉 All done for now!</h2>
        <p style={{ opacity: 0.8, marginTop: '1rem' }}>You have reviewed all due words and phrases. Check back later!</p>
      </div>
    );
  }

  const currentItem = dueItems[currentIndex];

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '5vh' }}>
      <h2 style={{ marginBottom: '1rem' }}>Review</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0', marginBottom: '2rem' }}>
        <button 
          onClick={() => setReviewDirection('en-de')} 
          style={{ 
            background: reviewDirection === 'en-de' ? 'var(--primary)' : 'var(--card-bg)', 
            color: reviewDirection === 'en-de' ? '#fff' : 'var(--text-color)', 
            border: `1px solid ${reviewDirection === 'en-de' ? 'var(--primary)' : 'var(--border)'}`, 
            borderRadius: '20px 0 0 20px', 
            padding: '0.5rem 1rem',
            margin: 0
          }}
        >
          EN → DE
        </button>
        <button 
          onClick={() => setReviewDirection('de-en')} 
          style={{ 
            background: reviewDirection === 'de-en' ? 'var(--primary)' : 'var(--card-bg)', 
            color: reviewDirection === 'de-en' ? '#fff' : 'var(--text-color)', 
            border: `1px solid ${reviewDirection === 'de-en' ? 'var(--primary)' : 'var(--border)'}`, 
            borderRadius: '0 20px 20px 0', 
            padding: '0.5rem 1rem',
            margin: 0,
            borderLeft: 'none'
          }}
        >
          DE → EN
        </button>
      </div>

      {reviewDirection === 'en-de' && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'var(--card-bg)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
            <input 
              type="checkbox" 
              checked={typingMode} 
              onChange={(e) => setTypingMode(e.target.checked)} 
            />
            Typing Test Mode
          </label>
        </div>
      )}

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          {reviewDirection === 'en-de' ? currentItem._question : (
            <>
              <span style={{ color: currentItem._article ? getArticleColor(currentItem._article) : 'inherit' }}>
                {currentItem._article && <span>{currentItem._article} </span>}
                {currentItem._word}
              </span>
              <button 
                onClick={() => speakGerman(currentItem._article ? `${currentItem._article} ${currentItem._word}` : currentItem._word)} 
                style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }}
                title="Listen"
              >
                <FiVolume2 size={24} />
              </button>
            </>
          )}
        </h1>
        
        {showAnswer ? (
          <>
            <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border)' }} />
            <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {reviewDirection === 'en-de' ? (
                <>
                  <span style={{ color: currentItem._article ? getArticleColor(currentItem._article) : 'inherit' }}>
                    {currentItem._article && <span>{currentItem._article} </span>}
                    {currentItem._word}
                  </span>
                  <button 
                    onClick={() => speakGerman(currentItem._article ? `${currentItem._article} ${currentItem._word}` : currentItem._word)} 
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }}
                    title="Listen"
                  >
                    <FiVolume2 size={24} />
                  </button>
                </>
              ) : currentItem._question}
            </h1>
            {currentItem.plural && <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>Plural: {currentItem.plural}</p>}
            {currentItem.conjugation && typeof currentItem.conjugation === 'object' && (
              <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>
                Conjugation: {['ich', 'du', 'erSieEs', 'wir', 'ihr', 'sieSie'].map(k => currentItem.conjugation[k] ? `${k === 'erSieEs' ? 'er/sie/es' : k === 'sieSie' ? 'sie/Sie' : k} ${currentItem.conjugation[k]}` : '').filter(Boolean).join(', ')}
              </p>
            )}
            {currentItem.conjugation && typeof currentItem.conjugation === 'string' && (
              <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>Conjugation: {currentItem.conjugation}</p>
            )}
            {currentItem.type === 'preposition' && currentItem.caseRequired && (
              <p style={{ marginTop: '0.5rem', opacity: 0.8, color: 'var(--primary)', fontWeight: '600' }}>
                Takes {currentItem.caseRequired}
              </p>
            )}
            {currentItem.notes && (
              <div style={{ padding: '1rem', background: 'var(--bg-color)', borderRadius: '10px', fontSize: '0.95rem', borderLeft: '4px solid var(--primary)', textAlign: 'left' }}>
                <strong>Notes:</strong>
                <div style={{ marginTop: '0.5rem' }}>
                  <FormattedText text={currentItem.notes} />
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem', justifyContent: 'center' }}>
              <button onClick={() => handleRate(1)} style={{ background: 'var(--danger)' }}>Again</button>
              <button onClick={() => handleRate(3)} style={{ background: 'var(--warning)' }}>Hard</button>
              <button onClick={() => handleRate(4)} style={{ background: 'var(--success)' }}>Good</button>
              <button onClick={() => handleRate(5)} style={{ background: 'var(--primary)' }}>Easy</button>
            </div>
          </>
        ) : typingMode && reviewDirection === 'en-de' ? (
          <form onSubmit={checkTypingAnswer} style={{ marginTop: '2rem', width: '100%', maxWidth: '300px', alignSelf: 'center' }}>
            <input
              type="text"
              autoFocus
              value={typingInput}
              onChange={(e) => {
                setTypingInput(e.target.value);
                setTypingFeedback(null);
              }}
              placeholder={currentItem._collection === 'words' && currentItem._article ? "e.g. der Apfel" : "Type the German translation..."}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1.1rem',
                textAlign: 'center',
                border: typingFeedback === 'incorrect' ? '2px solid var(--danger)' : typingFeedback === 'correct' ? '2px solid var(--success)' : '1px solid var(--border)',
                background: typingFeedback === 'incorrect' ? '#fee2e2' : typingFeedback === 'correct' ? '#dcfce7' : 'var(--bg-color)',
                color: typingFeedback === 'incorrect' ? '#991b1b' : typingFeedback === 'correct' ? '#166534' : 'var(--text-color)',
                outline: 'none',
                borderRadius: '8px'
              }}
            />
            {typingFeedback === 'correct' && (
              <div style={{ color: 'var(--success)', fontWeight: 'bold', marginTop: '0.5rem' }}>Correct! Next...</div>
            )}
            <button type="submit" style={{ display: 'none' }}>Submit</button>
          </form>
        ) : (
          <button 
            onClick={() => setShowAnswer(true)} 
            style={{ marginTop: '2rem', width: 'fit-content', alignSelf: 'center' }}
          >
            Show Answer
          </button>
        )}
      </div>
      <p style={{ marginTop: '1rem', opacity: 0.6 }}>{dueItems.length - currentIndex} left</p>
    </div>
  );
}
