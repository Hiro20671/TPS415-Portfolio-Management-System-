import React from 'react';

const LoadingSpinner = ({ size = '40px', color = 'var(--accent-gold)' }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          border: `3px solid rgba(245, 158, 11, 0.15)`,
          borderTopColor: color,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
