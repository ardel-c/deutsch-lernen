import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiRefreshCw, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useWords } from '../context/WordContext';
import { usePracticeStats } from '../hooks/usePracticeStats';
import { savePracticeSession } from '../utils/firestore';
import PracticeTabs from './practice/PracticeTabs';
import QuestionHistory from './practice/QuestionHistory';
import { progressOptions, matchesProgress, shuffle } from './practice/progressFilter';

const ROUND_SIZE = 20;
const ARTICLES = ['der', 'die', 'das'];
const articleColors = { der: 'var(--primary)', die: 'var(--danger)', das: 'var(--success)' };

const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

export default function GenderDrill() {
  const { currentUser } = useAuth();
  const { words, loading } = useWords();
  const stats = usePracticeStats('gender');
  const statsRef = useRef(stats);
  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  const nouns = useMemo(
    () => words.filter(w => w.type === 'noun' && ARTICLES.includes(w.article?.toLowerCase())),
    [words]
  );

  const [progress, setProgress] = useState('All');
  const [round, setRound] = useState([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [results, setResults] = useState([]);
  const [saveState, setSaveState] = useState(null);

  const startRound = () => {
    const pool = nouns.filter(n => matchesProgress(progress, statsRef.current[n.id]));
    setRound(shuffle(pool).slice(0, ROUND_SIZE));
    setIndex(0);
    setPicked(null);
    setResults([]);
    setSaveState(null);
  };

  // Start a round once words are loaded, and whenever the filter changes
  useEffect(() => {
    if (!loading) startRound();
  }, [loading, progress, nouns.length]);

  const current = round[index];
  const finished = round.length > 0 && index >= round.length;

  const choose = (article) => {
    if (!current || picked) return;
    setPicked(article);
    setResults(prev => [...prev, {
      id: current.id,
      correct: article === current.article.toLowerCase(),
      answer: article,
      category: current.article.toLowerCase()
    }]);
  };

  const next = async () => {
    setPicked(null);
    const nextIndex = index + 1;
    setIndex(nextIndex);
    if (nextIndex >= round.length && currentUser) {
      setSaveState('saving');
      try {
        await savePracticeSession(currentUser.uid, 'gender', progressOptions.find(o => o.value === progress)?.label, results);
        setSaveState('saved');
      } catch (err) {
        console.error('Failed to save practice results', err);
        setSaveState('error');
      }
    }
  };

  // Keyboard: 1/2/3 or d/i/a to pick, Enter for next
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      if (!picked) {
        const map = { '1': 'der', '2': 'die', '3': 'das' };
        if (map[e.key]) choose(map[e.key]);
      } else if (e.key === 'Enter') {
        next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const score = results.filter(r => r.correct).length;
  const missed = results.filter(r => !r.correct).map(r => nouns.find(n => n.id === r.id)).filter(Boolean);

  return (
    <div className="container" style={{ paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto' }}>
      <PracticeTabs />
      <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Gender Drill</h2>
      <p style={{ textAlign: 'center', marginBottom: '1.5rem', opacity: 0.8 }}>
        Pick der, die or das for the nouns in your vocabulary. Keys: 1 / 2 / 3, Enter for next.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <select
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', cursor: 'pointer' }}
        >
          {progressOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {loading && <div className="card" style={{ textAlign: 'center' }}>Loading your words…</div>}

      {!loading && nouns.length === 0 && (
        <div className="card" style={{ textAlign: 'center' }}>
          You don't have any nouns with an article yet. <Link to="/add">Add some nouns</Link> to start drilling.
        </div>
      )}

      {!loading && nouns.length > 0 && round.length === 0 && (
        <div className="card" style={{ textAlign: 'center', opacity: 0.85 }}>
          {progress === 'Mistakes' ? 'No mistakes to review. Nice work!' : 'You have tried every noun already.'}
        </div>
      )}

      {current && !finished && (
        <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <span style={{ opacity: 0.7 }}>{index + 1} / {round.length}</span>
            <QuestionHistory stat={stats[current.id]} />
          </div>

          <div style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {picked
              ? <><span style={{ color: articleColors[current.article.toLowerCase()] }}>{current.article.toLowerCase()}</span> {capitalize(current.word)}</>
              : capitalize(current.word)}
          </div>
          <div style={{ opacity: 0.7, marginBottom: '2rem' }}>{current.english}</div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {ARTICLES.map((a, i) => {
              const isAnswer = a === current.article.toLowerCase();
              let background = 'var(--card-bg)';
              let color = 'var(--text-color)';
              let border = 'var(--border)';
              if (picked && isAnswer) { background = 'var(--success)'; color = '#fff'; border = 'var(--success)'; }
              else if (picked === a) { background = 'var(--danger)'; color = '#fff'; border = 'var(--danger)'; }
              return (
                <button
                  key={a}
                  onClick={() => choose(a)}
                  disabled={!!picked}
                  style={{ minWidth: '100px', padding: '0.8rem 1.5rem', fontSize: '1.2rem', background, color, border: `1px solid ${border}`, borderRadius: '12px' }}
                >
                  <span style={{ opacity: 0.5, fontSize: '0.8rem', marginRight: '0.4rem' }}>{i + 1}</span>{a}
                </button>
              );
            })}
          </div>

          {picked && (
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontWeight: 'bold', color: picked === current.article.toLowerCase() ? 'var(--success)' : 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                {picked === current.article.toLowerCase()
                  ? <><FiCheckCircle /> Richtig!</>
                  : <><FiXCircle /> It's {current.article.toLowerCase()} {capitalize(current.word)}</>}
              </p>
              {current.plural && <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.25rem' }}>Plural: die {capitalize(current.plural)}</p>}
              <button onClick={next} style={{ marginTop: '1rem', padding: '0.7rem 1.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Next <FiArrowRight />
              </button>
            </div>
          )}
        </div>
      )}

      {finished && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: score === round.length ? 'var(--success)' : 'var(--primary)', marginBottom: '0.5rem' }}>
            You scored {score} / {round.length}!
          </div>
          {saveState && (
            <div style={{ fontSize: '0.85rem', opacity: 0.75, color: saveState === 'error' ? 'var(--danger)' : 'inherit' }}>
              {saveState === 'saving' && 'Saving your results…'}
              {saveState === 'saved' && 'Results saved to your stats.'}
              {saveState === 'error' && 'Could not save your results.'}
            </div>
          )}
          {missed.length > 0 && (
            <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Missed this round</h4>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                {missed.map(n => (
                  <li key={n.id}>
                    <strong style={{ color: articleColors[n.article.toLowerCase()] }}>{n.article.toLowerCase()}</strong> {capitalize(n.word)}
                    <span style={{ opacity: 0.7 }}> — {n.english}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={startRound} style={{ marginTop: '1.5rem', padding: '0.8rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiRefreshCw /> New Round
          </button>
        </div>
      )}
    </div>
  );
}
