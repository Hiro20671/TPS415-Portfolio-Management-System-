import React from 'react';
import { motion } from 'framer-motion';
import {
  FaVideo,
  FaCamera,
  FaFilm,
  FaInstagram,
  FaCode,
  FaCheck,
  FaTag,
} from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../../utils/animations';

const getServiceIcon = (iconName, category) => {
  switch (iconName) {
    case 'FaCamera':
      return FaCamera;
    case 'FaFilm':
      return FaFilm;
    case 'FaInstagram':
      return FaInstagram;
    case 'FaCode':
      return FaCode;
    default:
      return FaVideo;
  }
};

const ServiceCard = ({ service }) => {
  const Icon = getServiceIcon(service.icon_name, service.category);
  const featuresList = service.features
    ? service.features.split('\n').filter((f) => f.trim().length > 0)
    : [];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -8,
        borderColor: 'var(--border-active)',
        boxShadow: 'var(--shadow-blue)',
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(14px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Accent line in blue */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--accent-blue), #00d2ff, transparent)',
        }}
      />

      <div>
        {/* Header: Icon & Category */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.15, rotate: 6 }}
            transition={{ duration: 0.25 }}
            style={{
              width: '54px',
              height: '54px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.18) 0%, rgba(37, 99, 235, 0.12) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: 'var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.45rem',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.2)',
            }}
          >
            <Icon />
          </motion.div>

          {service.price_range && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: 'var(--accent-blue)',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              <FaTag style={{ fontSize: '0.75rem' }} />
              <span>{service.price_range}</span>
            </div>
          )}
        </div>

        <h3
          style={{
            fontSize: '1.35rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
            color: 'var(--text-primary)',
          }}
        >
          {service.title}
        </h3>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.65,
            marginBottom: '1.5rem',
          }}
        >
          {service.description}
        </p>

        {/* Feature bullets */}
        {featuresList.length > 0 && (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 1.5rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {featuresList.map((feat, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-light)',
                }}
              >
                <FaCheck style={{ color: 'var(--accent-blue)', fontSize: '0.75rem', flexShrink: 0 }} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--accent-blue)',
            fontSize: '0.875rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          <span>Book This Service →</span>
        </a>
      </div>
    </motion.div>
  );
};

const ServicesSection = ({ services = [] }) => {
  return (
    <section id="services" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaVideo />
            <span>Creative & Engineering Solutions</span>
          </div>
          <h2 className="section-title">
            Tailored <span className="highlight">Services</span>
          </h2>
          <p className="section-subtitle">
            From cinematic wedding films and high-impact commercial campaigns to custom web application development.
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
          {services.map((srv) => (
            <ServiceCard key={srv.id} service={srv} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
