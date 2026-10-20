import React from 'react';
import type { WindowId, WindowState } from '../types/portfolio';
import { 
  Shield, 
  Briefcase, 
  Cpu, 
  Award, 
  Trophy, 
  Terminal, 
  Lock, 
  BookOpen, 
  GraduationCap, 
  Mail
} from 'lucide-react';
import { sound } from '../utils/audio';

interface WindowDockProps {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  onToggleWindow: (id: WindowId) => void;
  onFocusTerminal: () => void;
  isTerminalMinimized: boolean;
  onToggleTerminal: () => void;
  isTerminalActive?: boolean;
}

export const WindowDock: React.FC<WindowDockProps> = ({
  windows,
  activeWindowId,
  onToggleWindow,
  onFocusTerminal: _onFocusTerminal,
  isTerminalMinimized,
  onToggleTerminal,
  isTerminalActive = false
}) => {
  const dockApps: { id: WindowId; label: string; icon: React.ReactNode }[] = [
    { id: 'about', label: 'About', icon: <Shield size={16} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Cpu size={16} /> },
    { id: 'certs', label: 'Certs', icon: <Award size={16} /> },
    { id: 'achievements', label: 'Honors', icon: <Trophy size={16} /> },
    { id: 'labs', label: 'Labs', icon: <Terminal size={16} /> },
    { id: 'methodology', label: 'Standards', icon: <BookOpen size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Lock size={16} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
  ];

  return (
    <div
      className="no-scrollbar"
      style={{
        position: 'fixed',
        bottom: 'max(8px, env(safe-area-inset-bottom, 8px))',
        left: '50%',
        transform: 'translateX(-50%)',
        height: 'var(--dock-height)',
        padding: '0 8px',
        background: 'rgba(16, 20, 17, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border-green-dim)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.75), 0 0 12px rgba(163, 255, 111, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        zIndex: 9000,
        maxWidth: 'calc(100vw - 16px)',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-x'
      }}
    >
      {/* Terminal Launcher */}
      <button
        onClick={() => {
          sound.playWindowAction();
          onToggleTerminal();
        }}
        title="Terminal Console"
        aria-label="Toggle Terminal Console"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '38px',
          height: '38px',
          minWidth: '38px',
          flexShrink: 0,
          borderRadius: '8px',
          background: isTerminalActive 
            ? 'var(--accent-green-dim)' 
            : !isTerminalMinimized 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'transparent',
          border: isTerminalActive 
            ? '1px solid var(--accent-green)' 
            : !isTerminalMinimized 
            ? '1px solid var(--border-subtle)' 
            : '1px solid transparent',
          color: isTerminalActive 
            ? 'var(--accent-green)' 
            : !isTerminalMinimized 
            ? 'var(--text-primary)' 
            : 'var(--text-secondary)',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
      >
        <Terminal size={16} />
        {/* Active Dot */}
        <span
          style={{
            position: 'absolute',
            bottom: '2px',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: isTerminalActive 
              ? 'var(--accent-green)' 
              : !isTerminalMinimized 
              ? 'var(--accent-amber)' 
              : 'transparent',
            boxShadow: isTerminalActive ? '0 0 4px var(--accent-green)' : 'none'
          }}
        />
      </button>

      {/* Vertical separator */}
      <div style={{ width: '1px', height: '22px', background: 'var(--border-subtle)', margin: '0 2px', flexShrink: 0 }} />

      {/* Application Launchers */}
      {dockApps.map((app) => {
        const win = windows[app.id];
        const isOpen = win?.isOpen;
        const isActive = activeWindowId === app.id && isOpen && !win.isMinimized;

        return (
          <button
            key={app.id}
            onClick={() => {
              sound.playWindowAction();
              onToggleWindow(app.id);
            }}
            title={app.label}
            aria-label={`Open ${app.label}`}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              minWidth: '38px',
              flexShrink: 0,
              borderRadius: '8px',
              background: isActive ? 'var(--accent-green-dim)' : isOpen ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
              border: isActive ? '1px solid var(--accent-green)' : isOpen ? '1px solid var(--border-subtle)' : '1px solid transparent',
              color: isActive ? 'var(--accent-green)' : isOpen ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {app.icon}
            {/* Dot indicator for open state */}
            {isOpen && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--accent-green)' : 'var(--accent-amber)',
                  boxShadow: isActive ? '0 0 4px var(--accent-green)' : 'none'
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
