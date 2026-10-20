import React from 'react';
import { ACHIEVEMENTS_DATA } from '../../data/portfolioData';
import { Trophy } from 'lucide-react';

export const AchievementsApp: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '6px' }}>
      <div 
        style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Trophy size={20} style={{ color: 'var(--accent-amber)' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            HONORS & COMPETITIVE ACHIEVEMENTS
          </h2>
        </div>
        <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Peer-recognized organizational commendations and national competitive CTF accomplishments.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
        {ACHIEVEMENTS_DATA.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-amber-dim)',
              borderRadius: '8px',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <span className="badge-status badge-amber">
                {item.type}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                {item.year}
              </span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {item.title}
            </h3>

            <div style={{ fontSize: '12px', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
              Organization: {item.organization}
            </div>

            <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
