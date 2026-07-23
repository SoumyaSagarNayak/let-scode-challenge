import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('scorecard_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('scorecard_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (indicator) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === indicator.id)) return prev;
      return [...prev, indicator];
    });
  };

  const removeBookmark = (indicatorId) => {
    setBookmarks(prev => prev.filter(b => b.id !== indicatorId));
  };

  const isBookmarked = (indicatorId) => {
    return bookmarks.some(b => b.id === indicatorId);
  };

  const toggleBookmark = (indicator) => {
    if (isBookmarked(indicator.id)) {
      removeBookmark(indicator.id);
    } else {
      addBookmark(indicator);
    }
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark };
}
