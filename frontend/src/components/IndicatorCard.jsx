import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bookmark, ExternalLink, Users, Eye } from 'lucide-react';
import { formatRank, formatNumber, formatTrendDelta } from '../utils/formatters';
import { useBookmarks } from '../hooks/useBookmarks';

export default function IndicatorCard({ indicator, categoryId, onExplainAi, onSelectIndicator }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(indicator.id);
  const trendInfo = formatTrendDelta(indicator.india_rank_change, indicator.india_trend);

  // Peer rank calculation fallback if not passed directly
  let peerRank = indicator.peer_rank;
  let peerTotal = indicator.peer_total || (indicator.rankings ? indicator.rankings.length : 16);
  if (!peerRank && indicator.rankings && Array.isArray(indicator.rankings)) {
    const sorted = [...indicator.rankings].sort((a, b) => a.rank - b.rank);
    const idx = sorted.findIndex(r => r.country && r.country.toLowerCase() === 'india');
    if (idx !== -1) peerRank = idx + 1;
  }

  const handleCardClick = (e) => {
    // Don't trigger modal if user clicked directly on interactive elements like bookmark button or source link
    if (e.target.closest('button') || e.target.closest('a')) return;
    if (onSelectIndicator) {
      onSelectIndicator(indicator);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        backgroundColor: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
        cursor: onSelectIndicator ? 'pointer' : 'default',
        position: 'relative'
      }}
      className="indicator-card-hover"
    >
      {/* Top Header */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span className="caption-uppercase" style={{ color: 'var(--color-muted)' }}>
              {indicator.category || 'Global Indicator'}
            </span>
            {peerRank && (
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                color: 'var(--color-brand-teal)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-xs)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}>
                <Users size={10} />
                <span>{peerRank}/{peerTotal} Peers</span>
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(indicator);
            }}
            title={bookmarked ? "Remove bookmark" : "Bookmark indicator"}
            style={{
              color: bookmarked ? 'var(--color-brand-pink)' : 'var(--color-muted)',
              cursor: 'pointer',
              padding: '4px',
              border: 'none',
              background: 'none'
            }}
          >
            <Bookmark size={18} fill={bookmarked ? 'var(--color-brand-pink)' : 'none'} />
          </button>
        </div>

        <h3 className="title-md" style={{ marginBottom: '8px', color: 'var(--color-ink)' }}>
          {indicator.name}
        </h3>

        <p className="body-sm" style={{
          color: 'var(--color-body)',
          marginBottom: '16px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {indicator.description}
        </p>

        {/* Source Attribution Badge Link & Micro Trend */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          {indicator.source ? (
            <a
              href={indicator.source_url || '#'}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                color: 'var(--color-muted)',
                backgroundColor: 'var(--color-surface-soft)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-xs)',
                fontWeight: '600',
                border: '1px solid var(--color-hairline)',
                textDecoration: 'none'
              }}
            >
              <span>Source: {indicator.source}</span>
              <ExternalLink size={10} />
            </a>
          ) : <div />}

          {/* Micro Trend Badge */}
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            padding: '2px 8px',
            borderRadius: 'var(--radius-xs)',
            backgroundColor: trendInfo.type === 'positive' ? 'rgba(34, 197, 94, 0.1)' : trendInfo.type === 'negative' ? 'rgba(239, 68, 68, 0.1)' : 'var(--color-surface-soft)',
            color: trendInfo.type === 'positive' ? 'var(--color-success)' : trendInfo.type === 'negative' ? 'var(--color-error)' : 'var(--color-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px'
          }}>
            {trendInfo.label}
          </span>
        </div>
      </div>

      {/* Center Rank & Score metrics */}
      <div style={{
        backgroundColor: 'var(--color-surface-soft)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--color-muted)', display: 'block' }}>India Global Rank</span>
          <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-ink)' }}>
            {formatRank(indicator.india_rank)}
            <span style={{ fontSize: '12px', fontWeight: '400', color: 'var(--color-muted)', marginLeft: '4px' }}>
              / {indicator.total_countries || 195}
            </span>
          </span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-muted)', display: 'block' }}>Value / Score</span>
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-ink)' }}>
            {formatNumber(indicator.india_score)} {indicator.unit}
          </span>
        </div>
      </div>

      {/* Footer CTA & Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectIndicator) {
              onSelectIndicator(indicator);
            } else if (onExplainAi) {
              onExplainAi(indicator);
            }
          }}
          className="btn-secondary"
          style={{ height: '36px', padding: '6px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
        >
          <Eye size={13} />
          <span>Quick Preview</span>
        </button>

        <Link
          to={`/indicator/${indicator.id}`}
          onClick={(e) => e.stopPropagation()}
          className="btn-primary"
          style={{ height: '36px', padding: '6px 12px', fontSize: '12px' }}
        >
          <span>View Report</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
