import React, { useEffect, useState, useMemo } from 'react';
import CategoryCard from '../components/CategoryCard';
import IndicatorCard from '../components/IndicatorCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { fetchCategories } from '../services/api';
import { Search, Layers, Grid } from 'lucide-react';

export default function CategoryExplorerPage({ onSelectIndicator }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPill, setSelectedPill] = useState('ALL');
  const [viewMode, setViewMode] = useState('pillars'); // 'pillars' or 'indicators'

  useEffect(() => {
    fetchCategories()
      .then(res => {
        setCategories(res || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Extract all indicators across categories
  const allIndicators = useMemo(() => {
    const list = [];
    categories.forEach(cat => {
      if (cat.indicators && Array.isArray(cat.indicators)) {
        cat.indicators.forEach(ind => {
          list.push({
            ...ind,
            category: cat.name,
            categoryId: cat.id
          });
        });
      }
    });
    return list;
  }, [categories]);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return categories.filter(cat =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  // Filtered indicators
  const filteredIndicators = useMemo(() => {
    return allIndicators.filter(ind => {
      const matchesSearch =
        ind.name.toLowerCase().includes(search.toLowerCase()) ||
        (ind.short_name && ind.short_name.toLowerCase().includes(search.toLowerCase())) ||
        (ind.description && ind.description.toLowerCase().includes(search.toLowerCase())) ||
        (ind.source && ind.source.toLowerCase().includes(search.toLowerCase()));

      const matchesPill = selectedPill === 'ALL' || ind.categoryId.toLowerCase() === selectedPill.toLowerCase();

      return matchesSearch && matchesPill;
    });
  }, [allIndicators, search, selectedPill]);

  return (
    <div className="container section-padding">
      <div style={{ maxWidth: '720px', marginBottom: '32px' }}>
        <span className="caption-uppercase">Global Scorecard Explorer</span>
        <h1 className="display-lg" style={{ marginBottom: '12px', color: 'var(--color-ink)' }}>
          Explore India by Pillar & Indicator
        </h1>
        <p className="body-md" style={{ color: 'var(--color-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
          Filter through 10 developmental pillars and 40+ multilateral metrics with real-time benchmark standings and micro-trend indicators.
        </p>

        {/* View Mode Toggle Switch & Search */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            {/* View Mode Switcher */}
            <div style={{
              display: 'inline-flex',
              backgroundColor: 'var(--color-surface-soft)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-hairline)'
            }}>
              <button
                onClick={() => setViewMode('pillars')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'pillars' ? 'var(--color-canvas)' : 'transparent',
                  color: viewMode === 'pillars' ? 'var(--color-ink)' : 'var(--color-muted)',
                  boxShadow: viewMode === 'pillars' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <Grid size={15} />
                <span>10 Pillars Grid</span>
              </button>
              <button
                onClick={() => setViewMode('indicators')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'indicators' ? 'var(--color-canvas)' : 'transparent',
                  color: viewMode === 'indicators' ? 'var(--color-ink)' : 'var(--color-muted)',
                  boxShadow: viewMode === 'indicators' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <Layers size={15} />
                <span>All Indicators ({allIndicators.length})</span>
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
            <input
              type="text"
              placeholder={viewMode === 'pillars' ? "Filter pillars (e.g. Economy, Healthcare)..." : "Search metrics (e.g. GDP, Innovation, Literacy)..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-hairline)',
                paddingLeft: '44px',
                paddingRight: '16px',
                backgroundColor: 'var(--color-canvas)',
                color: 'var(--color-ink)',
                fontSize: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
            />
          </div>

          {/* Category Filter Pills (When in All Indicators Mode or searching) */}
          {viewMode === 'indicators' && (
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              <button
                onClick={() => setSelectedPill('ALL')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: '1px solid var(--color-hairline)',
                  cursor: 'pointer',
                  backgroundColor: selectedPill === 'ALL' ? 'var(--color-ink)' : 'var(--color-canvas)',
                  color: selectedPill === 'ALL' ? 'var(--color-canvas)' : 'var(--color-body)',
                  whiteSpace: 'nowrap'
                }}
              >
                All Pillars ({allIndicators.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedPill(cat.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '12px',
                    fontWeight: '600',
                    border: '1px solid var(--color-hairline)',
                    cursor: 'pointer',
                    backgroundColor: selectedPill === cat.id ? 'var(--color-ink)' : 'var(--color-canvas)',
                    color: selectedPill === cat.id ? 'var(--color-canvas)' : 'var(--color-body)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <SkeletonLoader count={6} type="grid" />
      ) : viewMode === 'pillars' ? (
        <div className="grid-3">
          {filteredCategories.map((cat, idx) => (
            <CategoryCard key={cat.id} category={cat} index={idx} />
          ))}
        </div>
      ) : (
        <div>
          {filteredIndicators.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-lg)' }}>
              <p className="body-lg" style={{ color: 'var(--color-muted)' }}>No metrics found matching "{search}".</p>
            </div>
          ) : (
            <div className="grid-3">
              {filteredIndicators.map(ind => (
                <IndicatorCard
                  key={ind.id}
                  indicator={ind}
                  onSelectIndicator={onSelectIndicator}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
