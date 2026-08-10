import React from 'react';

export default function FormattedText({ text }) {
  if (!text) return null;

  // Split by newlines first
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, i) => {
        // Parse **bold** and *italic*
        // We can use a simple regex to tokenize the string
        // Tokenizer regex: /(\*\*.*?\*\*|\*.*?\*)/g
        if (!line) return <br key={i} />;

        const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        
        return (
          <React.Fragment key={i}>
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j}>{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith('*') && part.endsWith('*')) {
                return <em key={j}>{part.slice(1, -1)}</em>;
              }
              return part;
            })}
            {i < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </>
  );
}
