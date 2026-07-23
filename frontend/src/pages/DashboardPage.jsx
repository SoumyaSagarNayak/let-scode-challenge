import React, { useEffect, useState } from 'react';
import { Sparkles, Award, TrendingUp, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import CategoryCard from '../components/CategoryCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { fetchDashboard } from '../services/api';
import { formatRank } from '../utils/formatters';

export default function DashboardPage({ onExplainAi, onSelectIndicator }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container section-padding">
        <SkeletonLoader count={6} type="grid" />
      </div>
    );
  }

  const { hero, top_highlights, categories } = data;

  return (
    <div className="container section-padding">
      {/* Top Banner & Hero Score */}
      <div style={{
        backgroundColor: 'var(--color-brand-teal)',
        color: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: '36px 40px',
        marginBottom: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px',
        alignItems: 'center',
        boxShadow: 'var(--shadow-clay)'
      }}>
        <div>
          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '12px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '16px'
          }}>
            <Award size={14} /> Global Scorecard Ledger
          </span>

          <h1 className="display-lg" style={{ color: '#ffffff', marginBottom: '12px' }}>
            India Global Scorecard
          </h1>

          <p className="body-md" style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '540px', lineHeight: 1.6 }}>
            Consolidated development index tracking India's trajectory across {hero.total_indicators} multilateral indicators alongside 15 peer economies.
          </p>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button
              onClick={() => onExplainAi && onExplainAi(null)}
              className="btn-on-color"
            >
              <Sparkles size={16} /> Generate AI Executive Digest
            </button>
          </div>
        </div>

        {/* Hero Score Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          backdropFilter: 'blur(8px)'
        }}>
          <div>
            <span style={{ fontSize: '11px', opacity: 0.85, display: 'block' }}>Nominal GDP Rank</span>
            <span style={{ fontSize: '30px', fontWeight: '800' }}>{formatRank(hero.gdp_rank)}</span>
            <span style={{ fontSize: '11px', opacity: 0.75, display: 'block' }}>5/16 Peer Rank</span>
          </div>

          <div>
            <span style={{ fontSize: '11px', opacity: 0.85, display: 'block' }}>GDP Growth Rate</span>
            <span style={{ fontSize: '30px', fontWeight: '800' }}>#1</span>
            <span style={{ fontSize: '11px', opacity: 0.75, display: 'block' }}>1/16 Peer Rank</span>
          </div>

          <div>
            <span style={{ fontSize: '11px', opacity: 0.85, display: 'block' }}>Global Innovation Index</span>
            <span style={{ fontSize: '30px', fontWeight: '800' }}>{formatRank(hero.innovation_rank)}</span>
            <span style={{ fontSize: '11px', opacity: 0.75, display: 'block' }}>6/16 Peer Rank</span>
          </div>

          <div>
            <span style={{ fontSize: '11px', opacity: 0.85, display: 'block' }}>Climate Action (CCPI)</span>
            <span style={{ fontSize: '30px', fontWeight: '800' }}>{formatRank(hero.climate_action_rank)}</span>
            <span style={{ fontSize: '11px', opacity: 0.75, display: 'block' }}>2/16 Peer Rank</span>
          </div>
        </div>
      </div>

      {/* Digestible Executive Insights Box */}
      <div style={{
        backgroundColor: 'var(--color-surface-soft)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px',
        marginBottom: '48px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Sparkles size={20} style={{ color: 'var(--color-brand-pink)' }} />
          <h2 className="title-lg" style={{ margin: 0, color: 'var(--color-ink)' }}>
            Digestible Executive Scorecard Summary
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {/* Strongest Standing */}
          <div style={{
            backgroundColor: 'rgba(34, 197, 94, 0.06)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success)', fontWeight: '700', marginBottom: '12px', fontSize: '14px' }}>
              <ShieldCheck size={18} />
              <span>STRONGEST STANDING (Top Vectors)</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--color-body)', lineHeight: 1.7 }}>
              <li><strong>Nominal GDP (#5 globally, #5 among peers):</strong> Fast-growing $3.94T economy with #1 growth rate (7.2%).</li>
              <li><strong>STEM Graduates (#2 globally, #1 among peers):</strong> Over 34% tertiary graduates in STEM disciplines.</li>
              <li><strong>Renewable & Climate (#10 globally, #2 among peers):</strong> Top 10 performer in Climate Change Performance Index.</li>
              <li><strong>Digital Public Infrastructure (#1 globally):</strong> World leading UPI and digital identity scale.</li>
            </ul>
          </div>

          {/* Needs the Most Work */}
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.06)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-error)', fontWeight: '700', marginBottom: '12px', fontSize: '14px' }}>
              <AlertTriangle size={18} />
              <span>PRIORITY REFORM AREAS (Headroom)</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--color-body)', lineHeight: 1.7 }}>
              <li><strong>Human Development Index (#134 globally, #14 among peers):</strong> Per capita income and healthcare access need sustained reform.</li>
              <li><strong>Gender Gap Index (#129 globally):</strong> Female labor force participation remains a major structural growth opportunity.</li>
              <li><strong>R&D Expenditure (#52 globally):</strong> Gross R&D expenditure at 0.65% GDP vs peer average of 2.1%.</li>
              <li><strong>Logistics Efficiency (#38 globally):</strong> Port & customs clearance speed improving but behind regional peers.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span className="caption-uppercase">Top Performing Indicators</span>
            <h2 className="display-sm">India's Strongest Ranks (Click for Peer Preview)</h2>
          </div>
        </div>

        <div className="grid-3">
          {top_highlights.slice(0, 6).map((item, idx) => (
            <StatCard
              key={item.id}
              title={item.name}
              rank={item.india_rank}
              peerRank={item.peer_rank}
              peerTotal={item.peer_total}
              totalCountries={item.total_countries}
              score={item.india_score}
              unit={item.unit}
              trend={item.india_trend}
              rankChange={item.india_rank_change}
              variant={['pink', 'teal', 'lavender', 'peach', 'ochre', 'cream'][idx % 6]}
              onClick={() => onSelectIndicator && onSelectIndicator(item)}
            />
          ))}
        </div>
      </div>

      {/* Category Overview Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span className="caption-uppercase">10 Core Pillars</span>
            <h2 className="display-sm">Category Scorecards</h2>
          </div>
        </div>

        <div className="grid-3">
          {categories.map((cat, idx) => (
            <CategoryCard key={cat.id} category={cat} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
