import React from 'react';

export default function GrammarReference() {
  return (
    <div className="container grammar-layout" style={{ paddingBottom: '3rem' }}>
      
      <nav className="grammar-nav">
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '1.1rem' }}>Contents</h3>
        <ul>
          <li><a href="#cases">The Four German Cases</a></li>
          <li><a href="#definite-articles">Definite Articles (the)</a></li>
          <li><a href="#indefinite-articles">Indefinite Articles (a/an)</a></li>
          <li><a href="#pronouns">Pronoun Cases</a></li>
          <li><a href="#prepositions">Two-Way Prepositions</a></li>
          <li><a href="#adjectives">Adjective Endings</a></li>
          <li><a href="#perfekt">The Perfect Tense (Perfekt)</a></li>
          <li><a href="#praeteritum">Simple Past (Präteritum)</a></li>
          <li><a href="#conjunctions">Conjunctions & Word Order</a></li>
          <li><a href="#reflexive">Reflexive Verbs</a></li>
          <li><a href="#comparatives">Comparatives & Superlatives</a></li>
        </ul>
      </nav>

      <div className="grammar-content">
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'left' }}>Grammar Reference</h2>

        <div id="cases" className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>The Four German Cases</h3>
        <p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
          <strong>Nominative (Nom):</strong> The subject of the sentence. The person or thing doing the action.<br />
          <em>Der Mann liest. (The man reads.)</em>
        </p>
        <p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
          <strong>Accusative (Acc):</strong> The direct object. The person or thing directly receiving the action. Also used after specific prepositions (durch, für, gegen, ohne, um).<br />
          <em>Ich sehe den Mann. (I see the man.)</em>
        </p>
        <p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
          <strong>Dative (Dat):</strong> The indirect object. The person or thing to/for whom the action is done. Also used after specific prepositions (aus, bei, mit, nach, seit, von, zu).<br />
          <em>Ich gebe dem Mann das Buch. (I give the book to the man.)</em>
        </p>
        <p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
          <strong>Genitive (Gen):</strong> Shows possession or relationship (equivalent to 's or "of" in English). Also used after specific prepositions (während, wegen, trotz).<br />
          <em>Das Buch des Mannes. (The man's book.)</em>
        </p>
      </div>

      <div id="definite-articles" className="card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
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

      <div id="indefinite-articles" className="card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
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

      <div id="pronouns" className="card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Pronoun Cases</h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Pronouns change depending on their role in the sentence. Personal pronouns refer to people or things; possessive pronouns show ownership.
        </p>

        <h4 style={{ marginBottom: '0.5rem' }}>Personal Pronouns</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px', marginBottom: '1.5rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Case</th>
              <th style={{ padding: '0.5rem' }}>I</th>
              <th style={{ padding: '0.5rem' }}>you (sing.)</th>
              <th style={{ padding: '0.5rem' }}>he</th>
              <th style={{ padding: '0.5rem' }}>she</th>
              <th style={{ padding: '0.5rem' }}>we</th>
              <th style={{ padding: '0.5rem' }}>you (pl.)</th>
              <th style={{ padding: '0.5rem' }}>they / formal you</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Nominative</td>
              <td style={{ padding: '0.5rem' }}>ich</td>
              <td style={{ padding: '0.5rem' }}>du</td>
              <td style={{ padding: '0.5rem' }}>er</td>
              <td style={{ padding: '0.5rem' }}>sie</td>
              <td style={{ padding: '0.5rem' }}>wir</td>
              <td style={{ padding: '0.5rem' }}>ihr</td>
              <td style={{ padding: '0.5rem' }}>sie / Sie</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Accusative</td>
              <td style={{ padding: '0.5rem' }}>mich</td>
              <td style={{ padding: '0.5rem' }}>dich</td>
              <td style={{ padding: '0.5rem' }}>ihn</td>
              <td style={{ padding: '0.5rem' }}>sie</td>
              <td style={{ padding: '0.5rem' }}>uns</td>
              <td style={{ padding: '0.5rem' }}>euch</td>
              <td style={{ padding: '0.5rem' }}>sie / Sie</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Dative</td>
              <td style={{ padding: '0.5rem' }}>mir</td>
              <td style={{ padding: '0.5rem' }}>dir</td>
              <td style={{ padding: '0.5rem' }}>ihm</td>
              <td style={{ padding: '0.5rem' }}>ihr</td>
              <td style={{ padding: '0.5rem' }}>uns</td>
              <td style={{ padding: '0.5rem' }}>euch</td>
              <td style={{ padding: '0.5rem' }}>ihnen / Ihnen</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Genitive</td>
              <td style={{ padding: '0.5rem' }}>meiner</td>
              <td style={{ padding: '0.5rem' }}>deiner</td>
              <td style={{ padding: '0.5rem' }}>seiner</td>
              <td style={{ padding: '0.5rem' }}>ihrer</td>
              <td style={{ padding: '0.5rem' }}>unser</td>
              <td style={{ padding: '0.5rem' }}>euer</td>
              <td style={{ padding: '0.5rem' }}>ihrer / Ihrer</td>
            </tr>
          </tbody>
        </table>

        <h4 style={{ marginBottom: '0.5rem' }}>Possessive Pronouns: <em>dein</em> (your)</h4>
        <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem' }}>
          Possessives use the same endings as <em>ein</em>. The ending matches the noun that is owned, not the person who owns it. The same pattern applies to <em>mein, sein, ihr, unser, euer</em> and <em>Ihr</em>.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Case</th>
              <th style={{ padding: '0.5rem', color: 'var(--primary)' }}>Masc.</th>
              <th style={{ padding: '0.5rem', color: 'var(--danger)' }}>Fem.</th>
              <th style={{ padding: '0.5rem', color: 'var(--success)' }}>Neut.</th>
              <th style={{ padding: '0.5rem', color: 'var(--warning)' }}>Plural</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Nominative</td>
              <td style={{ padding: '0.5rem' }}>dein</td>
              <td style={{ padding: '0.5rem' }}>deine</td>
              <td style={{ padding: '0.5rem' }}>dein</td>
              <td style={{ padding: '0.5rem' }}>deine</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Accusative</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>deinen</td>
              <td style={{ padding: '0.5rem' }}>deine</td>
              <td style={{ padding: '0.5rem' }}>dein</td>
              <td style={{ padding: '0.5rem' }}>deine</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Dative</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>deinem</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--danger)' }}>deiner</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--success)' }}>deinem</td>
              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--warning)' }}>deinen (+n)</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Genitive</td>
              <td style={{ padding: '0.5rem' }}>deines (+s)</td>
              <td style={{ padding: '0.5rem' }}>deiner</td>
              <td style={{ padding: '0.5rem' }}>deines (+s)</td>
              <td style={{ padding: '0.5rem' }}>deiner</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: '1rem', fontStyle: 'italic', lineHeight: '1.6' }}>
          Ich sehe <strong>deinen</strong> Bruder. (I see your brother.) &nbsp; Ich helfe <strong>deinem</strong> Bruder. (I help your brother.) &nbsp; Ich spreche mit <strong>deiner</strong> Schwester. (I speak with your sister.)
        </p>
      </div>

      <div id="prepositions" className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Two-Way Prepositions (Wechselpräpositionen)</h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          These 9 prepositions take either the <strong>Accusative</strong> or the <strong>Dative</strong> case depending on the context:
          <br /><br />
          <strong style={{ fontSize: '1.1rem' }}>in, an, auf, neben, hinter, über, unter, vor, zwischen</strong>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid var(--danger)', borderRadius: '10px' }}>
            <h4 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Accusative (Motion / Destination)</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Used when there is movement towards a destination. Answers the question <strong>Wohin?</strong> (Where to?)</p>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Ich gehe in <strong>den</strong> Park.<br />(I am going into the park.)</p>
          </div>

          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--success)', borderRadius: '10px' }}>
            <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Dative (Location / Position)</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Used when describing a static location or position. Answers the question <strong>Wo?</strong> (Where?)</p>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Ich bin in <strong>dem</strong> Park.<br />(I am in the park.)</p>
          </div>
        </div>
      </div>
      <div id="adjectives" className="card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Adjective Endings</h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          When an adjective comes <em>before</em> a noun, its ending changes based on the gender, case, and what type of article comes before it.
        </p>

        <h4 style={{ marginBottom: '0.5rem' }}>1. After Definite Articles (der, die, das)</h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.9 }}>The article already shows the hard case ending, so the adjective takes a "soft" ending (<strong>-e</strong> or <strong>-en</strong>).</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px', marginBottom: '1.5rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Case</th>
              <th style={{ padding: '0.5rem' }}>Masc</th>
              <th style={{ padding: '0.5rem' }}>Fem</th>
              <th style={{ padding: '0.5rem' }}>Neut</th>
              <th style={{ padding: '0.5rem' }}>Plural</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Nom</td>
              <td style={{ padding: '0.5rem' }}>der gut<strong style={{ color: 'var(--primary)' }}>e</strong></td>
              <td style={{ padding: '0.5rem' }}>die gut<strong style={{ color: 'var(--primary)' }}>e</strong></td>
              <td style={{ padding: '0.5rem' }}>das gut<strong style={{ color: 'var(--primary)' }}>e</strong></td>
              <td style={{ padding: '0.5rem' }}>die gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Acc</td>
              <td style={{ padding: '0.5rem', background: 'rgba(239,68,68,0.1)' }}>den gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
              <td style={{ padding: '0.5rem' }}>die gut<strong style={{ color: 'var(--primary)' }}>e</strong></td>
              <td style={{ padding: '0.5rem' }}>das gut<strong style={{ color: 'var(--primary)' }}>e</strong></td>
              <td style={{ padding: '0.5rem' }}>die gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Dat</td>
              <td style={{ padding: '0.5rem', background: 'rgba(239,68,68,0.1)' }}>dem gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
              <td style={{ padding: '0.5rem', background: 'rgba(239,68,68,0.1)' }}>der gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
              <td style={{ padding: '0.5rem', background: 'rgba(239,68,68,0.1)' }}>dem gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
              <td style={{ padding: '0.5rem', background: 'rgba(239,68,68,0.1)' }}>den gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
            </tr>
          </tbody>
        </table>

        <h4 style={{ marginBottom: '0.5rem' }}>2. After Indefinite Articles (ein, eine, mein, kein)</h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.9 }}>If the article doesn't show the gender clearly (like <em>ein</em> for masc/neut), the adjective must show it with a hard ending.</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Case</th>
              <th style={{ padding: '0.5rem' }}>Masc</th>
              <th style={{ padding: '0.5rem' }}>Fem</th>
              <th style={{ padding: '0.5rem' }}>Neut</th>
              <th style={{ padding: '0.5rem' }}>Plural (keine)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Nom</td>
              <td style={{ padding: '0.5rem', background: 'rgba(16,185,129,0.1)' }}>ein gut<strong style={{ color: 'var(--success)' }}>er</strong></td>
              <td style={{ padding: '0.5rem' }}>eine gut<strong style={{ color: 'var(--primary)' }}>e</strong></td>
              <td style={{ padding: '0.5rem', background: 'rgba(16,185,129,0.1)' }}>ein gut<strong style={{ color: 'var(--success)' }}>es</strong></td>
              <td style={{ padding: '0.5rem' }}>keine gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Acc</td>
              <td style={{ padding: '0.5rem' }}>einen gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
              <td style={{ padding: '0.5rem' }}>eine gut<strong style={{ color: 'var(--primary)' }}>e</strong></td>
              <td style={{ padding: '0.5rem', background: 'rgba(16,185,129,0.1)' }}>ein gut<strong style={{ color: 'var(--success)' }}>es</strong></td>
              <td style={{ padding: '0.5rem' }}>keine gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Dat</td>
              <td style={{ padding: '0.5rem' }}>einem gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
              <td style={{ padding: '0.5rem' }}>einer gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
              <td style={{ padding: '0.5rem' }}>einem gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
              <td style={{ padding: '0.5rem' }}>keinen gut<strong style={{ color: 'var(--danger)' }}>en</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="perfekt" className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>The Perfect Tense (Perfekt)</h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The conversational past tense. It's formed with an auxiliary verb (<strong>haben</strong> or <strong>sein</strong>) in position 2, and the <strong>Past Participle (Partizip II)</strong> at the very end of the sentence.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--primary)', borderRadius: '10px' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Most Verbs use "haben"</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>If a verb takes an accusative object, or if it doesn't involve motion/change of state, use <em>haben</em>.</p>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Ich <strong>habe</strong> einen Apfel <strong>gegessen</strong>.<br />(I ate an apple.)</p>
          </div>

          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid var(--danger)', borderRadius: '10px' }}>
            <h4 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Motion/State Change use "sein"</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Verbs describing movement from A to B (gehen, fahren, fliegen) or a change of condition (aufwachen, sterben, passieren), plus <em>sein</em> and <em>bleiben</em>.</p>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Wir <strong>sind</strong> nach Berlin <strong>gefahren</strong>.<br />(We drove to Berlin.)</p>
          </div>
        </div>
      </div>
      <div id="praeteritum" className="card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Simple Past (Präteritum)</h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          While the Perfect Tense is used for almost everything in spoken German, the Simple Past is used heavily for <strong>sein</strong>, <strong>haben</strong>, and <strong>modal verbs</strong> even in casual conversation.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Pronoun</th>
              <th style={{ padding: '0.5rem' }}>sein (was/were)</th>
              <th style={{ padding: '0.5rem' }}>haben (had)</th>
              <th style={{ padding: '0.5rem' }}>müssen (had to)</th>
              <th style={{ padding: '0.5rem' }}>können (could)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>ich</td>
              <td style={{ padding: '0.5rem' }}>war</td>
              <td style={{ padding: '0.5rem' }}>hatte</td>
              <td style={{ padding: '0.5rem' }}>musste</td>
              <td style={{ padding: '0.5rem' }}>konnte</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>du</td>
              <td style={{ padding: '0.5rem' }}>warst</td>
              <td style={{ padding: '0.5rem' }}>hattest</td>
              <td style={{ padding: '0.5rem' }}>musstest</td>
              <td style={{ padding: '0.5rem' }}>konntest</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>er/sie/es</td>
              <td style={{ padding: '0.5rem' }}>war</td>
              <td style={{ padding: '0.5rem' }}>hatte</td>
              <td style={{ padding: '0.5rem' }}>musste</td>
              <td style={{ padding: '0.5rem' }}>konnte</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>wir</td>
              <td style={{ padding: '0.5rem' }}>waren</td>
              <td style={{ padding: '0.5rem' }}>hatten</td>
              <td style={{ padding: '0.5rem' }}>mussten</td>
              <td style={{ padding: '0.5rem' }}>konnten</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>ihr</td>
              <td style={{ padding: '0.5rem' }}>wart</td>
              <td style={{ padding: '0.5rem' }}>hattet</td>
              <td style={{ padding: '0.5rem' }}>musstet</td>
              <td style={{ padding: '0.5rem' }}>konntet</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>sie/Sie</td>
              <td style={{ padding: '0.5rem' }}>waren</td>
              <td style={{ padding: '0.5rem' }}>hatten</td>
              <td style={{ padding: '0.5rem' }}>mussten</td>
              <td style={{ padding: '0.5rem' }}>konnten</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="conjunctions" className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Conjunctions & Word Order</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>Coordinating Conjunctions (ADUSO)</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>These take <strong>Position 0</strong>. The word order in the clause that follows remains completely normal (Subject in Pos 1, Verb in Pos 2).</p>
            <ul style={{ paddingLeft: '1.5rem', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
              <li><strong>A</strong>ber (but)</li>
              <li><strong>D</strong>enn (because)</li>
              <li><strong>U</strong>nd (and)</li>
              <li><strong>S</strong>ondern (but rather)</li>
              <li><strong>O</strong>der (or)</li>
            </ul>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Ich bin müde, <strong>aber</strong> ich <strong>lerne</strong> Deutsch.<br />(I am tired, but I am learning German.)</p>
          </div>

          <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid var(--warning)', borderRadius: '10px' }}>
            <h4 style={{ color: 'var(--warning)', marginBottom: '0.5rem' }}>Subordinating Conjunctions</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>These words create a dependent clause and <strong>kick the conjugated verb to the very end</strong>.</p>
            <ul style={{ paddingLeft: '1.5rem', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.2rem' }}>
              <li><strong>weil</strong> (because)</li>
              <li><strong>dass</strong> (that)</li>
              <li><strong>wenn</strong> (if/when)</li>
              <li><strong>ob</strong> (whether/if)</li>
              <li><strong>obwohl</strong> (although)</li>
              <li><strong>als</strong> (when - past)</li>
            </ul>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Ich lerne Deutsch, <strong>weil</strong> ich in Berlin <strong>lebe</strong>.<br />(I am learning German because I live in Berlin.)</p>
          </div>
        </div>
      </div>
      <div id="reflexive" className="card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Reflexive Verbs</h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Some verbs require a reflexive pronoun (myself, yourself). In German, this pronoun can be in the <strong>Accusative</strong> (most common) or <strong>Dative</strong> (if there is already a direct object in the sentence).
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Pronoun</th>
              <th style={{ padding: '0.5rem' }}>Accusative Reflexive</th>
              <th style={{ padding: '0.5rem' }}>Dative Reflexive</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>ich</td>
              <td style={{ padding: '0.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>mich</td>
              <td style={{ padding: '0.5rem', color: 'var(--danger)', fontWeight: 'bold' }}>mir</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>du</td>
              <td style={{ padding: '0.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>dich</td>
              <td style={{ padding: '0.5rem', color: 'var(--danger)', fontWeight: 'bold' }}>dir</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>er/sie/es</td>
              <td style={{ padding: '0.5rem' }}>sich</td>
              <td style={{ padding: '0.5rem' }}>sich</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>wir</td>
              <td style={{ padding: '0.5rem' }}>uns</td>
              <td style={{ padding: '0.5rem' }}>uns</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>ihr</td>
              <td style={{ padding: '0.5rem' }}>euch</td>
              <td style={{ padding: '0.5rem' }}>euch</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>sie/Sie</td>
              <td style={{ padding: '0.5rem' }}>sich</td>
              <td style={{ padding: '0.5rem' }}>sich</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: '1rem', background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          <strong>Accusative Example:</strong> Ich wasche <strong>mich</strong>. <em>(I wash myself.)</em><br />
          <strong>Dative Example:</strong> Ich wasche <strong>mir</strong> die Hände. <em>(I wash my hands. - "die Hände" is the direct object, so the reflexive pronoun becomes dative)</em>
        </div>
      </div>
      <div id="comparatives" className="card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Comparatives & Superlatives</h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Used to compare things. The comparative adds <strong>-er</strong> and the superlative uses <strong>am ...-sten</strong>. Many short adjectives with a, o, or u get an umlaut (ä, ö, ü).
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Basic (Base)</th>
              <th style={{ padding: '0.5rem' }}>Comparative (More)</th>
              <th style={{ padding: '0.5rem' }}>Superlative (Most)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>schnell (fast)</td>
              <td style={{ padding: '0.5rem' }}>schneller</td>
              <td style={{ padding: '0.5rem' }}>am schnellsten</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>kalt (cold - <span style={{ opacity: 0.7 }}>umlaut</span>)</td>
              <td style={{ padding: '0.5rem' }}>kälter</td>
              <td style={{ padding: '0.5rem' }}>am kältesten</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>gut (good - <span style={{ opacity: 0.7 }}>irregular</span>)</td>
              <td style={{ padding: '0.5rem', color: 'var(--primary)' }}>besser</td>
              <td style={{ padding: '0.5rem', color: 'var(--primary)' }}>am besten</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>viel (much - <span style={{ opacity: 0.7 }}>irregular</span>)</td>
              <td style={{ padding: '0.5rem', color: 'var(--primary)' }}>mehr</td>
              <td style={{ padding: '0.5rem', color: 'var(--primary)' }}>am meisten</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>gern (like to - <span style={{ opacity: 0.7 }}>irregular</span>)</td>
              <td style={{ padding: '0.5rem', color: 'var(--primary)' }}>lieber</td>
              <td style={{ padding: '0.5rem', color: 'var(--primary)' }}>am liebsten</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
