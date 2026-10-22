import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  'UEFI secure boot chain verified · signature OK',
  'Linux kernel 6.11.4-az-hardened x86_64 initializing',
  'Cryptographic services and LUKS volume mounted',
  'Network interface tun0 online · 10.10.14.88/24',
  'Security toolchain loaded · burp, bloodhound, impacket, frida',
  'AppArmor, auditd and iptables policies enforced',
  'Workspace /home/asif ready for operator session'
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const skip = (event: KeyboardEvent | MouseEvent) => {
      if (event instanceof MouseEvent) {
        sound.playWindowAction();
        onComplete();
      } else if (['Escape', ' ', 'Enter'].includes(event.key)) {
        sound.playEnterBeep();
        onComplete();
      }
    };

    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [onComplete]);

  useEffect(() => {
    if (lineIndex >= BOOT_LOGS.length) {
      const finish = setTimeout(() => {
        sound.playChirp();
        onComplete();
      }, 380);
      return () => clearTimeout(finish);
    }

    const timer = setTimeout(() => {
      setLineIndex((current) => current + 1);
      setProgress(Math.round(((lineIndex + 1) / BOOT_LOGS.length) * 100));
      sound.playKeyClick();
    }, lineIndex === 0 ? 300 : 150);

    return () => clearTimeout(timer);
  }, [lineIndex, onComplete]);

  return (
    <div className="boot" role="status" aria-live="polite">
      <div className="boot__top">
        <div className="boot__brand">
          <span className="boot__brand-name">AZ-SECURE</span>
          <span className="boot__brand-sub">Personal workstation · x86_64 · secure boot</span>
        </div>
        <div className="boot__meta">
          <span className="boot__meta-row">BIOS v2.4.1 // UEFI</span>
          <span className="boot__meta-row">Kernel 6.11.4-az-hardened</span>
        </div>
      </div>

      <div className="boot__main">
        <div className="boot__mark">
          <motion.svg
            viewBox="0 0 120 140"
            fill="none"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            aria-hidden="true"
          >
            <motion.path
              d="M60 6 L107 24 V66 C107 97 87 118 60 133 C33 118 13 97 13 66 V24 Z"
              stroke="var(--acid)"
              strokeWidth="1.6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.15, ease: 'easeInOut' }}
            />
            <motion.path
              d="M37 94 L60 42 L83 94 M45.5 77 H74.5"
              stroke="var(--acid)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.25, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="60"
              cy="6"
              r="2.5"
              fill="var(--acid)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.4] }}
              transition={{ duration: 1.6, delay: 0.9, repeat: Infinity }}
            />
          </motion.svg>

          <span className="boot__mark-label">Initializing operator environment</span>
          <h1 className="boot__mark-title">
            Instrument <em>grade</em> security.
          </h1>
          <span className="boot__mark-sub">Asif Zea · Application Security Engineer</span>
        </div>

        <div className="boot__logs">
          {BOOT_LOGS.slice(0, lineIndex).map((log) => (
            <motion.div
              key={log}
              className="boot__log"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="boot__ok">[ OK ]</span>
              <span>{log}</span>
            </motion.div>
          ))}

          {lineIndex < BOOT_LOGS.length ? (
            <div className="boot__log boot__log--warn">
              <span className="boot__ok" style={{ color: 'var(--amber)' }}>[ .. ]</span>
              <span>{BOOT_LOGS[lineIndex]}</span>
              <span className="console__cursor" style={{ marginTop: 3 }} />
            </div>
          ) : (
            <motion.div
              className="boot__log"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <span className="boot__ok">[ OK ]</span>
              <span style={{ color: 'var(--acid)' }}>
                Workstation ready. Opening secure session...
              </span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="boot__bottom">
        <div className="boot__progress-label">
          <span>Initializing system bus · press any key to skip</span>
          <span className="boot__pct">{progress}%</span>
        </div>
        <div className="boot__progress">
          <div className="boot__progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <button
        type="button"
        className="boot__skip"
        onClick={(event) => {
          event.stopPropagation();
          sound.playWindowAction();
          onComplete();
        }}
      >
        <ShieldCheck size={11} /> Skip boot <ChevronRight size={11} />
      </button>
    </div>
  );
};
