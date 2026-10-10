import { FiCheck, FiX } from 'react-icons/fi';

const pill = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  padding: '0.1rem 0.5rem',
  borderRadius: '999px',
  fontSize: '0.75rem',
  fontWeight: '600',
  background: 'var(--bg-color)',
  border: '1px solid var(--border)'
};

// Shows how often this question has been answered correctly/incorrectly before
export default function QuestionHistory({ stat }) {
  if (!stat) {
    return <span style={{ ...pill, opacity: 0.6 }}>New</span>;
  }

  return (
    <span style={{ display: 'inline-flex', gap: '0.35rem', flexWrap: 'wrap' }}>
      <span style={pill} title="Times correct / incorrect">
        <FiCheck color="var(--success)" /> {stat.correct || 0}
        <FiX color="var(--danger)" style={{ marginLeft: '0.25rem' }} /> {stat.incorrect || 0}
      </span>
      {stat.lastCorrect === false && (
        <span style={{ ...pill, color: 'var(--danger)', borderColor: 'var(--danger)' }}>
          Missed last time{stat.lastAnswer ? ` ("${stat.lastAnswer}")` : ''}
        </span>
      )}
    </span>
  );
}
