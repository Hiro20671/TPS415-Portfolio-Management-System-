import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PublicLayout from '../layouts/PublicLayout';
import HeroSection from '../components/public/HeroSection';
import AboutSection from '../components/public/AboutSection';
import ExperienceTimeline from '../components/public/ExperienceTimeline';
import EducationTimeline from '../components/public/EducationTimeline';
import SkillsSection from '../components/public/SkillsSection';
import ServicesSection from '../components/public/ServicesSection';
import ProjectsGallery from '../components/public/ProjectsGallery';
import CertificationsSection from '../components/public/CertificationsSection';
import AchievementsSection from '../components/public/AchievementsSection';
import ContactSection from '../components/public/ContactSection';
import { ProjectSkeletonCard, DashboardSkeletonCard } from '../components/common/Skeleton';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import Button from '../components/common/Button';

const Home = () => {
  const [data, setData] = useState({
    personalInfo: null,
    education: [],
    experience: [],
    skills: [],
    services: [],
    projects: [],
    certifications: [],
    achievements: [],
    contactInfo: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolioData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        personalRes,
        eduRes,
        expRes,
        skillsRes,
        servicesRes,
        projectsRes,
        certsRes,
        achievementsRes,
        contactRes,
      ] = await Promise.allSettled([
        api.get('/personal-information/'),
        api.get('/education/'),
        api.get('/work-experience/'),
        api.get('/skills/'),
        api.get('/services/'),
        api.get('/projects/'),
        api.get('/certifications/'),
        api.get('/achievements/'),
        api.get('/contact-information/'),
      ]);

      setData({
        personalInfo: personalRes.status === 'fulfilled' && personalRes.value.data.length ? personalRes.value.data[0] : null,
        education: eduRes.status === 'fulfilled' ? eduRes.value.data : [],
        experience: expRes.status === 'fulfilled' ? expRes.value.data : [],
        skills: skillsRes.status === 'fulfilled' ? skillsRes.value.data : [],
        services: servicesRes.status === 'fulfilled' ? servicesRes.value.data : [],
        projects: projectsRes.status === 'fulfilled' ? projectsRes.value.data : [],
        certifications: certsRes.status === 'fulfilled' ? certsRes.value.data : [],
        achievements: achievementsRes.status === 'fulfilled' ? achievementsRes.value.data : [],
        contactInfo: contactRes.status === 'fulfilled' ? contactRes.value.data : [],
      });
    } catch (err) {
      console.error('Failed to load portfolio data:', err);
      setError('Unable to load portfolio details. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  if (error) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.12)',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
          }}
        >
          <FaExclamationTriangle />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Unable to Load Portfolio</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>{error}</p>
        <Button variant="primary" icon={FaRedo} onClick={fetchPortfolioData}>
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <PublicLayout personalInfo={data.personalInfo} contactInfo={data.contactInfo}>
      <HeroSection personalInfo={data.personalInfo} />
      <AboutSection personalInfo={data.personalInfo} />
      <ExperienceTimeline experiences={data.experience} />
      <EducationTimeline educations={data.education} />
      <SkillsSection skills={data.skills} />
      <ServicesSection services={data.services} />
      <ProjectsGallery projects={data.projects} />
      <CertificationsSection certifications={data.certifications} />
      <AchievementsSection achievements={data.achievements} />
      <ContactSection personalInfo={data.personalInfo} contactInfo={data.contactInfo} />
    </PublicLayout>
  );
};

export default Home;
