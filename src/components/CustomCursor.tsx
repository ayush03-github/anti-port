'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// Web Audio API Synthesizer to generate a cute cat meow sound effect on click/tap
const playMeowSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(760, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(460, now + 0.3);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {
    console.error(e);
  }
};

interface PawPrint {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-fast responsive spring physics (mass: 0.1, stiffness: 450, damping: 35)
  const springConfig = { damping: 35, stiffness: 450, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch / mobile device
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    // Inject runtime global style to hide OS cursor only on desktop
    const styleEl = document.createElement('style');
    styleEl.setAttribute('id', 'hide-default-os-cursor');
    if (!('ontouchstart' in window) && window.innerWidth >= 768) {
      styleEl.innerHTML = `
        *, *::before, *::after, html, body, a, button, input, textarea, select, canvas, iframe, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      `;
    }
    document.head.appendChild(styleEl);

    return () => {
      window.removeEventListener('resize', checkTouch);
      const el = document.getElementById('hide-default-os-cursor');
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return; // Disable mouse cursor tracking overlay on mobile touch screens

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      rafId.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!isVisible) setIsVisible(true);

        setIsFlipped(e.clientX > window.innerWidth / 2);

        const target = e.target as HTMLElement | null;
        if (target) {
          const isInteractive = !!target.closest('button, a, input, textarea, [role="button"], .cursor-pointer');
          setIsHovered(isInteractive);
        }
      });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleClick = (e: MouseEvent) => {
      playMeowSound();

      const newPaw: PawPrint = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setPawPrints((prev) => [...prev.slice(-3), newPaw]);

      setTimeout(() => {
        setPawPrints((prev) => prev.filter((p) => p.id !== newPaw.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, isTouchDevice]);

  return (
    <>
      {/* Static Pixelized Paw Print Click/Tap Markers */}
      <AnimatePresence>
        {pawPrints.map((paw) => (
          <motion.div
            key={paw.id}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="fixed pointer-events-none z-[9990] text-[#f5e156] dark:text-[#f5e156] light:text-amber-500 select-none drop-shadow-md"
            style={{ left: paw.x - 12, top: paw.y - 12 }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 16 16" 
              fill="currentColor" 
              style={{ shapeRendering: 'crispEdges' }}
            >
              <rect x="5" y="8" width="6" height="5" />
              <rect x="4" y="9" width="8" height="3" />
              <rect x="2" y="5" width="2" height="2" />
              <rect x="5" y="3" width="2" height="2" />
              <rect x="9" y="3" width="2" height="2" />
              <rect x="12" y="5" width="2" height="2" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Custom Pixel Cat Cursor (Desktop Only) */}
      {!isTouchDevice && isVisible && (
        <motion.div
          style={{
            left: smoothX,
            top: smoothY,
            x: '-50%',
            y: '-50%',
          }}
          animate={{
            scaleX: isFlipped ? -1 : 1,
            scaleY: isClicked ? 0.88 : isHovered ? 1.25 : 1,
          }}
          transition={{
            scaleX: { type: 'spring', stiffness: 450, damping: 25 },
            scaleY: { type: 'spring', stiffness: 450, damping: 25 },
          }}
          className="fixed top-0 left-0 pointer-events-none z-[9999] select-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cursor.png"
            alt="Custom Pixel Cat Cursor"
            className="w-16 h-16 object-contain"
            style={{
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.95)) drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.7)) drop-shadow(0px 0px 18px rgba(245, 225, 86, 0.5))'
            }}
          />
        </motion.div>
      )}
    </>
  );
}
