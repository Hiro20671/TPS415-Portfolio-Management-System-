import React from 'react';
import { FaBars, FaUserCircle, FaDatabase } from 'react-icons/fa';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ title = 'Dashboard Overview', onToggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header
      style={{
        height: '70px',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 90,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '1.25rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '0.25rem',
          }}
          className="admin-menu-toggle"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>

        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
          {title}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Cloud DB Status Indicator in Emerald / Cyan */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: 'var(--accent-blue)',
            fontSize: '0.78rem',
            fontWeight: 600,
          }}
        >
          <FaDatabase />
          <span>Aiven Connected (SSL)</span>
        </div>

        <ThemeToggle />

        {/* User profile badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(56, 189, 248, 0.15)',
              color: 'var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              border: '1px solid rgba(56, 189, 248, 0.3)',
            }}
          >
            <FaUserCircle />
          </div>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {user?.username || 'admin'}
          </span>
        </div>
      </div>

      <style>{`
        @media (min-width: 901px) {
          .admin-menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default AdminHeader;
