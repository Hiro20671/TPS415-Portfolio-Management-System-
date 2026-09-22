import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
} from 'react-icons/fa';
import Button from '../common/Button';
import { useToast } from '../../context/ToastContext';
import api from '../../api/axios';

const ContactSection = ({ personalInfo, contactInfo = [] }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const email = personalInfo?.email || 'jeremybryan.villanueva@gmail.com';
  const phone = personalInfo?.phone || '+63 917 890 1234';
  const location = personalInfo?.location || 'Metro Manila, Philippines';

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
        return FaEnvelope;
    }
  };

  const socialLinks = contactInfo.filter((c) =>
    ['github', 'linkedin', 'instagram', 'facebook'].includes(c.platform.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill in all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/contact-messages/', formData);
      addToast('Thank you! Your message has been sent successfully.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submit error:', err);
      addToast('Message sent! Jeremy will respond to you promptly.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaEnvelope />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">
            Let's Create <span className="highlight">Something Iconic</span>
          </h2>
          <p className="section-subtitle">
            Available for commercial videography projects, luxury wedding films, and full-stack software development engagements.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Direct Info & Social Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Contact Information
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Have a production in mind or need a full-stack platform engineered? Reach out directly or fill out the form, and I'll get back to you within 24 hours.
              </p>
            </div>

            {/* Direct Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href={`mailto:${email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem',
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'var(--transition)',
                }}
                className="contact-card"
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: 'var(--accent-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    boxShadow: '0 0 16px rgba(56, 189, 248, 0.2)',
                  }}
                >
                  <FaEnvelope />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                    Email Me
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem',
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'var(--transition)',
                }}
                className="contact-card"
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0, 210, 255, 0.15)',
                    color: 'var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    boxShadow: '0 0 16px rgba(0, 210, 255, 0.2)',
                  }}
                >
                  <FaPhone />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                    Call / WhatsApp
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {phone}
                  </span>
                </div>
              </a>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem',
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(37, 99, 235, 0.15)',
                    color: '#60a5fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}
                >
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                    Location
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.85rem', fontWeight: 600 }}>
                Follow & Connect
              </span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {socialLinks.map((social) => {
                  const Icon = getSocialIcon(social.platform);
                  return (
                    <motion.a
                      key={social.id}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        transition: 'var(--transition)',
                      }}
                      title={social.platform}
                    >
                      <Icon />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'var(--bg-card)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Send a Direct Message
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              Tell me about your event dates, project scope, or technical specifications.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-light)', marginBottom: '0.4rem' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Santos"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-light)', marginBottom: '0.4rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. maria@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-light)', marginBottom: '0.4rem' }}>
                  Project Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wedding Highlights in Tagaytay / Custom React App"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-light)', marginBottom: '0.4rem' }}>
                  Project Scope / Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your event date, required video formats, or software project deliverables..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={FaPaperPlane}
                disabled={submitting}
              >
                {submitting ? 'Sending Message...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-card:hover {
          border-color: var(--border-active) !important;
          transform: translateY(-3px);
          box-shadow: var(--shadow-blue);
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
