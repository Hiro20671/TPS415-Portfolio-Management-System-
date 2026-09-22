import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaCalendarCheck } from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../../utils/animations';

const CertificationsSection = ({ certifications = [] }) => {
  return (
    <section id="certifications" style={{ padding: '95px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaCertificate />
            <span>Credentials</span>
          </div>
          <h2 className="section-title">
            Professional <span className="highlight">Certifications</span>
          </h2>
          <p className="section-subtitle">
            Industry-recognized credentials in digital video editing, color management, and frontend engineering.
          </p>
        </div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={fadeUp}
              whileHover={{
                y: -6,
                borderColor: 'var(--border-active)',
                boxShadow: 'var(--shadow-blue)',
              }}
              style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(14px)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'var(--transition)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      color: 'var(--accent-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.35rem',
                      boxShadow: '0 0 16px rgba(56, 189, 248, 0.25)',
                    }}
                  >
                    <FaCertificate />
                  </div>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    <FaCalendarCheck />
                    <span>{cert.issue_date}</span>
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.35rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  {cert.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--accent-blue)',
                    fontWeight: 600,
                    marginBottom: '1rem',
                  }}
                >
                  {cert.issuing_organization}
                </p>

                {cert.description && (
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {cert.description}
                  </p>
                )}

                {cert.credential_id && (
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '1rem',
                    }}
                  >
                    ID: {cert.credential_id}
                  </div>
                )}
              </div>

              {cert.credential_url && (
                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      color: 'var(--accent-blue)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      letterSpacing: '0.03em',
                    }}
                  >
                    <FaExternalLinkAlt style={{ fontSize: '0.8rem' }} />
                    <span>Verify Credential</span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
