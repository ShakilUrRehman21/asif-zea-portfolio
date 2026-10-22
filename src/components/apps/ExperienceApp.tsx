import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Building, Calendar, Funnel, MapPin } from 'lucide-react';
import { EXPERIENCE_DATA, SECTORS } from '../../data/portfolioData';
import { Reveal, SectionHead, Tag } from '../ui';

const FILTERS = [
  { id: 'ALL', label: 'All domains', test: () => true },
  {
    id: 'Web & API',
    label: 'Web & API',
    test: (domain: string) => domain.includes('Web') || domain.includes('API')
  },
  { id: 'Mobile', label: 'Mobile', test: (domain: string) => domain.includes('Mobile') },
  {
    id: 'AD & Network',
    label: 'AD & network',
    test: (domain: string) => domain.includes('Active Directory') || domain.includes('Network')
  },
  {
    id: 'Cloud & Red Team',
    label: 'Cloud & red team',
    test: (domain: string) => domain.includes('AWS') || domain.includes('Red Teaming')
  },
  { id: 'AI Security', label: 'AI security', test: (domain: string) => domain.includes('AI') },
  {
    id: 'AppSec',
    label: 'AppSec & review',
    test: (domain: string) => domain.includes('Code Review') || domain.includes('Release')
  }
];

export const ExperienceApp: React.FC = () => {
  const [filter, setFilter] = useState('ALL');

  const counts = useMemo(
    () =>
      Object.fromEntries(
        FILTERS.map((option) => [
          option.id,
          EXPERIENCE_DATA.responsibilities.filter((item) => option.test(item.domain)).length
        ])
      ),
    []
  );

  const visible = useMemo(() => {
    const option = FILTERS.find((item) => item.id === filter) ?? FILTERS[0];
    return EXPERIENCE_DATA.responsibilities.filter((item) => option.test(item.domain));
  }, [filter]);

  return (
    <div className="app">
      <SectionHead
        index="02"
        eyebrow="Experience"
        title="End-to-end,"
        accent="not drive-by."
        description="Every engagement runs from scoping and rules of engagement through exploitation, risk-rated reporting and retesting with the client's engineering teams."
        meta={
          <div className="sector-row">
            {SECTORS.map((sector) => (
              <Tag key={sector}>{sector}</Tag>
            ))}
          </div>
        }
      />

      <Reveal>
        <div className="panel xp-hero">
          <div className="xp-logo">TCS</div>

          <div className="xp-head-main">
            <div className="xp-overline">
              <span className="badge">Primary engagement</span>
              <span className="mono" style={{ fontSize: 8, color: 'var(--paper-faint)' }}>
                FULL-TIME · NEW DELHI
              </span>
            </div>
            <h3 className="xp-role">{EXPERIENCE_DATA.role}</h3>
            <div className="xp-company">{EXPERIENCE_DATA.company}</div>
            <div className="xp-meta">
              <span>
                <Calendar size={11} /> {EXPERIENCE_DATA.period}
              </span>
              <span>
                <MapPin size={11} /> {EXPERIENCE_DATA.location}
              </span>
              <span>
                <Building size={11} /> Enterprise security practice
              </span>
            </div>
          </div>

          <div className="xp-clients">
            <div className="xp-clients__value">10+</div>
            <div className="xp-clients__label">Enterprise clients</div>
            <div className="xp-clients__note">Banking · Payments · Health · Retail</div>
          </div>

          <p className="xp-hero__summary">
            {EXPERIENCE_DATA.summary} <strong>{EXPERIENCE_DATA.clientContext}</strong>
          </p>
        </div>
      </Reveal>

      <div className="xp-filterbar">
        <span className="xp-filterbar__label">
          <Funnel size={11} /> Filter domain
        </span>
        {FILTERS.map((option) => (
          <button
            key={option.id}
            type="button"
            className="chip"
            data-active={filter === option.id}
            onClick={() => setFilter(option.id)}
          >
            {option.label}
            <span className="count">{counts[option.id]}</span>
          </button>
        ))}
      </div>

      <div className="xp-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => {
            const originalIndex = EXPERIENCE_DATA.responsibilities.findIndex(
              (entry) => entry.domain === item.domain
            );
            return (
              <motion.div
                key={item.domain}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="panel panel--interactive is-acid xp-card"
              >
                <div className="xp-card__top">
                  <span className="xp-card__index">
                    {String(originalIndex + 1).padStart(2, '0')} / 10
                  </span>
                  <span className="xp-card__badge">TCS engagement</span>
                </div>
                <h4 className="xp-card__title">{item.domain}</h4>
                <p className="xp-card__desc">{item.description}</p>
                {item.toolsOrStandards?.length ? (
                  <div className="tag-row xp-card__tools">
                    {item.toolsOrStandards.map((tool) => (
                      <span key={tool} className="tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                ) : null}
                <span className="xp-card__watermark" aria-hidden="true">
                  {String(originalIndex + 1).padStart(2, '0')}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <Reveal>
        <div className="app-note">
          <Building size={12} />
          <span>
            All testing is performed under agreed rules of engagement with scoped production
            verification — no disruption to live services.
          </span>
        </div>
      </Reveal>
    </div>
  );
};
