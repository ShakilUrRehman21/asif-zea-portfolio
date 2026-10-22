import React, { useRef } from 'react';
import { motion, useReducedMotion, useSpring } from 'motion/react';
import { useCountUp } from '../utils/hooks';

/* --------------------------------------------------------------------------
   Reveal — soft scroll-linked entrance
   -------------------------------------------------------------------------- */

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: 'div' | 'li' | 'section' | 'span';
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className, y = 12 }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* --------------------------------------------------------------------------
   SectionHead — the editorial header used by every app
   -------------------------------------------------------------------------- */

interface SectionHeadProps {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  description?: string;
  meta?: React.ReactNode;
}

export const SectionHead: React.FC<SectionHeadProps> = ({
  index,
  eyebrow,
  title,
  accent,
  description,
  meta
}) => (
  <header className="app-head">
    <div className="eyebrow">
      <span className="idx">{index}</span>
      <span className="dot" />
      <span>{eyebrow}</span>
    </div>
    <h2 className="app-title">
      {title}
      {accent ? (
        <>
          {' '}
          <em>{accent}</em>
        </>
      ) : null}
    </h2>
    {description ? <p className="app-lede">{description}</p> : null}
    {meta}
  </header>
);

/* --------------------------------------------------------------------------
   Tag
   -------------------------------------------------------------------------- */

export const Tag: React.FC<{
  children: React.ReactNode;
  tone?: 'acid' | 'amber' | 'cyan';
  className?: string;
}> = ({ children, tone, className = '' }) => (
  <span className={`tag ${tone ? `tag--${tone}` : ''} ${className}`.trim()}>{children}</span>
);

/* --------------------------------------------------------------------------
   Tilt — pointer-reactive 3D card
   -------------------------------------------------------------------------- */

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  max?: number;
  style?: React.CSSProperties;
}

export const Tilt: React.FC<TiltProps> = ({ children, className, max = 5, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 160, damping: 18, mass: 0.6 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 18, mass: 0.6 });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === 'touch') return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
};

/* --------------------------------------------------------------------------
   Magnetic — CTA that leans toward the cursor
   -------------------------------------------------------------------------- */

export const Magnetic: React.FC<{
  children: React.ReactNode;
  strength?: number;
  className?: string;
}> = ({ children, strength = 5, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 240, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 240, damping: 18, mass: 0.4 });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === 'touch') return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength * 2);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength * 2);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y, display: 'inline-flex' }}
    >
      {children}
    </motion.div>
  );
};

/* --------------------------------------------------------------------------
   CountUp stat
   -------------------------------------------------------------------------- */

export const CountStat: React.FC<{
  value: number;
  suffix?: string;
  label: string;
  note?: string;
  pad?: number;
}> = ({ value, suffix = '', label, note, pad = 2 }) => {
  const count = useCountUp(value);
  return (
    <div className="stat">
      <div className="stat__value">
        {String(count).padStart(pad, '0')}
        {suffix ? <span className="suffix">{suffix}</span> : null}
      </div>
      <div className="stat__label">{label}</div>
      {note ? <div className="stat__note">{note}</div> : null}
    </div>
  );
};
