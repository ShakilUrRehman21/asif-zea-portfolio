import React, { useEffect, useRef } from 'react';
import { usePageVisible } from '../utils/hooks';

const TOKENS = [
  '0x4A', '0x7F', '0x9C', '0xB2', '0x1A', '0x00', '0xFF', '0x89',
  '0xE5', '0xEC', '0x31', '0xC0', '0xC3', '0x90', '0x55', '0x48',
  '1011', '0100', '1100', '0010', '0111', '0101', '1010', '1111',
  '48 89', '83 EC', 'B8 01', '0F 05', 'FF 25', '75 1A', 'EB 0C',
  '0xDEAD', '0xBEEF', '0xCAFE', '0x1337', '0x7FFF'
];

interface Stream {
  x: number;
  y: number;
  speed: number;
  accent: boolean;
  chars: string[];
}

/**
 * Layered ambience: data rain canvas + aurora, dot grid, scanlines, grain.
 * Deliberately low-contrast so content always wins.
 */
export const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const visible = usePageVisible();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let streams: Stream[] = [];
    let raf = 0;
    let last = 0;

    const randomChars = (length: number) =>
      Array.from({ length }, () => TOKENS[Math.floor(Math.random() * TOKENS.length)]);

    const setup = () => {
      const spacing = width < 760 ? 74 : 60;
      const columnCount = Math.ceil(width / spacing);
      streams = Array.from({ length: columnCount }, (_, i) => ({
        x: i * spacing + 10,
        y: Math.random() * height * 1.5 - height * 0.45,
        speed: 0.16 + Math.random() * 0.22,
        accent: i % 7 === 0,
        chars: randomChars(14)
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = "500 10px 'JetBrains Mono', monospace";
      ctx.textBaseline = 'top';
      setup();
      if (reduced) {
        ctx.clearRect(0, 0, width, height);
        for (const stream of streams) drawStream(stream);
      }
    };

    let rgb = getComputedStyle(document.documentElement).getPropertyValue('--acid-rgb').trim() || '184, 255, 120';
    const onTheme = () => {
      rgb = getComputedStyle(document.documentElement).getPropertyValue('--acid-rgb').trim() || '184, 255, 120';
    };
    window.addEventListener('az-theme-changed', onTheme);

    const drawStream = (stream: Stream) => {
      for (let j = 0; j < stream.chars.length; j += 1) {
        const y = stream.y - j * 16;
        if (y < -24 || y > height + 24) continue;
        const alpha = j === 0 ? 0.82 : Math.max(0.12, 0.46 - j * 0.026);
        ctx.fillStyle = stream.accent
          ? `rgba(${rgb}, ${Math.min(1, alpha * 1.15)})`
          : `rgba(${rgb}, ${alpha})`;
        ctx.fillText(stream.chars[j], stream.x, y);
      }
    };

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (now - last < 32) return;
      const delta = Math.min(64, now - last);
      last = now;

      ctx.clearRect(0, 0, width, height);

      for (const stream of streams) {
        drawStream(stream);
        stream.y += stream.speed * (delta / 16.67);
        if (stream.y - stream.chars.length * 16 > height) {
          stream.y = -Math.random() * height * 0.5;
          stream.chars = randomChars(14);
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    if (!reduced) {
      raf = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('az-theme-changed', onTheme);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  return (
    <div className="atmosphere" aria-hidden="true">
      <canvas ref={canvasRef} className="atmosphere__rain" />
      <div className="atmosphere__aura" />
      <div className="atmosphere__grid" />
      <div className="atmosphere__beam" />
      <div className="atmosphere__vignette" />
      <div className="atmosphere__scanlines" />
      <div className="atmosphere__grain" />
    </div>
  );
};
