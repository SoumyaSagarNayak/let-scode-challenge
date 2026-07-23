import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Landmark, GraduationCap, HeartPulse, Cpu, Leaf, ShieldCheck, Scale, Globe } from 'lucide-react';
import { getCategoryCardBg, formatRank } from '../utils/formatters';

const iconMap = {
  TrendingUp, Users, Landmark, GraduationCap, HeartPulse, Cpu, Leaf, ShieldCheck, Scale, Globe
};

export default function CategoryCard({ category, index }) {
  const IconComponent = iconMap[category.icon] || TrendingUp;
  const bgClass = getCategoryCardBg(index);

  return (
    <Link to={`/category/${category.id}`} style={{ textDecoration: 'none' }}>
      <div className={`feature-card ${bgClass}`} style={{ minHeight: '260px' }}>
        {/* Top Icon & Indicator Count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <IconComponent size={22} />
          </div>

          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(4px)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-pill)',
            fontWeight: '600',
            fontSize: '12px'
          }}>
            {category.indicatorCount || 4} Key Metrics
          </span>
        </div>

        {/* Category Info */}
        <div style={{ marginTop: '24px', marginBottom: '16px' }}>
          <h3 className="title-lg" style={{ color: 'inherit', marginBottom: '8px' }}>
            {category.name}
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.5',
            opacity: 0.9,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {category.description}
          </p>
        </div>

        {/* Bottom CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '16px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', opacity: 0.85 }}>
            Avg Rank: {formatRank(category.avgRank || 45)}
          </span>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
