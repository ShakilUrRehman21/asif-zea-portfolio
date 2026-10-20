import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Search, Cpu, Check } from 'lucide-react';

export const SkillsApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filteredCategories = SKILL_CATEGORIES.map(cat => {
    const matchesCategory = activeCategory === 'ALL' || cat.name === activeCategory;
    if (!matchesCategory) return null;

    const matchedSkills = cat.skills.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchedSkills.length === 0) return null;

    return {
      ...cat,
      skills: matchedSkills
    };
  }).filter(Boolean) as typeof SKILL_CATEGORIES;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '6px' }}>
      {/* Header & Search */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '12px',
          background: 'var(--bg-surface-elevated)',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={16} style={{ color: 'var(--accent-green)' }} />
            <h2 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              TECHNICAL SKILLS & TOOLMATRIX
            </h2>
          </div>
          <p className="font-sans" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Verified competencies directly referenced in production client assessments and certified exam evaluations.
          </p>
        </div>

        {/* Search input */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'var(--bg-input)', 
            border: '1px solid var(--border-green-dim)', 
            borderRadius: '4px', 
            padding: '6px 12px',
            minWidth: 'min(100%, 200px)',
            flex: '1 1 200px'
          }}
        >
          <Search size={14} style={{ color: 'var(--accent-green)' }} />
          <input
            type="text"
            placeholder="Search tool or domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              width: '100%'
            }}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '11px' }}
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveCategory('ALL')}
          style={{
            padding: '4px 10px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            borderRadius: '4px',
            border: activeCategory === 'ALL' ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
            background: activeCategory === 'ALL' ? 'var(--accent-green-dim)' : 'var(--bg-surface)',
            color: activeCategory === 'ALL' ? 'var(--accent-green)' : 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          ALL CATEGORIES ({SKILL_CATEGORIES.length})
        </button>
        {SKILL_CATEGORIES.map(cat => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              borderRadius: '4px',
              border: activeCategory === cat.name ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
              background: activeCategory === cat.name ? 'var(--accent-green-dim)' : 'var(--bg-surface)',
              color: activeCategory === cat.name ? 'var(--accent-green)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '14px' }}>
        {filteredCategories.map((cat, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {cat.name}
                </h3>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {cat.skills.length} ITEMS
                </span>
              </div>
              <p className="font-sans" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                {cat.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto', paddingTop: '8px' }}>
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    background: skill.highlight ? 'rgba(163, 255, 111, 0.08)' : 'rgba(0, 0, 0, 0.4)',
                    border: skill.highlight ? '1px solid var(--border-green-dim)' : '1px solid var(--border-subtle)',
                    color: skill.highlight ? 'var(--accent-green)' : 'var(--text-primary)'
                  }}
                >
                  {skill.highlight && <Check size={10} style={{ color: 'var(--accent-green)' }} />}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
