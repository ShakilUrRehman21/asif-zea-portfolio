import React from 'react';
import { BookOpen, Check, FileCheck2 } from 'lucide-react';
import { ENGAGEMENT_PHASES, METHODOLOGY_DETAILS } from '../../data/portfolioData';
import { Reveal, SectionHead, Tag } from '../ui';

export const MethodologyApp: React.FC = () => (
  <div className="app">
    <SectionHead
      index="08"
      eyebrow="Method"
      title="Rigor beats"
      accent="luck."
      description="A repeatable engagement lifecycle keeps coverage honest, evidence reproducible and remediation measurable — for every client, every time."
      meta={
        <div className="tag-row">
          <Tag tone="acid">6-phase lifecycle</Tag>
          <Tag>OWASP WSTG · ASVS · MASTG</Tag>
          <Tag>MITRE ATT&amp;CK · ATLAS</Tag>
          <Tag>CVSS v3.1</Tag>
        </div>
      }
    />

    <section>
      <div className="section-label" style={{ marginBottom: 12 }}>
        Engagement lifecycle <span className="count">/ 06 phases</span>
      </div>
      <div className="phases">
        {ENGAGEMENT_PHASES.map((phase) => (
          <div className="phase" key={phase.num}>
            <span className="phase__num">{phase.num}</span>
            <span className="phase__name">{phase.name}</span>
            <span className="phase__desc">{phase.desc}</span>
          </div>
        ))}
      </div>
    </section>

    <section>
      <div className="section-label" style={{ marginBottom: 12 }}>
        Frameworks & standards <span className="count">/ 04</span>
      </div>
      <div className="framework-grid">
        {METHODOLOGY_DETAILS.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <article className="panel panel--interactive is-acid framework" style={{ height: '100%' }}>
              <div className="framework__top">
                <span className="framework__cat">{item.category}</span>
                <span className="framework__id">{item.id.toUpperCase()}</span>
              </div>
              <h4 className="framework__title">{item.title}</h4>
              <p className="framework__focus">{item.focus}</p>
              <div className="framework__list">
                {item.coverage.map((coverage) => (
                  <div className="framework__item" key={coverage}>
                    <Check size={11} />
                    <span>{coverage}</span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>

    <Reveal>
      <div className="panel app-callout">
        <div>
          <div className="app-callout__title">
            Findings that survive <em>scrutiny.</em>
          </div>
          <p className="app-callout__text">
            Every issue ships with reproducible evidence, CVSS v3.1 severity, business impact and
            remediation guidance — then gets retested until it holds.
          </p>
        </div>
        <span className="tag tag--acid" style={{ height: 34, padding: '0 12px' }}>
          <FileCheck2 size={11} /> Reporting & retest
        </span>
      </div>
    </Reveal>

    <Reveal>
      <div className="app-note">
        <BookOpen size={12} />
        <span>
          Frameworks are selected to fit the target — not applied blindly. Coverage is agreed during
          scoping so engineering teams know exactly what was tested.
        </span>
      </div>
    </Reveal>
  </div>
);
