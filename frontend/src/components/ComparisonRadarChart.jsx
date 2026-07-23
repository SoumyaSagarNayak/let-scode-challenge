import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function ComparisonRadarChart({ data, targetCountry = 'USA' }) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ width: '100%', height: '360px', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="var(--color-hairline)" />
          <PolarAngleAxis dataKey="categoryName" stroke="var(--color-ink)" tick={{ fontSize: 11, fontWeight: 500 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="var(--color-muted)" tick={{ fontSize: 10 }} />

          <Radar
            name="India 🇮🇳"
            dataKey="indiaScore"
            stroke="var(--color-brand-pink)"
            fill="var(--color-brand-pink)"
            fillOpacity={0.4}
          />
          <Radar
            name={`${targetCountry}`}
            dataKey="targetScore"
            stroke="var(--color-brand-teal)"
            fill="var(--color-brand-teal)"
            fillOpacity={0.3}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-canvas)',
              borderColor: 'var(--color-hairline)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-clay)'
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
