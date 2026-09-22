import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  hasArrow = false,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const getStyles = () => {
    const base = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.6rem',
      fontWeight: 600,
      borderRadius: 'var(--radius-full)',
      border: '1px solid transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      letterSpacing: '0.02em',
      textDecoration: 'none',
    };

    const sizeStyles = {
      sm: { padding: '0.45rem 1.1rem', fontSize: '0.85rem' },
      md: { padding: '0.75rem 1.6rem', fontSize: '0.95rem' },
      lg: { padding: '0.95rem 2.2rem', fontSize: '1.05rem' },
    }[size];

    const variantStyles = {
      primary: {
        background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 20px rgba(56, 189, 248, 0.35)',
      },
      secondary: {
        background: 'var(--bg-surface)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-subtle)',
      },
      outline: {
        background: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-subtle)',
      },
      cyan: {
        background: 'linear-gradient(135deg, #00d2ff 0%, #0284c7 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 18px var(--accent-cyan-glow)',
      },
      danger: {
        background: 'rgba(239, 68, 68, 0.15)',
        color: '#ef4444',
        border: '1px solid rgba(239, 68, 68, 0.3)',
      },
    }[variant];

    return { ...base, ...sizeStyles, ...variantStyles };
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={getStyles()}
      whileHover={
        disabled
          ? {}
          : {
              y: -2,
              scale: 1.02,
              filter: 'brightness(1.1)',
            }
      }
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`btn-custom ${className}`}
      {...props}
    >
      {Icon && <Icon style={{ fontSize: '1.05em' }} />}
      <span>{children}</span>
      {hasArrow && (
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <FaArrowRight />
        </motion.span>
      )}
    </motion.button>
  );
};

export default Button;
