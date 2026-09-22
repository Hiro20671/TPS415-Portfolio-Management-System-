import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaEnvelope, FaVideo, FaCode, FaCamera } from 'react-icons/fa';
import Button from '../common/Button';

const HeroSection = ({ personalInfo }) => {
  const name = personalInfo?.full_name || 'Jeremy Bryan Villanueva';
  const title = personalInfo?.title || 'Videographer • Video Editor • Full Stack Developer';
  const bio =
    personalInfo?.bio ||
    'I am a passionate videographer and editor based in the Philippines, specializing in cinematic visuals, event coverage, promotional content, documentaries, wedding films, and social media reels. I also work as a full stack developer, building responsive and functional web applications.';

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '120px 0 80px',
      }}
    >
      {/* Cinematic Background Layer with the user's high-res studio/skyline shot */}
      <motion.div
        initial={{ scale: 1.04 }}
        animate={{ scale: 1.12 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/assets/images/cinematic-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          zIndex: 1,
        }}
      />

      {/* Dark Vignette & Cinematic Gradient Overlay in Deep Navy / Onyx */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, rgba(6, 8, 13, 0.72) 0%, rgba(6, 8, 13, 0.92) 75%, rgba(6, 8, 13, 0.99) 100%)',
          zIndex: 2,
        }}
      />

      {/* Cinematic Blue & Cyan Lighting Flares */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)',
          filter: 'blur(70px)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Content Container */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          maxWidth: '920px',
        }}
      >
        {/* Creative Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.4rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            color: 'var(--accent-blue)',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1.75rem',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.2)',
          }}
        >
          <FaVideo />
          <span>Cinematic Visuals</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <FaCode />
          <span>Full Stack Systems</span>
        </motion.div>

        {/* Name Sequence */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(2.75rem, 6.5vw, 4.75rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}
        >
          <span style={{ display: 'block', color: 'var(--text-primary)' }}>
            Jeremy Bryan
          </span>
          <span className="gradient-text-blue">Villanueva</span>
        </motion.h1>

        {/* Professional Title Sequence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
            fontWeight: 600,
            color: 'var(--text-light)',
            letterSpacing: '0.04em',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.6rem',
          }}
        >
          <span>Videographer</span>
          <span style={{ color: 'var(--accent-blue)' }}>•</span>
          <span>Video Editor</span>
          <span style={{ color: 'var(--accent-blue)' }}>•</span>
          <span className="gradient-text-cyan" style={{ fontWeight: 700 }}>
            Full Stack Developer
          </span>
        </motion.div>

        {/* Bio Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '760px',
            margin: '0 auto 2.5rem',
          }}
        >
          {bio}
        </motion.p>

        {/* Two Main Call-To-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <Button
            size="lg"
            variant="primary"
            icon={FaArrowRight}
            hasArrow={false}
            onClick={() => scrollToSection('projects')}
          >
            VIEW MY WORK
          </Button>

          <Button
            size="lg"
            variant="secondary"
            icon={FaEnvelope}
            onClick={() => scrollToSection('contact')}
          >
            CONTACT ME
          </Button>
        </motion.div>

        {/* Cinematic Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.4, duration: 0.5 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
          style={{
            marginTop: '3.5rem',
            color: 'var(--accent-blue)',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            cursor: 'pointer',
          }}
          onClick={() => scrollToSection('about')}
        >
          SCROLL TO EXPLORE ↓
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
