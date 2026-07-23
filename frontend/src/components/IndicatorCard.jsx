import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bookmark, ExternalLink } from 'lucide-react';
import { formatRank, formatNumber } from '../utils/formatters';
import { useBookmarks } from '../hooks/useBookmarks';

export default function IndicatorCard({ indicator, categoryId, onExplainAi }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(indicator.id);

  return (
    <div style={{
      backgroundColor: 'var(--color-canvas)',
      border: '1px solid var(--color-hairline)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform 0.2s ease, border-color 0.2s ease',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
    }} className="indicator-card-hover">
      {/* Top Header */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <span className="caption-uppercase" style={{ color: 'var(--color-muted)' }}>
            {indicator.category || 'Global Indicator'}
          </span>
          <button
            onClick={() => toggleBookmark(indicator)}
            title={bookmarked ? "Remove bookmark" : "Bookmark indicator"}
            style={{
              color: bookmarked ? 'var(--color-brand-pink)' : 'var(--color-muted)',
              cursor: 'pointer',
              padding: '4px'
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

        {/* Source Attribution Badge Link */}
        {indicator.source && (
          <div style={{ marginBottom: '16px' }}>
            <a
              href={indicator.source_url}
              target="_blank"
              rel="noreferrer"
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
                border: '1px solid var(--color-hairline)'
              }}
            >
              <span>Source: {indicator.source}</span>
              <ExternalLink size={10} />
            </a>
          </div>
        )}
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
              / {indicator.total_countries}
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
          onClick={() => onExplainAi && onExplainAi(indicator)}
          className="btn-secondary"
          style={{ height: '36px', padding: '6px 12px', fontSize: '12px' }}
        >
          ✨ Explain AI
        </button>

        <Link
          to={`/indicator/${indicator.id}`}
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
