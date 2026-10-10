import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/add', label: 'Add' },
  { to: '/review', label: 'Review' },
  { to: '/practice', label: 'Practice' },
  { to: '/grammar', label: 'Grammar' },
  { to: '/stats', label: 'Stats' },
  { to: '/data', label: 'Data' }
];

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="glass-nav">
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: 'bold' }}>
        Deutsch Lernen
      </Link>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {currentUser && (
          <>
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--primary)' : 'var(--text-color)',
                  fontWeight: isActive ? '600' : '400',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                })}
              >
                {link.label}
              </NavLink>
            ))}
            <button onClick={handleLogout} style={{ background: 'transparent', color: 'var(--danger)', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}>
              Logout
            </button>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
