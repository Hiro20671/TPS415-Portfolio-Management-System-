import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: '520px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(245, 158, 11, 0.12)',
            color: 'var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
          }}
        >
          <FaExclamationTriangle />
        </div>

        <h1
          style={{
            fontSize: '5rem',
            fontWeight: 900,
            lineHeight: 1,
            background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-cyan))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}
        >
          404
        </h1>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
          Page Not Found
        </h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          The scene or page you are trying to view does not exist in this production or has been relocated.
        </p>

        <Link to="/" style={{ textDecoration: 'none', marginTop: '1rem' }}>
          <Button variant="primary" size="lg" icon={FaHome}>
            Return to Homepage
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
