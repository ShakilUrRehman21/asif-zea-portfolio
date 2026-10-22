import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useDragControls } from 'motion/react';
import { Copy, Minus, Square, X } from 'lucide-react';
import { APP_MAP } from '../data/apps';
import type { WindowState } from '../types/portfolio';
import { sound } from '../utils/audio';

interface ApplicationWindowProps {
  windowState: WindowState;
  isActive: boolean;
  isMobile: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: React.ReactNode;
}

export const ApplicationWindow: React.FC<ApplicationWindowProps> = ({
  windowState,
  isActive,
  isMobile,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  children
}) => {
  const app = APP_MAP[windowState.id];
  const AppIcon = app.icon;
  const dragControls = useDragControls();
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [viewport, setViewport] = useState(() => ({
    w: typeof window === 'undefined' ? 1440 : window.innerWidth,
    h: typeof window === 'undefined' ? 900 : window.innerHeight
  }));

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleScroll = useCallback(() => {
    const node = scrollRef.current;
    const bar = progressRef.current;
    if (!node || !bar) return;
    const max = node.scrollHeight - node.clientHeight;
    const ratio = max > 8 ? Math.min(1, Math.max(0, node.scrollTop / max)) : 0;
    bar.style.transform = `scaleX(${ratio})`;
  }, []);

  const width = Math.min(app.width, viewport.w - 32);
  const left = Math.max(14, Math.min(windowState.position.x, viewport.w - width - 14));
  const top = Math.max(10, Math.min(windowState.position.y, 46));

  const constrainedStyle: React.CSSProperties = isMobile
    ? { zIndex: windowState.zIndex }
    : windowState.isMaximized
      ? {
          top: 10,
          left: 10,
          right: 10,
          bottom: 'calc(var(--dock-h) + 12px)',
          width: 'auto',
          height: 'auto',
          maxHeight: 'none',
          zIndex: windowState.zIndex
        }
      : { top, left, width, zIndex: windowState.zIndex };

  const dragConstraints = {
    left: -(left - 12),
    right: Math.max(20, viewport.w - width - left - 14),
    top: -(top - 10),
    bottom: Math.max(80, viewport.h - top - 180)
  };

  return (
    <motion.div
      className="window"
      data-active={isActive}
      data-max={windowState.isMaximized}
      data-window={windowState.id}
      role="dialog"
      aria-label={`${app.label} window`}
      aria-modal={false}
      initial={{ opacity: 0, scale: 0.965, y: 16, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.975, y: 10, filter: 'blur(6px)' }}
      transition={{ type: 'spring', stiffness: 330, damping: 30, mass: 0.75 }}
      drag={!isMobile && !windowState.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0.055}
      dragMomentum={false}
      dragConstraints={dragConstraints}
      onPointerDown={onFocus}
      style={constrainedStyle}
    >
      <header
        className="window__bar"
        onPointerDown={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest('button')) return;
          if (!isMobile && !windowState.isMaximized) {
            dragControls.start(event);
          }
        }}
      >
        <span className="window__mobile-grab" aria-hidden="true" />
        <div className="window__identity">
          <span className="window__icon" data-tone={app.tone}>
            <AppIcon size={13} />
          </span>
          <div className="window__titles">
            <span className="window__title">{app.label.toUpperCase()}.APP</span>
            <span className="window__sub">{windowState.subtitle}</span>
          </div>
        </div>

        <div className="window__actions">
          <button
            type="button"
            className="window__btn"
            data-role="minimize"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              sound.playWindowAction();
              onMinimize();
            }}
            title="Minimize"
            aria-label="Minimize window"
          >
            <Minus size={14} />
          </button>

          <button
            type="button"
            className="window__btn"
            data-role="maximize"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              sound.playWindowAction();
              onMaximize();
            }}
            title={windowState.isMaximized ? 'Restore window' : 'Maximize window'}
            aria-label={windowState.isMaximized ? 'Restore window' : 'Maximize window'}
          >
            {windowState.isMaximized ? <Copy size={12} /> : <Square size={12} />}
          </button>

          <button
            type="button"
            className="window__btn"
            data-role="close"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              sound.playWindowAction();
              onClose();
            }}
            title="Close"
            aria-label="Close window"
          >
            <X size={15} />
          </button>
        </div>

        <span className="window__progress" ref={progressRef} aria-hidden="true" />
      </header>

      <div className="window__scroll" ref={scrollRef} onScroll={handleScroll}>
        <div className="window__body">{children}</div>
      </div>
    </motion.div>
  );
};
