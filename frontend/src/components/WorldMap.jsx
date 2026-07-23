import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Country ISO to Name mapping helper
const countryMap = {
  "356": "India",
  "840": "USA",
  "156": "China",
  "392": "Japan",
  "276": "Germany",
  "826": "UK",
  "250": "France",
  "076": "Brazil",
  "124": "Canada",
  "036": "Australia",
  "643": "Russia",
  "410": "South Korea",
  "050": "Bangladesh",
  "586": "Pakistan",
  "144": "Sri Lanka",
  "702": "Singapore"
};

const sampleRanks = {
  India: 5,
  USA: 1,
  China: 2,
  Germany: 3,
  Japan: 4,
  UK: 6,
  France: 7,
  Brazil: 8,
  Canada: 9,
  Australia: 13,
  Russia: 11,
  "South Korea": 14,
  Singapore: 32,
  Bangladesh: 33,
  Pakistan: 46,
  "Sri Lanka": 78
};

const colorScale = scaleLinear()
  .domain([1, 40, 100])
  .range(["#1a3a3a", "#ffb084", "#ff4d8b"]);

export default function WorldMap({ onSelectCountry, selectedIndicator = "Nominal GDP" }) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [position, setPosition] = useState({ coordinates: [20, 20], zoom: 1.2 });

  return (
    <div style={{
      backgroundColor: 'var(--color-canvas)',
      border: '1px solid var(--color-hairline)',
      borderRadius: 'var(--radius-xl)',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-clay)'
    }}>
      {/* Map Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 className="title-lg" style={{ color: 'var(--color-ink)' }}>Interactive Global Choropleth Map</h3>
          <p className="body-sm" style={{ color: 'var(--color-muted)' }}>
            Showing performance distribution for <strong>{selectedIndicator}</strong>. Hover country for details.
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '600' }}>
          <span style={{ color: 'var(--color-muted)' }}>Rank 1</span>
          <div style={{
            width: '100px',
            height: '10px',
            borderRadius: 'var(--radius-pill)',
            background: 'linear-gradient(to right, #1a3a3a, #ffb084, #ff4d8b)'
          }} />
          <span style={{ color: 'var(--color-muted)' }}>Rank 100+</span>
        </div>
      </div>

      {/* Map Canvas */}
      <div style={{ height: '440px', width: '100%', position: 'relative', background: 'var(--color-surface-soft)', borderRadius: 'var(--radius-lg)' }}>
        {tooltipContent && (
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '13px',
            fontWeight: '600',
            zIndex: 10,
            boxShadow: 'var(--shadow-clay)'
          }}>
            {tooltipContent}
          </div>
        )}

        <ComposableMap projectionConfig={{ scale: 140 }}>
          <ZoomableGroup center={position.coordinates} zoom={position.zoom}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = countryMap[geo.id] || geo.properties.name;
                  const isIndia = countryName === "India";
                  const rank = sampleRanks[countryName];
                  const fillColor = isIndia
                    ? "#ff4d8b"
                    : rank
                    ? colorScale(rank)
                    : "var(--color-surface-strong)";

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(
                          `${countryName}${rank ? ` • Rank #${rank}` : ''}`
                        );
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      onClick={() => {
                        if (onSelectCountry && countryName) {
                          onSelectCountry(countryName);
                        }
                      }}
                      style={{
                        default: {
                          fill: fillColor,
                          outline: "none",
                          stroke: "var(--color-canvas)",
                          strokeWidth: 0.5
                        },
                        hover: {
                          fill: isIndia ? "#ff1a66" : "var(--color-brand-ochre)",
                          outline: "none",
                          cursor: "pointer"
                        },
                        pressed: {
                          fill: "var(--color-primary)",
                          outline: "none"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
