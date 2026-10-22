import React, { useEffect, useState } from 'react';
import { Menu, Power, Search, Volume2, VolumeX } from 'lucide-react';
import { APP_MAP } from '../data/apps';
import type { WindowId } from '../types/portfolio';
import { sound } from '../utils/audio';
import { useTheme, THEMES, type ThemeId } from '../utils/theme';

interface SystemBarProps {
  activeWindowId: WindowId | null;
  onOpenWindow?: (id: WindowId) => void;
  onGoHome: () => void;
  onOpenPalette: () => void;
  onLock: () => void;
  onOpenNav: () => void;
}

const THEME_ORDER: ThemeId[] = ['matrix', 'cyan', 'amber'];

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
});

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});

export const SystemBar: React.FC<SystemBarProps> = ({
  activeWindowId,
  onGoHome,
  onOpenPalette,
  onLock,
  onOpenNav
}) => {
  const [now, setNow] = useState(() => new Date());
  const [isMuted, setIsMuted] = useState(() => sound.getMuted());
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const activeApp = activeWindowId ? APP_MAP[activeWindowId] : null;

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button type="button" className="brand" onClick={onGoHome} aria-label="Asif Zea — home">
          <span className="brand__mark">AZ</span>
          <span className="brand__text">
            <span className="brand__name">ASIF ZEA</span>
            <span className="brand__host">asif@az-secure</span>
          </span>
        </button>

        {activeApp && (
          <div className="topbar__active-badge" aria-label={`Active module: ${activeApp.label}`}>
            <span className="topbar__active-sep">/</span>
            <span className="topbar__active-pill">
              <span className="topbar__active-dot" />
              <span>{activeApp.label}</span>
            </span>
          </div>
        )}
      </div>

      <div className="topbar__right">
        <div className="topbar__clock">
          <span className="date">{dateFormatter.format(now)}</span>
          <span className="time">{timeFormatter.format(now)}</span>
        </div>

        <div className="topbar__divider" />

        {/* 3 Colors Theme Switcher — no text names */}
        <div className="theme-dots" role="group" aria-label="Color theme selector">
          {THEME_ORDER.map((id) => {
            const meta = THEMES[id];
            const isActive = theme === id;
            return (
              <button
                key={id}
                type="button"
                className={`theme-dot ${isActive ? 'theme-dot--active' : ''}`}
                onClick={() => {
                  sound.playKeyClick();
                  setTheme(id);
                }}
                title={meta.label}
                aria-label={`Switch to ${meta.label} theme`}
                aria-pressed={isActive}
              >
                <span
                  className="theme-dot__color"
                  style={{ backgroundColor: meta.accent }}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="palette-trigger"
          onClick={() => {
            sound.playWindowAction();
            onOpenPalette();
          }}
          title="Open command palette (Ctrl+K)"
          aria-label="Open command palette"
        >
          <Search size={12} />
          <span className="palette-trigger__label">Search</span>
          <span className="kbd">Ctrl K</span>
        </button>

        <button
          type="button"
          className="icon-btn"
          onClick={() => setIsMuted(sound.toggleMute())}
          title={isMuted ? 'Unmute interface sounds' : 'Mute interface sounds'}
          aria-label={isMuted ? 'Unmute interface sounds' : 'Mute interface sounds'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        <button
          type="button"
          className="icon-btn"
          data-tone="danger"
          onClick={() => {
            sound.playWindowAction();
            onLock();
          }}
          title="Lock workstation"
          aria-label="Lock workstation"
        >
          <Power size={14} />
        </button>

        <button
          type="button"
          className="icon-btn topbar__menu"
          onClick={onOpenNav}
          title="Open workstation map"
          aria-label="Open menu"
        >
          <Menu size={15} />
        </button>
      </div>
    </header>
  );
};
