import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/practice', label: 'Articles' },
  { to: '/practice/adjectives', label: 'Adjective Endings' },
  { to: '/practice/gender', label: 'Gender Drill' }
];

export default function PracticeTabs() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      {tabs.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end
          style={({ isActive }) => ({
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            textDecoration: 'none',
            fontWeight: isActive ? '600' : '400',
            background: isActive ? 'var(--primary)' : 'var(--card-bg)',
            color: isActive ? '#fff' : 'var(--text-color)',
            border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`
          })}
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
