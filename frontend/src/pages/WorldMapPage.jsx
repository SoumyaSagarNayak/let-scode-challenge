import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorldMap from '../components/WorldMap';
import { COUNTRY_FLAGS } from '../utils/constants';

export default function WorldMapPage() {
  const [selectedIndicator, setSelectedIndicator] = useState('Gross Domestic Product');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate();

  const handleCountrySelect = (countryName) => {
    setSelectedCountry(countryName);
  };

  const handleCompareClick = () => {
    if (selectedCountry) {
      navigate(`/compare?country=${encodeURIComponent(selectedCountry)}`);
    }
  };

  return (
    <div className="container section-padding">
      <div style={{ maxWidth: '640px', marginBottom: '32px' }}>
        <span className="caption-uppercase">Interactive Map Intelligence</span>
        <h1 className="display-lg" style={{ marginBottom: '12px' }}>
          Global Choropleth Map
        </h1>
        <p className="body-md" style={{ color: 'var(--color-muted)' }}>
          Visualize rank distributions globally across benchmark nations. Click any country to compare against India.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
        {/* Main Map Canvas */}
        <WorldMap onSelectCountry={handleCountrySelect} selectedIndicator={selectedIndicator} />

        {/* Right Leaderboard & Selected Country Profile Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Indicator Dropdown Filter */}
          <div style={{
            backgroundColor: 'var(--color-canvas)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px'
          }}>
            <label className="caption-uppercase" style={{ display: 'block', marginBottom: '8px' }}>
              Select Indicator Layer
            </label>
            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
              style={{
                width: '100%',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-hairline)',
                padding: '0 12px',
                backgroundColor: 'var(--color-surface-soft)',
                color: 'var(--color-ink)',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              <option value="Gross Domestic Product">Nominal GDP</option>
              <option value="Annual GDP Growth">Annual GDP Growth Rate</option>
              <option value="Human Development Index">Human Development (HDI)</option>
              <option value="Global Innovation Index">Global Innovation Index (GII)</option>
              <option value="Universal Health Coverage">Universal Health Coverage (UHC)</option>
              <option value="Climate Action (CCPI)">Climate Action (CCPI)</option>
            </select>
          </div>

          {/* Country Selection Drawer Card */}
          <div style={{
            backgroundColor: 'var(--color-surface-soft)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <span className="caption-uppercase">Country Inspection</span>
              {selectedCountry ? (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '32px' }}>{COUNTRY_FLAGS[selectedCountry] || '🌐'}</span>
                    <h3 className="title-lg" style={{ color: 'var(--color-ink)' }}>{selectedCountry}</h3>
                  </div>

                  <p className="body-sm" style={{ color: 'var(--color-body)', marginBottom: '20px' }}>
                    Selected for comparative analytics with India 🇮🇳 across 10 global development indicators.
                  </p>
                </div>
              ) : (
                <p className="body-sm" style={{ color: 'var(--color-muted)', marginTop: '16px' }}>
                  Click any country on the choropleth map to inspect its profile and launch a side-by-side comparison.
                </p>
              )}
            </div>

            {selectedCountry && (
              <button onClick={handleCompareClick} className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                Compare India vs {selectedCountry}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
