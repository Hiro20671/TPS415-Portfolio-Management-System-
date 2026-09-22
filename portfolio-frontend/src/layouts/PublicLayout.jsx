import React, { useState } from 'react';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import PageLoader from '../components/common/PageLoader';

const PublicLayout = ({ children, personalInfo, contactInfo }) => {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <PageLoader onComplete={() => setLoaderComplete(true)} />

      {/* Atmospheric Cinematic Background Layer across sections */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: 'url("/assets/images/cinematic-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.16,
          filter: 'blur(8px)',
          transform: 'scale(1.04)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Ambient Dark Navy/Onyx Tint */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(6, 8, 13, 0.7) 0%, rgba(6, 8, 13, 0.95) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Navbar />
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>{children}</main>
      <Footer personalInfo={personalInfo} contactInfo={contactInfo} />
    </div>
  );
};

export default PublicLayout;
