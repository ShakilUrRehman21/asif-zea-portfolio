import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../../data/portfolioData';
import { Reveal, SectionHead, Tag } from '../ui';

const issuerMark = (issuer: string) => {
  if (issuer.includes('Hack')) return 'HTB';
  if (issuer.includes('EC-Council')) return 'EC';
  if (issuer.includes('Amazon')) return 'AWS';
  return 'SEC';
};

export const CertificationsApp: React.FC = () => (
  <div className="app">
    <SectionHead
      index="04"
      eyebrow="Credentials"
      title="Credentials that"
      accent="hold up."
      description="Practical, lab-based certifications earned through multi-day hands-on examinations — not multiple-choice recall."
      meta={
        <div className="tag-row">
          <Tag tone="acid">{CERTIFICATIONS_DATA.length} verified certifications</Tag>
          <Tag>Offensive security</Tag>
          <Tag>Cloud</Tag>
          <Tag>Application & network defense</Tag>
        </div>
      }
    />

    <Reveal>
      <div className="cert-summary">
        {CERTIFICATIONS_DATA.map((cert) => (
          <div className="cert-summary__item" key={`summary-${cert.id}`}>
            <span className="cert-summary__issuer">{cert.issuer}</span>
            <span className="cert-summary__kind">{cert.category}</span>
          </div>
        ))}
      </div>
    </Reveal>

    <div className="cert-grid">
      {CERTIFICATIONS_DATA.map((cert, index) => (
        <Reveal key={cert.id} delay={index * 0.04}>
          <article className="panel panel--interactive is-acid cert-card" style={{ height: '100%' }}>
            <span className="cert-card__sheen" aria-hidden="true" />

            <div className="cert-card__top">
              <div className="cert-issuer">
                <span className="cert-issuer__mark">{issuerMark(cert.issuer)}</span>
                <span>
                  <span className="cert-issuer__name">{cert.issuer}</span>
                  <span className="cert-issuer__cat">{cert.category}</span>
                </span>
              </div>
              <span className="cert-seal">
                <ShieldCheck size={9} /> Verified
              </span>
            </div>

            <h3 className="cert-card__title">{cert.title}</h3>
            <p className="cert-card__desc">{cert.description}</p>

            <div className="cert-card__skills">
              <div className="cert-card__skills-label">Evaluated competencies</div>
              <div className="tag-row">
                {cert.skillsCovered.map((skill) => (
                  <span className="tag" key={`${cert.id}-${skill}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal>
      <div className="app-note">
        <ShieldCheck size={12} />
        <span>
          {CERTIFICATIONS_DATA.map((cert) => cert.verifiedStatus).join(' · ')} — credential
          verification available on request.
        </span>
      </div>
    </Reveal>
  </div>
);
