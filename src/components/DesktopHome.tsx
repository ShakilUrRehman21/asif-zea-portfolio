import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ChevronRight,
  Mail,
  MapPin,
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { HERO_DATA, HOME_CONSOLE_SCRIPT, MARQUEE_ITEMS, QUICK_STATS } from '../data/portfolioData';
import { APP_MAP, TILE_IDS } from '../data/apps';
import { COMMANDS } from '../commands/commandRegistry';
import type { WindowId } from '../types/portfolio';
import { CountStat, Magnetic, Tilt } from './ui';
import { sound } from '../utils/audio';

interface DesktopHomeProps {
  onOpenWindow: (id: WindowId) => void;
  onOpenTerminal: () => void;
  onOpenPalette: () => void;
}

const CHIP_TARGETS: { label: string; id: WindowId }[] = [
  { label: 'whoami', id: 'about' },
  { label: 'experience', id: 'experience' },
  { label: 'certs', id: 'certs' },
  { label: 'labs', id: 'labs' },
  { label: 'contact', id: 'contact' }
];

const ConsolePreview: React.FC<{
  onOpenTerminal: () => void;
  onOpenWindow: (id: WindowId) => void;
}> = ({ onOpenTerminal, onOpenWindow }) => {
  const reduced = useReducedMotion();
  const [cmdIndex, setCmdIndex] = useState(2);
  const [charCount, setCharCount] = useState(0);
  const [outCount, setOutCount] = useState(0);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [cmdIndex, charCount, outCount]);

  useEffect(() => {
    if (reduced) {
      setCmdIndex(HOME_CONSOLE_SCRIPT.length);
      return;
    }

    let timer: number;

    if (cmdIndex >= HOME_CONSOLE_SCRIPT.length) {
      timer = window.setTimeout(() => {
        setCmdIndex(0);
        setCharCount(0);
        setOutCount(0);
      }, 3600);
      return () => window.clearTimeout(timer);
    }

    const current = HOME_CONSOLE_SCRIPT[cmdIndex];

    if (charCount < current.cmd.length) {
      timer = window.setTimeout(() => setCharCount((value) => value + 1), 34);
    } else if (outCount < current.out.length) {
      timer = window.setTimeout(() => setOutCount((value) => value + 1), 150);
    } else {
      timer = window.setTimeout(() => {
        setCmdIndex((value) => value + 1);
        setCharCount(0);
        setOutCount(0);
      }, 1000);
    }

    return () => window.clearTimeout(timer);
  }, [cmdIndex, charCount, outCount, reduced]);

  const renderCommand = (index: number) => {
    const entry = HOME_CONSOLE_SCRIPT[index];
    const done = index < cmdIndex || cmdIndex >= HOME_CONSOLE_SCRIPT.length;
    const text = done ? entry.cmd : entry.cmd.slice(0, charCount);
    const showOutputs = done ? entry.out : entry.out.slice(0, outCount);
    const isTyping = index === cmdIndex && charCount < entry.cmd.length;

    return (
      <div key={entry.cmd} className="console__group">
        <div className="console__row">
          <span className="console__prompt">asif@az-secure:~$</span>
          <span className="console__cmd">{text}</span>
          {isTyping && <span className="console__cursor" />}
        </div>
        {showOutputs.map((line, lineIndex) => (
          <div
            key={line}
            className={`console__out ${index === 0 && lineIndex === 0
                ? 'console__out--acid'
                : line.startsWith('●')
                  ? 'console__out--acid'
                  : ''
              }`}
          >
            {line}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="console-wrap">
      <div className="float-chips" aria-hidden="true">
        <span className="float-chip">
          <ShieldCheck size={10} /> HTB CPTS
        </span>
        <span className="float-chip">
          <ShieldCheck size={10} /> EC-Council CPENT
        </span>
        <span className="float-chip">
          <ShieldCheck size={10} /> AWS SAA
        </span>
      </div>

      <Tilt max={4}>
        <div className="console">
          <div className="console__glow" />
          <div className="console__bar">
            <div className="console__dots">
              <span className="console__dot" />
              <span className="console__dot" />
              <span className="console__dot" />
            </div>
            <span className="console__title">asif@az-secure — bash 5.2.26 — 120×32</span>
            <span className="console__badge">
              <span className="live-dot" /> Live
            </span>
          </div>

          <div className="console__body" ref={bodyRef}>
            <div className="console__row">
              <span className="console__out--muted">
                AZ-SECURE preview // type real commands in the terminal
              </span>
            </div>
            {HOME_CONSOLE_SCRIPT.map((_, index) => (index <= cmdIndex ? renderCommand(index) : null))}
            {cmdIndex >= HOME_CONSOLE_SCRIPT.length && (
              <div className="console__row">
                <span className="console__prompt">asif@az-secure:~$</span>
                <span className="console__cursor" />
              </div>
            )}
          </div>

          <div className="console__chips">
            {CHIP_TARGETS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                className="console__chip"
                onClick={() => {
                  sound.playWindowAction();
                  onOpenWindow(chip.id);
                }}
              >
                ${chip.label}
              </button>
            ))}
          </div>

          <div className="console__foot">
            <span className="console__hint">
              <span style={{ color: 'var(--acid)' }}>↳</span> {COMMANDS.length} commands available ·
              type help to list all
            </span>
            <button
              type="button"
              className="console__open"
              onClick={() => {
                sound.playWindowAction();
                onOpenTerminal();
              }}
            >
              Open <ChevronRight size={11} />
            </button>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export const DesktopHome: React.FC<DesktopHomeProps> = ({
  onOpenWindow,
  onOpenTerminal,
  onOpenPalette: _onOpenPalette
}) => {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } }
  };

  const item = {
    hidden: reduced ? {} : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="home" data-home aria-label="Portfolio home">
      <div className="home__inner">
        <div className="home__grid">
          <motion.div className="hero" variants={container} initial="hidden" animate="show">
            <motion.div className="hero__status" variants={item}>
              <span className="live-dot" />
              <span>{HERO_DATA.status}</span>
              <span className="sep">/</span>
              <span className="loc">
                <MapPin size={10} /> {HERO_DATA.location}
              </span>
            </motion.div>

            <h1 className="hero__name" aria-label={`${HERO_DATA.firstName} ${HERO_DATA.lastName}`}>
              <span className="hero__line-wrap">
                <motion.span className="hero__line" variants={item}>
                  {HERO_DATA.firstName}
                </motion.span>
              </span>
              <span className="hero__line-wrap">
                <motion.span className="hero__line hero__line--2" variants={item}>
                  <em>{HERO_DATA.lastName}.</em>
                </motion.span>
              </span>
            </h1>

            <motion.p className="hero__role" variants={item}>
              <span>{HERO_DATA.role}</span>
              <span className="slash">/</span>
              <span>{HERO_DATA.roleSecondary}</span>
            </motion.p>

            <motion.p className="hero__summary" variants={item}>
              I test web, API, mobile, cloud and AI systems the way an <em>adversary</em> would —
              then stay until the fix holds. Three years of end-to-end security work across{' '}
              <strong>global payments, banking, insurance and healthcare</strong>.
            </motion.p>

            <motion.div className="hero__ctas" variants={item}>
              <Magnetic strength={4}>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => {
                    sound.playWindowAction();
                    onOpenWindow('about');
                  }}
                >
                  Explore profile <ArrowUpRight size={14} className="arrow" />
                </button>
              </Magnetic>
              <Magnetic strength={3}>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    sound.playWindowAction();
                    onOpenTerminal();
                  }}
                >
                  <Terminal size={13} /> Open terminal
                </button>
              </Magnetic>
              <button
                type="button"
                className="link-underline"
                onClick={() => {
                  sound.playWindowAction();
                  onOpenWindow('contact');
                }}
              >
                <Mail size={12} /> Get in touch
              </button>
            </motion.div>


          </motion.div>

          <motion.div
            className="hero__side"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <ConsolePreview onOpenTerminal={onOpenTerminal} onOpenWindow={onOpenWindow} />
          </motion.div>
        </div>

        <div className="home__stats">
          {QUICK_STATS.map((stat) => (
            <CountStat
              key={stat.label}
              value={Number(stat.value)}
              suffix={stat.suffix || undefined}
              label={stat.label}
              note={stat.note}
            />
          ))}
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[0, 1].map((group) => (
              <div className="marquee__group" key={group}>
                {MARQUEE_ITEMS.map((text) => (
                  <span className="marquee__item" key={`${group}-${text}`}>
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="home__tiles">
          <div className="home__tiles-head">
            <span className="section-label">Workstation modules</span>
            <span className="mono" style={{ fontSize: 8, color: 'var(--paper-faint)' }}>
              {TILE_IDS.length} modules
            </span>
          </div>
          <div className="grid-2">
            {TILE_IDS.map((id) => {
              const app = APP_MAP[id];
              const Icon = app.icon;
              return (
                <button
                  key={id}
                  type="button"
                  className="app-tile"
                  onClick={() => {
                    sound.playWindowAction();
                    onOpenWindow(id);
                  }}
                >
                  <span className="app-tile__icon" data-tone={app.tone}>
                    <Icon size={15} />
                  </span>
                  <span className="app-tile__main">
                    <span className="app-tile__name">{app.label}</span>
                    <span className="app-tile__desc">{app.description}</span>
                  </span>
                  <ChevronRight size={13} className="app-tile__arrow" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
