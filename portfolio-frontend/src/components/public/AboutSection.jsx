import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCamera, FaCode, FaAward, FaFilm, FaCalendarAlt, FaCheckDouble } from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../../utils/animations';

const StatCard = ({ number, label, icon: Icon, color = 'var(--accent-blue)' }) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, borderColor: color }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        transition: 'var(--transition)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            color,
            lineHeight: 1,
          }}
        >
          {number}+
        </span>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(56, 189, 248, 0.08)',
            color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
          }}
        >
          <Icon />
        </div>
      </div>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
        {label}
      </span>
    </motion.div>
  );
};

const AboutSection = ({ personalInfo }) => {
  const stats = [
    {
      number: personalInfo?.years_experience || 5,
      label: 'Years Experience',
      icon: FaCalendarAlt,
      color: 'var(--accent-blue)',
    },
    {
      number: personalInfo?.projects_completed || 32,
      label: 'Projects Completed',
      icon: FaCheckDouble,
      color: 'var(--accent-cyan)',
    },
    {
      number: personalInfo?.client_works || 45,
      label: 'Client Works',
      icon: FaFilm,
      color: '#38bdf8',
    },
    {
      number: personalInfo?.technologies_count || 20,
      label: 'Technologies & Gear',
      icon: FaCode,
      color: '#00d2ff',
    },
  ];

  return (
    <section id="about" style={{ padding: '110px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaUser />
            <span>Behind The Vision</span>
          </div>
          <h2 className="section-title">
            About <span className="highlight">Jeremy Villanueva</span>
          </h2>
          <p className="section-subtitle">
            Bridging the gap between cinema lenses and modern web architecture.
          </p>
        </div>

        {/* Modern Split Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* LEFT: Professional Portrait Frame of Jeremy Bryan Villanueva */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            {/* Background Glow Frame in Cinematic Electric Blue */}
            <div
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0.25) 100%)',
                filter: 'blur(22px)',
                zIndex: 0,
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid var(--border-active)',
                background: 'var(--bg-surface)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <img
                src="/assets/images/jeremy-profile.jpg"
                alt="Jeremy Bryan Villanueva - Videographer and Full Stack Developer"
                style={{
                  width: '100%',
                  height: '520px',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                  filter: 'contrast(1.04) saturate(1.08)',
                  transition: 'transform 0.5s ease',
                }}
              />

              {/* Lens Details Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.75rem',
                  background: 'linear-gradient(to top, rgba(6, 8, 13, 0.98) 0%, rgba(6, 8, 13, 0.7) 60%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                    Jeremy Bryan Villanueva
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--accent-blue)', margin: '0.2rem 0 0', fontWeight: 700 }}>
                    Director • DP • Full Stack Engineer
                  </p>
                </div>
                <div
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    backdropFilter: 'blur(8px)',
                    fontSize: '0.78rem',
                    color: 'var(--accent-blue)',
                    fontWeight: 700,
                  }}
                >
                  Sony FX3 • S-Log3
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Narrative & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
          >
            <div>
              <h3 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Videographer & Full Stack Developer
              </h3>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--accent-blue)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '1rem',
                }}
              >
                Based in Metro Manila, Philippines
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                {personalInfo?.bio ||
                  'I am a passionate videographer and editor based in the Philippines, specializing in cinematic visuals, event coverage, promotional content, documentaries, wedding films, and social media reels. I also work as a full stack developer, building responsive and functional web applications.'}
              </p>
            </div>

            <p style={{ color: 'var(--text-light)', fontSize: '0.975rem', lineHeight: 1.7 }}>
              {personalInfo?.about_details ||
                'Bridging the gap between creative visual media and modern software engineering. With an eye for cinematic lighting, framing, and pacing alongside technical mastery in React, Django, and database systems, I bring ideas to life on screens of all sizes.'}
            </p>

            {/* Animated Statistics Counter Cards */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginTop: '0.5rem',
              }}
            >
              {stats.map((item, idx) => (
                <StatCard key={idx} {...item} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
