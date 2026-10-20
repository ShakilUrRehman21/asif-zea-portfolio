import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SystemBar } from './SystemBar';
import { TerminalPanel } from './TerminalPanel';
import { WindowManager } from './WindowManager';
import { WindowDock } from './WindowDock';
import { CommandPalette } from './CommandPalette';
import type { WindowId, WindowState, TerminalLogEntry } from '../types/portfolio';
import { parseAndExecuteCommand, COMMANDS } from '../commands/commandRegistry';
import { sound } from '../utils/audio';

interface DesktopShellProps {
  onLockWorkstation: () => void;
}

const INITIAL_WINDOWS: Record<WindowId, WindowState> = {
  about: {
    id: 'about',
    title: 'ABOUT.APP',
    subtitle: 'Executive Profile // Asif Zea',
    iconName: 'Shield',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 30, y: 16 }
  },
  experience: {
    id: 'experience',
    title: 'EXPERIENCE.APP',
    subtitle: 'Tata Consultancy Services (TCS)',
    iconName: 'Briefcase',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 50, y: 20 }
  },
  skills: {
    id: 'skills',
    title: 'SKILLS.APP',
    subtitle: 'Offensive & Defensive Toolmatrix',
    iconName: 'Cpu',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 70, y: 24 }
  },
  certs: {
    id: 'certs',
    title: 'CERTS.APP',
    subtitle: 'HTB CPTS · CPENT · AWS SAA · CAP · CNSP',
    iconName: 'Award',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 90, y: 18 }
  },
  achievements: {
    id: 'achievements',
    title: 'ACHIEVEMENTS.APP',
    subtitle: 'TCS Honors & HackQuest Season 7',
    iconName: 'Trophy',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 110, y: 22 }
  },
  labs: {
    id: 'labs',
    title: 'LABS.APP',
    subtitle: 'HTB, AD Homelab & PortSwigger Research',
    iconName: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 130, y: 26 }
  },
  methodology: {
    id: 'methodology',
    title: 'METHODOLOGY.APP',
    subtitle: 'OWASP WSTG · ASVS · MASTG · MITRE',
    iconName: 'BookOpen',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 150, y: 20 }
  },
  projects: {
    id: 'projects',
    title: 'PROJECTS.APP',
    subtitle: 'Confidentiality & Client Engagements',
    iconName: 'Lock',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 170, y: 24 }
  },
  education: {
    id: 'education',
    title: 'EDUCATION.APP',
    subtitle: 'B.Tech // Jamia Millia Islamia',
    iconName: 'GraduationCap',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 190, y: 18 }
  },
  contact: {
    id: 'contact',
    title: 'CONTACT.APP',
    subtitle: 'Secure Comms & Verification',
    iconName: 'Mail',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 210, y: 22 }
  }
};

export const DesktopShell: React.FC<DesktopShellProps> = ({ onLockWorkstation }) => {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);
  const highestZIndexRef = useRef(100);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<TerminalLogEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isExecutingCommand, setIsExecutingCommand] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bring a window to top focus
  const focusWindow = useCallback((id: WindowId) => {
    highestZIndexRef.current += 1;
    const nextZ = highestZIndexRef.current;
    setWindows(curr => ({
      ...curr,
      [id]: {
        ...curr[id],
        zIndex: nextZ,
        isMinimized: false
      }
    }));
    setActiveWindowId(id);
  }, []);

  // Open window (or restore if minimized)
  const openWindow = useCallback((id: WindowId) => {
    sound.playWindowAction();
    setWindows(curr => {
      const isAlreadyOpen = curr[id].isOpen;
      // Stagger position if opening fresh
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const initialX = Math.max(16, Math.min(screenWidth - 940, 24 + Math.floor(Math.random() * 40)));
      const initialY = 16 + Math.floor(Math.random() * 16);

      return {
        ...curr,
        [id]: {
          ...curr[id],
          isOpen: true,
          isMinimized: false,
          position: isAlreadyOpen ? curr[id].position : { x: initialX, y: initialY }
        }
      };
    });
    focusWindow(id);
  }, [focusWindow]);

  const closeWindow = useCallback((id: WindowId) => {
    sound.playWindowAction();
    setWindows(curr => ({
      ...curr,
      [id]: {
        ...curr[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false
      }
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const minimizeWindow = useCallback((id: WindowId) => {
    sound.playWindowAction();
    setWindows(curr => ({
      ...curr,
      [id]: {
        ...curr[id],
        isMinimized: true
      }
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const maximizeWindow = useCallback((id: WindowId) => {
    sound.playWindowAction();
    setWindows(curr => ({
      ...curr,
      [id]: {
        ...curr[id],
        isMaximized: !curr[id].isMaximized
      }
    }));
  }, []);

  const toggleWindowFromDock = useCallback((id: WindowId) => {
    const win = windows[id];
    if (!win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      setWindows(curr => ({
        ...curr,
        [id]: { ...curr[id], isMinimized: false }
      }));
      focusWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  }, [windows, activeWindowId, openWindow, focusWindow, minimizeWindow]);

  // Execute terminal command with character-by-character output streaming
  const handleExecuteCommand = useCallback((rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Track command history
    setCommandHistory(prev => [...prev, trimmed]);

    const result = parseAndExecuteCommand(trimmed, commandHistory);

    if (result.clearTerminal) {
      setTerminalLogs([]);
      return;
    }

    if (result.closeAllWindows) {
      setWindows(curr => {
        const next = { ...curr };
        (Object.keys(next) as WindowId[]).forEach(k => {
          next[k] = { ...next[k], isOpen: false, isMinimized: false, isMaximized: false };
        });
        return next;
      });
      setActiveWindowId(null);
      return;
    }

    if (result.exitToLogin) {
      onLockWorkstation();
      return;
    }

    // Determine output lines
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

    const logId = Math.random().toString(36).substring(2, 9);
    const newLog: TerminalLogEntry = {
      id: logId,
      timestamp: new Date().toLocaleTimeString(),
      command: trimmed,
      output: []
    };

    setTerminalLogs(prev => [...prev, newLog]);
    setIsExecutingCommand(true);

    if (lines.length === 0) {
      setIsExecutingCommand(false);
      if (result.openWindow) {
        openWindow(result.openWindow);
      }
      return;
    }

    // Line-by-line output stream like an authentic Unix shell execution
    let lineIdx = 0;
    const currentLines: string[] = [];

    const lineInterval = setInterval(() => {
      if (lineIdx < lines.length) {
        currentLines.push(lines[lineIdx]);
        sound.playKeyClick();

        setTerminalLogs(prev =>
          prev.map(item =>
            item.id === logId ? { ...item, output: [...currentLines] } : item
          )
        );
        lineIdx++;
      } else {
        clearInterval(lineInterval);
        setIsExecutingCommand(false);
        sound.playEnterBeep();

        // Let command line-by-line output complete first, and then open the window
        if (result.openWindow) {
          setTimeout(() => {
            openWindow(result.openWindow!);
          }, 140);
        }
      }
    }, 110);
  }, [commandHistory, openWindow, onLockWorkstation]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K / Cmd+K -> Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playEnterBeep();
        setIsCommandPaletteOpen(prev => !prev);
        return;
      }

      // Alt+ Shortcuts
      if (e.altKey) {
        const key = e.key.toLowerCase();
        const matched = COMMANDS.find(c => c.shortcut?.toLowerCase() === key);
        if (matched) {
          e.preventDefault();
          handleExecuteCommand(matched.name);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleExecuteCommand]);

  // Initial welcome command execution on mount
  useEffect(() => {
    // Open terminal with whoami & profile available
    const initialWelcome: TerminalLogEntry = {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString(),
      output: [
        'AZ-SECURE Linux 6.11.4-az-hardened (x86_64) — Session initialized.',
        'Last login: ' + new Date().toUTCString() + ' from 10.10.14.88 (tun0)',
        'Type "help" to list available commands, or click any command in the header to run.'
      ]
    };
    setTerminalLogs([initialWelcome]);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        paddingTop: 'var(--topbar-height)',
        paddingBottom: 'calc(var(--dock-height) + 12px)'
      }}
    >
      {/* Top System Bar */}
      <SystemBar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onLockWorkstation={onLockWorkstation}
      />

      {/* Main Workspace Area */}
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '4px 4px 8px 4px' : '12px'
        }}
      >
        {/* Primary Interactive Terminal Desktop Window */}
        <div
          style={{
            width: isMobile ? '100%' : 'min(980px, 94vw)',
            height: isMobile 
              ? 'calc(100vh - var(--topbar-height) - var(--dock-height) - 16px)' 
              : 'min(640px, calc(100vh - var(--topbar-height) - var(--dock-height) - 40px))',
            zIndex: 1,
            display: isTerminalMinimized ? 'none' : 'flex'
          }}
        >
          <TerminalPanel
            logs={terminalLogs}
            onExecuteCommand={handleExecuteCommand}
            onClear={() => setTerminalLogs([])}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            isMinimized={isTerminalMinimized}
            onMinimize={() => setIsTerminalMinimized(true)}
            isExecuting={isExecutingCommand}
          />
        </div>

        {/* Floating / Managed Application Windows */}
        <WindowManager
          windows={windows}
          activeWindowId={activeWindowId}
          onFocusWindow={focusWindow}
          onCloseWindow={closeWindow}
          onMinimizeWindow={minimizeWindow}
          onMaximizeWindow={maximizeWindow}
          onOpenWindow={openWindow}
        />
      </main>

      {/* Bottom Switcher Dock */}
      <WindowDock
        windows={windows}
        activeWindowId={activeWindowId}
        onToggleWindow={toggleWindowFromDock}
        onFocusTerminal={() => setIsTerminalMinimized(false)}
        isTerminalMinimized={isTerminalMinimized}
        onToggleTerminal={() => setIsTerminalMinimized(!isTerminalMinimized)}
      />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectCommand={(cmd) => handleExecuteCommand(cmd.name)}
      />
    </div>
  );
};
