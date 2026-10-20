import React, { useRef } from 'react';
import { motion, useDragControls } from 'motion/react';
import { Minus, Square, Copy, X, Terminal, Shield, Award, BookOpen, GraduationCap, Mail, Briefcase, Cpu, Lock } from 'lucide-react';
import type { WindowState } from '../types/portfolio';
import { sound } from '../utils/audio';

interface ApplicationWindowProps {
  windowState: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: React.ReactNode;
}

export const ApplicationWindow: React.FC<ApplicationWindowProps> = ({
  windowState,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  children
}) => {
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  // Icon selector based on window id
  const renderAppIcon = () => {
    switch (windowState.id) {
      case 'about': return <Shield size={14} style={{ color: 'var(--accent-green)' }} />;
      case 'experience': return <Briefcase size={14} style={{ color: 'var(--accent-amber)' }} />;
      case 'skills': return <Cpu size={14} style={{ color: 'var(--accent-green)' }} />;
      case 'certs': return <Award size={14} style={{ color: 'var(--accent-green)' }} />;
      case 'achievements': return <Award size={14} style={{ color: 'var(--accent-amber)' }} />;
      case 'labs': return <Terminal size={14} style={{ color: 'var(--accent-green)' }} />;
      case 'projects': return <Lock size={14} style={{ color: 'var(--accent-amber)' }} />;
      case 'methodology': return <BookOpen size={14} style={{ color: 'var(--accent-green)' }} />;
      case 'education': return <GraduationCap size={14} style={{ color: 'var(--accent-blue)' }} />;
      case 'contact': return <Mail size={14} style={{ color: 'var(--accent-green)' }} />;
      default: return <Terminal size={14} style={{ color: 'var(--accent-green)' }} />;
    }
  };

  const [isMobile, setIsMobile] = React.useState(() => 
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  // Dynamic drag constraints allowing free movement all the way to the right and bottom corners
  const [dragBounds, setDragBounds] = React.useState({
    top: -20,
    left: -20,
    right: 1200,
    bottom: 600
  });

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (!mobile) {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const initX = windowState.position?.x ?? 30;
        const initY = Math.max(12, Math.min(windowState.position?.y ?? 20, 40));

        setDragBounds({
          left: -(initX - 8),
          right: Math.max(400, winWidth - initX - 120),
          top: -(initY - 4),
          bottom: Math.max(200, winHeight - initY - 100)
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowState.position?.x, windowState.position?.y]);

  if (windowState.isMinimized) {
    return null;
  }

  // Maximized styling vs floating window styling
  const styleVariants = windowState.isMaximized
    ? {
        position: 'fixed' as const,
        top: 'calc(var(--topbar-height) + 4px)',
        left: '4px',
        right: '4px',
        bottom: 'calc(var(--dock-height) + 6px)',
        width: 'auto',
        height: 'auto',
        borderRadius: '8px'
      }
    : isMobile
    ? {
        position: 'fixed' as const,
        top: 'calc(var(--topbar-height) + 2px)',
        left: '0',
        right: '0',
        bottom: 'max(4px, env(safe-area-inset-bottom, 4px))',
        width: '100vw',
        height: 'auto',
        borderRadius: '0px'
      }
    : {
        position: 'absolute' as const,
        top: `${Math.max(12, Math.min(windowState.position.y, 40))}px`,
        left: `${windowState.position.x}px`,
        width: 'min(860px, 92vw)',
        maxHeight: `calc(100vh - var(--topbar-height) - var(--dock-height) - 48px - ${Math.max(12, Math.min(windowState.position.y, 40))}px)`,
        borderRadius: '8px'
      };

  return (
    <motion.div
      ref={windowRef}
      onMouseDown={onFocus}
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 10 }}
      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
      drag={!windowState.isMaximized && !isMobile}
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0.08}
      dragMomentum={false}
      dragConstraints={dragBounds}
      style={{
        ...styleVariants,
        zIndex: windowState.zIndex,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-surface)',
        border: isActive ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
        boxShadow: isActive ? 'var(--shadow-active-window)' : 'var(--shadow-window)',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      {/* Title Bar (Draggable handle on desktop) */}
      <div
        onPointerDown={(e) => {
          if (!windowState.isMaximized && !isMobile) {
            dragControls.start(e);
          }
        }}
        style={{
          height: '38px',
          padding: '0 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isActive ? 'var(--bg-surface-elevated)' : 'rgba(16, 20, 17, 0.95)',
          borderBottom: isActive ? '1px solid var(--border-green-dim)' : '1px solid var(--border-subtle)',
          cursor: !windowState.isMaximized && !isMobile ? 'grab' : 'default',
          userSelect: 'none'
        }}
      >
        {/* Left: Application Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          {renderAppIcon()}
          <span 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '12px', 
              fontWeight: 600, 
              color: isActive ? 'var(--accent-green)' : 'var(--text-primary)',
              whiteSpace: 'nowrap'
            }}
          >
            {windowState.title}
          </span>
          <span 
            className="hide-mobile"
            style={{ 
              fontSize: '11px', 
              color: 'var(--text-muted)', 
              fontFamily: 'var(--font-mono)',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            // {windowState.subtitle}
          </span>
        </div>

        {/* Right: Window Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {/* Minimize button */}
          <button
            className="win-ctrl-btn"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              sound.playWindowAction();
              onMinimize();
            }}
            title="Minimize"
            aria-label="Minimize Window"
          >
            <Minus size={13} />
          </button>

          {/* Maximize / Restore button */}
          {!isMobile && (
            <button
              className="win-ctrl-btn"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                sound.playWindowAction();
                onMaximize();
              }}
              title={windowState.isMaximized ? 'Restore' : 'Maximize'}
              aria-label={windowState.isMaximized ? 'Restore Window' : 'Maximize Window'}
            >
              {windowState.isMaximized ? <Copy size={11} /> : <Square size={11} />}
            </button>
          )}

          {/* Close button */}
          <button
            className="win-ctrl-btn close"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              sound.playWindowAction();
              onClose();
            }}
            title="Close"
            aria-label="Close Window"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window Body (Scrollable with generous bottom padding so content never gets obscured) */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          padding: isMobile ? '12px 10px 72px 10px' : '16px 16px 64px 16px',
          background: 'radial-gradient(ellipse at top, rgba(21, 26, 22, 0.4) 0%, rgba(16, 20, 17, 0.8) 100%)'
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
