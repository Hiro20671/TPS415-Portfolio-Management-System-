import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        color: isDark ? 'var(--accent-gold)' : '#f59e0b',
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-sm)',
        transition: 'var(--transition)',
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={className}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <FaSun style={{ fontSize: '1rem' }} /> : <FaMoon style={{ fontSize: '1rem' }} />}
    </motion.button>
  );
};

export default ThemeToggle;
