import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserLock, FaKey, FaUser, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      addToast('Please enter both username and password.', 'error');
      return;
    }

    setLoading(true);
    try {
      await login(username, password);
      addToast('Successfully authenticated! Welcome back, Jeremy.', 'success');
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      addToast(
        err.response?.data?.detail || 'Invalid username or password. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('AdminPass123!');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        background: '#06080d',
      }}
    >
      {/* Blurred, Low Opacity Cinematic Studio Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/assets/images/cinematic-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.22,
          filter: 'blur(10px)',
          transform: 'scale(1.08)',
          zIndex: 0,
        }}
      />

      {/* Dark Vignette & Deep Blue Lighting Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(6, 8, 13, 0.75) 0%, rgba(6, 8, 13, 0.94) 80%, #06080d 100%)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '20%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Return to Portfolio Link */}
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          fontWeight: 600,
          textDecoration: 'none',
          zIndex: 10,
        }}
      >
        <FaArrowLeft />
        <span>Back to Portfolio</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-active)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg), 0 0 30px rgba(56, 189, 248, 0.15)',
          padding: '2.5rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.18) 0%, rgba(37, 99, 235, 0.15) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: 'var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              margin: '0 auto 1rem',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.25)',
            }}
          >
            <FaUserLock />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.35rem 0' }}>
            Portfolio Portal
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Sign in to manage Jeremy's database entities
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-light)',
                marginBottom: '0.4rem',
              }}
            >
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              >
                <FaUser />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.75rem',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-light)',
                marginBottom: '0.4rem',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              >
                <FaKey />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.75rem',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </Button>

          {/* Quick Demo Credentials Helper */}
          <div
            style={{
              marginTop: '1.25rem',
              padding: '1rem',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                color: 'var(--accent-blue)',
                fontWeight: 700,
                marginBottom: '0.4rem',
              }}
            >
              <FaShieldAlt />
              <span>School Demo Credentials</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>
              Username: <strong style={{ color: 'var(--text-primary)' }}>admin</strong> | Password: <strong style={{ color: 'var(--text-primary)' }}>AdminPass123!</strong>
            </p>
            <button
              type="button"
              onClick={handleFillDemo}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-blue)',
                fontSize: '0.785rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Auto-fill Demo Credentials
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
