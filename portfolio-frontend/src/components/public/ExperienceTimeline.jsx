import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../../utils/animations';

const ExperienceTimeline = ({ experiences = [] }) => {
  return (
    <section id="experience" style={{ padding: '95px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaBriefcase />
            <span>Career Path</span>
          </div>
          <h2 className="section-title">
            Work <span className="highlight">Experience</span>
          </h2>
          <p className="section-subtitle">
            Commercial video production engagements, broadcast media, and software engineering roles.
          </p>
        </div>

        {/* Timeline Container */}
        <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Center Line in Blue Gradient */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              left: '24px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-blue), rgba(56, 189, 248, 0.15))',
            }}
          />

          <motion.div
            variants={staggerContainer(0.18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {experiences.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                style={{
                  position: 'relative',
                  paddingLeft: '60px',
                }}
              >
                {/* Timeline Node Badge */}
                <div
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '2px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: item.is_current ? 'var(--accent-blue)' : 'var(--bg-surface)',
                    border: '2px solid var(--accent-blue)',
                    color: item.is_current ? '#06080d' : 'var(--accent-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    boxShadow: item.is_current ? '0 0 16px var(--accent-blue)' : 'none',
                    zIndex: 2,
                  }}
                >
                  <FaBriefcase />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3, borderColor: 'var(--border-active)', boxShadow: 'var(--shadow-blue)' }}
                  style={{
                    background: 'var(--bg-card)',
                    backdropFilter: 'blur(12px)',
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
                      marginBottom: '0.75rem',
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                        {item.position}
                      </h3>
                      <h4
                        style={{
                          fontSize: '1rem',
                          color: 'var(--accent-blue)',
                          fontWeight: 600,
                          margin: '0.2rem 0 0',
                        }}
                      >
                        {item.company}
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
                        {item.start_date} – {item.end_date}
                      </span>

                      <span
                        style={{
                          padding: '0.3rem 0.75rem',
                          background: 'rgba(56, 189, 248, 0.12)',
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.8rem',
                          color: 'var(--accent-blue)',
                          fontWeight: 600,
                        }}
                      >
                        {item.employment_type}
                      </span>
                    </div>
                  </div>

                  {item.location && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <FaMapMarkerAlt />
                      <span>{item.location}</span>
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

export default ExperienceTimeline;
