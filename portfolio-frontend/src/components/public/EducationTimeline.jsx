import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaAward } from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../../utils/animations';

const EducationTimeline = ({ educations = [] }) => {
  return (
    <section id="education" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaGraduationCap />
            <span>Academic Background</span>
          </div>
          <h2 className="section-title">
            Educational <span className="highlight">Foundation</span>
          </h2>
          <p className="section-subtitle">
            Formal training in digital filmmaking, cinematography, and full-stack software development.
          </p>
        </div>

        <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Line */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              left: '24px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-cyan), rgba(6, 182, 212, 0.15))',
            }}
          />

          <motion.div
            variants={staggerContainer(0.18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {educations.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                style={{
                  position: 'relative',
                  paddingLeft: '60px',
                }}
              >
                {/* Node icon */}
                <div
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '2px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--accent-cyan)',
                    color: 'var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    boxShadow: '0 0 16px var(--accent-cyan-glow)',
                    zIndex: 2,
                  }}
                >
                  <FaGraduationCap />
                </div>

                <motion.div
                  whileHover={{ y: -3, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.75rem',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'var(--transition)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                        {item.degree}
                      </h3>
                      <h4
                        style={{
                          fontSize: '1rem',
                          color: 'var(--accent-cyan)',
                          fontWeight: 600,
                          margin: '0.2rem 0 0',
                        }}
                      >
                        {item.school}
                      </h4>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.3rem 0.75rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.8rem',
                          color: 'var(--text-light)',
                        }}
                      >
                        <FaCalendarAlt style={{ fontSize: '0.75rem' }} />
                        {item.start_year} – {item.end_year}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      marginBottom: '0.6rem',
                    }}
                  >
                    <strong>Major / Field:</strong> {item.field_of_study}
                  </div>

                  {item.grade_or_honors && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(245, 158, 11, 0.1)',
                        color: 'var(--accent-gold)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        marginBottom: '0.85rem',
                      }}
                    >
                      <FaAward />
                      <span>{item.grade_or_honors}</span>
                    </div>
                  )}

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationTimeline;
