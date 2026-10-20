import React, { useState } from 'react';
import { EXPERIENCE_DATA } from '../../data/portfolioData';
import { Calendar, MapPin, Building, Filter } from 'lucide-react';

export const ExperienceApp: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const filterOptions = [
    'ALL',
    'Web & API',
    'Mobile',
    'Active Directory & Network',
    'Cloud & Red Team',
    'AI Security',
    'AppSec & Code Review'
  ];

  const filteredResponsibilities = EXPERIENCE_DATA.responsibilities.filter(r => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'Web & API') return r.domain.includes('Web') || r.domain.includes('API');
    if (selectedFilter === 'Mobile') return r.domain.includes('Mobile');
    if (selectedFilter === 'Active Directory & Network') return r.domain.includes('Active Directory') || r.domain.includes('Network');
    if (selectedFilter === 'Cloud & Red Team') return r.domain.includes('AWS') || r.domain.includes('Red Teaming');
    if (selectedFilter === 'AI Security') return r.domain.includes('AI');
    if (selectedFilter === 'AppSec & Code Review') return r.domain.includes('Code Review') || r.domain.includes('Release');
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '6px' }}>
      {/* Experience Overview Header */}
      <div 
        style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-active)',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-status">
                PRIMARY ENGAGEMENT
              </span>
              <span style={{ color: 'var(--accent-amber)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                FULL-TIME EMPLOYMENT
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(17px, 4.5vw, 20px)', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {EXPERIENCE_DATA.role}
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px', color: 'var(--accent-green)', fontSize: '12px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building size={14} /> {EXPERIENCE_DATA.company}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                <Calendar size={14} /> {EXPERIENCE_DATA.period}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                <MapPin size={14} /> {EXPERIENCE_DATA.location}
              </span>
            </div>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-subtle)', minWidth: 'min(100%, 220px)', flex: '1 1 200px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Client Spectrum</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>10+ Enterprise Clients</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Banking · Payments · Health · Retail</div>
          </div>
        </div>

        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
          <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {EXPERIENCE_DATA.summary} {EXPERIENCE_DATA.clientContext}
          </p>
        </div>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
          <Filter size={12} /> Filter Domain:
        </span>
        {filterOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setSelectedFilter(opt)}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              borderRadius: '4px',
              border: selectedFilter === opt ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
              background: selectedFilter === opt ? 'var(--accent-green-dim)' : 'var(--bg-surface)',
              color: selectedFilter === opt ? 'var(--accent-green)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Responsibility Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredResponsibilities.map((resp, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '16px',
              transition: 'border-color 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {resp.domain}
                </h3>
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                TCS ENGAGEMENT
              </span>
            </div>

            <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
              {resp.description}
            </p>

            {resp.toolsOrStandards && resp.toolsOrStandards.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {resp.toolsOrStandards.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid var(--border-green-dim)',
                      color: 'var(--text-primary)',
                      padding: '2px 8px',
                      borderRadius: '3px'
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
