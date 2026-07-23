import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatRank, formatNumber } from '../utils/formatters';

export default function StatCard({
  title,
  rank,
  totalCountries = 195,
  score,
  unit = '',
  trend = 'stable',
  variant = 'pink',
  icon: Icon,
  onClick
}) {
  const getTrendIcon = () => {
    if (trend === 'improving') return <TrendingUp size={16} />;
    if (trend === 'declining') return <TrendingDown size={16} />;
    return <Minus size={16} />;
  };

  return (
    <div
      className={`feature-card feature-card-${variant}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', minHeight: '200px' }}
    >
      {/* Top Row: Icon & Rank Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {Icon && <Icon size={20} />}
        </div>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(4px)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-pill)',
          fontWeight: '700',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {formatRank(rank)} <span style={{ opacity: 0.75, fontSize: '11px' }}>/ {totalCountries}</span>
        </div>
      </div>

      {/* Middle: Title */}
      <div style={{ marginTop: '20px', marginBottom: '16px' }}>
        <h4 className="title-md" style={{ color: 'inherit', marginBottom: '4px' }}>{title}</h4>
        <div style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
          {formatNumber(score)} <span style={{ fontSize: '0.875rem', fontWeight: '500', opacity: 0.85 }}>{unit}</span>
        </div>
      </div>

      {/* Bottom: Trend Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', opacity: 0.9 }}>
        {getTrendIcon()}
        <span style={{ textTransform: 'capitalize' }}>{trend} trajectory</span>
      </div>
    </div>
  );
}
