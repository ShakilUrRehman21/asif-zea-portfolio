import React from 'react';
import {
  ArrowUpRight,
  Cloud,
  MapPin,
  Network,
  Shield,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, PRINCIPLES } from '../../data/portfolioData';
import type { WindowId } from '../../types/portfolio';
import { Reveal, SectionHead, Tag } from '../ui';

interface AboutAppProps {
  onOpenWindow?: (id: WindowId) => void;
}

const DOMAINS = [
  {
    title: 'Application & API Security',
    desc: 'OWASP WSTG and ASVS testing, BOLA/IDOR identification, session and JWT handling, business logic flaws and secure code review.',
    tools: 'Burp Suite · Postman · Checkmarx',
    icon: Shield
  },
  {
    title: 'Mobile Penetration Testing',
    desc: 'Static and dynamic analysis for Android and iOS against OWASP MASTG, SSL pinning bypass and runtime manipulation.',
    tools: 'JADX · Frida · Objection',
    icon: Smartphone
  },
  {
    title: 'Active Directory & Network',
    desc: 'Internal and external network testing, domain privilege escalation, Kerberos analysis and BloodHound attack-path mapping.',
    tools: 'BloodHound · NetExec · Impacket',
    icon: Network
  },
  {
    title: 'Cloud & AI Security',
    desc: 'AWS IAM least-privilege and VPC posture reviews, plus AI-agent testing for prompt injection and excessive agency.',
    tools: 'AWS IAM · OWASP LLM · MITRE ATLAS',
    icon: Cloud
  }
];

export const AboutApp: React.FC<AboutAppProps> = ({ onOpenWindow }) => (
  <div className="app">
    <SectionHead
      index="01"
      eyebrow="Identity"
      title="Security engineering,"
      accent="not security theatre."
      description="Application security engineer and penetration tester with three years at Tata Consultancy Services, testing the systems global businesses actually run on."
      meta={
        <div className="tag-row">
          <Tag tone="acid">Application Security</Tag>
          <Tag tone="acid">Penetration Testing</Tag>
          <Tag>Red Teaming</Tag>
          <Tag>AI / LLM Security</Tag>
        </div>
      }
    />

    <Reveal>
      <div className="panel about-hero">
        <div className="about-identity">
          <div className="about-monogram" aria-hidden="true">
            <span>AZ</span>
          </div>
          <div>
            <h3 className="about-name">
              Asif <em>Zea</em>
            </h3>
            <p className="about-role">{PERSONAL_INFO.role}</p>
            <div className="about-tags">
              <span className="about-loc">
                <MapPin size={10} /> {PERSONAL_INFO.location}
              </span>
              <span className="badge">
                <span className="live-dot" /> Open to engagements
              </span>
            </div>
          </div>
        </div>

        <div className="about-quickstats">
          <div className="about-quickstat">
            <div className="about-quickstat__value acid">03</div>
            <div className="about-quickstat__label">Years offensive security</div>
          </div>
          <div className="about-quickstat">
            <div className="about-quickstat__value">10+</div>
            <div className="about-quickstat__label">Enterprise clients</div>
          </div>
          <div className="about-quickstat">
            <div className="about-quickstat__value">05</div>
            <div className="about-quickstat__label">Certifications</div>
          </div>
          <div className="about-quickstat">
            <div className="about-quickstat__value">06</div>
            <div className="about-quickstat__label">Security domains</div>
          </div>
        </div>
      </div>
    </Reveal>

    <Reveal delay={0.05}>
      <div className="panel about-summary">
        <div className="about-summary__head">
          <Sparkles size={13} />
          <span>Professional summary</span>
        </div>
        <p className="dropcap">{PERSONAL_INFO.summary}</p>
      </div>
    </Reveal>

    <section>
      <div className="section-label" style={{ marginBottom: 12 }}>
        Core security domains <span className="count">/ 04</span>
      </div>
      <div className="about-domains">
        {DOMAINS.map((domain, index) => {
          const Icon = domain.icon;
          return (
            <Reveal key={domain.title} delay={index * 0.04}>
              <div className="panel panel--interactive is-acid domain-card" style={{ height: '100%' }}>
                <div className="domain-card__head">
                  <span className="domain-card__icon">
                    <Icon size={13} />
                  </span>
                  <h4 className="domain-card__title">{domain.title}</h4>
                </div>
                <p className="domain-card__desc">{domain.desc}</p>
                <div className="domain-card__tools">{domain.tools}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>

    <section>
      <div className="section-label" style={{ marginBottom: 12 }}>
        Operating principles <span className="count">/ 03</span>
      </div>
      <div className="about-principles">
        {PRINCIPLES.map((principle) => (
          <Reveal key={principle.num} delay={Number(principle.num) * 0.03}>
            <div className="principle" style={{ height: '100%' }}>
              <div className="principle__num">{principle.num}</div>
              <div className="principle__title">{principle.title}</div>
              <p className="principle__desc">{principle.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <Reveal>
      <div className="panel app-callout">
        <div>
          <div className="app-callout__title">
            Available for <em>select engagements.</em>
          </div>
          <p className="app-callout__text">
            Application security reviews, penetration tests and red-team planning — scoped to fit
            your release cycle.
          </p>
        </div>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => onOpenWindow?.('contact')}
        >
          Start a conversation <ArrowUpRight size={13} className="arrow" />
        </button>
      </div>
    </Reveal>
  </div>
);
