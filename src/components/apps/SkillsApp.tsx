import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Reveal, SectionHead, Tag } from '../ui';

export const SkillsApp: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('ALL');

  const totalSkills = useMemo(
    () => SKILL_CATEGORIES.reduce((sum, item) => sum + item.skills.length, 0),
    []
  );

  const filtered = useMemo(() => {
    const search = query.toLowerCase().trim();
    return SKILL_CATEGORIES.map((item) => {
      if (category !== 'ALL' && item.name !== category) return null;
      const skills = item.skills.filter(
        (skill) =>
          !search ||
          skill.name.toLowerCase().includes(search) ||
          item.name.toLowerCase().includes(search)
      );
      if (!skills.length) return null;
      return { ...item, skills };
    }).filter(Boolean) as typeof SKILL_CATEGORIES;
  }, [query, category]);

  const matchCount = filtered.reduce((sum, item) => sum + item.skills.length, 0);

  return (
    <div className="app">
      <SectionHead
        index="03"
        eyebrow="Capabilities"
        title="Tools are just"
        accent="instruments."
        description="Competencies built in production client assessments and certified, multi-day practical examinations — not tutorial completions."
        meta={
          <div className="tag-row">
            <Tag tone="acid">{SKILL_CATEGORIES.length} categories</Tag>
            <Tag>{totalSkills} tracked skills</Tag>
            <Tag>Web · API · Mobile · AD · Cloud · AI</Tag>
          </div>
        }
      />

      <div className="skills-toolbar">
        <div className="field skills-search">
          <Search size={13} />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tool, domain or framework…"
            aria-label="Search skills"
          />
          {query ? (
            <button type="button" className="skills-clear" onClick={() => setQuery('')}>
              Clear <X size={9} />
            </button>
          ) : null}
        </div>
        <span className="skills-meta">
          <b>{matchCount}</b> matches / {totalSkills} skills
        </span>
      </div>

      <div className="skills-cats">
        <button
          type="button"
          className="chip"
          data-active={category === 'ALL'}
          onClick={() => setCategory('ALL')}
        >
          All categories <span className="count">{SKILL_CATEGORIES.length}</span>
        </button>
        {SKILL_CATEGORIES.map((item) => (
          <button
            key={item.name}
            type="button"
            className="chip"
            data-active={category === item.name}
            onClick={() => setCategory(item.name)}
          >
            {item.name} <span className="count">{item.skills.length}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="skills-empty">
          <Search size={20} />
          <div>No skills match “{query}”.</div>
          <button
            type="button"
            className="btn btn--sm"
            onClick={() => {
              setQuery('');
              setCategory('ALL');
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="skills-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((item, index) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.32, delay: Math.min(index * 0.03, 0.16), ease: [0.16, 1, 0.3, 1] }}
                className="panel panel--interactive is-acid skill-cat"
              >
                <div className="skill-cat__head">
                  <h4 className="skill-cat__name">{item.name}</h4>
                  <span className="skill-cat__count">{item.skills.length} items</span>
                </div>
                <p className="skill-cat__desc">{item.description}</p>
                <div className="skill-cat__tags">
                  {item.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`skill-chip ${skill.highlight ? 'skill-chip--hl' : ''}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Reveal>
        <div className="app-note">
          <Search size={12} />
          <span>
            Every category maps to hands-on assessment work — from OWASP WSTG and ASVS through
            MASTG, MITRE ATT&amp;CK and the OWASP Top 10 for LLM applications.
          </span>
        </div>
      </Reveal>
    </div>
  );
};
