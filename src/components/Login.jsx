import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError('');
      await login();
      navigate('/');
    } catch (err) {
      setError(`Failed to sign in with Google: ${err.message}`);
      console.error('Login error:', err);
    }
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '10vh' }}>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>Deutsch Lernen</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--text-color)', opacity: 0.8 }}>
          Sign in to start learning and tracking your vocabulary!
        </p>
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}
        <button onClick={handleLogin} style={{ width: '100%', padding: '0.75rem', fontSize: '1.1rem' }}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
