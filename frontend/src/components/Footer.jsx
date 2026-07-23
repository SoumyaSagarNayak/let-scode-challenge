import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Award, Globe, Database } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-surface-soft)',
      color: 'var(--color-body)',
      borderTop: '1px solid var(--color-hairline)',
      paddingTop: '80px',
      paddingBottom: '40px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        {/* Main Footer Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px' }}>🇮🇳</span>
              <h4 className="title-md" style={{ color: 'var(--color-ink)' }}>India Global Scorecard</h4>
            </div>
            <p className="body-sm" style={{ marginBottom: '16px', color: 'var(--color-muted)' }}>
              Consolidating verified datasets from World Bank, UNDP, WIPO, WEF, WHO, UNESCO, and Yale EPI into an interactive development intelligence dashboard.
            </p>
            <div className="badge-pill">
              <Award size={14} /> Open Data Benchmark Platform
            </div>
          </div>

          {/* Column 2: Core Categories */}
          <div>
            <h5 className="caption-uppercase" style={{ marginBottom: '16px' }}>Core Pillars</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }} className="body-sm">
              <li><Link to="/category/economy">🌍 Economy & Trade</Link></li>
              <li><Link to="/category/society">👥 Society & Well-being</Link></li>
              <li><Link to="/category/governance">🏛 Governance & Rule of Law</Link></li>
              <li><Link to="/category/education">🎓 Education & Skills</Link></li>
              <li><Link to="/category/healthcare">🏥 Healthcare & Life Sciences</Link></li>
              <li><Link to="/category/technology">💻 Technology & Innovation</Link></li>
              <li><Link to="/category/environment">🌱 Environment & Sustainability</Link></li>
              <li><Link to="/category/safety">🛡 Safety & Peace</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform Capabilities */}
          <div>
            <h5 className="caption-uppercase" style={{ marginBottom: '16px' }}>Platform Features</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }} className="body-sm">
              <li><Link to="/dashboard">Hero Scorecard Dashboard</Link></li>
              <li><Link to="/compare">India vs Global Country Comparison</Link></li>
              <li><Link to="/map">Interactive World Choropleth Map</Link></li>
              <li><Link to="/trends">Historical Trend Analysis (2018-2025)</Link></li>
              <li><Link to="/bookmarks">Saved Bookmarks Manager</Link></li>
            </ul>
          </div>

          {/* Column 4: Official Source Attributions (Prompt Listed Sources) */}
          <div>
            <h5 className="caption-uppercase" style={{ marginBottom: '16px' }}>Verified Data Partners</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }} className="body-sm">
              <li><a href="https://data.worldbank.org/" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>World Bank Open Data <ExternalLink size={12} /></a></li>
              <li><a href="https://hdr.undp.org/data-center" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>UNDP Human Development <ExternalLink size={12} /></a></li>
              <li><a href="https://www.wipo.int/global_innovation_index/en/" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>WIPO Global Innovation <ExternalLink size={12} /></a></li>
              <li><a href="https://epi.yale.edu/" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>Yale EPI Environment <ExternalLink size={12} /></a></li>
              <li><a href="https://www.who.int/data/gho" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>WHO Health Observatory <ExternalLink size={12} /></a></li>
              <li><a href="https://uis.unesco.org/" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>UNESCO UIS Education <ExternalLink size={12} /></a></li>
              <li><a href="https://www.transparency.org/en/cpi" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>Transparency International <ExternalLink size={12} /></a></li>
            </ul>
          </div>
        </div>

        {/* Source Attribution Grid Band */}
        <div style={{
          backgroundColor: 'var(--color-canvas)',
          border: '1px solid var(--color-hairline)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Database size={18} style={{ color: 'var(--color-brand-pink)' }} />
            <h5 className="title-sm" style={{ color: 'var(--color-ink)' }}>Complete Official Dataset Directory & Attribution Links</h5>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            fontSize: '12px',
            color: 'var(--color-muted)'
          }}>
            <div>
              <strong style={{ color: 'var(--color-ink)', display: 'block', marginBottom: '4px' }}>🌍 Economy</strong>
              <a href="https://data.worldbank.org/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• World Bank API</a>
              <a href="https://www.imf.org/en/Data" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• IMF WEO Database</a>
              <a href="https://lpi.worldbank.org/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• World Bank LPI</a>
              <a href="https://www.heritage.org/index/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• Heritage Economic Freedom</a>
              <a href="https://unctad.org/topic/investment/world-investment-report" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• UNCTAD FDI Inflows</a>
            </div>

            <div>
              <strong style={{ color: 'var(--color-ink)', display: 'block', marginBottom: '4px' }}>👥 Society & Healthcare</strong>
              <a href="https://hdr.undp.org/data-center" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• UNDP Human Dev (HDI)</a>
              <a href="https://worldhappiness.report/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• World Happiness Report</a>
              <a href="https://www.socialprogress.org/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• Social Progress Index</a>
              <a href="https://www.who.int/data/gho" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• WHO Global Health</a>
              <a href="https://www.numbeo.com/cost-of-living/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• Numbeo Index (Crowdsourced)</a>
            </div>

            <div>
              <strong style={{ color: 'var(--color-ink)', display: 'block', marginBottom: '4px' }}>🏛 Governance & Tech</strong>
              <a href="https://www.transparency.org/en/cpi" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• Transparency Int. CPI</a>
              <a href="https://worldjusticeproject.org/rule-of-law-index/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• WJP Rule of Law Index</a>
              <a href="https://oxfordinsights.com/ai-readiness/government-ai-readiness-index-2025/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• Oxford Insights AI Readiness</a>
              <a href="https://publicadministration.un.org/egovkb/en-us/Data/Country-Information" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• UN E-Government EGDI</a>
              <a href="https://rsf.org/en/index" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• RSF Press Freedom</a>
            </div>

            <div>
              <strong style={{ color: 'var(--color-ink)', display: 'block', marginBottom: '4px' }}>🌱 Environment & Safety</strong>
              <a href="https://epi.yale.edu/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• Yale EPI Environment</a>
              <a href="https://ccpi.org/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• Germanwatch CCPI</a>
              <a href="https://www.visionofhumanity.org/maps/#/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• IEP Global Peace Index</a>
              <a href="https://ourworldindata.org/co2-emissions" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• Our World in Data CO2</a>
              <a href="https://www.weforum.org/publications/global-gender-gap-report-2025/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>• WEF Global Gender Gap</a>
            </div>
          </div>
        </div>

        {/* Bottom Horizon Mountain SVG Art (Clay Signature Graphic) */}
        <div style={{
          position: 'relative',
          paddingTop: '20px',
          borderTop: '1px solid var(--color-hairline)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <svg viewBox="0 0 1200 120" style={{ width: '100%', height: '60px', opacity: 0.25, fill: 'currentColor', color: 'var(--color-primary)' }}>
            <path d="M0,120 L150,40 L300,90 L450,20 L600,80 L750,30 L900,100 L1050,50 L1200,120 Z" />
          </svg>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginTop: '16px'
          }} className="body-sm">
            <span style={{ color: 'var(--color-muted)' }}>
              © {new Date().getFullYear()} India Global Scorecard. Public Development Intelligence Platform.
            </span>
            <span style={{ color: 'var(--color-muted)' }}>
              Built with React, Recharts, Express & Vercel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
