import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Layers, FileText, Globe } from 'lucide-react';
import { searchGlobal } from '../services/api';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search modal
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchGlobal(query);
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (url) => {
    navigate(url);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(10, 10, 10, 0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '100px'
    }}>
      <div style={{
        backgroundColor: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-xl)',
        width: '100%',
        maxWidth: '640px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card-hover)'
      }}>
        {/* Search Input Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-hairline)',
          gap: '12px'
        }}>
          <Search size={20} style={{ color: 'var(--color-muted)' }} />
          <input
            type="text"
            autoFocus
            placeholder="Search indicators, categories, countries (e.g. GDP, HDI, USA)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '16px',
              color: 'var(--color-ink)'
            }}
          />
          <button onClick={onClose} style={{ color: 'var(--color-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Results Container */}
        <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '12px' }}>
          {loading && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-muted)' }}>
              Searching dataset...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-muted)' }}>
              No matching indicators or countries found for "{query}"
            </div>
          )}

          {!loading && !query && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-muted)', fontSize: '14px' }}>
              Type to instant filter across 10 global categories & 20+ benchmark indicators.
            </div>
          )}

          {results.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(item.url)}
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                marginBottom: '4px',
                transition: 'background-color 0.2s ease'
              }}
              className="search-item-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-surface-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.type === 'category' ? <Layers size={16} /> : item.type === 'country' ? <Globe size={16} /> : <FileText size={16} />}
                </div>

                <div>
                  <h4 className="title-sm" style={{ color: 'var(--color-ink)' }}>{item.title}</h4>
                  <span className="body-sm" style={{ color: 'var(--color-muted)' }}>{item.description}</span>
                </div>
              </div>

              {item.india_rank && (
                <span className="badge-pill">
                  India #{item.india_rank}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
