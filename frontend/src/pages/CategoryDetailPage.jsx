import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, ExternalLink } from 'lucide-react';
import IndicatorCard from '../components/IndicatorCard';
import TrendLineChart from '../components/TrendLineChart';
import SkeletonLoader from '../components/SkeletonLoader';
import { fetchCategoryById } from '../services/api';
import { formatRank, formatNumber } from '../utils/formatters';

export default function CategoryDetailPage({ onExplainAi }) {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCategoryById(id)
      .then(res => {
        setCategory(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container section-padding"><SkeletonLoader count={4} /></div>;
  if (!category) return <div className="container section-padding">Category not found</div>;

  const firstIndicator = category.indicators && category.indicators[0];

  return (
    <div className="container section-padding">
      <Link to="/categories" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-muted)', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Categories
      </Link>

      {/* Hero Category Banner */}
      <div style={{
        backgroundColor: 'var(--color-surface-soft)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-xl)',
        padding: '40px',
        marginBottom: '48px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span className="caption-uppercase">Category Scorecard</span>
            <h1 className="display-lg" style={{ marginBottom: '16px', color: 'var(--color-ink)' }}>
              {category.name}
            </h1>
            <p className="body-md" style={{ maxWidth: '640px', marginBottom: '24px', color: 'var(--color-body)' }}>
              {category.description}
            </p>
          </div>

          <button onClick={() => onExplainAi && onExplainAi(firstIndicator)} className="btn-primary">
            <Sparkles size={16} /> Explain AI Summary
          </button>
        </div>

        {/* AI Overview Box */}
        {category.ai_summary && (
          <div style={{
            backgroundColor: 'var(--color-canvas)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'var(--color-ink)'
          }}>
            <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--color-brand-pink)' }}>
              ✨ Strategic Overview:
            </strong>
            {category.ai_summary}
          </div>
        )}
      </div>

      {/* Indicator Cards Grid */}
      <div style={{ marginBottom: '60px' }}>
        <h2 className="display-sm" style={{ marginBottom: '24px' }}>Category Indicators</h2>
        <div className="grid-3">
          {category.indicators && category.indicators.map(ind => (
            <IndicatorCard key={ind.id} indicator={ind} categoryId={category.id} onExplainAi={onExplainAi} />
          ))}
        </div>
      </div>

      {/* Trend Line Chart for first indicator */}
      {firstIndicator && firstIndicator.historical_data && (
        <div style={{ marginBottom: '60px' }}>
          <h2 className="display-sm" style={{ marginBottom: '24px' }}>Historical Trajectory</h2>
          <TrendLineChart
            data={firstIndicator.historical_data}
            title={`${firstIndicator.name} (2018 - 2025)`}
            unit={firstIndicator.unit}
            isRank={true}
          />
        </div>
      )}

      {/* Country Rankings Table */}
      {firstIndicator && firstIndicator.rankings && (
        <div>
          <h2 className="display-sm" style={{ marginBottom: '24px' }}>
            Global Country Rankings ({firstIndicator.name})
          </h2>
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
                  <th style={{ padding: '12px 20px', color: 'var(--color-muted)' }}>Score / Metric</th>
                  <th style={{ padding: '12px 20px', color: 'var(--color-muted)' }}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {firstIndicator.rankings.map((r, idx) => (
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
                    <td style={{ padding: '12px 20px' }}>{formatNumber(r.score)} {firstIndicator.unit}</td>
                    <td style={{ padding: '12px 20px', textTransform: 'capitalize' }}>{r.trend}</td>
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
