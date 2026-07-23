import React from 'react';
import { Link } from 'react-router-dom';
import { X, ExternalLink, TrendingUp, TrendingDown, Minus, Sparkles, Award, Globe, Users } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { formatRank, formatNumber, formatTrendDelta } from '../utils/formatters';

export default function IndicatorDetailModal({ indicator, onClose, onExplainAi }) {
  if (!indicator) return null;

  const rankings = indicator.rankings || [];
  const sortedRankings = [...rankings].sort((a, b) => a.rank - b.rank);
  const historicalData = indicator.historical_data || [];
  const trendInfo = formatTrendDelta(indicator.india_rank_change, indicator.india_trend);

  // Derive peer rank if missing
  let peerRank = indicator.peer_rank;
  let peerTotal = indicator.peer_total || sortedRankings.length;
  if (!peerRank && sortedRankings.length > 0) {
    const idx = sortedRankings.findIndex(r => r.country && r.country.toLowerCase() === 'india');
    peerRank = idx !== -1 ? idx + 1 : indicator.india_rank;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '20px',
      overflowY: 'auto'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-xl)',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="caption-uppercase" style={{ color: 'var(--color-muted)', backgroundColor: 'var(--color-surface-soft)', padding: '2px 8px', borderRadius: 'var(--radius-xs)' }}>
                {indicator.category || 'Global Metric'}
              </span>
              {indicator.source && (
                <a
                  href={indicator.source_url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    color: 'var(--color-brand-teal)',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  <span>Verify Source: {indicator.source}</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
            <h2 className="title-lg" style={{ color: 'var(--color-ink)', margin: 0 }}>
              {indicator.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--color-surface-soft)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <p className="body-md" style={{ color: 'var(--color-body)', margin: 0, lineHeight: 1.5 }}>
          {indicator.description}
        </p>

        {/* Core Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px'
        }}>
          {/* Global Rank */}
          <div style={{
            backgroundColor: 'var(--color-surface-soft)',
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-hairline)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-muted)', marginBottom: '4px' }}>
              <Globe size={13} />
              <span>Global Rank</span>
            </div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-ink)' }}>
              {formatRank(indicator.india_rank)}
              <span style={{ fontSize: '12px', fontWeight: '400', color: 'var(--color-muted)', marginLeft: '4px' }}>
                / {indicator.total_countries || 195}
              </span>
            </div>
          </div>

          {/* Peer Rank Standing */}
          <div style={{
            backgroundColor: 'rgba(13, 148, 136, 0.08)',
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(13, 148, 136, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-brand-teal)', fontWeight: '600', marginBottom: '4px' }}>
              <Users size={13} />
              <span>Peer Economy Rank</span>
            </div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-brand-teal)' }}>
              {peerRank ? `#${peerRank}` : 'N/A'}
              <span style={{ fontSize: '12px', fontWeight: '600', opacity: 0.8, marginLeft: '4px' }}>
                / {peerTotal || 16} Peers
              </span>
            </div>
          </div>

          {/* Value / Score */}
          <div style={{
            backgroundColor: 'var(--color-surface-soft)',
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-hairline)'
          }}>
            <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginBottom: '4px' }}>
              Current Value
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-ink)' }}>
              {formatNumber(indicator.india_score)} <span style={{ fontSize: '12px', fontWeight: '400' }}>{indicator.unit}</span>
            </div>
          </div>

          {/* Velocity & Micro-Trend */}
          <div style={{
            backgroundColor: trendInfo.type === 'positive' ? 'rgba(34, 197, 94, 0.08)' : trendInfo.type === 'negative' ? 'rgba(239, 68, 68, 0.08)' : 'var(--color-surface-soft)',
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${trendInfo.type === 'positive' ? 'rgba(34, 197, 94, 0.25)' : trendInfo.type === 'negative' ? 'rgba(239, 68, 68, 0.25)' : 'var(--color-hairline)'}`
          }}>
            <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginBottom: '4px' }}>
              Trajectory Delta
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '700',
              color: trendInfo.type === 'positive' ? 'var(--color-success)' : trendInfo.type === 'negative' ? 'var(--color-error)' : 'var(--color-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {trendInfo.label}
            </div>
          </div>
        </div>

        {/* 5-Year Historical Trajectory Mini Chart */}
        {historicalData.length > 0 && (
          <div style={{
            backgroundColor: 'var(--color-surface-soft)',
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-hairline)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-ink)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                📈 Historical Rank Trajectory (2018 - 2025)
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                {indicator.higher_is_better !== false ? 'Lower rank number = better position' : 'Higher rank number = better position'}
              </span>
            </div>
            <div style={{ width: '100%', height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rankGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-brand-pink)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-brand-pink)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'var(--color-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis reversed={true} domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 11, fill: 'var(--color-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-canvas)',
                      border: '1px solid var(--color-hairline)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`Rank #${value}`, 'India Rank']}
                  />
                  <Area type="monotone" dataKey="india_rank" stroke="var(--color-brand-pink)" strokeWidth={2.5} fillOpacity={1} fill="url(#rankGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Peer Snapshot Comparison Table */}
        {sortedRankings.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-ink)', margin: 0 }}>
                📊 Peer Economies Standing ({sortedRankings.length} Benchmark Nations)
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                Sorted by Global Rank
              </span>
            </div>

            <div style={{
              maxHeight: '220px',
              overflowY: 'auto',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-surface-soft)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-hairline)', backgroundColor: 'var(--color-canvas)' }}>
                    <th style={{ padding: '8px 12px', color: 'var(--color-muted)', fontWeight: '600', fontSize: '11px' }}>Global Rank</th>
                    <th style={{ padding: '8px 12px', color: 'var(--color-muted)', fontWeight: '600', fontSize: '11px' }}>Country</th>
                    <th style={{ padding: '8px 12px', color: 'var(--color-muted)', fontWeight: '600', fontSize: '11px', textAlign: 'right' }}>Score / Value</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRankings.map((r, idx) => {
                    const isIndia = r.country && r.country.toLowerCase() === 'india';
                    return (
                      <tr
                        key={r.country}
                        style={{
                          borderBottom: idx !== sortedRankings.length - 1 ? '1px solid var(--color-hairline)' : 'none',
                          backgroundColor: isIndia ? 'rgba(236, 72, 153, 0.12)' : 'transparent',
                          fontWeight: isIndia ? '700' : '400',
                          color: isIndia ? 'var(--color-ink)' : 'var(--color-body)'
                        }}
                      >
                        <td style={{ padding: '8px 12px' }}>
                          <span style={{
                            display: 'inline-block',
                            minWidth: '24px',
                            fontWeight: isIndia ? '800' : '600'
                          }}>
                            #{r.rank}
                          </span>
                        </td>
                        <td style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{r.country}</span>
                          {isIndia && (
                            <span style={{
                              fontSize: '10px',
                              backgroundColor: 'var(--color-brand-pink)',
                              color: '#ffffff',
                              padding: '1px 6px',
                              borderRadius: 'var(--radius-xs)',
                              fontWeight: '700'
                            }}>
                              INDIA
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: '600' }}>
                          {formatNumber(r.score)} {indicator.unit}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingTop: '12px',
          borderTop: '1px solid var(--color-hairline)'
        }}>
          <button
            onClick={() => {
              onClose();
              if (onExplainAi) onExplainAi(indicator);
            }}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}
          >
            <Sparkles size={15} style={{ color: 'var(--color-brand-pink)' }} />
            <span>AI Strategic Insight</span>
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              to={`/indicator/${indicator.id}`}
              onClick={onClose}
              className="btn-primary"
              style={{ fontSize: '13px' }}
            >
              <span>Full Analytics Report →</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
