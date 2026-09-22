import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaFolderOpen,
  FaTools,
  FaConciergeBell,
  FaCertificate,
  FaTrophy,
  FaGraduationCap,
  FaBriefcase,
  FaAddressBook,
  FaEnvelopeOpenText,
  FaDatabase,
  FaServer,
  FaCheckCircle,
} from 'react-icons/fa';
import api from '../../api/axios';
import AdminLayout from '../../layouts/AdminLayout';
import DashboardCard from '../../components/admin/DashboardCard';
import { DashboardSkeletonCard } from '../../components/common/Skeleton';
import { staggerContainer } from '../../utils/animations';

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.get('/dashboard-stats/');
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Projects',
      count: stats?.projects_count || 0,
      icon: FaFolderOpen,
      color: 'var(--accent-blue)',
      subtitle: `${stats?.client_work_count || 0} Client Works • ${stats?.dev_projects_count || 0} Dev Projects`,
      link: '/admin/projects',
    },
    {
      title: 'Skills',
      count: stats?.skills_count || 0,
      icon: FaTools,
      color: 'var(--accent-cyan)',
      subtitle: 'Across 6 Creative & Tech Categories',
      link: '/admin/skills',
    },
    {
      title: 'Services',
      count: stats?.services_count || 0,
      icon: FaConciergeBell,
      color: '#60a5fa',
      subtitle: 'Film Production, Editing & Full Stack',
      link: '/admin/services',
    },
    {
      title: 'Certifications',
      count: stats?.certifications_count || 0,
      icon: FaCertificate,
      color: '#10b981',
      subtitle: 'DaVinci Resolve, Adobe & Meta',
      link: '/admin/certifications',
    },
    {
      title: 'Achievements',
      count: stats?.achievements_count || 0,
      icon: FaTrophy,
      color: 'var(--accent-blue)',
      subtitle: 'Festivals, Showcases & Hackathons',
      link: '/admin/achievements',
    },
    {
      title: 'Education Records',
      count: stats?.education_count || 0,
      icon: FaGraduationCap,
      color: 'var(--accent-cyan)',
      subtitle: 'Benilde & Mapúa University',
      link: '/admin/education',
    },
    {
      title: 'Work Experiences',
      count: stats?.experience_count || 0,
      icon: FaBriefcase,
      color: '#3b82f6',
      subtitle: 'Kinetic Visuals, Nexus & Apex',
      link: '/admin/experience',
    },
    {
      title: 'Contact Channels',
      count: stats?.contact_info_count || 0,
      icon: FaAddressBook,
      color: '#38bdf8',
      subtitle: 'Social Media & Direct Channels',
      link: '/admin/contact-info',
    },
    {
      title: 'Client Inquiries',
      count: stats?.total_messages_count || 0,
      icon: FaEnvelopeOpenText,
      color: '#00d2ff',
      subtitle: `${stats?.unread_messages_count || 0} Unread Inquiries`,
      link: '/admin/messages',
    },
  ];

  return (
    <AdminLayout title="Dashboard Overview">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Top Banner: Architecture & DB Info */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(37, 99, 235, 0.1) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <FaCheckCircle style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Full-Stack Architecture Active
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.25rem 0' }}>
              React Frontend → Django REST API → Aiven PostgreSQL
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Operating on Jeremy Bryan Villanueva's unified creative media and software development database.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem',
              }}
            >
              <FaServer style={{ color: 'var(--accent-cyan)' }} />
              <span>Django REST v5.1</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem',
              }}
            >
              <FaDatabase style={{ color: 'var(--accent-blue)' }} />
              <span>Aiven Cloud DB (SSL)</span>
            </div>
          </div>
        </div>

        {/* 9 Live Entity Metrics Grid */}
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Database Table Metrics
          </h3>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <DashboardSkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              animate="visible"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {cards.map((c) => (
                <Link key={c.title} to={c.link} style={{ textDecoration: 'none' }}>
                  <DashboardCard {...c} />
                </Link>
              ))}
            </motion.div>
          )}
        </div>

        {/* Quick Management Shortcuts Grid */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
          }}
        >
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            9 School Submission Management Views
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Click on any management view below to inspect, add, edit, or delete records and capture the corresponding school screenshot:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            {[
              { num: 1, name: 'Personal Information Management', path: '/admin/personal-info' },
              { num: 2, name: 'Educational Background Management', path: '/admin/education' },
              { num: 3, name: 'Work Experience Management', path: '/admin/experience' },
              { num: 4, name: 'Skills Management', path: '/admin/skills' },
              { num: 5, name: 'Services Management', path: '/admin/services' },
              { num: 6, name: 'Projects Management', path: '/admin/projects' },
              { num: 7, name: 'Certifications Management', path: '/admin/certifications' },
              { num: 8, name: 'Achievements Management', path: '/admin/achievements' },
              { num: 9, name: 'Contact Information Management', path: '/admin/contact-info' },
            ].map((view) => (
              <Link
                key={view.num}
                to={view.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  transition: 'var(--transition)',
                }}
                className="shortcut-card"
              >
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(56, 189, 248, 0.16)',
                    color: 'var(--accent-blue)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {view.num}
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  {view.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .shortcut-card:hover {
          border-color: var(--border-active) !important;
          background: rgba(56, 189, 248, 0.08) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-blue);
        }
      `}</style>
    </AdminLayout>
  );
};

export default DashboardOverview;
