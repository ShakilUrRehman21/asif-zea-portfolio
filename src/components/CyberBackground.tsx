import React, { useEffect, useRef } from 'react';

export const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Static authentic hex numbers, 8-bit & 4-bit binary, and assembly opcodes
    const tokens = [
      '0x4A', '0x7F', '0x9C', '0xB2', '0x1A', '0x00', '0xFF', '0x89',
      '0xE5', '0xEC', '0x31', '0xC0', '0xC3', '0x90', '0x55', '0x48',
      '10110010', '01001001', '11001100', '00101101', '01110000',
      '0101', '1010', '1111', '0000', '1100', '0011', '1001', '0110',
      '48 89', '83 EC', 'B8 01', '0F 05', 'FF 25', '75 1A', 'EB 0C',
      '0xDEAD', '0xBEEF', '0xCAFE', '0xBABE', '0x1337', '0x7FFF'
    ];

    const fontSize = 12;
    const colSpacing = 44;
    const columns = Math.ceil(width / colSpacing);

    // Stable column state: each column has its own stream of characters and calm, steady speed
    const streamLength = 22; // Number of characters in each trailing column
    const streams: {
      x: number;
      y: number;
      speed: number;
      chars: string[];
      isAmber: boolean;
    }[] = [];

    for (let i = 0; i < columns; i++) {
      const colChars: string[] = [];
      for (let j = 0; j < streamLength; j++) {
        colChars.push(tokens[Math.floor(Math.random() * tokens.length)]);
      }

      streams.push({
        x: i * colSpacing + 10,
        y: (Math.random() * height * 1.5) - height * 0.5,
        speed: 0.45 + (i % 3) * 0.15, // Constant, gentle, non-flickering speed
        chars: colChars,
        isAmber: i % 7 === 0 // Steady, non-flickering amber accent
      });
    }

    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
    ctx.textBaseline = 'top';

    const render = () => {
      // Clean clear: NO semi-transparent overlay flashing
      ctx.clearRect(0, 0, width, height);

      // Render each stream calmly
      for (let i = 0; i < streams.length; i++) {
        const stream = streams[i];
        const { x, chars, isAmber } = stream;

        for (let j = 0; j < chars.length; j++) {
          const charY = stream.y - j * (fontSize + 6);

          if (charY > -20 && charY < height + 20) {
            // Steady, smooth gradient down the tail with ZERO flicker or shadowBlur
            const distanceRatio = (chars.length - j) / chars.length;

            if (j === 0) {
              // Lead character: steady calm highlight, NO blinking
              ctx.fillStyle = isAmber 
                ? 'rgba(229, 181, 103, 0.45)' 
                : 'rgba(163, 255, 111, 0.45)';
            } else {
              // Trailing characters: steady, soft, legible phosphor tone
              const alpha = 0.05 + distanceRatio * 0.16;
              ctx.fillStyle = isAmber 
                ? `rgba(229, 181, 103, ${alpha})` 
                : `rgba(163, 255, 111, ${alpha})`;
            }

            ctx.fillText(chars[j], x, charY);
          }
        }

        // Advance position steadily
        stream.y += stream.speed;

        // Reset cleanly once past bottom
        if (stream.y - streamLength * (fontSize + 6) > height) {
          stream.y = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
};
