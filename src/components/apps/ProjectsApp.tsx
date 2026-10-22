import React from 'react';
import { ArrowUpRight, BookOpen, Briefcase, ExternalLink, Lock, Terminal } from 'lucide-react';
import { ENGAGEMENT_ARCHETYPES, PERSONAL_INFO } from '../../data/portfolioData';
import type { WindowId } from '../../types/portfolio';
import { Reveal, SectionHead, Tag } from '../ui';

interface ProjectsAppProps {
  onOpenWindow?: (id: WindowId) => void;
}

const REDACTED_ROWS = [
  { label: 'Target', width: 72 },
  { label: 'Scope', width: 54 },
  { label: 'Findings', width: 88 },
  { label: 'Client', width: 40 }
];

export const ProjectsApp: React.FC<ProjectsAppProps> = ({ onOpenWindow }) => (
  <div className="app">
    <SectionHead
      index="07"
      eyebrow="Engagements"
      title="Quiet by"
      accent="contract."
      description="The most sensitive work never becomes a public case study. Client engagements are delivered under strict non-disclosure agreements — here is the shape of the work, without the names."
      meta={
        <div className="tag-row">
          <Tag tone="amber">10+ enterprise clients</Tag>
          <Tag>Payments</Tag>
          <Tag>Banking</Tag>
          <Tag>Insurance</Tag>
          <Tag>Healthcare</Tag>
          <Tag>Retail</Tag>
        </div>
      }
    />

    <Reveal>
      <section className="panel dossier">
        <div className="dossier__head">
          <div>
            <span className="eyebrow" style={{ marginBottom: 6 }}>
              <Lock size={10} /> Confidentiality status
            </span>
            <h3 className="dossier__title">
              Restricted <em>dossier.</em>
            </h3>
          </div>
          <span className="dossier__stamp">NDA · Restricted</span>
        </div>

        <p className="dossier__text">
          As an Application Security Engineer and Penetration Tester at Tata Consultancy Services,
          vulnerability assessments, exploit proof-of-concepts and infrastructure attack graphs are
          delivered for <strong>10+ global enterprise clients</strong> across payments, banking,
          insurance, healthcare and retail — under strict <strong>Non-Disclosure Agreements</strong>.
          Proprietary targets and reports are deliberately withheld from the public web.
        </p>

        <div className="redacted" aria-hidden="true">
          <div className="redacted__head">
            <span>Classification · client records</span>
            <span>Redacted</span>
          </div>
          {REDACTED_ROWS.map((row, index) => (
            <div className="redacted__row" key={row.label}>
              <span className="redacted__label">{row.label}</span>
              <span
                className={`redacted__bar ${index % 2 === 1 ? 'redacted__bar--dim' : ''}`}
                style={{ width: `${row.width}%` }}
              />
            </div>
          ))}
        </div>

        <div className="section-label">
          Engagement archetypes <span className="count">/ 06</span>
        </div>

        <div className="archetype-grid">
          {ENGAGEMENT_ARCHETYPES.map((item, index) => (
            <div className="archetype" key={item.title}>
              <span className="archetype__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="archetype__title">{item.title}</span>
              <span className="archetype__desc">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </Reveal>

    <section>
      <div className="section-label" style={{ marginBottom: 12 }}>
        Verifiable work <span className="count">/ 03</span>
      </div>
      <div className="projects-links">
        <Reveal>
          <div className="panel panel--interactive is-acid project-link">
            <div className="project-link__head">
              <Terminal size={16} />
              <Tag tone="acid">Labs</Tag>
            </div>
            <div className="project-link__title">Hands-on labs & homelab</div>
            <p className="project-link__desc">
              Multi-host Active Directory exploitation, Kerberos testing and PortSwigger Web Security
              Academy research.
            </p>
            <button
              type="button"
              className="project-link__cta"
              onClick={() => onOpenWindow?.('labs')}
              style={{ background: 'none', border: 'none' }}
            >
              Open labs <ArrowUpRight size={11} />
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="panel panel--interactive is-acid project-link">
            <div className="project-link__head">
              <Briefcase size={16} />
              <Tag tone="amber">Experience</Tag>
            </div>
            <div className="project-link__title">Enterprise experience</div>
            <p className="project-link__desc">
              Release security, web and API testing, mobile static and dynamic analysis, Active
              Directory and AWS cloud reviews.
            </p>
            <button
              type="button"
              className="project-link__cta"
              onClick={() => onOpenWindow?.('experience')}
              style={{ background: 'none', border: 'none' }}
            >
              View experience <ArrowUpRight size={11} />
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            className="panel panel--interactive is-acid project-link"
            href={PERSONAL_INFO.medium}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="project-link__head">
              <BookOpen size={16} />
              <Tag>Writing</Tag>
            </div>
            <div className="project-link__title">Technical articles</div>
            <p className="project-link__desc">
              Public security research, analysis write-ups and penetration testing methodology notes
              published on Medium.
            </p>
            <span className="project-link__cta">
              Read on Medium <ExternalLink size={11} />
            </span>
          </a>
        </Reveal>
      </div>
    </section>

    <Reveal>
      <div className="app-note app-note--amber">
        <Lock size={12} />
        <span>
          To respect client contracts and professional ethics, proprietary targets, exploit code and
          vulnerability reports are not published. Ask about referenceable engagements during a
          conversation.
        </span>
      </div>
    </Reveal>
  </div>
);
