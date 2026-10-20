import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Mail, Phone, ExternalLink, Copy, Check, Terminal, Shield } from 'lucide-react';
import { sound } from '../../utils/audio';

export const ContactApp: React.FC = () => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    sound.playEnterBeep();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '6px' }}>
      {/* Header */}
      <div 
        style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-active)',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Mail size={20} style={{ color: 'var(--accent-green)' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            SECURE COMMUNICATIONS & CONTACT
          </h2>
        </div>
        <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Available for application security engineering, penetration testing engagements, red-team assessments, and technical consultations.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '14px' }}>
        {/* Email Card */}
        <div 
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
              PRIMARY EMAIL
            </span>
            <span className="badge-status" style={{ fontSize: '9px' }}>ACTIVE</span>
          </div>

          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {PERSONAL_INFO.email}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Direct inbox for security inquiries
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`}
              className="btn-terminal btn-terminal-primary"
              style={{ textDecoration: 'none', flex: 1, textAlign: 'center' }}
            >
              <Mail size={13} /> Send Email
            </a>
            <button 
              className="btn-terminal"
              onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
              title="Copy email to clipboard"
            >
              {copiedType === 'email' ? <Check size={13} style={{ color: 'var(--accent-green)' }} /> : <Copy size={13} />}
              {copiedType === 'email' ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Phone Card */}
        <div 
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
              PHONE / CONTACT NUMBER
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              INDIA
            </span>
          </div>

          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {PERSONAL_INFO.phone}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Direct mobile communications
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
            <a 
              href={`tel:${PERSONAL_INFO.phone}`}
              className="btn-terminal"
              style={{ textDecoration: 'none', flex: 1, textAlign: 'center' }}
            >
              <Phone size={13} /> Call Direct
            </a>
            <button 
              className="btn-terminal"
              onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
              title="Copy phone to clipboard"
            >
              {copiedType === 'phone' ? <Check size={13} style={{ color: 'var(--accent-green)' }} /> : <Copy size={13} />}
              {copiedType === 'phone' ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* LinkedIn Card */}
        <div 
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>
              PROFESSIONAL NETWORK
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-blue)' }}>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </div>

          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {PERSONAL_INFO.linkedinDisplay}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Verified professional profile & endorsements
            </div>
          </div>

          <a 
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-terminal"
            style={{ textDecoration: 'none', marginTop: 'auto' }}
          >
            Open LinkedIn Profile <ExternalLink size={12} />
          </a>
        </div>

        {/* Medium Card */}
        <div 
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
              RESEARCH PUBLICATIONS
            </span>
            <Terminal size={14} style={{ color: 'var(--accent-green)' }} />
          </div>

          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {PERSONAL_INFO.mediumDisplay}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Offensive security write-ups & methodologies
            </div>
          </div>

          <a 
            href={PERSONAL_INFO.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-terminal"
            style={{ textDecoration: 'none', marginTop: 'auto' }}
          >
            Read Articles on Medium <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Security Fingerprint Card */}
      <div 
        style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          <Shield size={13} style={{ color: 'var(--accent-green)' }} />
          <span>CRYPTOGRAPHIC VERIFICATION // PGP PUBKEY FINGERPRINT</span>
        </div>
        <div 
          style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '11px', 
            color: 'var(--accent-green)', 
            background: 'rgba(0,0,0,0.4)', 
            padding: '8px 12px', 
            borderRadius: '4px',
            letterSpacing: '0.05em'
          }}
        >
          AZ-SEC-9982-F83C-4D2A-E710-B149-65CF-2026
        </div>
      </div>
    </div>
  );
};
