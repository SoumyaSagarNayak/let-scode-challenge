import React from 'react';

export default function SkeletonLoader({ count = 3, type = 'card' }) {
  return (
    <div className={type === 'grid' ? 'grid-3' : 'grid-1'} style={{ gap: '20px' }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="skeleton"
          style={{
            height: type === 'card' ? '180px' : '60px',
            borderRadius: 'var(--radius-lg)'
          }}
        />
      ))}
    </div>
  );
}
