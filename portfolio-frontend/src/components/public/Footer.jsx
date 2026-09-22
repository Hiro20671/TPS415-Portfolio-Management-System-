import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowUp,
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';

const Footer = ({ personalInfo, contactInfo = [] }) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return FaGithub;
      case 'linkedin':
        return FaLinkedin;
      case 'instagram':
        return FaInstagram;
      case 'facebook':
        return FaFacebook;
      default:
        return FaGithub;
    }
  };

  const socialLinks = contactInfo.filter((c) =>
    ['github', 'linkedin', 'instagram', 'facebook'].includes(c.platform.toLowerCase())
  );

  return (
    <footer
      style={{
        background: 'rgba(6, 8, 13, 0.95)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '70px 0 35px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.75rem',
            marginBottom: '3rem',
          }}
        >
          {/* Logo / Initials */}
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              border: '1px solid rgba(56, 189, 248, 0.45)',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(37, 99, 235, 0.15) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-blue)',
              fontWeight: 800,
              fontSize: '1.25rem',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)',
            }}
          >
            JBV
          </div>

          <div>
            <h3
              style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '0.35rem',
              }}
            >
              Jeremy Bryan Villanueva
            </h3>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                letterSpacing: '0.04em',
              }}
            >
              Videographer • Video Editor • Full Stack Developer
            </p>
          </div>

          {/* Navigation Links */}
          <nav
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem',
            }}
          >
            {['HOME', 'ABOUT', 'EXPERIENCE', 'SKILLS', 'SERVICES', 'PROJECTS', 'CERTIFICATIONS', 'CONTACT'].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.06em',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent-blue)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
                >
                  {item}
                </a>
              )
            )}
          </nav>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {socialLinks.map((s) => {
              const Icon = getSocialIcon(s.platform);
              return (
                <a
                  key={s.id}
                  href={s.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent-blue)';
                    e.currentTarget.style.borderColor = 'var(--accent-blue)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(56, 189, 248, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Jeremy Bryan Villanueva. All Rights Reserved.
          </div>
          <div>
            Built with React, Django REST Framework & Aiven PostgreSQL.
          </div>
        </div>
      </div>

      {/* Back to Top Floating Button in Blue Gradient */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(56, 189, 248, 0.45)',
              zIndex: 800,
            }}
            aria-label="Back to top"
            title="Back to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
