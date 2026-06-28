import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { FiHome, FiPlusCircle, FiBookOpen, FiBookmark, FiLogOut } from 'react-icons/fi';

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
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {currentUser && (
          <>
            <Link to="/" title="My Vocab" style={{ color: 'var(--text-color)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
              <FiHome size={24} />
            </Link>
            <Link to="/add" title="Add Word/Phrase" style={{ color: 'var(--text-color)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
              <FiPlusCircle size={24} />
            </Link>
            <Link to="/review" title="Review" style={{ color: 'var(--text-color)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
              <FiBookOpen size={24} />
            </Link>
            <Link to="/grammar" title="Grammar Reference" style={{ color: 'var(--text-color)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
              <FiBookmark size={24} />
            </Link>
            <button onClick={handleLogout} title="Logout" style={{ background: 'transparent', color: 'var(--danger)', border: 'none', padding: 0, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <FiLogOut size={24} />
            </button>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
