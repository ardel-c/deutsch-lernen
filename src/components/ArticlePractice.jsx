import React, { useState, useEffect } from 'react';
import { articlePracticeData } from '../data/articlePracticeData';
import { FiCheckCircle, FiXCircle, FiRefreshCw } from 'react-icons/fi';

export default function ArticlePractice() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedCase, setSelectedCase] = useState('All');

  // Pick random questions on mount or when case changes
  useEffect(() => {
    loadQuestions();
  }, [selectedCase]);

  const loadQuestions = () => {
    let pool = articlePracticeData;
    if (selectedCase !== 'All') {
      pool = articlePracticeData.filter(q => q.caseRequired === selectedCase);
    }
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
    setAnswers({});
    setResults({});
    setSubmitted(false);
  };

  const handleInputChange = (id, value) => {
    if (submitted) return;
    setAnswers(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const checkAnswers = () => {
    const newResults = {};
    questions.forEach(q => {
      const userAnswer = answers[q.id]?.trim().toLowerCase() || '';
      const correctAnswers = q.answer.split('/').map(a => a.trim().toLowerCase());
      newResults[q.id] = correctAnswers.includes(userAnswer);
    });
    setResults(newResults);
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Article Practice</h2>
      <p style={{ textAlign: 'center', marginBottom: '1.5rem', opacity: 0.8 }}>
        Fill in the blanks with the correct definite (der/die/das) or indefinite (ein/eine) article.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <select 
          value={selectedCase} 
          onChange={(e) => setSelectedCase(e.target.value)}
          style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', cursor: 'pointer' }}
        >
          <option value="All">All Cases (Mixed)</option>
          <option value="Nominative">Nominative Practice</option>
          <option value="Accusative">Accusative Practice</option>
          <option value="Dative">Dative Practice</option>
        </select>
      </div>

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
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.1rem', flexWrap: 'wrap', gap: '0.5rem', lineHeight: '2' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--primary)', marginRight: '0.5rem' }}>{index + 1}.</span>
                {q.prefix && <span>{q.prefix}</span>}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    disabled={submitted}
                    style={{
                      width: '80px',
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
                    Correct answer: <span style={{ textDecoration: 'underline' }}>{q.answer.split('/').join(' or ')}</span>
                  </p>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.5', opacity: 0.9 }}>
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ background: 'var(--bg-color)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>Noun: <strong>{q.gender} {q.noun}</strong></span>
                    <span style={{ background: 'var(--bg-color)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>Case: <strong>{q.caseRequired}</strong></span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
        {submitted && (
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: Object.values(results).filter(Boolean).length === questions.length ? 'var(--success)' : 'var(--primary)' }}>
            You scored {Object.values(results).filter(Boolean).length} / {questions.length}!
          </div>
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
    </div>
  );
}
