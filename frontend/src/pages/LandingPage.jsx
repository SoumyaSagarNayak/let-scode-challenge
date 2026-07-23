import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Globe, Sparkles, ShieldCheck, Award, Layers, Search } from 'lucide-react';
import IndiaGlobeIllustration from '../components/IndiaGlobeIllustration';
import CategoryCard from '../components/CategoryCard';
import StatCard from '../components/StatCard';
import { fetchDashboard } from '../services/api';

export default function LandingPage({ onOpenSearch }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard().then(setData).catch(console.error);
  }, []);

  return (
    <div>
      {/* 1. Hero Band (7-5 Split Grid based on design.md) */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-canvas)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            {/* Left 7 Columns: Display H1 + CTAs */}
            <div>
              <div className="badge-pill" style={{ marginBottom: '20px' }}>
                <Sparkles size={14} /> International Development Intelligence
              </div>

              <h1 className="display-xl" style={{ marginBottom: '24px' }}>
                How is India performing globally?
              </h1>

              <p className="body-md" style={{
                fontSize: '1.25rem',
                color: 'var(--color-body)',
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                Consolidating verified datasets from the World Bank, UNDP, WEF, WHO, WIPO, and Yale EPI into a single interactive dashboard for policy makers, researchers, and global citizens.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Link to="/dashboard" className="btn-primary" style={{ padding: '14px 24px', fontSize: '15px', height: '48px' }}>
                  <span>Explore Dashboard</span>
                  <ArrowRight size={18} />
                </Link>

                <Link to="/compare" className="btn-secondary" style={{ padding: '14px 24px', fontSize: '15px', height: '48px' }}>
                  <Compass size={18} />
                  <span>Compare India vs Countries</span>
                </Link>
              </div>

              {/* Counter Statistics Band */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginTop: '48px',
                paddingTop: '32px',
                borderTop: '1px solid var(--color-hairline)'
              }}>
                <div>
                  <span style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-ink)', display: 'block' }}>10</span>
                  <span className="body-sm" style={{ color: 'var(--color-muted)' }}>Core Global Dimensions</span>
                </div>
                <div>
                  <span style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-ink)', display: 'block' }}>16</span>
                  <span className="body-sm" style={{ color: 'var(--color-muted)' }}>Benchmark Nations</span>
                </div>
                <div>
                  <span style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-ink)', display: 'block' }}>2018-2025</span>
                  <span className="body-sm" style={{ color: 'var(--color-muted)' }}>Historical Timeline</span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: 3D Illustration Card */}
            <div>
              <IndiaGlobeIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Highlight Stats Grid */}
      {data && (
        <section style={{ padding: '48px 0', backgroundColor: 'var(--color-surface-soft)', borderTop: '1px solid var(--color-hairline)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <span className="caption-uppercase">Key Global Pillars</span>
                <h2 className="display-sm">India Top Global Ranks</h2>
              </div>
              <Link to="/dashboard" className="btn-secondary">View All Metrics</Link>
            </div>

            <div className="grid-3">
              <StatCard
                title="Nominal GDP"
                rank={5}
                totalCountries={195}
                score={3.94}
                unit="Trillion USD"
                trend="improving"
                variant="teal"
              />
              <StatCard
                title="Annual GDP Growth"
                rank={1}
                totalCountries={195}
                score={7.2}
                unit="%"
                trend="improving"
                variant="pink"
              />
              <StatCard
                title="STEM Graduates"
                rank={2}
                totalCountries={150}
                score={2.55}
                unit="M Graduates/yr"
                trend="improving"
                variant="lavender"
              />
            </div>
          </div>
        </section>
      )}

      {/* 3. Category Explorer Showcase */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
            <span className="caption-uppercase">Multi-dimensional Intelligence</span>
            <h2 className="display-lg" style={{ marginBottom: '16px' }}>
              Explore across 10 global pillars
            </h2>
            <p className="body-md" style={{ color: 'var(--color-muted)' }}>
              From economic scale to digital participation and environmental health, dive into comprehensive indicator datasets.
            </p>
          </div>

          <div className="grid-3">
            {data && data.categories && data.categories.slice(0, 6).map((cat, idx) => (
              <CategoryCard key={cat.id} category={cat} index={idx} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/categories" className="btn-primary" style={{ padding: '12px 32px' }}>
              <span>View All 10 Categories</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Illustrated CTA Band (design.md component: cta-band-illustrated) */}
      <section style={{ padding: '60px 0', backgroundColor: 'var(--color-surface-soft)' }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--color-surface-card)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-xl)',
            padding: '60px var(--space-xl)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 className="display-md" style={{ marginBottom: '16px', color: 'var(--color-ink)' }}>
              Ready to analyze global performance?
            </h2>
            <p className="body-md" style={{ maxWidth: '600px', margin: '0 auto 32px', color: 'var(--color-body)' }}>
              Compare India side-by-side with USA, China, Germany, and 12 other major economies across radar charts, historical trendlines, and AI executive summaries.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <Link to="/compare" className="btn-primary" style={{ height: '48px', padding: '0 28px', fontSize: '15px' }}>
                Launch Country Comparison
              </Link>
              <button onClick={onOpenSearch} className="btn-secondary" style={{ height: '48px', padding: '0 28px', fontSize: '15px' }}>
                <Search size={16} /> Instant Search
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
