import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Bookmark, Sparkles, Award } from 'lucide-react';
import TrendLineChart from '../components/TrendLineChart';
import SkeletonLoader from '../components/SkeletonLoader';
import { fetchCategoryById } from '../services/api';
import { useBookmarks } from '../hooks/useBookmarks';
import { formatRank, formatNumber } from '../utils/formatters';

export default function IndicatorReportPage({ onExplainAi }) {
  const { id } = useParams();
  const [indicator, setIndicator] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    // Search across categories for this indicator ID
    async function loadIndicator() {
      setLoading(true);
      const categoryIds = ['economy', 'society', 'governance', 'education', 'healthcare', 'technology', 'environment', 'safety', 'equality', 'digital_government'];

      for (const catId of categoryIds) {
        try {
          const cat = await fetchCategoryById(catId);
          if (cat && cat.indicators) {
            const found = cat.indicators.find(i => i.id === id);
            if (found) {
              setIndicator(found);
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          // continue search
        }
      }
      setLoading(false);
    }

    loadIndicator();
  }, [id]);

  if (loading) return <div className="container section-padding"><SkeletonLoader count={4} /></div>;
  if (!indicator) return <div className="container section-padding">Indicator report not found</div>;

  const bookmarked = isBookmarked(indicator.id);

  return (
    <div className="container section-padding">
      <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-muted)', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      {/* Main Indicator Banner Header */}
      <div style={{
        backgroundColor: 'var(--color-surface-soft)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-xl)',
        padding: '40px',
        marginBottom: '48px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span className="caption-uppercase" style={{ color: 'var(--color-muted)' }}>
                Official Indicator Report
              </span>
              <button
                onClick={() => toggleBookmark(indicator)}
                style={{ cursor: 'pointer', color: bookmarked ? 'var(--color-brand-pink)' : 'var(--color-muted)' }}
              >
                <Bookmark size={18} fill={bookmarked ? 'var(--color-brand-pink)' : 'none'} />
              </button>
            </div>

            <h1 className="display-lg" style={{ marginBottom: '16px', color: 'var(--color-ink)' }}>
              {indicator.name}
            </h1>

            <p className="body-md" style={{ maxWidth: '680px', color: 'var(--color-body)', marginBottom: '24px' }}>
              {indicator.description}
            </p>

            <a
              href={indicator.source_url}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-muted)', fontWeight: '600' }}
            >
              Source: {indicator.source} <ExternalLink size={14} />
            </a>
          </div>

          <div style={{
            backgroundColor: 'var(--color-canvas)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            textAlign: 'center',
            minWidth: '200px'
          }}>
            <span style={{ fontSize: '12px', color: 'var(--color-muted)', display: 'block' }}>India Global Rank</span>
            <span style={{ fontSize: '40px', fontWeight: '700', color: 'var(--color-brand-pink)', letterSpacing: '-1px' }}>
              {formatRank(indicator.india_rank)}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-muted)', display: 'block', marginTop: '4px' }}>
              Out of {indicator.total_countries} Nations
            </span>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div style={{
        backgroundColor: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        marginBottom: '48px'
      }}>
        <h3 className="title-md" style={{ marginBottom: '12px', color: 'var(--color-ink)' }}>
          Methodology & Scoring Standard
        </h3>
        <p className="body-sm" style={{ color: 'var(--color-body)', lineHeight: '1.6' }}>
          {indicator.methodology}
        </p>
      </div>

      {/* Historical Trend Chart */}
      {indicator.historical_data && (
        <div style={{ marginBottom: '48px' }}>
          <h2 className="display-sm" style={{ marginBottom: '20px' }}>Historical Trajectory</h2>
          <TrendLineChart
            data={indicator.historical_data}
            title={`${indicator.name} (2018 - 2025)`}
            unit={indicator.unit}
            isRank={true}
          />
        </div>
      )}

      {/* Global Ranking Table */}
      {indicator.rankings && (
        <div>
          <h2 className="display-sm" style={{ marginBottom: '20px' }}>Global Leaderboard Benchmark</h2>
          <div style={{
            backgroundColor: 'var(--color-canvas)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-surface-soft)', borderBottom: '1px solid var(--color-hairline)' }}>
                  <th style={{ padding: '12px 20px', color: 'var(--color-muted)' }}>Rank</th>
                  <th style={{ padding: '12px 20px', color: 'var(--color-muted)' }}>Country</th>
                  <th style={{ padding: '12px 20px', color: 'var(--color-muted)' }}>Metric / Value</th>
                </tr>
              </thead>
              <tbody>
                {indicator.rankings.map((r, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid var(--color-hairline)',
                      backgroundColor: r.country === 'India' ? 'rgba(255, 77, 139, 0.08)' : 'transparent',
                      fontWeight: r.country === 'India' ? '700' : '400'
                    }}
                  >
                    <td style={{ padding: '12px 20px' }}>{formatRank(r.rank)}</td>
                    <td style={{ padding: '12px 20px' }}>{r.country} {r.country === 'India' ? '🇮🇳' : ''}</td>
                    <td style={{ padding: '12px 20px' }}>{formatNumber(r.score)} {indicator.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
