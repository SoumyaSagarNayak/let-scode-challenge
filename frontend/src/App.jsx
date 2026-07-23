import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import AiInsightModal from './components/AiInsightModal';
import IndicatorDetailModal from './components/IndicatorDetailModal';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import CategoryExplorerPage from './pages/CategoryExplorerPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import CountryComparisonPage from './pages/CountryComparisonPage';
import WorldMapPage from './pages/WorldMapPage';
import HistoricalTrendsPage from './pages/HistoricalTrendsPage';
import IndicatorReportPage from './pages/IndicatorReportPage';
import BookmarksPage from './pages/BookmarksPage';
import AnnualReportCardPage from './pages/AnnualReportCardPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [aiModal, setAiModal] = useState({ isOpen: false, indicator: null, compareCountry: null });
  const [selectedIndicatorModal, setSelectedIndicatorModal] = useState(null);

  const handleOpenAi = (indicator = null, compareCountry = null) => {
    setAiModal({ isOpen: true, indicator, compareCountry });
  };

  const handleCloseAi = () => {
    setAiModal({ isOpen: false, indicator: null, compareCountry: null });
  };

  const handleSelectIndicator = (indicator) => {
    setSelectedIndicatorModal(indicator);
  };

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage onOpenSearch={() => setIsSearchOpen(true)} />} />
            <Route path="/dashboard" element={<DashboardPage onExplainAi={handleOpenAi} onSelectIndicator={handleSelectIndicator} />} />
            <Route path="/categories" element={<CategoryExplorerPage onSelectIndicator={handleSelectIndicator} />} />
            <Route path="/category/:id" element={<CategoryDetailPage onExplainAi={handleOpenAi} onSelectIndicator={handleSelectIndicator} />} />
            <Route path="/compare" element={<CountryComparisonPage onExplainAi={handleOpenAi} />} />
            <Route path="/map" element={<WorldMapPage />} />
            <Route path="/trends" element={<HistoricalTrendsPage />} />
            <Route path="/reports" element={<AnnualReportCardPage />} />
            <Route path="/indicator/:id" element={<IndicatorReportPage onExplainAi={handleOpenAi} />} />
            <Route path="/bookmarks" element={<BookmarksPage onExplainAi={handleOpenAi} onSelectIndicator={handleSelectIndicator} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />

        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <AiInsightModal
          isOpen={aiModal.isOpen}
          onClose={handleCloseAi}
          indicator={aiModal.indicator}
          compareCountry={aiModal.compareCountry}
        />
        <IndicatorDetailModal
          indicator={selectedIndicatorModal}
          onClose={() => setSelectedIndicatorModal(null)}
          onExplainAi={handleOpenAi}
        />
      </div>
    </BrowserRouter>
  );
}
