import { articlePracticeData } from '../data/articlePracticeData';
import FillInPractice from './practice/FillInPractice';

const definiteArticles = new Set(['der', 'die', 'das', 'den', 'dem']);
const indefiniteArticles = new Set(['ein', 'eine', 'einen', 'einem', 'einer']);

function getArticleType(answer) {
  const types = answer
    .split('/')
    .map(article => article.trim().toLowerCase())
    .map(article => {
      if (definiteArticles.has(article)) return 'the';
      if (indefiniteArticles.has(article)) return 'a';
      return null;
    })
    .filter(Boolean);

  return [...new Set(types)].join(' or ');
}

const filterGroups = [
  {
    key: 'case',
    options: [
      { value: 'All', label: 'All Cases (Mixed)' },
      { value: 'Nominative', label: 'Nominative Practice', match: q => q.caseRequired === 'Nominative' },
      { value: 'Accusative', label: 'Accusative Practice', match: q => q.caseRequired === 'Accusative' },
      { value: 'Dative', label: 'Dative Practice', match: q => q.caseRequired === 'Dative' }
    ]
  },
  {
    key: 'topic',
    options: [
      { value: 'All', label: 'All Topics' },
      { value: 'TwoWay', label: 'Two-Way Prepositions', match: q => q.twoWay },
      { value: 'Plural', label: 'Plural Nouns', match: q => q.gender === 'plural' }
    ]
  }
];

export default function ArticlePractice() {
  return (
    <FillInPractice
      exercise="articles"
      title="Article Practice"
      intro="Fill in the blanks with the correct definite (der/die/das) or indefinite (ein/eine) article."
      data={articlePracticeData}
      filterGroups={filterGroups}
      isAnswerCorrect={(q, input) => q.answer.split('/').map(a => a.trim().toLowerCase()).includes(input)}
      formatAnswer={q => `${q.answer.split('/').join(' or ')} (${getArticleType(q.answer)})`}
      getHint={q => <>Use: <span style={{ fontStyle: 'italic' }}>{getArticleType(q.answer)}</span></>}
      getCategory={q => q.caseRequired}
      getTags={q => [
        { label: 'Noun', value: `${q.gender} ${q.noun}` },
        { label: 'Case', value: q.caseRequired },
        ...(q.twoWay ? [{ label: 'Preposition', value: 'Two-way' }] : [])
      ]}
    />
  );
}
