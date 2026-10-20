import React from 'react';
import { LABS_DATA } from '../../data/portfolioData';
import { Terminal } from 'lucide-react';

export const LabsApp: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '6px' }}>
      {/* Intro */}
      <div 
        style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-active)',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Terminal size={20} style={{ color: 'var(--accent-green)' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            HANDS-ON SECURITY LABS & CONTINUOUS RESEARCH
          </h2>
        </div>
        <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Dedicated continuous learning environments, multi-host Active Directory laboratory simulations, and specialized web security research. All activities conducted within authorized educational frameworks.
        </p>
      </div>

      {/* Lab Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {LABS_DATA.map((lab, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span className="badge-status" style={{ fontSize: '10px', marginBottom: '8px' }}>
                  {lab.focus}
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {lab.platform}
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {lab.keyHighlights.map((hl, hIdx) => (
                  <span
                    key={hIdx}
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(229, 181, 103, 0.1)',
                      color: 'var(--accent-amber)',
                      border: '1px solid var(--border-amber-dim)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {hl}
                  </span>
                ))}
              </div>
            </div>

            <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {lab.description}
            </p>

            {/* Topics covered */}
            <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '14px' }}>
              <div style={{ fontSize: '11px', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Curriculum & Research Vectors:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                {lab.topics.map((topic, tIdx) => (
                  <div key={tIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>›</span>
                    <span className="font-sans">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
