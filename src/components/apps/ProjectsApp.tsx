import React from 'react';
import { Lock, ArrowRight, ExternalLink } from 'lucide-react';
import type { WindowId } from '../../types/portfolio';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ProjectsAppProps {
  onOpenWindow?: (id: WindowId) => void;
}

export const ProjectsApp: React.FC<ProjectsAppProps> = ({ onOpenWindow }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '6px' }}>
      {/* Confidentiality Notice */}
      <div 
        style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-amber-dim)',
          borderRadius: '8px',
          padding: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <Lock size={20} style={{ color: 'var(--accent-amber)' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            CLIENT ENGAGEMENTS & CONFIDENTIALITY STATUS
          </h2>
        </div>

        <p className="font-sans" style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '16px' }}>
          As an Application Security Engineer and Penetration Tester at Tata Consultancy Services (TCS), technical vulnerability assessments, exploit proof-of-concepts, and infrastructure attack graphs are conducted for <strong>10+ global enterprise clients</strong> in payments, banking, insurance, healthcare, and retail under strict <strong>Non-Disclosure Agreements (NDAs)</strong>.
        </p>

        <div style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
            CLASSIFICATION: RESTRICTED // PROPRIETARY CLIENT SYSTEMS
          </div>
          <p className="font-sans" style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            To adhere to cybersecurity ethics, client contracts, and legal standards, proprietary client targets and vulnerability reports are not published as public open-source software projects.
          </p>
        </div>
      </div>

      {/* Verified Research Repositories & Alternatives */}
      <div 
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        <h3 style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', marginBottom: '12px', textTransform: 'uppercase' }}>
          Explore Verifiable Work & Hands-on Demonstrations:
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '12px' }}>
          <div 
            style={{ 
              background: 'var(--bg-surface-elevated)', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: '6px', 
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                Hands-on Labs & Homelab
              </div>
              <p className="font-sans" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
                Review multi-host Active Directory exploitation, Kerberos testing, and PortSwigger Web Security Academy research.
              </p>
            </div>
            {onOpenWindow && (
              <button 
                className="btn-terminal" 
                onClick={() => onOpenWindow('labs')}
                style={{ marginTop: '12px', width: 'fit-content' }}
              >
                Open Labs <ArrowRight size={12} />
              </button>
            )}
          </div>

          <div 
            style={{ 
              background: 'var(--bg-surface-elevated)', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: '6px', 
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                Enterprise Experience
              </div>
              <p className="font-sans" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
                Examine specific release security, web/API testing, mobile static/dynamic analysis, and AWS cloud reviews.
              </p>
            </div>
            {onOpenWindow && (
              <button 
                className="btn-terminal" 
                onClick={() => onOpenWindow('experience')}
                style={{ marginTop: '12px', width: 'fit-content' }}
              >
                View Experience <ArrowRight size={12} />
              </button>
            )}
          </div>

          <div 
            style={{ 
              background: 'var(--bg-surface-elevated)', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: '6px', 
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                Technical Articles & Medium
              </div>
              <p className="font-sans" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
                Public security research, analysis write-ups, and penetration testing methodologies published on Medium.
              </p>
            </div>
            <a 
              href={PERSONAL_INFO.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terminal" 
              style={{ marginTop: '12px', width: 'fit-content', textDecoration: 'none' }}
            >
              Read on Medium <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
