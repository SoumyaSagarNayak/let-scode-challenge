import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TrendLineChart({ data, title, unit = '', isRank = true }) {
  const [chartType, setChartType] = useState('line');

  if (!data || data.length === 0) return null;

  return (
    <div style={{
      backgroundColor: 'var(--color-canvas)',
      border: '1px solid var(--color-hairline)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h4 className="title-md" style={{ color: 'var(--color-ink)' }}>{title || 'Historical Trajectory (2018 - 2025)'}</h4>
          <span className="body-sm" style={{ color: 'var(--color-muted)' }}>
            {isRank ? 'Global Rank Trend (Lower number indicates higher rank)' : `Numerical Score (${unit})`}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--color-surface-soft)', padding: '4px', borderRadius: 'var(--radius-pill)' }}>
          <button
            onClick={() => setChartType('line')}
            style={{
              padding: '4px 12px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '12px',
              fontWeight: '600',
              backgroundColor: chartType === 'line' ? 'var(--color-primary)' : 'transparent',
              color: chartType === 'line' ? 'var(--color-on-primary)' : 'var(--color-muted)'
            }}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('area')}
            style={{
              padding: '4px 12px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '12px',
              fontWeight: '600',
              backgroundColor: chartType === 'area' ? 'var(--color-primary)' : 'transparent',
              color: chartType === 'area' ? 'var(--color-on-primary)' : 'var(--color-muted)'
            }}
          >
            Area
          </button>
        </div>
      </div>

      <div style={{ width: '100%', height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-hairline)" />
              <XAxis dataKey="year" stroke="var(--color-muted)" tick={{ fontSize: 12 }} />
              <YAxis
                stroke="var(--color-muted)"
                reversed={isRank} // Reverse axis if it's rank so #1 is at top
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-canvas)',
                  borderColor: 'var(--color-hairline)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-clay)'
                }}
              />
              <Legend />
              <Line
                name="India Rank"
                type="monotone"
                dataKey="india_rank"
                stroke="var(--color-brand-pink)"
                strokeWidth={3}
                dot={{ r: 5, fill: 'var(--color-brand-pink)' }}
                activeDot={{ r: 8 }}
              />
              <Line
                name="Global #1 Rank"
                type="monotone"
                dataKey="top_score"
                stroke="var(--color-brand-teal)"
                strokeWidth={2}
                strokeDasharray="4 4"
              />
            </LineChart>
          ) : (
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-brand-pink)" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="var(--color-brand-pink)" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-hairline)" />
              <XAxis dataKey="year" stroke="var(--color-muted)" tick={{ fontSize: 12 }} />
              <YAxis stroke="var(--color-muted)" reversed={isRank} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-canvas)',
                  borderColor: 'var(--color-hairline)',
                  borderRadius: 'var(--radius-md)'
                }}
              />
              <Area type="monotone" dataKey="india_rank" stroke="var(--color-brand-pink)" fillOpacity={1} fill="url(#areaColor)" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
