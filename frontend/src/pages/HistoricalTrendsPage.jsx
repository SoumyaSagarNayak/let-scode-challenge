import React, { useState } from 'react';
import TrendLineChart from '../components/TrendLineChart';

const mockHistoricalData = [
  { year: 2018, india_rank: 7, india_score: 2.70, top_score: 20.53 },
  { year: 2019, india_rank: 7, india_score: 2.87, top_score: 21.38 },
  { year: 2020, india_rank: 6, india_score: 2.67, top_score: 21.06 },
  { year: 2021, india_rank: 6, india_score: 3.15, top_score: 23.32 },
  { year: 2022, india_rank: 5, india_score: 3.42, top_score: 25.46 },
  { year: 2023, india_rank: 5, india_score: 3.65, top_score: 27.36 },
  { year: 2024, india_rank: 5, india_score: 3.94, top_score: 28.78 },
  { year: 2025, india_rank: 4, india_score: 4.25, top_score: 29.80 }
];

export default function HistoricalTrendsPage() {
  const [startYear, setStartYear] = useState(2018);
  const [endYear, setEndYear] = useState(2025);

  const filteredData = mockHistoricalData.filter(
    d => d.year >= startYear && d.year <= endYear
  );

  return (
    <div className="container section-padding">
      <div style={{ maxWidth: '640px', marginBottom: '40px' }}>
        <span className="caption-uppercase">Historical Analytics</span>
        <h1 className="display-lg" style={{ marginBottom: '12px' }}>
          Historical Trends (2018 - 2025)
        </h1>
        <p className="body-md" style={{ color: 'var(--color-muted)' }}>
          Track trajectory changes, rank jumps, and structural progress of India across time.
        </p>
      </div>

      {/* Year Range Controls */}
      <div style={{
        backgroundColor: 'var(--color-surface-soft)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        marginBottom: '36px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px'
      }}>
        <div>
          <span className="caption-uppercase" style={{ display: 'block', marginBottom: '4px' }}>Start Year</span>
          <select
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
            style={{ padding: '8px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-hairline)', backgroundColor: 'var(--color-canvas)', color: 'var(--color-ink)' }}
          >
            {[2018, 2019, 2020, 2021, 2022, 2023, 2024].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div>
          <span className="caption-uppercase" style={{ display: 'block', marginBottom: '4px' }}>End Year</span>
          <select
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
            style={{ padding: '8px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-hairline)', backgroundColor: 'var(--color-canvas)', color: 'var(--color-ink)' }}
          >
            {[2019, 2020, 2021, 2022, 2023, 2024, 2025].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <span className="caption-uppercase">Rank Jump</span>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-brand-pink)' }}>
            +3 Positions (#7 → #4)
          </div>
        </div>
      </div>

      {/* Chart */}
      <TrendLineChart
        data={filteredData}
        title="India Nominal GDP Trajectory (Trillion USD)"
        unit="Trillion USD"
        isRank={true}
      />
    </div>
  );
}
