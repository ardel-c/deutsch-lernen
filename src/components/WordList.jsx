import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { deleteItem } from '../utils/firestore';
import { useWords } from '../context/WordContext';
import { FiTrash2, FiAlertCircle, FiEdit2, FiVolume2, FiX } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

export default function WordList() {
  const { currentUser } = useAuth();
  const { words, phrases, loading } = useWords();
  const navigate = useNavigate();
  
  const getArticleColor = (article) => {
    if (article === 'der') return 'var(--primary)';
    if (article === 'die') return 'var(--danger)';
    if (article === 'das') return 'var(--success)';
    return 'inherit';
  };

  const getReviewStatus = (item) => {
    if (item.needsReview) return { text: 'Missing Info', color: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.1)' };
    if (!item.nextReviewDate) return { text: 'Review Now', color: 'var(--warning)', bg: 'rgba(245, 158, 11, 0.1)' };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reviewDate = new Date(item.nextReviewDate);
    reviewDate.setHours(0, 0, 0, 0);
    
    const diffTime = reviewDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return { text: 'Review Now', color: 'var(--warning)', bg: 'rgba(245, 158, 11, 0.1)' };
    if (diffDays === 1) return { text: 'Due tomorrow', color: 'var(--text-color)', bg: 'var(--border)' };
    return { text: `Due in ${diffDays} days`, color: 'var(--text-color)', bg: 'var(--border)' };
  };
  
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState(location.state?.tab || 'words'); // 'words' | 'phrases'
  const [selectedTags, setSelectedTags] = useState([]);
  const [showMissingInfoOnly, setShowMissingInfoOnly] = useState(location.state?.fromMissingInfo || false);
  
  const allTags = Array.from(new Set([
    ...words.flatMap(w => w.tags || []),
    ...phrases.flatMap(p => p.tags || [])
  ])).sort();

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const speakGerman = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    window.speechSynthesis.speak(utterance);
  };
  
  useEffect(() => {
    if (location.state?.tab) {
      setTab(location.state.tab);
    }
    if (location.state?.fromMissingInfo !== undefined) {
      setShowMissingInfoOnly(location.state.fromMissingInfo);
    }
    
    if (location.state?.editedId && !loading) {
      setTimeout(() => {
        const el = document.getElementById(`item-${location.state.editedId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'center' });
          el.style.transition = 'background-color 1.5s ease';
          el.style.backgroundColor = 'rgba(79, 70, 229, 0.2)';
          setTimeout(() => { el.style.backgroundColor = ''; }, 2000);
        }
      }, 150);
    }
  }, [location.state?.tab, location.state?.fromMissingInfo, location.state?.editedId, loading]);
  const [collapsedSections, setCollapsedSections] = useState({
    Nouns: false,
    Verbs: false,
    Adjectives: false,
    Adverbs: false,
    Prepositions: false,
    'Other Words': false
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleDelete = async (collectionName, id) => {
    if (confirm('Are you sure you want to delete this?')) {
      await deleteItem(collectionName, id);
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pendingWords = words.filter(w => {
    if (w.needsReview) return false;
    if (!w.nextReviewDate) return true; // Newly added words without SM-2 data
    const reviewDate = new Date(w.nextReviewDate);
    reviewDate.setHours(0, 0, 0, 0);
    return reviewDate <= today;
  }).length;

  const pendingPhrases = phrases.filter(p => {
    if (p.needsReview) return false;
    if (!p.nextReviewDate) return true;
    const reviewDate = new Date(p.nextReviewDate);
    reviewDate.setHours(0, 0, 0, 0);
    return reviewDate <= today;
  }).length;

  const totalPending = pendingWords + pendingPhrases;

  const filteredWords = words.filter(w => {
    const matchesSearch = w.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          w.english.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => (w.tags || []).includes(tag));
    const matchesMissingInfo = showMissingInfoOnly ? w.needsReview : true;
    return matchesSearch && matchesTags && matchesMissingInfo;
  });

  const filteredPhrases = phrases.filter(p => {
    const matchesSearch = p.phrase.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.english.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => (p.tags || []).includes(tag));
    const matchesMissingInfo = showMissingInfoOnly ? p.needsReview : true;
    return matchesSearch && matchesTags && matchesMissingInfo;
  });

  const hasActiveFilters = searchQuery !== '' || selectedTags.length > 0 || showMissingInfoOnly;
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setShowMissingInfoOnly(false);
  };

  const nouns = filteredWords.filter(w => w.type === 'noun');
  const verbs = filteredWords.filter(w => w.type === 'verb');
  const adjectives = filteredWords.filter(w => w.type === 'adjective');
  const adverbs = filteredWords.filter(w => w.type === 'adverb');
  const prepositions = filteredWords.filter(w => w.type === 'preposition');
  const others = filteredWords.filter(w => !['noun', 'verb', 'adjective', 'adverb', 'preposition'].includes(w.type));

  const renderWordList = (title, items) => {
    if (items.length === 0 && searchQuery) return null; // Hide empty sections when searching
    
    const isCollapsed = collapsedSections[title];
    
    return (
      <div style={{ marginBottom: '2rem' }}>
        <h3 
          onClick={() => toggleSection(title)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', userSelect: 'none', width: 'fit-content' }}
        >
          {title} ({items.length})
          <span style={{ marginLeft: '0.5rem', fontSize: '0.8em', opacity: 0.5, transition: 'transform 0.2s', transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </h3>
        
        <div className={`collapse-content ${!isCollapsed ? 'expanded' : ''}`}>
          <div className="collapse-inner">
            {items.length === 0 ? (
              <p style={{ opacity: 0.7, paddingTop: '1rem' }}>No {title.toLowerCase()} added yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem' }}>
                {items.map(w => (
                  <div key={w.id} id={`item-${w.id}`} className="card word-card-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <strong style={{ color: w.article ? getArticleColor(w.article) : 'inherit', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          {w.article && <span>{w.article} </span>}
                          {w.word}
                          <button 
                            onClick={() => speakGerman(w.article ? `${w.article} ${w.word}` : w.word)} 
                            style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0.1rem', display: 'flex', alignItems: 'center' }}
                            title="Listen"
                          >
                            <FiVolume2 size={16} />
                          </button>
                        </strong> 
                        <span style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>({w.type})</span>
                        {w.needsReview && (
                          <span title="Missing article or conjugation" style={{ color: 'var(--warning)', display: 'flex', alignItems: 'center' }}>
                            <FiAlertCircle />
                          </span>
                        )}
                      </div>
                      <div style={{ color: 'var(--text-color)', opacity: 0.8 }}>{w.english}</div>
                      {w.plural && <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>Plural: {w.plural}</div>}
                      {w.conjugation && typeof w.conjugation === 'object' && (
                        <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                          Conj: {['ich', 'du', 'erSieEs', 'wir', 'ihr', 'sieSie'].map(k => w.conjugation[k] ? `${k === 'erSieEs' ? 'er/sie/es' : k === 'sieSie' ? 'sie/Sie' : k} ${w.conjugation[k]}` : '').filter(Boolean).join(', ')}
                        </div>
                      )}
                      {w.conjugation && typeof w.conjugation === 'string' && (
                        <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>Conj: {w.conjugation}</div>
                      )}
                      {w.type === 'preposition' && w.caseRequired && (
                        <div style={{ fontSize: '0.85rem', opacity: 0.8, color: 'var(--primary)', fontWeight: '600' }}>
                          Takes {w.caseRequired}
                        </div>
                      )}
                      {w.notes && (
                        <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', padding: '0.5rem', background: 'var(--bg-color)', borderRadius: '6px', borderLeft: '2px solid var(--primary)' }}>
                          {w.notes}
                        </div>
                      )}
                      {w.relatedWords && w.relatedWords.length > 0 && (
                        <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>
                          <span style={{ fontWeight: '600', color: 'var(--primary)' }}>Related: </span>
                          {w.relatedWords.map((id, idx) => {
                            const relWord = words.find(x => x.id === id);
                            if (!relWord) return null;
                            return (
                              <span key={id}>
                                {idx > 0 && ', '}
                                {relWord.article ? `${relWord.article} ` : ''}{relWord.word} ({relWord.type})
                              </span>
                            );
                          })}
                        </div>
                      )}
                      {w.tags && w.tags.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.5rem' }}>
                          {w.tags.map(tag => (
                            <span key={tag} style={{ background: 'var(--border)', padding: '0.1rem 0.4rem', borderRadius: '12px', fontSize: '0.75rem', opacity: 0.8 }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div style={{ marginTop: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '12px', background: getReviewStatus(w).bg, color: getReviewStatus(w).color, fontWeight: '600' }}>
                          {getReviewStatus(w).text}
                        </span>
                      </div>
                    </div>
                    <div className="word-card-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => navigate(`/edit/words/${w.id}`, { state: { fromMissingInfo: showMissingInfoOnly } })} style={{ background: 'transparent', color: 'var(--primary)', padding: '0.5rem' }} aria-label="Edit word">
                        <FiEdit2 size={20} />
                      </button>
                      <button onClick={() => handleDelete('words', w.id)} style={{ background: 'transparent', color: 'var(--danger)', padding: '0.5rem' }} aria-label="Delete word">
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Your Vocabulary</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div onClick={() => setTab('words')} className="card" style={{ padding: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', border: tab === 'words' ? '2px solid var(--primary)' : '1px solid var(--border)' }} onMouseOver={e => tab !== 'words' && (e.currentTarget.style.transform = 'translateY(-2px)')} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{words.length}</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8, fontWeight: tab === 'words' ? 'bold' : 'normal' }}>Words</div>
        </div>
        <div onClick={() => setTab('phrases')} className="card" style={{ padding: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', border: tab === 'phrases' ? '2px solid var(--success)' : '1px solid var(--border)' }} onMouseOver={e => tab !== 'phrases' && (e.currentTarget.style.transform = 'translateY(-2px)')} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>{phrases.length}</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8, fontWeight: tab === 'phrases' ? 'bold' : 'normal' }}>Phrases</div>
        </div>
        <div onClick={() => navigate('/review')} className="card" style={{ padding: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: totalPending > 0 ? '2px solid var(--warning)' : '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px)')} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: totalPending > 0 ? 'var(--warning)' : 'var(--text-color)' }}>{totalPending}</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Pending Reviews</div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        {allTags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  background: selectedTags.includes(tag) ? 'var(--primary)' : 'var(--card-bg)',
                  color: selectedTags.includes(tag) ? '#fff' : 'var(--text-color)',
                  border: `1px solid ${selectedTags.includes(tag) ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: '16px',
                  padding: '0.3rem 0.8rem',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder={`Search ${tab === 'words' ? 'words' : 'phrases'}...`} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text-color)' }}
          />
          <button 
             onClick={() => setShowMissingInfoOnly(!showMissingInfoOnly)}
             style={{ 
               padding: '0 1rem', 
               borderRadius: '8px', 
               border: `1px solid ${showMissingInfoOnly ? 'var(--warning)' : 'var(--border)'}`, 
               background: showMissingInfoOnly ? 'var(--warning)' : 'var(--card-bg)', 
               color: showMissingInfoOnly ? '#fff' : 'var(--text-color)',
               cursor: 'pointer',
               display: 'flex',
               alignItems: 'center',
               gap: '0.5rem',
               whiteSpace: 'nowrap'
             }}
             title="Filter items that have missing articles or conjugations"
          >
            <FiAlertCircle />
            {showMissingInfoOnly ? 'Missing Info' : 'Check Missing Info'}
          </button>
          {hasActiveFilters && (
            <button 
               onClick={clearFilters}
               style={{ 
                 padding: '0 1rem', 
                 borderRadius: '8px', 
                 border: '1px solid var(--danger)', 
                 background: 'transparent', 
                 color: 'var(--danger)',
                 cursor: 'pointer',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '0.5rem',
                 whiteSpace: 'nowrap'
               }}
               title="Clear all active filters"
            >
              <FiX />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {tab === 'words' ? (
        <>
          {renderWordList('Nouns', nouns)}
          {renderWordList('Verbs', verbs)}
          {renderWordList('Adjectives', adjectives)}
          {renderWordList('Adverbs', adverbs)}
          {renderWordList('Prepositions', prepositions)}
          {renderWordList('Other Words', others)}
        </>
      ) : (
        <div>
          {filteredPhrases.length === 0 ? (
            <p style={{ opacity: 0.7 }}>No phrases found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredPhrases.map(p => (
                <div key={p.id} id={`item-${p.id}`} className="card word-card-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {p.phrase}
                      <button 
                        onClick={() => speakGerman(p.phrase)} 
                        style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0.1rem', display: 'flex', alignItems: 'center' }}
                        title="Listen"
                      >
                        <FiVolume2 size={16} />
                      </button>
                    </strong>
                    <div style={{ color: 'var(--text-color)', opacity: 0.8 }}>{p.english}</div>
                    {p.notes && (
                      <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', padding: '0.5rem', background: 'var(--bg-color)', borderRadius: '6px', borderLeft: '2px solid var(--primary)' }}>
                        {p.notes}
                      </div>
                    )}
                    {p.tags && p.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.5rem' }}>
                        {p.tags.map(tag => (
                          <span key={tag} style={{ background: 'var(--border)', padding: '0.1rem 0.4rem', borderRadius: '12px', fontSize: '0.75rem', opacity: 0.8 }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '12px', background: getReviewStatus(p).bg, color: getReviewStatus(p).color, fontWeight: '600' }}>
                        {getReviewStatus(p).text}
                      </span>
                    </div>
                  </div>
                  <div className="word-card-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => navigate(`/edit/phrases/${p.id}`, { state: { fromMissingInfo: showMissingInfoOnly } })} style={{ background: 'transparent', color: 'var(--primary)', padding: '0.5rem' }} aria-label="Edit phrase">
                      <FiEdit2 size={20} />
                    </button>
                    <button onClick={() => handleDelete('phrases', p.id)} style={{ background: 'transparent', color: 'var(--danger)', padding: '0.5rem' }} aria-label="Delete phrase">
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
