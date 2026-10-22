import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, House, X } from 'lucide-react';
import { APP_LIST } from '../data/apps';
import { PERSONAL_INFO } from '../data/portfolioData';
import type { WindowId } from '../types/portfolio';
import { sound } from '../utils/audio';

interface NavSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
  onOpenWindow: (id: WindowId) => void;
  activeWindowId: WindowId | null;
}

export const NavSheet: React.FC<NavSheetProps> = ({
  isOpen,
  onClose,
  onGoHome,
  onOpenWindow,
  activeWindowId
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            className="nav-sheet"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Workstation map"
          >
            <div className="nav-sheet__head">
              <span className="eyebrow">
                <span className="dot" /> Workstation map
              </span>
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Close menu">
                <X size={15} />
              </button>
            </div>

            <div className="nav-sheet__grid">
              <button
                type="button"
                className="nav-sheet__item"
                onClick={() => {
                  sound.playWindowAction();
                  onGoHome();
                  onClose();
                }}
              >
                <span className="nav-sheet__idx">00</span>
                <span className="nav-sheet__icon">
                  <House size={14} />
                </span>
                <span className="nav-sheet__main">
                  <span className="nav-sheet__name">Home</span>
                  <span className="nav-sheet__desc">Workstation landing and quick stats</span>
                </span>
                <ArrowUpRight size={13} className="nav-sheet__arrow" />
              </button>

              {APP_LIST.map((app, index) => {
                const Icon = app.icon;
                const active = activeWindowId === app.id;
                return (
                  <button
                    key={app.id}
                    type="button"
                    className="nav-sheet__item"
                    data-app={app.id}
                    onClick={() => {
                      sound.playWindowAction();
                      onOpenWindow(app.id);
                      onClose();
                    }}
                    style={
                      active
                        ? { background: 'var(--acid-dim)', borderColor: 'var(--acid-line)' }
                        : undefined
                    }
                  >
                    <span className="nav-sheet__idx">{String(index + 1).padStart(2, '0')}</span>
                    <span className="nav-sheet__icon" data-tone={app.tone}>
                      <Icon size={14} />
                    </span>
                    <span className="nav-sheet__main">
                      <span className="nav-sheet__name">{app.label}</span>
                      <span className="nav-sheet__desc">{app.description}</span>
                    </span>
                    <ArrowUpRight size={13} className="nav-sheet__arrow" />
                  </button>
                );
              })}
            </div>

            <div className="nav-sheet__foot">
              <a className="tag" href={`mailto:${PERSONAL_INFO.email}`}>
                {PERSONAL_INFO.email}
              </a>
              <a
                className="tag"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <ArrowUpRight size={9} />
              </a>
              <a className="tag" href={PERSONAL_INFO.medium} target="_blank" rel="noopener noreferrer">
                Medium <ArrowUpRight size={9} />
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
