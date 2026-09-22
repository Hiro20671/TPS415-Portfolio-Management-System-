import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaFilm,
  FaCode,
  FaPlay,
  FaLayerGroup,
  FaTimes,
  FaCalendarAlt,
} from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../../utils/animations';
import Modal from '../common/Modal';

const ProjectCard = ({ project, onOpenDetails }) => {
  const isClientWork = project.category === 'CLIENT_WORK';
  const techList = project.technologies
    ? project.technologies.split(',').map((t) => t.trim())
    : [];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, borderColor: 'var(--border-active)', boxShadow: 'var(--shadow-blue)' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(14px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'var(--transition)',
      }}
      onClick={() => onOpenDetails(project)}
    >
      {/* Media Cover Frame */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          overflow: 'hidden',
          background: '#090d16',
        }}
      >
        <motion.img
          src={
            project.image_url ||
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
          }
          alt={project.title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10, 14, 23, 0.96) 0%, rgba(10, 14, 23, 0.25) 60%, transparent 100%)',
          }}
        />

        {/* Category & Project Type Badges */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              padding: '0.3rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              background: isClientWork ? 'linear-gradient(135deg, #38bdf8, #2563eb)' : 'linear-gradient(135deg, #00d2ff, #0284c7)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            {isClientWork ? 'Client Work' : 'Development'}
          </span>

          <span
            style={{
              padding: '0.3rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(6, 8, 13, 0.75)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              fontWeight: 500,
              fontSize: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            {project.project_type}
          </span>
        </div>

        {/* Play Icon / Details Indicator */}
        {project.video_url && (
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #38bdf8, #2563eb)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.4)',
            }}
          >
            <FaPlay style={{ marginLeft: '2px' }} />
          </div>
        )}
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: '1.5rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
            }}
          >
            <FaCalendarAlt />
            <span>{project.completion_date || '2026'}</span>
          </div>

          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.65rem',
              lineHeight: 1.35,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              marginBottom: '1.25rem',
            }}
          >
            {project.short_description}
          </p>

          {/* Technology Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              marginBottom: '1.5rem',
            }}
          >
            {techList.map((tech, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(56, 189, 248, 0.08)',
                  color: 'var(--accent-blue)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  fontWeight: 500,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: Repository & Website */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.825rem',
                fontWeight: 600,
                transition: 'var(--transition)',
              }}
              className="btn-link"
            >
              <FaGithub />
              <span>Repository</span>
            </a>
          )}

          {project.website_url && (
            <a
              href={project.website_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)',
                border: '1px solid var(--border-active)',
                color: 'var(--accent-blue)',
                fontSize: '0.825rem',
                fontWeight: 700,
                transition: 'var(--transition)',
              }}
              className="btn-link"
            >
              <FaExternalLinkAlt />
              <span>Website</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsGallery = ({ projects = [] }) => {
  const [filter, setFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    filter === 'ALL'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaLayerGroup />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="section-title">
            Visual Works & <span className="highlight">Software Engineering</span>
          </h2>
          <p className="section-subtitle">
            Curated showcase of high-end videography client films, commercial productions, and full-stack software development projects.
          </p>
        </div>

        {/* Category Selector Tabs in Blue */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setFilter('ALL')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              border: filter === 'ALL' ? '1px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
              background: filter === 'ALL' ? 'rgba(56, 189, 248, 0.16)' : 'var(--bg-surface)',
              color: filter === 'ALL' ? 'var(--accent-blue)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'var(--transition)',
              boxShadow: filter === 'ALL' ? '0 0 15px rgba(56, 189, 248, 0.25)' : 'none',
            }}
          >
            <FaLayerGroup />
            <span>All Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setFilter('CLIENT_WORK')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              border: filter === 'CLIENT_WORK' ? '1px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
              background: filter === 'CLIENT_WORK' ? 'rgba(56, 189, 248, 0.16)' : 'var(--bg-surface)',
              color: filter === 'CLIENT_WORK' ? 'var(--accent-blue)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'var(--transition)',
              boxShadow: filter === 'CLIENT_WORK' ? '0 0 15px rgba(56, 189, 248, 0.25)' : 'none',
            }}
          >
            <FaFilm />
            <span>Client Work (Videography)</span>
          </button>

          <button
            onClick={() => setFilter('DEVELOPMENT_PROJECT')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              border: filter === 'DEVELOPMENT_PROJECT' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
              background: filter === 'DEVELOPMENT_PROJECT' ? 'rgba(0, 210, 255, 0.16)' : 'var(--bg-surface)',
              color: filter === 'DEVELOPMENT_PROJECT' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'var(--transition)',
              boxShadow: filter === 'DEVELOPMENT_PROJECT' ? '0 0 15px rgba(0, 210, 255, 0.25)' : 'none',
            }}
          >
            <FaCode />
            <span>Development Projects</span>
          </button>
        </div>

        {/* Projects Grid */}
        <motion.div
          key={filter}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={setSelectedProject}
            />
          ))}
        </motion.div>
      </div>

      {/* Project Detail / Preview Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || 'Project Details'}
        icon={selectedProject?.category === 'CLIENT_WORK' ? FaFilm : FaCode}
        maxWidth="750px"
      >
        {selectedProject && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', maxHeight: '350px' }}>
              <img
                src={selectedProject.image_url}
                alt={selectedProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: 'var(--accent-blue)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  {selectedProject.category_display || selectedProject.category}
                </span>
                <span
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-light)',
                    fontSize: '0.8rem',
                  }}
                >
                  {selectedProject.project_type}
                </span>
                <span
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                  }}
                >
                  {selectedProject.completion_date}
                </span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                {selectedProject.title}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                {selectedProject.full_description || selectedProject.short_description}
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  Gear / Stack:
                </strong>
                <span style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.95rem' }}>
                  {selectedProject.technologies}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {selectedProject.github_url && (
                  <a
                    href={selectedProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem 1.4rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                    }}
                  >
                    <FaGithub />
                    <span>View Repository</span>
                  </a>
                )}

                {selectedProject.website_url && (
                  <a
                    href={selectedProject.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem 1.4rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      boxShadow: '0 4px 15px rgba(56, 189, 248, 0.35)',
                    }}
                  >
                    <FaExternalLinkAlt />
                    <span>Open Project / Film</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default ProjectsGallery;
