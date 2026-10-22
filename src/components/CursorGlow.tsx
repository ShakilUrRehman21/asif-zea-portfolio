import React, { useEffect, useRef } from 'react';

/**
 * An interactive, high-visibility phosphor spotlight and cyber reticle
 * that dynamically illuminates the workstation wherever the cursor moves.
 */
export const CursorGlow: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.42;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let active = false;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      // Update root css coordinates for reactive surface highlights
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);

      if (!active) {
        active = true;
        node.style.opacity = '1';
      }

      // Check if cursor is over an interactive element
      const target = event.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('button, a, input, textarea, select, [role="button"], .app-tile, .console__chip, .term__chip')
      );
      if (isInteractive) {
        node.setAttribute('data-hover', 'true');
      } else {
        node.removeAttribute('data-hover');
      }
    };

    const onLeave = () => {
      node.style.opacity = '0';
    };

    const onEnter = () => {
      if (active) node.style.opacity = '1';
    };

    const loop = () => {
      // Fluid easing interpolation
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-glow" aria-hidden="true" style={{ opacity: 0 }}>
      <div className="cursor-glow__aura" />
      <div className="cursor-glow__beam" />
      <div className="cursor-glow__ring" />
      <div className="cursor-glow__dot" />
    </div>
  );
};
