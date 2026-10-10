// Filter shared by every practice mode, based on the learner's saved history
export const progressOptions = [
  { value: 'All', label: 'All questions' },
  { value: 'Mistakes', label: 'Only my mistakes' },
  { value: 'New', label: 'Not tried yet' }
];

export function matchesProgress(progress, stat) {
  if (progress === 'Mistakes') return stat?.lastCorrect === false;
  if (progress === 'New') return !stat;
  return true;
}

export function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
