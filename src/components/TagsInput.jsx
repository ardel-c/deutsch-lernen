import { useState } from 'react';
import { useWords } from '../context/WordContext';

export default function TagsInput({ tags, setTags }) {
  const [input, setInput] = useState('');
  const { words, phrases } = useWords();

  const allExistingTags = Array.from(new Set([
    ...(words || []).flatMap(w => w.tags || []),
    ...(phrases || []).flatMap(p => p.tags || [])
  ])).sort();

  const availableTags = allExistingTags.filter(t => !tags.includes(t));

  const addTag = (newTag) => {
    const cleanTag = newTag.trim().toLowerCase();
    if (cleanTag && !tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
    }
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Tags (Optional - press Enter or comma to add)</label>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        padding: tags.length > 0 ? '0.5rem' : '0',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        background: 'var(--bg-color)',
        minHeight: '42px',
        alignItems: 'center'
      }}>
        {tags.map(tag => (
          <span key={tag} style={{
            background: 'var(--primary)',
            color: '#fff',
            padding: '0.2rem 0.6rem',
            borderRadius: '16px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              style={{
                background: 'transparent',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                lineHeight: 1
              }}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={tags.length === 0 ? "e.g. food, chapter 1..." : ""}
          style={{
            border: 'none',
            background: 'transparent',
            color: 'var(--text-color)',
            flex: 1,
            minWidth: '120px',
            outline: 'none',
            padding: tags.length === 0 ? '0.5rem' : '0.2rem'
          }}
        />
      </div>
      {availableTags.length > 0 && (
        <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Suggestions:</span>
          {availableTags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag(tag)}
              style={{
                background: 'var(--card-bg)',
                border: '1px dashed var(--primary)',
                color: 'var(--text-color)',
                padding: '0.2rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              + {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
