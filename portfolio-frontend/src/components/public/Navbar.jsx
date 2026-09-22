import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUserShield } from 'react-icons/fa';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'SERVICES', href: '#services' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CERTIFICATIONS', href: '#certifications' },
  { name: 'CONTACT', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (location.pathname !== '/') {
      return;
    }
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        zIndex: 900,
        transition: 'all 0.35s ease',
        background: scrolled
          ? 'var(--bg-glass)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              border: '1px solid rgba(56, 189, 248, 0.45)',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(37, 99, 235, 0.15) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-blue)',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '0.05em',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.25)',
            }}
          >
            JBV
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
                display: 'block',
              }}
            >
              Jeremy Villanueva
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                color: 'var(--accent-blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600,
                display: 'block',
              }}
            >
              Cinematics & Tech
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  position: 'relative',
                  padding: '0.4rem 0',
                  transition: 'color 0.2s',
                }}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))',
                      borderRadius: '2px',
                      boxShadow: '0 0 10px rgba(56, 189, 248, 0.6)',
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Admin Shortcut */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <ThemeToggle />

          <Link
            to={isAuthenticated ? '/admin' : '/login'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: 'var(--accent-blue)',
              fontSize: '0.825rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              transition: 'var(--transition)',
            }}
            title={isAuthenticated ? 'Go to Admin Dashboard' : 'Admin Login'}
          >
            <FaUserShield />
            <span>{isAuthenticated ? 'DASHBOARD' : 'PORTAL'}</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '1.35rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.35rem',
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-subtle)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div
              className="container"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: activeSection === link.href.substring(1) ? 'var(--accent-blue)' : 'var(--text-primary)',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
