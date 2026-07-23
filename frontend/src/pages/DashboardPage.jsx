import React, { useEffect, useState } from 'react';
import { Sparkles, Award } from 'lucide-react';
import StatCard from '../components/StatCard';
import CategoryCard from '../components/CategoryCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { fetchDashboard } from '../services/api';
import { formatRank } from '../utils/formatters';

export default function DashboardPage({ onExplainAi }) {
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
        padding: '40px',
        marginBottom: '48px',
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
            <Award size={14} /> Global Development Intelligence Summary
          </span>

          <h1 className="display-lg" style={{ color: '#ffffff', marginBottom: '12px' }}>
            India Global Scorecard
          </h1>

          <p className="body-md" style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '540px' }}>
            Tracking India across {hero.total_indicators} international indicators from World Bank, UNDP, WIPO, and WHO.
          </p>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button
              onClick={() => onExplainAi && onExplainAi(null)}
              className="btn-on-color"
            >
              <Sparkles size={16} /> Explain India's Ranking
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
            <span style={{ fontSize: '12px', opacity: 0.85, display: 'block' }}>Nominal GDP Rank</span>
            <span style={{ fontSize: '32px', fontWeight: '700' }}>{formatRank(hero.gdp_rank)}</span>
          </div>

          <div>
            <span style={{ fontSize: '12px', opacity: 0.85, display: 'block' }}>GDP Growth Rate</span>
            <span style={{ fontSize: '32px', fontWeight: '700' }}>#{hero.gdp_growth_rank || 1}</span>
          </div>

          <div>
            <span style={{ fontSize: '12px', opacity: 0.85, display: 'block' }}>Global Innovation Index</span>
            <span style={{ fontSize: '32px', fontWeight: '700' }}>{formatRank(hero.innovation_rank)}</span>
          </div>

          <div>
            <span style={{ fontSize: '12px', opacity: 0.85, display: 'block' }}>Climate Action (CCPI)</span>
            <span style={{ fontSize: '32px', fontWeight: '700' }}>{formatRank(hero.climate_action_rank)}</span>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span className="caption-uppercase">Top Performing Indicators</span>
            <h2 className="display-sm">India's Strongest Ranks</h2>
          </div>
        </div>

        <div className="grid-3">
          {top_highlights.slice(0, 6).map((item, idx) => (
            <StatCard
              key={item.id}
              title={item.name}
              rank={item.india_rank}
              totalCountries={item.total_countries}
              score={item.india_score}
              unit={item.unit}
              trend={item.india_trend}
              variant={['pink', 'teal', 'lavender', 'peach', 'ochre', 'cream'][idx % 6]}
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
