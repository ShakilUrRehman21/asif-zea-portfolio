import React from 'react';
import { EDUCATION_DATA } from '../../data/portfolioData';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

export const EducationApp: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '6px' }}>
      <div 
        style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-active)',
          borderRadius: '8px',
          padding: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <GraduationCap size={22} style={{ color: 'var(--accent-green)' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            ACADEMIC CREDENTIALS
          </h2>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '20px', marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span className="badge-status" style={{ fontSize: '10px', marginBottom: '8px' }}>
                UNDERGRADUATE DEGREE
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {EDUCATION_DATA.degree}
              </h3>
              <div style={{ fontSize: '14px', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                {EDUCATION_DATA.institution}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-amber)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                <Calendar size={13} /> Class of {EDUCATION_DATA.gradYear}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                <MapPin size={13} /> {EDUCATION_DATA.location}
              </span>
            </div>
          </div>

          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
            <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {EDUCATION_DATA.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
