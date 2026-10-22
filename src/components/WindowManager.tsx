import React from 'react';
import { AnimatePresence } from 'motion/react';
import { ApplicationWindow } from './ApplicationWindow';
import type { WindowId, WindowState } from '../types/portfolio';
import { AboutApp } from './apps/AboutApp';
import { ExperienceApp } from './apps/ExperienceApp';
import { SkillsApp } from './apps/SkillsApp';
import { CertificationsApp } from './apps/CertificationsApp';
import { AchievementsApp } from './apps/AchievementsApp';
import { LabsApp } from './apps/LabsApp';
import { ProjectsApp } from './apps/ProjectsApp';
import { MethodologyApp } from './apps/MethodologyApp';
import { EducationApp } from './apps/EducationApp';
import { ContactApp } from './apps/ContactApp';

interface WindowManagerProps {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  isMobile: boolean;
  terminalNode: React.ReactNode;
  onFocusWindow: (id: WindowId) => void;
  onCloseWindow: (id: WindowId) => void;
  onMinimizeWindow: (id: WindowId) => void;
  onMaximizeWindow: (id: WindowId) => void;
  onOpenWindow: (id: WindowId) => void;
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  activeWindowId,
  isMobile,
  terminalNode,
  onFocusWindow,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onOpenWindow
}) => {
  const renderAppContent = (id: WindowId) => {
    switch (id) {
      case 'about':
        return <AboutApp onOpenWindow={onOpenWindow} />;
      case 'experience':
        return <ExperienceApp />;
      case 'skills':
        return <SkillsApp />;
      case 'certs':
        return <CertificationsApp />;
      case 'achievements':
        return <AchievementsApp />;
      case 'labs':
        return <LabsApp />;
      case 'projects':
        return <ProjectsApp onOpenWindow={onOpenWindow} />;
      case 'methodology':
        return <MethodologyApp />;
      case 'education':
        return <EducationApp onOpenWindow={onOpenWindow} />;
      case 'contact':
        return <ContactApp />;
      case 'terminal':
        return terminalNode;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {(Object.keys(windows) as WindowId[]).map((id) => {
        const win = windows[id];
        if (!win.isOpen || win.isMinimized) return null;

        return (
          <ApplicationWindow
            key={win.id}
            windowState={win}
            isActive={activeWindowId === win.id}
            isMobile={isMobile}
            onFocus={() => onFocusWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
          >
            {renderAppContent(win.id)}
          </ApplicationWindow>
        );
      })}
    </AnimatePresence>
  );
};
