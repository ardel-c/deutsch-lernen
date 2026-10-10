import { useState, useEffect, useRef } from 'react';
import { FiCheckCircle, FiXCircle, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { usePracticeStats } from '../../hooks/usePracticeStats';
import { savePracticeSession } from '../../utils/firestore';
import PracticeTabs from './PracticeTabs';
import QuestionHistory from './QuestionHistory';
import { progressOptions, matchesProgress, shuffle } from './progressFilter';

const QUESTIONS_PER_ROUND = 10;

const selectStyle = { padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', cursor: 'pointer' };
const tagStyle = { background: 'var(--bg-color)', padding: '0.2rem 0.6rem', borderRadius: '4px' };

/**
 * Generic fill-in-the-blank practice.
 * filterGroups: [{ key, options: [{ value, label, match?: q => bool }] }] — first option of each group is the default
 */
export default function FillInPractice({
  exercise,
  title,
  intro,
  data,
  filterGroups,
  isAnswerCorrect,
  formatAnswer,
  getHint,
  getTags,
  getCategory,
  renderBeforeInput,
  inputWidth = '80px'
}) {
  const { currentUser } = useAuth();
  const stats = usePracticeStats(exercise);
  const statsRef = useRef(stats);
  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  const [filters, setFilters] = useState(() => ({
    ...Object.fromEntries(filterGroups.map(g => [g.key, g.options[0].value])),
    progress: 'All'
  }));
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saveState, setSaveState] = useState(null);

  const loadQuestions = () => {
    const pool = data.filter(q =>
      filterGroups.every(g => {
        const option = g.options.find(o => o.value === filters[g.key]);
        return !option?.match || option.match(q);
      }) && matchesProgress(filters.progress, statsRef.current[q.id])
    );
    setQuestions(shuffle(pool).slice(0, QUESTIONS_PER_ROUND));
    setAnswers({});
    setResults({});
    setSubmitted(false);
    setSaveState(null);
  };

  // Pick random questions on mount or when filters change (stats are read at load time only,
  // so saving a round doesn't reshuffle the questions on screen)
  useEffect(() => {
    loadQuestions();
  }, [filters]);

  const handleInputChange = (id, value) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const checkAnswers = async () => {
    const newResults = {};
    questions.forEach(q => {
      newResults[q.id] = isAnswerCorrect(q, answers[q.id]?.trim().toLowerCase() || '');
    });
    setResults(newResults);
    setSubmitted(true);

    if (!currentUser || questions.length === 0) return;
    const filterLabel = [
      ...filterGroups.map(g => g.options.find(o => o.value === filters[g.key])?.label),
      progressOptions.find(o => o.value === filters.progress)?.label
    ].join(' · ');
    setSaveState('saving');
    try {
      await savePracticeSession(currentUser.uid, exercise, filterLabel, questions.map(q => ({
        id: q.id,
        correct: newResults[q.id],
        answer: answers[q.id]?.trim() || '',
        category: getCategory(q)
      })));
      setSaveState('saved');
    } catch (err) {
      console.error('Failed to save practice results', err);
      setSaveState('error');
    }
  };

  const score = Object.values(results).filter(Boolean).length;

  return (
    <div className="container" style={{ paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto' }}>
      <PracticeTabs />
      <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>{title}</h2>
      <p style={{ textAlign: 'center', marginBottom: '1.5rem', opacity: 0.8 }}>{intro}</p>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
        {[...filterGroups, { key: 'progress', options: progressOptions }].map(group => (
          <select
            key={group.key}
            value={filters[group.key]}
            onChange={(e) => setFilters(prev => ({ ...prev, [group.key]: e.target.value }))}
            style={selectStyle}
          >
            {group.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        ))}
      </div>

      {questions.length === 0 && (
        <div className="card" style={{ textAlign: 'center', opacity: 0.85 }}>
          {filters.progress === 'Mistakes'
            ? 'No mistakes to review for these filters. Nice work!'
            : 'No questions match these filters.'}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {questions.map((q, index) => {
          const isCorrect = results[q.id];

          let inputBorderColor = 'var(--border)';
          let inputBg = 'var(--card-bg)';
          if (submitted) {
            inputBorderColor = isCorrect ? 'var(--success)' : 'var(--danger)';
            inputBg = isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
          }

          return (
            <div key={q.id} className="card" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>
                  {getHint(q)}
                </div>
                <QuestionHistory stat={stats[q.id]} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.1rem', flexWrap: 'wrap', gap: '0.5rem', lineHeight: '2' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--primary)', marginRight: '0.5rem' }}>{index + 1}.</span>
                {q.prefix && <span>{q.prefix}</span>}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  {renderBeforeInput?.(q)}
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    disabled={submitted}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    style={{
                      width: inputWidth,
                      textAlign: 'center',
                      borderColor: inputBorderColor,
                      backgroundColor: inputBg,
                      fontWeight: 'bold',
                      color: submitted && !isCorrect ? 'var(--danger)' : 'var(--text-color)',
                      transition: 'all 0.2s ease'
                    }}
                    placeholder="???"
                  />
                  {submitted && isCorrect && <FiCheckCircle color="var(--success)" size={20} />}
                  {submitted && !isCorrect && <FiXCircle color="var(--danger)" size={20} />}
                </div>
                {q.suffix && <span>{q.suffix}</span>}
              </div>

              {submitted && !isCorrect && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <p style={{ color: 'var(--danger)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Correct answer: <span style={{ textDecoration: 'underline' }}>{formatAnswer(q)}</span>
                  </p>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.5', opacity: 0.9 }}>
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    {getTags(q).map(tag => (
                      <span key={tag.label} style={tagStyle}>{tag.label}: <strong>{tag.value}</strong></span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {questions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
          {submitted && (
            <>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: score === questions.length ? 'var(--success)' : 'var(--primary)' }}>
                You scored {score} / {questions.length}!
              </div>
              {saveState && (
                <div style={{ fontSize: '0.85rem', opacity: 0.75, color: saveState === 'error' ? 'var(--danger)' : 'inherit' }}>
                  {saveState === 'saving' && 'Saving your results…'}
                  {saveState === 'saved' && 'Results saved to your stats.'}
                  {saveState === 'error' && 'Could not save your results.'}
                </div>
              )}
            </>
          )}
          {!submitted ? (
            <button onClick={checkAnswers} style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
              Check Answers
            </button>
          ) : (
            <button onClick={loadQuestions} style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiRefreshCw /> Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
