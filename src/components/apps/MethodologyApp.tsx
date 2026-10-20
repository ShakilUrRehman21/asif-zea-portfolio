import React from 'react';
import { METHODOLOGY_DETAILS } from '../../data/portfolioData';
import { BookOpen, Check } from 'lucide-react';

export const MethodologyApp: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '6px' }}>
      <div 
        style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-active)',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <BookOpen size={20} style={{ color: 'var(--accent-green)' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            SECURITY TESTING METHODOLOGIES & STANDARDS
          </h2>
        </div>
        <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          All penetration testing and red-teaming engagements follow standardized, repeatable, and globally recognized assessment frameworks to ensure maximum vulnerability coverage and actionable findings.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
        {METHODOLOGY_DETAILS.map(m => (
          <div
            key={m.id}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div>
              <span className="badge-status" style={{ fontSize: '10px', marginBottom: '8px' }}>
                {m.category}
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {m.title}
              </h3>
            </div>

            <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {m.focus}
            </p>

            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Assessment Vectors:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {m.coverage.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                    <Check size={12} style={{ color: 'var(--accent-green)' }} />
                    <span className="font-sans">{item}</span>
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
