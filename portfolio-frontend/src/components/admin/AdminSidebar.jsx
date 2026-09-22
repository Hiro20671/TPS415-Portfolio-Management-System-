import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaConciergeBell,
  FaFolderOpen,
  FaCertificate,
  FaTrophy,
  FaAddressBook,
  FaEnvelopeOpenText,
  FaSignOutAlt,
  FaExternalLinkAlt,
  FaTimes,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt, exact: true },
  { name: 'Personal Information', path: '/admin/personal-info', icon: FaUser },
  { name: 'Education', path: '/admin/education', icon: FaGraduationCap },
  { name: 'Experience', path: '/admin/experience', icon: FaBriefcase },
  { name: 'Skills', path: '/admin/skills', icon: FaTools },
  { name: 'Services', path: '/admin/services', icon: FaConciergeBell },
  { name: 'Projects', path: '/admin/projects', icon: FaFolderOpen },
  { name: 'Certifications', path: '/admin/certifications', icon: FaCertificate },
  { name: 'Achievements', path: '/admin/achievements', icon: FaTrophy },
  { name: 'Contact Information', path: '/admin/contact-info', icon: FaAddressBook },
  { name: 'Client Inquiries', path: '/admin/messages', icon: FaEnvelopeOpenText },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    addToast('Signed out successfully.', 'info');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 998,
          }}
          className="sidebar-backdrop"
        />
      )}

      <aside
        style={{
          width: '270px',
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 999,
          transition: 'transform 0.3s ease',
        }}
        className={`admin-sidebar ${isOpen ? 'open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.3)',
              }}
            >
              JBV
            </div>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                Control Panel
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
                Aiven PostgreSQL v16
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '1.1rem',
              display: 'none',
            }}
            className="sidebar-close-btn"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation Items */}
        <div
          style={{
            flex: 1,
            padding: '1rem 0.75rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              padding: '0.5rem 0.75rem',
              fontWeight: 700,
            }}
          >
            Database Management
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.7rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(56, 189, 248, 0.14)' : 'transparent',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid transparent',
                  textDecoration: 'none',
                  transition: 'var(--transition)',
                  boxShadow: isActive ? '0 0 15px rgba(56, 189, 248, 0.18)' : 'none',
                })}
              >
                <Icon style={{ fontSize: '1.05rem', flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Actions: View Live Site & Logout */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.6rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--text-light)',
              fontSize: '0.825rem',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <FaExternalLinkAlt style={{ fontSize: '0.75rem' }} />
            <span>View Public Portfolio</span>
          </a>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.6rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#ef4444',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar {
            position: fixed !important;
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0) !important;
          }
          .sidebar-close-btn {
            display: block !important;
          }
        }
        @media (min-width: 901px) {
          .sidebar-backdrop {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;
