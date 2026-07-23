import React from 'react';

export default function IndiaGlobeIllustration() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '340px',
      borderRadius: 'var(--radius-xl)',
      backgroundColor: 'var(--color-surface-soft)',
      border: '1px solid var(--color-hairline)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '24px'
    }}>
      {/* Background Soft Floating Gradients */}
      <div style={{
        position: 'absolute',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 77, 139, 0.25) 0%, rgba(255, 250, 240, 0) 70%)',
        top: '-40px',
        right: '-40px'
      }} className="pulse-glow" />

      <div style={{
        position: 'absolute',
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232, 185, 74, 0.25) 0%, rgba(255, 250, 240, 0) 70%)',
        bottom: '-50px',
        left: '-30px'
      }} className="pulse-glow" />

      {/* Main 3D Vector Artwork */}
      <svg viewBox="0 0 500 400" style={{ width: '100%', maxHeight: '360px' }} className="floating-element">
        <defs>
          <linearGradient id="indiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9933" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#138808" />
          </linearGradient>

          <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a3a3a" />
            <stop offset="100%" stopColor="#0a1a1a" />
          </linearGradient>

          <filter id="shadowEffect" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0a0a0a" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Globe Base Sphere */}
        <circle cx="250" cy="200" r="140" fill="url(#globeGrad)" filter="url(#shadowEffect)" />

        {/* Grid Lines */}
        <ellipse cx="250" cy="200" rx="140" ry="40" fill="none" stroke="#a4d4c5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
        <ellipse cx="250" cy="200" rx="40" ry="140" fill="none" stroke="#a4d4c5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
        <line x1="110" y1="200" x2="390" y2="200" stroke="#a4d4c5" strokeWidth="1.5" opacity="0.5" />
        <line x1="250" y1="60" x2="250" y2="340" stroke="#a4d4c5" strokeWidth="1.5" opacity="0.5" />

        {/* Floating Rank Pill Badges */}
        <g transform="translate(110, 80)" filter="url(#shadowEffect)">
          <rect width="110" height="36" rx="18" fill="#ff4d8b" />
          <text x="55" y="23" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Nominal GDP #5</text>
        </g>

        <g transform="translate(290, 60)" filter="url(#shadowEffect)">
          <rect width="110" height="36" rx="18" fill="#e8b94a" />
          <text x="55" y="23" fill="#0a0a0a" fontSize="13" fontWeight="bold" textAnchor="middle">GDP Growth #1</text>
        </g>

        <g transform="translate(70, 260)" filter="url(#shadowEffect)">
          <rect width="120" height="36" rx="18" fill="#b8a4ed" />
          <text x="60" y="23" fill="#0a0a0a" fontSize="13" fontWeight="bold" textAnchor="middle">STEM Talent #2</text>
        </g>

        <g transform="translate(300, 280)" filter="url(#shadowEffect)">
          <rect width="120" height="36" rx="18" fill="#ffb084" />
          <text x="60" y="23" fill="#0a0a0a" fontSize="13" fontWeight="bold" textAnchor="middle">Innovation #39</text>
        </g>

        {/* Center Glowing India Pin Icon */}
        <g transform="translate(230, 160)" filter="url(#shadowEffect)">
          <circle cx="20" cy="20" r="32" fill="url(#indiaGrad)" />
          <circle cx="20" cy="20" r="12" fill="#000080" />
          <text x="20" y="25" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">🇮🇳</text>
        </g>
      </svg>
    </div>
  );
}
