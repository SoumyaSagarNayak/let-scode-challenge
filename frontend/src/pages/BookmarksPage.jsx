import React from 'react';
import { Bookmark, Trash2 } from 'lucide-react';
import IndicatorCard from '../components/IndicatorCard';
import { useBookmarks } from '../hooks/useBookmarks';

export default function BookmarksPage({ onExplainAi }) {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div className="container section-padding">
      <div style={{ maxWidth: '640px', marginBottom: '40px' }}>
        <span className="caption-uppercase">Saved Analytics</span>
        <h1 className="display-lg" style={{ marginBottom: '12px' }}>
          Saved Indicator Bookmarks ({bookmarks.length})
        </h1>
        <p className="body-md" style={{ color: 'var(--color-muted)' }}>
          Quick access to your pinned global metrics saved locally in your browser.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div style={{
          backgroundColor: 'var(--color-surface-soft)',
          border: '1px solid var(--color-hairline)',
          borderRadius: 'var(--radius-xl)',
          padding: '60px 20px',
          textAlign: 'center'
        }}>
          <Bookmark size={36} style={{ color: 'var(--color-muted)', marginBottom: '16px' }} />
          <h3 className="title-md" style={{ marginBottom: '8px' }}>No saved bookmarks yet</h3>
          <p className="body-sm" style={{ color: 'var(--color-muted)' }}>
            Click the bookmark icon on any indicator card across the app to pin it here.
          </p>
        </div>
      ) : (
        <div className="grid-3">
          {bookmarks.map((ind) => (
            <IndicatorCard key={ind.id} indicator={ind} onExplainAi={onExplainAi} />
          ))}
        </div>
      )}
    </div>
  );
}
