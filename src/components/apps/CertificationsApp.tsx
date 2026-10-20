import React from 'react';
import { CERTIFICATIONS_DATA } from '../../data/portfolioData';
import { ShieldCheck } from 'lucide-react';

export const CertificationsApp: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '6px' }}>
      {/* Top Banner */}
      <div 
        style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-active)',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <ShieldCheck size={20} style={{ color: 'var(--accent-green)' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            VERIFIED INDUSTRY CERTIFICATIONS
          </h2>
        </div>
        <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Hands-on technical certifications spanning rigorous multi-day practical offensive security examinations, cloud architecture, and modern application defense.
        </p>
      </div>

      {/* Certifications Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
        {CERTIFICATIONS_DATA.map((cert) => (
          <div
            key={cert.id}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              position: 'relative'
            }}
          >
            {/* Header */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                <span className="badge-status" style={{ fontSize: '10px' }}>
                  {cert.category}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                  {cert.verifiedStatus}
                </span>
              </div>

              <h3 
                style={{ 
                  fontSize: '15px', 
                  fontWeight: 700, 
                  color: 'var(--text-primary)', 
                  fontFamily: 'var(--font-mono)',
                  marginTop: '8px',
                  lineHeight: 1.4
                }}
              >
                {cert.title}
              </h3>
              
              <div style={{ fontSize: '12px', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                Issuer: {cert.issuer}
              </div>
            </div>

            {/* Description */}
            <p className="font-sans" style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {cert.description}
            </p>

            {/* Skills evaluated */}
            <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Evaluated Competencies:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {cert.skillsCovered.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid var(--border-green-dim)',
                      color: 'var(--text-primary)',
                      padding: '2px 7px',
                      borderRadius: '3px'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
