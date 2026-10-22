import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SystemBar } from './SystemBar';
import { WindowDock, MobileNav } from './WindowDock';
import { NavSheet } from './NavSheet';
import { DesktopHome } from './DesktopHome';
import { WindowManager } from './WindowManager';
import { TerminalPanel } from './TerminalPanel';
import { CommandPalette } from './CommandPalette';
import { APP_MAP } from '../data/apps';
import type { WindowId, WindowState, TerminalLogEntry } from '../types/portfolio';
import { parseAndExecuteCommand, COMMANDS } from '../commands/commandRegistry';
import { sound } from '../utils/audio';
import { useIsMobile } from '../utils/hooks';

interface DesktopShellProps {
  onLockWorkstation: () => void;
}

const makeWindow = (
  id: WindowId,
  subtitle: string,
  position: { x: number; y: number }
): WindowState => ({
  id,
  title: `${APP_MAP[id].label.toUpperCase()}.APP`,
  subtitle,
  iconName: id,
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
  zIndex: 10,
  position,
  width: APP_MAP[id].width
});

const INITIAL_WINDOWS: Record<WindowId, WindowState> = {
  about: makeWindow('about', 'Identity, focus areas & principles', { x: 140, y: 34 }),
  experience: makeWindow('experience', 'Tata Consultancy Services (TCS)', { x: 160, y: 30 }),
  skills: makeWindow('skills', 'Offensive & defensive toolmatrix', { x: 180, y: 36 }),
  certs: makeWindow('certs', 'CPTS · CPENT · AWS SAA · CAP · CNSP', { x: 130, y: 32 }),
  achievements: makeWindow('achievements', 'TCS honors & HackQuest Season 7', { x: 150, y: 34 }),
  labs: makeWindow('labs', 'HTB, AD homelab & PortSwigger research', { x: 170, y: 30 }),
  methodology: makeWindow('methodology', 'WSTG · ASVS · MASTG · MITRE', { x: 190, y: 32 }),
  projects: makeWindow('projects', 'Confidential engagements & NDA', { x: 210, y: 36 }),
  education: makeWindow('education', 'B.Tech · Jamia Millia Islamia', { x: 150, y: 34 }),
  contact: makeWindow('contact', 'Secure comms & verification', { x: 180, y: 30 }),
  terminal: makeWindow('terminal', 'asif@az-secure — bash 5.2.26', { x: 220, y: 32 })
};

const INITIAL_LOG: TerminalLogEntry = {
  id: 'session-init',
  timestamp: new Date().toISOString(),
  output: [
    'AZ-SECURE Linux 6.11.4-az-hardened (x86_64) — secure session initialized.',
    `Last login: ${new Date().toDateString()} from 10.10.14.88 (tun0)`,
    'Type "help" to list every command, or use the command palette (Ctrl+K).'
  ]
};

export const DesktopShell: React.FC<DesktopShellProps> = ({ onLockWorkstation }) => {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<TerminalLogEntry[]>([INITIAL_LOG]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isExecutingCommand, setIsExecutingCommand] = useState(false);
  const zIndexRef = useRef(100);
  const isMobile = useIsMobile();
  const didRestoreHash = useRef(false);

  const hasOpenWindows = useMemo(
    () => Object.values(windows).some((win) => win.isOpen && !win.isMinimized),
    [windows]
  );

  const syncHash = useCallback((id: WindowId | null) => {
    try {
      const url = id
        ? `${window.location.pathname}${window.location.search}#${id}`
        : `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, '', url);
    } catch {
      /* history may be unavailable in sandboxed frames */
    }
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    zIndexRef.current += 1;
    const nextZ = zIndexRef.current;
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], zIndex: nextZ, isMinimized: false }
    }));
    setActiveWindowId(id);
  }, []);

  const openWindow = useCallback(
    (id: WindowId) => {
      sound.playWindowAction();
      setWindows((current) => {
        const isAlreadyOpen = current[id].isOpen;
        const width = Math.min(APP_MAP[id].width, window.innerWidth - 32);
        const centeredX = Math.max(16, (window.innerWidth - width) / 2);
        const jitter = Math.floor(Math.random() * 46) - 23;
        const x = isAlreadyOpen
          ? current[id].position.x
          : Math.max(16, Math.min(centeredX + jitter, window.innerWidth - width - 16));
        const y = isAlreadyOpen ? current[id].position.y : 26 + Math.floor(Math.random() * 16);

        return {
          ...current,
          [id]: {
            ...current[id],
            isOpen: true,
            isMinimized: false,
            position: { x, y }
          }
        };
      });
      focusWindow(id);
      syncHash(id);
    },
    [focusWindow, syncHash]
  );

  const closeWindow = useCallback(
    (id: WindowId) => {
      sound.playWindowAction();
      setWindows((current) => ({
        ...current,
        [id]: { ...current[id], isOpen: false, isMinimized: false, isMaximized: false }
      }));
      setActiveWindowId((current) => (current === id ? null : current));
      syncHash(null);
    },
    [syncHash]
  );

  const minimizeWindow = useCallback((id: WindowId) => {
    sound.playWindowAction();
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], isMinimized: true }
    }));
    setActiveWindowId((current) => (current === id ? null : current));
  }, []);

  const maximizeWindow = useCallback((id: WindowId) => {
    sound.playWindowAction();
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], isMaximized: !current[id].isMaximized }
    }));
  }, []);

  const toggleWindowFromDock = useCallback(
    (id: WindowId) => {
      const win = windows[id];
      if (!win.isOpen) {
        openWindow(id);
      } else if (win.isMinimized) {
        focusWindow(id);
      } else if (activeWindowId === id) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    },
    [windows, activeWindowId, openWindow, focusWindow, minimizeWindow]
  );

  const goHome = useCallback(() => {
    setWindows((current) => {
      const next = { ...current };
      (Object.keys(next) as WindowId[]).forEach((key) => {
        next[key] = { ...next[key], isOpen: false, isMinimized: false, isMaximized: false };
      });
      return next;
    });
    setActiveWindowId(null);
    setIsNavOpen(false);
    syncHash(null);
  }, [syncHash]);

  const closeAllWindows = useCallback(() => {
    setWindows((current) => {
      const next = { ...current };
      (Object.keys(next) as WindowId[]).forEach((key) => {
        next[key] = { ...next[key], isOpen: false, isMinimized: false, isMaximized: false };
      });
      return next;
    });
    setActiveWindowId(null);
    syncHash(null);
  }, [syncHash]);

  const handleExecuteCommand = useCallback(
    (rawInput: string) => {
      const trimmed = rawInput.trim();
      if (!trimmed || isExecutingCommand) return;

      setCommandHistory((previous) => [...previous, trimmed]);
      const result = parseAndExecuteCommand(trimmed, commandHistory);

      if (result.clearTerminal) {
        setTerminalLogs([]);
        return;
      }

      if (result.closeAllWindows) {
        closeAllWindows();
        sound.playWindowAction();
        return;
      }

      if (result.exitToLogin) {
        onLockWorkstation();
        return;
      }

      if (result.goHome) {
        goHome();
        sound.playWindowAction();
      }

      let lines: string[] = [];
      if (result.output) {
        lines = Array.isArray(result.output) ? result.output : [result.output];
      } else if (result.openWindow) {
        lines = [
          `Resolving module for '${trimmed}'...`,
          `Verifying integrity of ${result.openWindow.toUpperCase()}.APP...`,
          `[ OK ] ${result.openWindow.toUpperCase()}.APP launched`
        ];
      }

      const logId = `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const newLog: TerminalLogEntry = {
        id: logId,
        timestamp: new Date().toLocaleTimeString(),
        command: trimmed,
        output: []
      };

      setTerminalLogs((previous) => [...previous, newLog]);
      setIsExecutingCommand(true);

      if (lines.length === 0) {
        setIsExecutingCommand(false);
        if (result.openWindow) openWindow(result.openWindow);
        return;
      }

      let lineIndex = 0;
      const streamed: string[] = [];
      const interval = window.setInterval(() => {
        if (lineIndex < lines.length) {
          streamed.push(lines[lineIndex]);
          sound.playKeyClick();
          setTerminalLogs((previous) =>
            previous.map((entry) =>
              entry.id === logId ? { ...entry, output: [...streamed] } : entry
            )
          );
          lineIndex += 1;
        } else {
          window.clearInterval(interval);
          setIsExecutingCommand(false);
          sound.playEnterBeep();
          if (result.openWindow) {
            window.setTimeout(() => openWindow(result.openWindow as WindowId), 120);
          }
        }
      }, 80);
    },
    [commandHistory, closeAllWindows, goHome, isExecutingCommand, onLockWorkstation, openWindow]
  );

  // Deep link: #about etc. opens the matching module on first mount.
  useEffect(() => {
    if (didRestoreHash.current) return;
    didRestoreHash.current = true;
    const id = window.location.hash.replace('#', '') as WindowId;
    if (id && APP_MAP[id]) {
      window.setTimeout(() => openWindow(id), 240);
    }
  }, [openWindow]);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const modifier = event.ctrlKey || event.metaKey;

      if (modifier && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        sound.playEnterBeep();
        setIsPaletteOpen((previous) => !previous);
        return;
      }

      if (modifier && event.key === '`') {
        event.preventDefault();
        sound.playWindowAction();
        toggleWindowFromDock('terminal');
        return;
      }

      if (event.key === 'Escape') {
        if (isPaletteOpen) {
          setIsPaletteOpen(false);
          return;
        }
        if (isNavOpen) {
          setIsNavOpen(false);
          return;
        }
        const target = event.target as HTMLElement | null;
        if (target?.closest('input, textarea, [contenteditable="true"]')) return;
        if (activeWindowId) {
          closeWindow(activeWindowId);
        }
        return;
      }

      if (event.altKey) {
        const key = event.key.toLowerCase();
        const matched = COMMANDS.find((command) => command.shortcut?.toLowerCase() === key);
        if (matched) {
          event.preventDefault();
          if (matched.windowId === 'terminal' || matched.name === 'terminal') {
            openWindow('terminal');
            return;
          }
          handleExecuteCommand(matched.name);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    activeWindowId,
    closeWindow,
    handleExecuteCommand,
    isNavOpen,
    isPaletteOpen,
    openWindow,
    toggleWindowFromDock
  ]);

  const terminalNode = (
    <TerminalPanel
      logs={terminalLogs}
      onExecuteCommand={handleExecuteCommand}
      onClear={() => setTerminalLogs([])}
      onOpenCommandPalette={() => setIsPaletteOpen(true)}
      isExecuting={isExecutingCommand}
    />
  );

  return (
    <div className="shell" data-app-shell>
      <SystemBar
        activeWindowId={activeWindowId}
        onOpenWindow={openWindow}
        onGoHome={goHome}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onLock={onLockWorkstation}
        onOpenNav={() => setIsNavOpen(true)}
      />

      <main className="shell__main" data-windows={hasOpenWindows}>
        <div className="shell__scrim" aria-hidden="true" />

        <DesktopHome
          onOpenWindow={openWindow}
          onOpenTerminal={() => openWindow('terminal')}
          onOpenPalette={() => setIsPaletteOpen(true)}
        />

        <WindowManager
          windows={windows}
          activeWindowId={activeWindowId}
          isMobile={isMobile}
          terminalNode={terminalNode}
          onFocusWindow={focusWindow}
          onCloseWindow={closeWindow}
          onMinimizeWindow={minimizeWindow}
          onMaximizeWindow={maximizeWindow}
          onOpenWindow={openWindow}
        />
      </main>

      <div className="dock-fade" aria-hidden="true" />

      <WindowDock
        windows={windows}
        activeWindowId={activeWindowId}
        onToggleWindow={toggleWindowFromDock}
        onGoHome={goHome}
        onOpenNav={() => setIsNavOpen(true)}
      />

      <MobileNav
        activeWindowId={activeWindowId}
        onOpenWindow={openWindow}
        onGoHome={goHome}
        onOpenNav={() => setIsNavOpen(true)}
      />

      <NavSheet
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onGoHome={goHome}
        onOpenWindow={openWindow}
        activeWindowId={activeWindowId}
      />

      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSelectCommand={(command) => handleExecuteCommand(command.name)}
      />
    </div>
  );
};
