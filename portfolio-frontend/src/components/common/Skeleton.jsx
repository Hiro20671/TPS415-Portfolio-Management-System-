import React from 'react';

export const Skeleton = ({ width = '100%', height = '20px', borderRadius = 'var(--radius-sm)', style = {} }) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-pulse 1.6s ease-in-out infinite',
        ...style,
      }}
    >
      <style>{`
        @keyframes skeleton-pulse {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export const ProjectSkeletonCard = () => (
  <div
    style={{
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
    }}
  >
    <Skeleton height="220px" borderRadius="0" />
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Skeleton width="40%" height="16px" />
      <Skeleton width="80%" height="24px" />
      <Skeleton width="100%" height="16px" />
      <Skeleton width="90%" height="16px" />
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <Skeleton width="30%" height="32px" borderRadius="var(--radius-full)" />
        <Skeleton width="30%" height="32px" borderRadius="var(--radius-full)" />
      </div>
    </div>
  </div>
);

export const TableSkeletonRows = ({ rows = 5, cols = 5 }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        {Array.from({ length: cols }).map((_, j) => (
          <td key={j} style={{ padding: '1rem' }}>
            <Skeleton width={j === 0 ? '70%' : '50%'} height="18px" />
          </td>
        ))}
      </tr>
    ))}
  </>
);

export const DashboardSkeletonCard = () => (
  <div
    style={{
      background: 'var(--bg-card)',
      padding: '1.5rem',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
    }}
  >
    <Skeleton width="54px" height="54px" borderRadius="var(--radius-md)" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Skeleton width="40%" height="14px" />
      <Skeleton width="60%" height="28px" />
    </div>
  </div>
);

export default Skeleton;
