import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register SplitText plugin
gsap.registerPlugin(SplitText);

export const SplitText3DBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let splitLines: SplitText[] = [];
    let tl: gsap.core.Timeline | null = null;

    const initAnimation = () => {
      // Clean up previous timeline & splits if re-initializing on resize
      if (tl) {
        tl.kill();
      }
      splitLines.forEach((split) => {
        try {
          split.revert();
        } catch {
          // ignore revert errors
        }
      });
      splitLines = [];

      gsap.set(container, { visibility: 'visible' });

      const lines = container.querySelectorAll<HTMLElement>('.line');
      if (!lines || lines.length === 0) return;

      splitLines = Array.from(lines).map(
        (line) =>
          new SplitText(line, {
            type: 'chars',
            charsClass: 'char',
          })
      );

      const width = container.clientWidth || window.innerWidth;
      const depth = -width / 8;
      const transformOrigin = `50% 50% ${depth}px`;

      gsap.set(lines, {
        perspective: 700,
        transformStyle: 'preserve-3d',
      });

      // Initial state: hide characters at bottom angle
      splitLines.forEach((split) => {
        gsap.set(split.chars, { rotationX: -90, opacity: 0 });
      });

      const animTime = 0.9;
      const stagger = 0.065;

      tl = gsap.timeline({
        repeat: -1,
      });

      let accumulatedTime = 0;

      splitLines.forEach((split) => {
        const phraseStart = accumulatedTime;

        // 3D rotationX from -90 to +90 along cylinder depth
        tl?.fromTo(
          split.chars,
          { rotationX: -90 },
          {
            rotationX: 90,
            stagger,
            duration: animTime,
            ease: 'none',
            transformOrigin,
          },
          phraseStart
        );

        // Smooth opacity envelope: fade in to front view, fade out at top angle
        tl?.fromTo(
          split.chars,
          { opacity: 0 },
          {
            keyframes: [
              { opacity: 0, duration: 0 },
              { opacity: 1, duration: animTime * 0.35, ease: 'power1.out' },
              { opacity: 1, duration: animTime * 0.3 },
              { opacity: 0, duration: animTime * 0.35, ease: 'power1.in' },
            ],
            stagger,
            duration: animTime,
            ease: 'none',
          },
          phraseStart
        );

        // Advance to next phrase after current phrase characters roll through
        accumulatedTime += split.chars.length * stagger + 0.9;
      });
    };

    initAnimation();

    // Recalculate dimensions and 3D depth on resize
    let resizeTimer: number;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        initAnimation();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (tl) {
        tl.kill();
      }
      splitLines.forEach((split) => {
        try {
          split.revert();
        } catch {
          // ignore
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="container splittext-3d-banner shrink-0"
      style={{ visibility: 'hidden' }}
      aria-label="Madina Masjid MKB Nagar Community Welcome"
    >
      {/* Background ambient radial gradients & subtle geometric motif */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(rgba(212, 167, 44, 0.18) 1.2px, transparent 1.2px)',
          backgroundSize: '20px 20px',
          backgroundPosition: 'center center',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.25) 0%, rgba(212, 167, 44, 0.1) 45%, transparent 75%)',
        }}
      />

      {/* 3D Tube wrapper */}
      <div className="tube">
        <h1 className="line line1">Assalamu Alaikum</h1>
        <h1 className="line line2">Madina Masjid MKB Nagar</h1>
        <h1 className="line line3">Prayer • Community • Service</h1>
        <h1 className="line line4">Welcome to Madina Masjid</h1>
      </div>
    </div>
  );
};
