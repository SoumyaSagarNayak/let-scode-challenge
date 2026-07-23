import React from 'react';
import { TrendingUp, TrendingDown, Minus, Users } from 'lucide-react';
import { formatRank, formatNumber, formatTrendDelta } from '../utils/formatters';

export default function StatCard({
  title,
  rank,
  peerRank,
  peerTotal = 16,
  totalCountries = 195,
  score,
  unit = '',
  trend = 'stable',
  rankChange,
  variant = 'pink',
  icon: Icon,
  onClick
}) {
  const trendInfo = formatTrendDelta(rankChange, trend);

  return (
    <div
      className={`feature-card feature-card-${variant}`}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease'
      }}
    >
      {/* Top Row: Icon & Rank Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {Icon && <Icon size={18} />}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {peerRank && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(4px)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-pill)',
              fontWeight: '700',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '3px'
            }}>
              <Users size={10} />
              <span>#{peerRank}/{peerTotal} Peers</span>
            </div>
          )}

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(4px)',
            padding: '3px 10px',
            borderRadius: 'var(--radius-pill)',
            fontWeight: '700',
            fontSize: '13px'
          }}>
            {formatRank(rank)} <span style={{ opacity: 0.75, fontSize: '10px' }}>/ {totalCountries}</span>
          </div>
        </div>
      </div>

      {/* Middle: Title & Value */}
      <div style={{ marginTop: '16px', marginBottom: '12px' }}>
        <h4 className="title-md" style={{ color: 'inherit', marginBottom: '4px', lineHeight: 1.3 }}>{title}</h4>
        <div style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
          {formatNumber(score)} <span style={{ fontSize: '0.85rem', fontWeight: '500', opacity: 0.85 }}>{unit}</span>
        </div>
      </div>

      {/* Bottom: Micro-Trend Velocity Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600' }}>
        <span style={{
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          padding: '2px 8px',
          borderRadius: 'var(--radius-xs)',
          fontSize: '11px'
        }}>
          {trendInfo.label}
        </span>
        <span style={{ opacity: 0.8, fontSize: '11px' }}>Quick Preview →</span>
      </div>
    </div>
  );
}
