import React from 'react';

export default function GrammarReference() {
  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Grammar Reference</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>The Four German Cases</h3>
        <p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
          <strong>Nominative (Nom):</strong> The subject of the sentence. The person or thing doing the action.<br/>
          <em>Der Mann liest. (The man reads.)</em>
        </p>
        <p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
          <strong>Accusative (Acc):</strong> The direct object. The person or thing directly receiving the action. Also used after specific prepositions (durch, für, gegen, ohne, um).<br/>
          <em>Ich sehe den Mann. (I see the man.)</em>
        </p>
        <p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
          <strong>Dative (Dat):</strong> The indirect object. The person or thing to/for whom the action is done. Also used after specific prepositions (aus, bei, mit, nach, seit, von, zu).<br/>
          <em>Ich gebe dem Mann das Buch. (I give the book to the man.)</em>
        </p>
        <p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
          <strong>Genitive (Gen):</strong> Shows possession or relationship (equivalent to 's or "of" in English). Also used after specific prepositions (während, wegen, trotz).<br/>
          <em>Das Buch des Mannes. (The man's book.)</em>
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Definite Articles (the)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Case</th>
              <th style={{ padding: '0.5rem', color: 'var(--primary)' }}>Masc (der)</th>
              <th style={{ padding: '0.5rem', color: 'var(--danger)' }}>Fem (die)</th>
              <th style={{ padding: '0.5rem', color: 'var(--success)' }}>Neut (das)</th>
              <th style={{ padding: '0.5rem', color: 'var(--warning)' }}>Plural (die)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Nominative</td>
              <td style={{ padding: '0.5rem' }}>der</td>
              <td style={{ padding: '0.5rem' }}>die</td>
              <td style={{ padding: '0.5rem' }}>das</td>
              <td style={{ padding: '0.5rem' }}>die</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Accusative</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>den</td>
              <td style={{ padding: '0.5rem' }}>die</td>
              <td style={{ padding: '0.5rem' }}>das</td>
              <td style={{ padding: '0.5rem' }}>die</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Dative</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>dem</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--danger)' }}>der</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--success)' }}>dem</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--warning)' }}>den (+n)</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Genitive</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>des (+s)</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--danger)' }}>der</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--success)' }}>des (+s)</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--warning)' }}>der</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Indefinite Articles (a/an) & Negation</h3>
        <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem' }}>Plural uses "keine" (no/none) as there is no plural for "a/an".</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Case</th>
              <th style={{ padding: '0.5rem', color: 'var(--primary)' }}>Masc (ein)</th>
              <th style={{ padding: '0.5rem', color: 'var(--danger)' }}>Fem (eine)</th>
              <th style={{ padding: '0.5rem', color: 'var(--success)' }}>Neut (ein)</th>
              <th style={{ padding: '0.5rem', color: 'var(--warning)' }}>Plural (keine)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Nominative</td>
              <td style={{ padding: '0.5rem' }}>ein</td>
              <td style={{ padding: '0.5rem' }}>eine</td>
              <td style={{ padding: '0.5rem' }}>ein</td>
              <td style={{ padding: '0.5rem' }}>keine</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Accusative</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>einen</td>
              <td style={{ padding: '0.5rem' }}>eine</td>
              <td style={{ padding: '0.5rem' }}>ein</td>
              <td style={{ padding: '0.5rem' }}>keine</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Dative</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>einem</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--danger)' }}>einer</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--success)' }}>einem</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--warning)' }}>keinen (+n)</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Genitive</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>eines (+s)</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--danger)' }}>einer</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--success)' }}>eines (+s)</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--warning)' }}>keiner</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Two-Way Prepositions (Wechselpräpositionen)</h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          These 9 prepositions take either the <strong>Accusative</strong> or the <strong>Dative</strong> case depending on the context:
          <br/><br/>
          <strong style={{ fontSize: '1.1rem' }}>in, an, auf, neben, hinter, über, unter, vor, zwischen</strong>
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid var(--danger)', borderRadius: '10px' }}>
            <h4 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Accusative (Motion / Destination)</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Used when there is movement towards a destination. Answers the question <strong>Wohin?</strong> (Where to?)</p>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Ich gehe in <strong>den</strong> Park.<br/>(I am going into the park.)</p>
          </div>
          
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--success)', borderRadius: '10px' }}>
            <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Dative (Location / Position)</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Used when describing a static location or position. Answers the question <strong>Wo?</strong> (Where?)</p>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Ich bin in <strong>dem</strong> Park.<br/>(I am in the park.)</p>
          </div>
        </div>
      </div>

    </div>
  );
}
