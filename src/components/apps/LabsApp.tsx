import React from 'react';
import { ChevronRight, ShieldCheck, Terminal } from 'lucide-react';
import { LABS_DATA } from '../../data/portfolioData';
import { Reveal, SectionHead, Tag } from '../ui';

const LAB_TOOLING = [
  ['BloodHound', 'NetExec', 'Impacket', 'Chisel', 'Proxychains'],
  ['Burp Suite', 'Postman', 'JADX', 'Frida', 'Objection']
];

export const LabsApp: React.FC = () => (
  <div className="app">
    <SectionHead
      index="06"
      eyebrow="Labs"
      title="Where the reps"
      accent="happen."
      description="Continuous, isolated environments for the techniques that don't fit in a report template — enterprise attack paths, modern web flaws and AI-agent abuse."
      meta={
        <div className="tag-row">
          <Tag tone="acid">Hack The Box</Tag>
          <Tag tone="acid">PortSwigger Academy</Tag>
          <Tag>Multi-host AD homelab</Tag>
          <Tag>Authorized environments only</Tag>
        </div>
      }
    />

    <div className="lab-list">
      {LABS_DATA.map((lab, index) => (
        <Reveal key={lab.platform} delay={index * 0.06}>
          <article className="panel panel--interactive is-acid lab">
            <div className="lab__head">
              <div className="lab__identity">
                <span className="lab__index">0{index + 1}</span>
                <div>
                  <h3 className="lab__platform">{lab.platform}</h3>
                  <div className="lab__focus">{lab.focus}</div>
                </div>
              </div>
              <div className="lab__highlights">
                {lab.keyHighlights.map((highlight) => (
                  <Tag key={highlight} tone="amber">
                    {highlight}
                  </Tag>
                ))}
              </div>
            </div>

            <p className="lab__desc">{lab.description}</p>

            <div className="lab__topics">
              {lab.topics.map((topic) => (
                <div className="lab__topic" key={topic}>
                  <ChevronRight size={11} />
                  <span>{topic}</span>
                </div>
              ))}
            </div>

            <div className="lab__toolstrip">
              <span className="lab__toolstrip-label">Tooling</span>
              {LAB_TOOLING[index].map((tool) => (
                <span className="tag" key={`${lab.platform}-${tool}`}>
                  {tool}
                </span>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal>
      <div className="app-note">
        <ShieldCheck size={12} />
        <span>
          All lab activity is conducted within authorized educational frameworks and isolated
          environments. Nothing here touches production infrastructure.
        </span>
      </div>
    </Reveal>

    <Reveal>
      <div className="panel app-callout">
        <div>
          <div className="app-callout__title">
            Research follows the <em>release cycle.</em>
          </div>
          <p className="app-callout__text">
            New web, API and LLM techniques are reproduced in the lab first, then folded into client
            test plans.
          </p>
        </div>
        <span className="tag" style={{ height: 34, padding: '0 12px' }}>
          <Terminal size={11} /> Methodology →
        </span>
      </div>
    </Reveal>
  </div>
);
