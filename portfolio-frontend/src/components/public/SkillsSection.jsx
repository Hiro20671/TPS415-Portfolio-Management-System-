import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaVideo,
  FaFilm,
  FaCode,
  FaDatabase,
  FaCamera,
  FaTools,
} from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../../utils/animations';

const CATEGORY_META = {
  ALL: { label: 'All Disciplines', icon: FaTools },
  VIDEOGRAPHY: { label: 'Videography', icon: FaVideo },
  VIDEO_EDITING: { label: 'Video Editing', icon: FaFilm },
  WEB_DEVELOPMENT: { label: 'Web Development', icon: FaCode },
  PROGRAMMING: { label: 'Programming', icon: FaCode },
  DATABASE: { label: 'Database', icon: FaDatabase },
  OTHER: { label: 'Other Specializations', icon: FaCamera },
};

const SkillBar = ({ skill }) => {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'var(--transition)',
      }}
      whileHover={{ y: -3, borderColor: 'var(--border-active)', boxShadow: 'var(--shadow-blue)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {skill.name}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'var(--accent-blue)',
          }}
        >
          {skill.proficiency_percentage}%
        </span>
      </div>

      {/* Animated Progress Bar Track */}
      <div
        style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency_percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #38bdf8 0%, #00d2ff 50%, #2563eb 100%)',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 0 14px rgba(56, 189, 248, 0.45)',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        <span>{skill.category_display || skill.category.replace('_', ' ')}</span>
        <span>{skill.years_practiced || 3} Years Experience</span>
      </div>
    </motion.div>
  );
};

const SkillsSection = ({ skills = [] }) => {
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredSkills =
    activeTab === 'ALL'
      ? skills
      : skills.filter((s) => s.category === activeTab);

  const categories = ['ALL', 'VIDEOGRAPHY', 'VIDEO_EDITING', 'WEB_DEVELOPMENT', 'PROGRAMMING', 'DATABASE', 'OTHER'];

  return (
    <section id="skills" style={{ padding: '95px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaTools />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="highlight">Proficiencies</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive creative toolkit spanning cinema camera systems, post-production color science, and modern full-stack development.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '3rem',
          }}
        >
          {categories.map((catKey) => {
            const meta = CATEGORY_META[catKey] || { label: catKey, icon: FaTools };
            const Icon = meta.icon;
            const isSelected = activeTab === catKey;

            return (
              <button
                key={catKey}
                onClick={() => setActiveTab(catKey)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'rgba(56, 189, 248, 0.16)' : 'var(--bg-surface)',
                  color: isSelected ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  boxShadow: isSelected ? '0 0 15px rgba(56, 189, 248, 0.25)' : 'none',
                }}
              >
                <Icon />
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid with Animated Bars */}
        <motion.div
          key={activeTab}
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredSkills.map((skill) => (
            <SkillBar key={skill.id} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
