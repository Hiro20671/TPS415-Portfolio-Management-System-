import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';

const DashboardCard = ({ title, count = 0, icon: Icon, color = 'var(--accent-gold)', subtitle }) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, borderColor: color }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'var(--transition)',
      }}
    >
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: 'var(--radius-md)',
          background: `rgba(${color === 'var(--accent-gold)' ? '245, 158, 11' : '6, 182, 212'}, 0.12)`,
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          flexShrink: 0,
        }}
      >
        <Icon />
      </div>

      <div style={{ flex: 1 }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </span>
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            margin: '0.2rem 0',
          }}
        >
          {count}
        </div>
        {subtitle && (
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            {subtitle}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardCard;
