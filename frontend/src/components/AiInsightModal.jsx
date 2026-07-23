import React, { useState, useEffect } from 'react';
import { Sparkles, X, Copy, Check } from 'lucide-react';
import { fetchAiSummary } from '../services/api';

export default function AiInsightModal({ isOpen, onClose, indicator, compareCountry }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    async function loadSummary() {
      setLoading(true);
      try {
        const payload = indicator ? {
          indicatorName: indicator.name,
          categoryName: indicator.category,
          indiaRank: indicator.india_rank,
          totalCountries: indicator.total_countries,
          indiaScore: indicator.india_score,
          unit: indicator.unit
        } : {
          compareCountry
        };

        const res = await fetchAiSummary(payload);
        setSummary(res.summary || 'Summary unavailable.');
      } catch (err) {
        setSummary('AI Service unavailable. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, [isOpen, indicator, compareCountry]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(10, 10, 10, 0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-xl)',
        width: '100%',
        maxWidth: '640px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card-hover)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          backgroundColor: 'var(--color-brand-pink)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="title-md" style={{ color: '#ffffff' }}>
                AI Strategic Insight
              </h3>
              <span style={{ fontSize: '12px', opacity: 0.85 }}>
                {indicator ? indicator.name : `India vs ${compareCountry || 'Global'}`} Analysis
              </span>
            </div>
          </div>

          <button onClick={onClose} style={{ color: '#ffffff' }}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div className="skeleton" style={{ height: '24px', width: '60%', margin: '0 auto 16px' }} />
              <div className="skeleton" style={{ height: '16px', width: '80%', margin: '0 auto 8px' }} />
              <div className="skeleton" style={{ height: '16px', width: '75%', margin: '0 auto' }} />
              <p style={{ marginTop: '20px', fontSize: '13px', color: 'var(--color-muted)' }}>
                Synthesizing economic policy data & strength vectors...
              </p>
            </div>
          ) : (
            <div>
              <div style={{
                backgroundColor: 'var(--color-surface-soft)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                border: '1px solid var(--color-hairline)',
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--color-ink)',
                whiteSpace: 'pre-line',
                marginBottom: '20px'
              }}>
                {summary}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="body-sm" style={{ color: 'var(--color-muted)', fontSize: '12px' }}>
                  ⚡ Executive AI Synthesis (&lt;150 words)
                </span>

                <button onClick={handleCopy} className="btn-secondary" style={{ height: '38px', fontSize: '13px' }}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy Insight'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
