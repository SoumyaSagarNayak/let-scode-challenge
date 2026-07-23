import React, { useEffect, useState } from 'react';
import { Sparkles, Download, Printer, Award } from 'lucide-react';
import { fetchDashboard, fetchAiSummary } from '../services/api';
import { exportToCSV, triggerPDFPrint } from '../utils/exportUtils';
import { formatRank } from '../utils/formatters';

export default function AnnualReportCardPage() {
  const [year, setYear] = useState(2024);
  const [data, setData] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    fetchDashboard().then(setData).catch(console.error);
  }, []);

  const handleGenerateAi = async () => {
    setLoadingAi(true);
    try {
      const res = await fetchAiSummary({
        indicatorName: `India National Annual Report Card (${year})`,
        categoryName: 'All Pillars'
      });
      setAiSummary(res.summary || 'Summary generated.');
    } catch (e) {
      setAiSummary('AI generation failed.');
    } finally {
      setLoadingAi(false);
    }
  };

  const handleExportCSV = () => {
    if (!data || !data.categories) return;
    const csvRows = data.categories.map(c => ({
      Year: year,
      Category: c.name,
      Indicator_Count: c.indicatorCount,
      Average_Global_Rank: c.avgRank,
      Description: c.description
    }));
    exportToCSV(`India_Global_Report_Card_${year}`, csvRows);
  };

  const reportPillars = data ? data.categories : [];

  return (
    <div className="container section-padding print-area">
      {/* Header Banner */}
      <div style={{
        backgroundColor: 'var(--color-brand-teal)',
        color: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: '40px',
        marginBottom: '36px',
        boxShadow: 'var(--shadow-clay)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="badge-pill" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', border: 'none', marginBottom: '16px' }}>
              <Award size={14} /> Official National Benchmark Intelligence
            </div>
            <h1 className="display-lg" style={{ color: '#ffffff', marginBottom: '12px' }}>
              India Annual Report Card ({year})
            </h1>
            <p className="body-md" style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '580px' }}>
              Executive score synthesis across 10 global development dimensions including GDP, Innovation, STEM, Healthcare, and Digital Infrastructure.
            </p>
          </div>

          {/* Grade Badge */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px 32px',
            textAlign: 'center',
            minWidth: '220px',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <span style={{ fontSize: '12px', opacity: 0.85, display: 'block' }}>National Performance Index</span>
            <span style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-1px' }}>A-</span>
            <span style={{ fontSize: '13px', opacity: 0.9, display: 'block', marginTop: '2px' }}>
              Score: 78 / 100
            </span>
          </div>
        </div>

        {/* Year Selector & Action Toolbar */}
        <div className="no-print" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Select Report Year:</span>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              style={{
                height: '38px',
                padding: '0 16px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                backgroundColor: '#ffffff',
                color: '#0a0a0a',
                fontWeight: '700'
              }}
            >
              <option value={2025}>2025 Annual Scorecard</option>
              <option value={2024}>2024 Annual Scorecard</option>
              <option value={2023}>2023 Annual Scorecard</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleGenerateAi} className="btn-on-color" style={{ height: '38px', fontSize: '13px' }}>
              <Sparkles size={15} /> {loadingAi ? 'Generating...' : 'Generate AI Report'}
            </button>
            <button onClick={handleExportCSV} className="btn-on-color" style={{ height: '38px', fontSize: '13px' }}>
              <Download size={15} /> Export CSV
            </button>
            <button onClick={triggerPDFPrint} className="btn-on-color" style={{ height: '38px', fontSize: '13px' }}>
              <Printer size={15} /> Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* AI Synthesis Executive Callout Box */}
      {(aiSummary || loadingAi) && (
        <div style={{
          backgroundColor: 'var(--color-surface-soft)',
          border: '1px solid var(--color-hairline)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Sparkles size={20} style={{ color: 'var(--color-brand-pink)' }} />
            <h3 className="title-md" style={{ color: 'var(--color-ink)' }}>AI Executive Policy Synthesis ({year})</h3>
          </div>
          <div style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'var(--color-ink)',
            whiteSpace: 'pre-line'
          }}>
            {loadingAi ? 'Synthesizing global development vectors...' : aiSummary}
          </div>
        </div>
      )}

      {/* Key Highlights Table */}
      <div style={{ marginBottom: '48px' }}>
        <h2 className="display-sm" style={{ marginBottom: '20px' }}>10-Pillar Performance Matrix</h2>

        <div style={{
          backgroundColor: 'var(--color-canvas)',
          border: '1px solid var(--color-hairline)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-surface-soft)', borderBottom: '1px solid var(--color-hairline)' }}>
                <th style={{ padding: '14px 20px', color: 'var(--color-muted)' }}>Development Pillar</th>
                <th style={{ padding: '14px 20px', color: 'var(--color-muted)' }}>Indicators Tracked</th>
                <th style={{ padding: '14px 20px', color: 'var(--color-muted)' }}>Avg Global Rank</th>
                <th style={{ padding: '14px 20px', color: 'var(--color-muted)' }}>Pillar Rating</th>
                <th style={{ padding: '14px 20px', color: 'var(--color-muted)' }}>Status Trajectory</th>
              </tr>
            </thead>
            <tbody>
              {reportPillars.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--color-ink)' }}>
                    {p.name}
                  </td>
                  <td style={{ padding: '14px 20px' }}>{p.indicatorCount || 4} Metrics</td>
                  <td style={{ padding: '14px 20px', fontWeight: '700' }}>
                    {formatRank(p.avgRank || 45)}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span className="badge-pill">
                      {p.avgRank <= 10 ? '⭐ Tier 1 Global' : p.avgRank <= 40 ? '✅ High Competitiveness' : '🔄 Transforming'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', color: 'var(--color-success)', fontWeight: '600' }}>
                    ↑ Positive Trajectory
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
