import React from 'react';
import { ArrowUpRight, BookOpen, Calendar, GraduationCap, MapPin, Network, Terminal } from 'lucide-react';
import { EDUCATION_DATA } from '../../data/portfolioData';
import type { WindowId } from '../../types/portfolio';
import { Reveal, SectionHead, Tag } from '../ui';

interface EducationAppProps {
  onOpenWindow?: (id: WindowId) => void;
}

const LEARNING = [
  {
    title: 'HTB CPTS path',
    desc: 'Full practical offensive curriculum: enumeration, pivoting, Active Directory and enterprise reporting.',
    icon: Terminal,
    target: 'labs' as WindowId,
    cta: 'Open labs'
  },
  {
    title: 'PortSwigger Academy',
    desc: 'Modern web security research — access control, business logic, SSRF, JWT and Web LLM attacks.',
    icon: BookOpen,
    target: 'labs' as WindowId,
    cta: 'Open labs'
  },
  {
    title: 'Active Directory homelab',
    desc: 'Isolated multi-host domain for Kerberos, delegation and attack-path practice with BloodHound.',
    icon: Network,
    target: 'skills' as WindowId,
    cta: 'View tooling'
  }
];

export const EducationApp: React.FC<EducationAppProps> = ({ onOpenWindow }) => (
  <div className="app">
    <SectionHead
      index="09"
      eyebrow="Foundation"
      title="Fundamentals,"
      accent="first."
      description="An engineering education grounded in computer science, networking and distributed systems — the base every security assessment is built on."
      meta={
        <div className="tag-row">
          <Tag tone="cyan">B.Tech · 2023</Tag>
          <Tag>Jamia Millia Islamia</Tag>
          <Tag>New Delhi, India</Tag>
        </div>
      }
    />

    <Reveal>
      <div className="panel edu">
        <div className="edu__seal" aria-hidden="true">
          <GraduationCap size={30} />
        </div>

        <div>
          <span className="eyebrow" style={{ marginBottom: 8 }}>
            <span className="dot" /> Undergraduate degree
          </span>
          <h3 className="edu__degree">
            Bachelor of <em>Technology</em>
          </h3>
          <div className="edu__school">{EDUCATION_DATA.institution}</div>
          <div className="edu__meta">
            <span>
              <Calendar size={11} /> Class of {EDUCATION_DATA.gradYear}
            </span>
            <span>
              <MapPin size={11} /> {EDUCATION_DATA.location}
            </span>
            <span>
              <GraduationCap size={11} /> Computer science foundations
            </span>
          </div>
        </div>

        <p className="edu__desc">{EDUCATION_DATA.description}</p>
      </div>
    </Reveal>

    <section>
      <div className="section-label" style={{ marginBottom: 12 }}>
        Continuous learning <span className="count">/ 03</span>
      </div>
      <div className="learning-grid">
        {LEARNING.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="panel panel--interactive is-acid learning" style={{ height: '100%' }}>
                <span className="learning__icon">
                  <Icon size={14} />
                </span>
                <div className="learning__title">{item.title}</div>
                <p className="learning__desc">{item.desc}</p>
                <button
                  type="button"
                  className="learning__cta"
                  onClick={() => onOpenWindow?.(item.target)}
                  style={{ background: 'none', border: 'none' }}
                >
                  {item.cta} <ArrowUpRight size={10} />
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>

    <Reveal>
      <div className="app-note">
        <GraduationCap size={12} />
        <span>
          Academic foundation in computer science, networking, distributed systems and core security
          principles — extended continuously through certification and lab work.
        </span>
      </div>
    </Reveal>
  </div>
);
