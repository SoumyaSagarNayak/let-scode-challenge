import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ComparisonBarChart({ data, targetCountry = 'USA' }) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ width: '100%', height: '360px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-hairline)" />
          <XAxis
            dataKey="indicator"
            stroke="var(--color-muted)"
            tick={{ fontSize: 11 }}
            angle={-25}
            textAnchor="end"
            interval={0}
          />
          <YAxis stroke="var(--color-muted)" tick={{ fontSize: 11 }} label={{ value: 'Global Rank (Lower is Better)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: 'var(--color-muted)' } }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-canvas)',
              borderColor: 'var(--color-hairline)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-clay)'
            }}
          />
          <Legend wrapperStyle={{ top: 0 }} />
          <Bar name="India Rank" dataKey="india_rank" fill="var(--color-brand-pink)" radius={[4, 4, 0, 0]} />
          <Bar name={`${targetCountry} Rank`} dataKey="target_rank" fill="var(--color-brand-teal)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
