import React from 'react';
import { Crosshair, Trophy } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../../data/portfolioData';
import { Reveal, SectionHead, Tag } from '../ui';

export const AchievementsApp: React.FC = () => (
  <div className="app">
    <SectionHead
      index="05"
      eyebrow="Recognition"
      title="Proof of work,"
      accent="not promises."
      description="Peer-recognized delivery awards and national competitive security results — each earned in a live, adversarial environment."
      meta={
        <div className="tag-row">
          <Tag tone="amber">2 honors</Tag>
          <Tag>TCS enterprise security</Tag>
          <Tag>National CTF finalist</Tag>
        </div>
      }
    />

    <div className="honor-list">
      {ACHIEVEMENTS_DATA.map((item, index) => {
        const isCtf = item.type === 'CTF Finalist';
        const Icon = isCtf ? Crosshair : Trophy;
        return (
          <Reveal key={item.title} delay={index * 0.06}>
            <div className="honor">
              <div className="honor__left">
                <span className="honor__year">{item.year}</span>
                <span className="honor__type">{item.type}</span>
              </div>

              <div>
                <h3 className="honor__title">{item.title}</h3>
                <div className="honor__org">{item.organization}</div>
                <p className="honor__desc">{item.description}</p>
              </div>

              <span className="honor__seal" aria-hidden="true">
                <Icon size={19} />
              </span>
            </div>
          </Reveal>
        );
      })}
    </div>

    <Reveal>
      <div className="panel app-callout">
        <div>
          <div className="app-callout__title">
            Adversarial practice, <em>on record.</em>
          </div>
          <p className="app-callout__text">
            Top 100 finalist nationally in TCS HackQuest Season 7 — web exploitation, reverse
            engineering and capture-the-flag under time pressure.
          </p>
        </div>
        <span className="tag tag--amber" style={{ height: 34, padding: '0 12px' }}>
          <Crosshair size={11} /> Season 7 · Top 100
        </span>
      </div>
    </Reveal>
  </div>
);
