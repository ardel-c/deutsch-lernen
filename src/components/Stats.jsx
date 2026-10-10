import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWords } from '../context/WordContext';
import { usePracticeStats } from '../hooks/usePracticeStats';
import { subscribeToPracticeSessions } from '../utils/firestore';
import { articlePracticeData } from '../data/articlePracticeData';
import { adjectiveEndingsData } from '../data/adjectiveEndingsData';

const exerciseInfo = {
  articles: { label: 'Articles', path: '/practice' },
  adjectives: { label: 'Adjective Endings', path: '/practice/adjectives' },
  gender: { label: 'Gender Drill', path: '/practice/gender' }
};

const MATURE_INTERVAL_DAYS = 21;

const dayKey = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const sessionDate = (s) => s.createdAt?.toDate ? s.createdAt.toDate() : new Date();
const percent = (c, t) => t ? Math.round((c / t) * 100) : 0;

// Sum lifetime correct/incorrect counts into the categories each question belongs to
function accuracyByCategory(stats, items, getCategories, order) {
  const totals = Object.fromEntries(order.map(c => [c, { correct: 0, total: 0 }]));
  items.forEach(item => {
    const stat = stats[item.id];
    if (!stat) return;
    getCategories(item).forEach(cat => {
      if (!totals[cat]) return;
      totals[cat].correct += stat.correct || 0;
      totals[cat].total += (stat.correct || 0) + (stat.incorrect || 0);
    });
  });
  return order.map(label => ({ label, ...totals[label] }));
}

function currentStreak(sessions) {
  const days = new Set(sessions.map(s => dayKey(sessionDate(s))));
  const cursor = new Date();
  // Today's practice is optional for keeping the streak alive
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function StatTile({ label, value, sub }) {
  return (
    <div className="card" style={{ padding: '1rem 1.25rem' }}>
      <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ fontSize: '1.75rem', fontWeight: 'bold', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      {sub && <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{sub}</div>}
    </div>
  );
}

function AccuracyBars({ title, rows }) {
  const hasData = rows.some(r => r.total > 0);
  return (
    <div className="card">
      <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>{title}</h3>
      {!hasData && <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>No answers yet.</p>}
      {hasData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {rows.map(r => {
            const pct = percent(r.correct, r.total);
            const tip = r.total ? `${r.label}: ${pct}% correct (${r.correct} of ${r.total})` : `${r.label}: no answers yet`;
            return (
              <div key={r.label} title={tip}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span>{r.label}</span>
                  <span style={{ opacity: 0.75, fontVariantNumeric: 'tabular-nums' }}>
                    {r.total ? `${pct}% · ${r.correct}/${r.total}` : '—'}
                  </span>
                </div>
                <div style={{ height: '8px', borderRadius: '4px', background: 'var(--border)', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', borderRadius: '4px', background: 'var(--primary)' }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Stats() {
  const { currentUser } = useAuth();
  const { words, phrases, loading } = useWords();
  const articleStats = usePracticeStats('articles');
  const adjectiveStats = usePracticeStats('adjectives');
  const genderStats = usePracticeStats('gender');
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    return subscribeToPracticeSessions(currentUser.uid, setSessions);
  }, [currentUser]);

  const nouns = useMemo(() => words.filter(w => w.type === 'noun' && w.article), [words]);

  const overview = useMemo(() => {
    const answered = sessions.reduce((sum, s) => sum + (s.total || 0), 0);
    const correct = sessions.reduce((sum, s) => sum + (s.correct || 0), 0);
    return { answered, accuracy: percent(correct, answered), streak: currentStreak(sessions) };
  }, [sessions]);

  const vocab = useMemo(() => {
    const items = [...words, ...phrases];
    const now = new Date();
    return {
      due: items.filter(i => !i.nextReviewDate || new Date(i.nextReviewDate) <= now).length,
      fresh: items.filter(i => !i.repetitions).length,
      learning: items.filter(i => i.repetitions > 0 && (i.interval || 0) < MATURE_INTERVAL_DAYS).length,
      mature: items.filter(i => (i.interval || 0) >= MATURE_INTERVAL_DAYS).length,
      total: items.length
    };
  }, [words, phrases]);

  const articleRows = accuracyByCategory(
    articleStats,
    articlePracticeData,
    q => [q.caseRequired, ...(q.twoWay ? ['Two-way prepositions'] : []), ...(q.gender === 'plural' ? ['Plural nouns'] : [])],
    ['Nominative', 'Accusative', 'Dative', 'Two-way prepositions', 'Plural nouns']
  );
  const adjectiveCaseRows = accuracyByCategory(adjectiveStats, adjectiveEndingsData, q => [q.caseRequired], ['Nominative', 'Accusative', 'Dative']);
  const adjectiveDeclensionRows = accuracyByCategory(
    adjectiveStats,
    adjectiveEndingsData,
    q => [{ weak: 'Weak', mixed: 'Mixed', strong: 'Strong' }[q.declension]],
    ['Weak', 'Mixed', 'Strong']
  );
  const genderRows = accuracyByCategory(genderStats, nouns, n => [n.article.toLowerCase()], ['der', 'die', 'das']);

  // Questions answered wrong most often (and still wrong last time first)
  const mostMissed = useMemo(() => {
    const collect = (stats, items, exercise, describe) => items
      .filter(item => stats[item.id]?.incorrect > 0)
      .map(item => ({ key: `${exercise}-${item.id}`, exercise, stat: stats[item.id], text: describe(item) }));

    return [
      ...collect(articleStats, articlePracticeData, 'articles', q => <>{q.prefix}<u><strong>{q.answer.split('/')[0]}</strong></u>{q.suffix}</>),
      ...collect(adjectiveStats, adjectiveEndingsData, 'adjectives', q => <>{q.prefix}{q.adjective}<u><strong>{q.answer}</strong></u>{q.suffix}</>),
      ...collect(genderStats, nouns, 'gender', n => <><u><strong>{n.article.toLowerCase()}</strong></u> {n.word} <span style={{ opacity: 0.7 }}>— {n.english}</span></>)
    ]
      .sort((a, b) => (a.stat.lastCorrect === false ? 0 : 1) - (b.stat.lastCorrect === false ? 0 : 1) || b.stat.incorrect - a.stat.incorrect)
      .slice(0, 12);
  }, [articleStats, adjectiveStats, genderStats, nouns]);

  return (
    <div className="container" style={{ paddingBottom: '4rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Your Progress</h2>

      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <StatTile label="Practice streak" value={`${overview.streak} ${overview.streak === 1 ? 'day' : 'days'}`} />
        <StatTile label="Questions answered" value={overview.answered} sub={`${sessions.length} rounds`} />
        <StatTile label="Practice accuracy" value={`${overview.accuracy}%`} />
        <StatTile label="Due for review" value={loading ? '…' : vocab.due} sub={<Link to="/review">Start review</Link>} />
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Vocabulary ({vocab.total} items)</h3>
        <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', gap: '2px', background: 'var(--card-bg)', marginBottom: '0.75rem' }}>
          {[
            { label: 'New', value: vocab.fresh, color: 'var(--border)' },
            { label: 'Learning', value: vocab.learning, color: 'var(--warning)' },
            { label: 'Mastered', value: vocab.mature, color: 'var(--success)' }
          ].filter(s => s.value > 0).map(s => (
            <div key={s.label} title={`${s.label}: ${s.value}`} style={{ flex: s.value, background: s.color }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
          {[
            { label: 'New', value: vocab.fresh, color: 'var(--border)' },
            { label: 'Learning', value: vocab.learning, color: 'var(--warning)' },
            { label: `Mastered (interval ≥ ${MATURE_INTERVAL_DAYS} days)`, value: vocab.mature, color: 'var(--success)' }
          ].map(s => (
            <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: s.color }} />
              {s.label}: <strong>{s.value}</strong>
            </span>
          ))}
        </div>
      </div>

      <div className="stats-grid stats-grid-wide" style={{ marginBottom: '1.5rem' }}>
        <AccuracyBars title="Articles: accuracy by topic" rows={articleRows} />
        <AccuracyBars title="Gender drill: accuracy by gender" rows={genderRows} />
        <AccuracyBars title="Adjective endings: by case" rows={adjectiveCaseRows} />
        <AccuracyBars title="Adjective endings: by declension" rows={adjectiveDeclensionRows} />
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1rem' }}>Most missed</h3>
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Practise these with the "Only my mistakes" filter</span>
        </div>
        {mostMissed.length === 0 && <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>No mistakes recorded yet.</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {mostMissed.map(m => (
            <div key={m.key} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'baseline', borderBottom: '1px solid var(--border)', paddingBottom: '0.6rem' }}>
              <div style={{ minWidth: 0 }}>
                <div>{m.text}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                  <Link to={exerciseInfo[m.exercise].path}>{exerciseInfo[m.exercise].label}</Link>
                  {m.stat.lastCorrect === false && <span style={{ color: 'var(--danger)' }}> · missed last time{m.stat.lastAnswer ? ` ("${m.stat.lastAnswer}")` : ''}</span>}
                </div>
              </div>
              <span style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                <span style={{ color: 'var(--success)' }}>✓ {m.stat.correct || 0}</span>{' '}
                <span style={{ color: 'var(--danger)' }}>✗ {m.stat.incorrect}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Recent rounds</h3>
        {sessions.length === 0 && <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>No practice rounds yet. <Link to="/practice">Start practising</Link>.</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {sessions.slice(0, 10).map(s => (
            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: '0.9rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              <div style={{ minWidth: 0 }}>
                <strong>{exerciseInfo[s.exercise]?.label || s.exercise}</strong>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                  {sessionDate(s).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}{s.filter ? ` · ${s.filter}` : ''}
                </div>
              </div>
              <span style={{ whiteSpace: 'nowrap', fontWeight: '600', fontVariantNumeric: 'tabular-nums' }}>
                {s.correct}/{s.total} <span style={{ opacity: 0.7, fontWeight: 400 }}>({percent(s.correct, s.total)}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
