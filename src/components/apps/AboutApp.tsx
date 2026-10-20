import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Shield, Terminal, MapPin, Mail, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import type { WindowId } from '../../types/portfolio';

interface AboutAppProps {
  onOpenWindow?: (id: WindowId) => void;
}

export const AboutApp: React.FC<AboutAppProps> = ({ onOpenWindow }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '6px 6px 32px 6px' }}>
      {/* Top Header Card */}
      <div 
        style={{
          background: 'linear-gradient(135deg, rgba(21, 26, 22, 0.9) 0%, rgba(13, 16, 14, 0.9) 100%)',
          border: '1px solid rgba(163, 255, 111, 0.2)',
          borderRadius: '8px',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(163, 255, 111, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge-status">
                ACTIVE SECURITY ENGINEER
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                UID: 1000 // HOST: az-secure
              </span>
            </div>

            <h1 
              style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: 'clamp(20px, 5.5vw, 28px)', 
                fontWeight: 700, 
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '6px'
              }}
            >
              {PERSONAL_INFO.name}
            </h1>
            
            <p 
              style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '14px', 
                color: 'var(--accent-green)',
                fontWeight: 500,
                marginBottom: '12px'
              }}
            >
              {PERSONAL_INFO.role}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '12px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} style={{ color: 'var(--accent-amber)' }} />
                {PERSONAL_INFO.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={14} style={{ color: 'var(--accent-green)' }} />
                Tata Consultancy Services (TCS)
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '10px',
              minWidth: 'min(100%, 220px)',
              flex: '1 1 200px'
            }}
          >
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Experience</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>3 Years</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>TCS AppSec</div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Clients Assessed</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>10+ Global</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Fintech & Health</div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div 
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Terminal size={16} style={{ color: 'var(--accent-green)' }} />
          <h2 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>
            Professional Summary
          </h2>
        </div>
        <p 
          className="font-sans" 
          style={{ 
            fontSize: '14px', 
            lineHeight: 1.65, 
            color: 'var(--text-primary)',
            fontWeight: 400 
          }}
        >
          {PERSONAL_INFO.summary}
        </p>
      </div>

      {/* Core Security Domains */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '14px' }}>
        {[
          {
            title: 'Application & API Security',
            desc: 'OWASP WSTG & ASVS testing, BOLA/IDOR identification, session management, business logic flaws, and secure code review (Checkmarx + manual).',
            tools: 'Burp Suite, Postman, Checkmarx'
          },
          {
            title: 'Mobile Penetration Testing',
            desc: 'Static & dynamic analysis for Android & iOS apps against OWASP MASTG, SSL pinning bypass, runtime manipulation with Frida & Objection.',
            tools: 'JADX, Frida, Objection'
          },
          {
            title: 'Active Directory & Network Security',
            desc: 'Internal and external network penetration testing, domain privilege escalation, Kerberos analysis, and BloodHound attack path mapping.',
            tools: 'BloodHound, NetExec, Impacket'
          },
          {
            title: 'Cloud & AI Security',
            desc: 'AWS IAM least-privilege & VPC posture assessments, plus emerging AI-agent security testing for prompt injection and excessive agency.',
            tools: 'AWS IAM, OWASP LLM, MITRE ATLAS'
          }
        ].map((domain, i) => (
          <div 
            key={i}
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--accent-green)' }} />
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {domain.title}
              </h3>
            </div>
            <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>
              {domain.desc}
            </p>
            <div style={{ fontSize: '11px', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
              Tools: {domain.tools}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Shortcuts */}
      {onOpenWindow && (
        <div 
          style={{ 
            display: 'flex', 
            gap: '10px', 
            flexWrap: 'wrap', 
            paddingTop: '8px', 
            borderTop: '1px solid var(--border-subtle)' 
          }}
        >
          <button 
            className="btn-terminal" 
            onClick={() => onOpenWindow('experience')}
          >
            <Award size={14} /> View Experience <ArrowRight size={12} />
          </button>
          <button 
            className="btn-terminal" 
            onClick={() => onOpenWindow('skills')}
          >
            <Terminal size={14} /> Technical Skills <ArrowRight size={12} />
          </button>
          <button 
            className="btn-terminal" 
            onClick={() => onOpenWindow('certs')}
          >
            <Shield size={14} /> Certifications <ArrowRight size={12} />
          </button>
          <button 
            className="btn-terminal" 
            onClick={() => onOpenWindow('contact')}
          >
            <Mail size={14} /> Contact <ArrowRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
};
