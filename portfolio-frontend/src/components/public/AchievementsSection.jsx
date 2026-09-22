import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../../utils/animations';

const AchievementsSection = ({ achievements = [] }) => {
  return (
    <section id="achievements" style={{ padding: '95px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaTrophy />
            <span>Honors & Recognitions</span>
          </div>
          <h2 className="section-title">
            Awards & <span className="highlight">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Film festival accolades, cinematography recognitions, and software hackathon achievements.
          </p>
        </div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {achievements.map((ach) => (
            <motion.div
              key={ach.id}
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
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition)',
              }}
            >
              {ach.image_url && (
                <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={ach.image_url}
                    alt={ach.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, var(--bg-surface) 0%, transparent 80%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #38bdf8, #2563eb)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      boxShadow: '0 4px 14px rgba(56, 189, 248, 0.4)',
                    }}
                  >
                    <FaTrophy />
                  </div>
                </div>
              )}

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.4rem',
                  }}
                >
                  <FaCalendarAlt style={{ fontSize: '0.75rem' }} />
                  <span>{ach.date_received}</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  {ach.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {ach.organization}
                </p>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {ach.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
