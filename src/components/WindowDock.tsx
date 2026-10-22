import React from 'react';
import { Briefcase, Cpu, Ellipsis, House, Mail, Menu, Shield, Terminal } from 'lucide-react';
import { APP_MAP, DOCK_IDS } from '../data/apps';
import type { WindowId, WindowState } from '../types/portfolio';
import { sound } from '../utils/audio';

interface WindowDockProps {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  onToggleWindow: (id: WindowId) => void;
  onGoHome: () => void;
  onOpenNav: () => void;
}

interface DockButtonProps {
  label: string;
  shortcut?: string;
  isOpen: boolean;
  isActive: boolean;
  appId?: string;
  onClick: () => void;
  children: React.ReactNode;
}

const DockButton: React.FC<DockButtonProps> = ({
  label,
  shortcut,
  isOpen,
  isActive,
  appId,
  onClick,
  children
}) => (
  <button
    type="button"
    className="dock-item"
    data-open={isOpen}
    data-active={isActive}
    data-app={appId}
    onClick={onClick}
    aria-label={label}
    aria-pressed={isActive}
  >
    {children}
    <span
      className="dock-item__dot"
      style={{ opacity: isOpen || isActive ? 1 : 0 }}
      aria-hidden="true"
    />
    <span className="dock-item__tip" role="tooltip">
      {label}
      {shortcut ? <span className="kbd">{shortcut}</span> : null}
    </span>
  </button>
);

export const WindowDock: React.FC<WindowDockProps> = ({
  windows,
  activeWindowId,
  onToggleWindow,
  onGoHome,
  onOpenNav
}) => {
  const terminal = windows.terminal;

  return (
    <nav className="dock" aria-label="Application dock">
      <DockButton
        label="Home"
        isOpen={false}
        isActive={activeWindowId === null}
        onClick={onGoHome}
      >
        <House size={17} />
      </DockButton>

      <span className="dock__sep" aria-hidden="true" />

      <DockButton
        label="Terminal"
        shortcut="Ctrl `"
        appId="terminal"
        isOpen={terminal.isOpen && !terminal.isMinimized}
        isActive={activeWindowId === 'terminal'}
        onClick={() => {
          sound.playWindowAction();
          onToggleWindow('terminal');
        }}
      >
        <Terminal size={17} />
      </DockButton>

      <span className="dock__sep" aria-hidden="true" />

      {DOCK_IDS.map((id) => {
        const app = APP_MAP[id];
        const Icon = app.icon;
        const win = windows[id];
        return (
          <DockButton
            key={id}
            label={app.label}
            shortcut={app.shortcut ? `Alt ${app.shortcut}` : undefined}
            appId={id}
            isOpen={win.isOpen && !win.isMinimized}
            isActive={activeWindowId === id}
            onClick={() => {
              sound.playWindowAction();
              onToggleWindow(id);
            }}
          >
            <Icon size={17} />
          </DockButton>
        );
      })}

      <span className="dock__sep" aria-hidden="true" />

      <DockButton label="All modules" isOpen={false} isActive={false} onClick={onOpenNav}>
        <Ellipsis size={17} />
      </DockButton>
    </nav>
  );
};

/* --------------------------------------------------------------------------
   Mobile bottom navigation
   -------------------------------------------------------------------------- */

interface MobileNavProps {
  activeWindowId: WindowId | null;
  onOpenWindow: (id: WindowId) => void;
  onGoHome: () => void;
  onOpenNav: () => void;
}

const items = [
  { id: 'home' as const, label: 'Home', icon: House },
  { id: 'about' as const, label: 'Profile', icon: Shield },
  { id: 'experience' as const, label: 'Work', icon: Briefcase },
  { id: 'skills' as const, label: 'Skills', icon: Cpu },
  { id: 'contact' as const, label: 'Contact', icon: Mail }
];

export const MobileNav: React.FC<MobileNavProps> = ({
  activeWindowId,
  onOpenWindow,
  onGoHome,
  onOpenNav
}) => (
  <nav className="mnav" aria-label="Mobile navigation">
    {items.map((item) => {
      const Icon = item.icon;
      const isHome = item.id === 'home';
      const active = isHome ? activeWindowId === null : activeWindowId === item.id;
      return (
        <button
          key={item.id}
          type="button"
          className="mnav__item"
          data-active={active}
          data-app={isHome ? undefined : item.id}
          onClick={() => {
            sound.playWindowAction();
            if (isHome) onGoHome();
            else onOpenWindow(item.id);
          }}
          aria-current={active ? 'page' : undefined}
        >
          <Icon size={17} />
          <span>{item.label}</span>
        </button>
      );
    })}

    <button
      type="button"
      className="mnav__item"
      onClick={() => {
        sound.playWindowAction();
        onOpenNav();
      }}
      aria-label="Open all modules"
    >
      <Menu size={17} />
      <span>Menu</span>
    </button>
  </nav>
);
