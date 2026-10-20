import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  'AZ Linux Kernel 6.11.4-az-hardened x86_64 — initializing architecture...',
  '[ OK ] Initialized CPU hardware timers & ACPI subsystem',
  '[ OK ] Starting cryptographically verified system services',
  '[ OK ] Initializing network interface (eth0: 10.13.37.10/24)',
  '[ OK ] Loading security toolkit: burp, bloodhound, impacket, frida, nmap',
  '[ OK ] Mounting user encrypted workspace /home/asif (LUKS ext4)',
  '[ OK ] Security policies active (AppArmor, iptables, auditd)',
  '[ OK ] System verified. Workstation ready for operator login.'
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        sound.playEnterBeep();
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  useEffect(() => {
    if (currentLineIndex < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        sound.playKeyClick();
        setCurrentLineIndex(prev => prev + 1);
        setProgress(Math.round(((currentLineIndex + 1) / BOOT_LOGS.length) * 100));
      }, 260);
      return () => clearTimeout(timer);
    } else {
      // Small pause after last message, then complete
      const finishTimer = setTimeout(() => {
        sound.playChirp();
        onComplete();
      }, 600);
      return () => clearTimeout(finishTimer);
    }
  }, [currentLineIndex, onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(9, 11, 10, 0.72)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
        padding: 'min(40px, 5vw)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 100000,
        overflow: 'hidden'
      }}
    >
      <div>
        {/* OS Identity */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
          <div>
            <span style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: 'clamp(12px, 3.8vw, 14px)', letterSpacing: '0.05em' }}>
              AZ-SECURE // PERSONAL WORKSTATION (x86_64)
            </span>
            <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>
              BIOS v2.4.1 · UEFI SECURE BOOT ENABLED
            </div>
          </div>
          <button
            onClick={() => {
              sound.playEnterBeep();
              onComplete();
            }}
            className="btn-terminal"
            style={{ fontSize: '11px', padding: '4px 10px', flexShrink: 0 }}
          >
            Skip Boot [ESC]
          </button>
        </div>

        {/* Staggered Boot Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'clamp(11px, 3vw, 13px)' }}>
          {BOOT_LOGS.slice(0, currentLineIndex).map((log, index) => {
            const isOk = log.startsWith('[ OK ]');
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: isOk ? 'var(--text-primary)' : 'var(--accent-amber)'
                }}
              >
                {isOk && (
                  <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>
                    [ OK ]
                  </span>
                )}
                <span>{isOk ? log.replace('[ OK ] ', '') : log}</span>
              </motion.div>
            );
          })}

          {currentLineIndex < BOOT_LOGS.length && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <span>Loading module...</span>
              <span className="terminal-cursor" />
            </div>
          )}
        </div>
      </div>

      {/* Progress Footer */}
      <div style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>
          <span>INITIALIZING SYSTEM BUS...</span>
          <span style={{ color: 'var(--accent-green)' }}>{progress}%</span>
        </div>
        <div style={{ width: '100%', height: '3px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'var(--accent-green)',
              boxShadow: '0 0 8px var(--accent-green)',
              transition: 'width 0.2s ease-out'
            }}
          />
        </div>
      </div>
    </div>
  );
};
