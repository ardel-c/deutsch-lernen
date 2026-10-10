import { adjectiveEndingsData } from '../data/adjectiveEndingsData';
import FillInPractice from './practice/FillInPractice';

const filterGroups = [
  {
    key: 'case',
    options: [
      { value: 'All', label: 'All Cases (Mixed)' },
      { value: 'Nominative', label: 'Nominative', match: q => q.caseRequired === 'Nominative' },
      { value: 'Accusative', label: 'Accusative', match: q => q.caseRequired === 'Accusative' },
      { value: 'Dative', label: 'Dative', match: q => q.caseRequired === 'Dative' }
    ]
  },
  {
    key: 'declension',
    options: [
      { value: 'All', label: 'All Declensions' },
      { value: 'weak', label: 'Weak (after der/die/das)', match: q => q.declension === 'weak' },
      { value: 'mixed', label: 'Mixed (after ein/kein/mein)', match: q => q.declension === 'mixed' },
      { value: 'strong', label: 'Strong (no article)', match: q => q.declension === 'strong' }
    ]
  }
];

const declensionLabels = { weak: 'Weak', mixed: 'Mixed', strong: 'Strong' };

export default function AdjectivePractice() {
  return (
    <FillInPractice
      exercise="adjectives"
      title="Adjective Endings"
      intro="Type the missing ending (e.g. -e, -en, -er, -es, -em). You can also type the whole adjective."
      data={adjectiveEndingsData}
      filterGroups={filterGroups}
      inputWidth="70px"
      isAnswerCorrect={(q, input) => {
        const ending = input.replace(/^-/, '');
        return ending === q.answer || ending === (q.adjective + q.answer).toLowerCase();
      }}
      formatAnswer={q => `-${q.answer} (${q.adjective}${q.answer})`}
      getHint={() => 'Add the adjective ending'}
      getCategory={q => q.caseRequired}
      renderBeforeInput={q => <strong>{q.adjective}</strong>}
      getTags={q => [
        { label: 'Noun', value: `${q.gender} ${q.noun}` },
        { label: 'Case', value: q.caseRequired },
        { label: 'Declension', value: declensionLabels[q.declension] }
      ]}
    />
  );
}
