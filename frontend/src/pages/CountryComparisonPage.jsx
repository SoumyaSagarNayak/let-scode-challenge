import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, ShieldCheck, AlertCircle, ArrowRightLeft } from 'lucide-react';
import ComparisonRadarChart from '../components/ComparisonRadarChart';
import ComparisonBarChart from '../components/ComparisonBarChart';
import SkeletonLoader from '../components/SkeletonLoader';
import { fetchCountries, fetchComparison } from '../services/api';
import { COUNTRY_FLAGS } from '../utils/constants';

export default function CountryComparisonPage({ onExplainAi }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const targetCountry = searchParams.get('country') || 'USA';

  const [countries, setCountries] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries().then(setCountries).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchComparison(targetCountry)
      .then(res => {
        setComparison(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [targetCountry]);

  const handleCountryChange = (e) => {
    setSearchParams({ country: e.target.value });
  };

  return (
    <div className="container section-padding">
      {/* Selector Header */}
      <div style={{
        backgroundColor: 'var(--color-surface-soft)',
        borderRadius: 'var(--radius-xl)',
        padding: '36px',
        border: '1px solid var(--color-hairline)',
        marginBottom: '48px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px'
      }}>
        <div>
          <span className="caption-uppercase">Country vs Country Intelligence</span>
          <h1 className="display-lg" style={{ color: 'var(--color-ink)', marginTop: '4px' }}>
            India vs {targetCountry} {COUNTRY_FLAGS[targetCountry] || ''}
          </h1>
          <p className="body-md" style={{ color: 'var(--color-muted)', marginTop: '8px' }}>
            Comparative analysis across 10 global development categories.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--color-canvas)', padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-hairline)' }}>
            <span style={{ fontSize: '20px' }}>🇮🇳</span>
            <span style={{ fontWeight: '700' }}>India</span>
          </div>

          <ArrowRightLeft size={20} style={{ color: 'var(--color-muted)' }} />

          <select
            value={targetCountry}
            onChange={handleCountryChange}
            style={{
              height: '44px',
              padding: '0 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-hairline)',
              backgroundColor: 'var(--color-canvas)',
              color: 'var(--color-ink)',
              fontWeight: '600',
              fontSize: '15px'
            }}
          >
            {countries.filter(c => c.name !== 'India').map(c => (
              <option key={c.name} value={c.name}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>

          <button onClick={() => onExplainAi && onExplainAi(null, targetCountry)} className="btn-primary">
            <Sparkles size={16} /> Explain AI
          </button>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader count={4} />
      ) : (
        <div>
          {/* Charts Row */}
          <div className="grid-2" style={{ marginBottom: '48px' }}>
            <div style={{
              backgroundColor: 'var(--color-canvas)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-xl)',
              padding: '24px'
            }}>
              <h3 className="title-md" style={{ marginBottom: '16px', color: 'var(--color-ink)' }}>
                Multi-pillar Radar Profile
              </h3>
              <ComparisonRadarChart data={comparison.categoryScores} targetCountry={targetCountry} />
            </div>

            <div style={{
              backgroundColor: 'var(--color-canvas)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-xl)',
              padding: '24px'
            }}>
              <h3 className="title-md" style={{ marginBottom: '16px', color: 'var(--color-ink)' }}>
                Indicator Global Ranks Comparison
              </h3>
              <ComparisonBarChart
                data={comparison.strengths.concat(comparison.weaknesses).slice(0, 6)}
                targetCountry={targetCountry}
              />
            </div>
          </div>

          {/* Strengths & Weaknesses Split Columns */}
          <div className="grid-2">
            {/* India Strengths Column */}
            <div style={{
              backgroundColor: 'var(--color-surface-soft)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-xl)',
              padding: '32px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <ShieldCheck size={24} style={{ color: 'var(--color-success)' }} />
                <h3 className="title-lg" style={{ color: 'var(--color-ink)' }}>
                  India Strengths vs {targetCountry} ({comparison.strengths.length})
                </h3>
              </div>

              {comparison.strengths.length === 0 ? (
                <p className="body-sm" style={{ color: 'var(--color-muted)' }}>No direct outrank indicators in dataset.</p>
              ) : (
                comparison.strengths.map((item, idx) => (
                  <div key={idx} style={{
                    backgroundColor: 'var(--color-canvas)',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span className="title-sm" style={{ color: 'var(--color-ink)' }}>{item.indicator}</span>
                      <span className="caption-uppercase">{item.category}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', marginTop: '8px' }}>
                      <span style={{ color: 'var(--color-success)', fontWeight: '700' }}>
                        🇮🇳 India Rank: #{item.india_rank}
                      </span>
                      <span style={{ color: 'var(--color-muted)' }}>
                        {targetCountry}: #{item.target_rank}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* India Weaknesses / Improvement Column */}
            <div style={{
              backgroundColor: 'var(--color-surface-soft)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-xl)',
              padding: '32px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <AlertCircle size={24} style={{ color: 'var(--color-warning)' }} />
                <h3 className="title-lg" style={{ color: 'var(--color-ink)' }}>
                  Headroom for Reform ({comparison.weaknesses.length})
                </h3>
              </div>

              {comparison.weaknesses.length === 0 ? (
                <p className="body-sm" style={{ color: 'var(--color-muted)' }}>India leads across all tracked indicators.</p>
              ) : (
                comparison.weaknesses.map((item, idx) => (
                  <div key={idx} style={{
                    backgroundColor: 'var(--color-canvas)',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span className="title-sm" style={{ color: 'var(--color-ink)' }}>{item.indicator}</span>
                      <span className="caption-uppercase">{item.category}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', marginTop: '8px' }}>
                      <span style={{ color: 'var(--color-muted)' }}>
                        🇮🇳 India Rank: #{item.india_rank}
                      </span>
                      <span style={{ color: 'var(--color-brand-pink)', fontWeight: '700' }}>
                        {targetCountry}: #{item.target_rank}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
