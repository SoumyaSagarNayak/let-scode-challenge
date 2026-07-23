import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { fetchCategories } from '../services/api';

export default function CategoryExplorerPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCategories()
      .then(res => {
        setCategories(res);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    cat.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container section-padding">
      <div style={{ maxWidth: '640px', marginBottom: '40px' }}>
        <span className="caption-uppercase">Category Explorer</span>
        <h1 className="display-lg" style={{ marginBottom: '16px' }}>
          Explore India by Pillar
        </h1>
        <p className="body-md" style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>
          Detailed performance breakdown across Economy, Society, Governance, Education, Healthcare, Technology, Environment, Safety, Equality, and Digital Government.
        </p>

        <input
          type="text"
          placeholder="Filter categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            height: '44px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-hairline)',
            padding: '0 16px',
            backgroundColor: 'var(--color-canvas)',
            color: 'var(--color-ink)'
          }}
        />
      </div>

      {loading ? (
        <SkeletonLoader count={6} type="grid" />
      ) : (
        <div className="grid-3">
          {filteredCategories.map((cat, idx) => (
            <CategoryCard key={cat.id} category={cat} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
