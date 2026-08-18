'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Web Audio API Synth for glitch sound effect
const playGlitchSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {
    console.error(e);
  }
};

const dialogueQuotes = [
  "Just keeping an eye on you... 👁️",
  "Tracking your cursor coordinates! ⚡",
  "I see everything you hover! 🔍"
];

export default function AvatarSection() {
  const [dialogue, setDialogue] = useState<string | null>(null);
  const [isGlitched, setIsGlitched] = useState(false);
  const glitchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [dragBounds, setDragBounds] = useState({ left: -800, right: 40, top: -600, bottom: 40 });
  const [isBotOnLeftSide, setIsBotOnLeftSide] = useState(false);

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setDragBounds({
        left: -window.innerWidth + 140,
        right: 40,
        top: -window.innerHeight + 140,
        bottom: 40,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.3 };

  const physicsX = useSpring(mouseX, springConfig);
  const physicsY = useSpring(mouseY, springConfig);

  // Screen-relative Mini Bot eye & head rotation transforms
  const miniPupilX = useTransform(physicsX, [-1, 1], [-14, 14]);
  const miniPupilY = useTransform(physicsY, [-1, 1], [-10, 10]);
  const miniHeadRotateX = useTransform(physicsY, [-1, 1], [14, -14]);
  const miniHeadRotateY = useTransform(physicsX, [-1, 1], [-16, 16]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      rafId.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    return () => {
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    };
  }, []);

  const handleMiniBotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playGlitchSound();

    const randomQuote = dialogueQuotes[Math.floor(Math.random() * dialogueQuotes.length)];
    setDialogue(randomQuote);
    setIsGlitched(true);

    if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);

    glitchTimerRef.current = setTimeout(() => {
      setDialogue(null);
      setIsGlitched(false);
    }, 2500);
  };

  const handleDragEnd = (_: unknown, info: { point: { x: number } }) => {
    setIsBotOnLeftSide(info.point.x < window.innerWidth / 2);
  };

  return (
    <motion.div
      drag
      dragConstraints={dragBounds}
      dragElastic={0.05}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: isGlitched ? 0.35 : 1,
        scale: 1,
        y: [0, -5, 0],
        x: isGlitched ? [0, -4, 4, -2, 2, 0] : 0
      }}
      transition={{
        opacity: { duration: 0.2 },
        y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
        x: { duration: 0.3 }
      }}
      onClick={handleMiniBotClick}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[150] cursor-grab active:cursor-grabbing group flex flex-col items-center select-none touch-none"
      style={{ perspective: "600px" }}
    >
      {/* Speech Bubble Dialogue - Styled cleanly for both Dark and Light Themes */}
      <AnimatePresence>
        {dialogue && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className={`absolute bottom-full mb-3 px-4 py-2.5 rounded-2xl bg-[#f5e156] dark:bg-[#f5e156] light:bg-amber-500 text-black dark:text-black light:text-slate-950 font-syne font-bold text-xs tracking-wide shadow-xl max-w-[210px] sm:max-w-xs z-50 border border-white/40 dark:border-white/40 light:border-amber-600/50 pointer-events-none ${
              isBotOnLeftSide ? 'left-0 sm:left-2 rounded-bl-sm' : 'right-0 sm:right-2 rounded-br-sm'
            }`}
          >
            <p className="leading-snug">{dialogue}</p>
            <div className={`absolute -bottom-1.5 w-3 h-3 bg-[#f5e156] dark:bg-[#f5e156] light:bg-amber-500 rotate-45 ${
              isBotOnLeftSide ? 'left-4' : 'right-4'
            }`} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ rotateX: miniHeadRotateX, rotateY: miniHeadRotateY }}
        className="relative flex flex-col items-center drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
      >
        {/* Mini Head with Light Theme Adaptations */}
        <div className="relative w-28 h-20 bg-[#eaeaea] dark:bg-[#eaeaea] light:bg-black rounded-[28px] shadow-[6px_6px_16px_rgba(0,0,0,0.4),inset_2px_2px_6px_rgba(255,255,255,1),inset_-2px_-2px_6px_rgba(0,0,0,0.15)] border border-white/20 dark:border-white/20 light:border-slate-300 flex flex-col items-center justify-center transition-colors duration-300">
          {/* Mini Antenna */}
          <div className="absolute -top-2.5 w-4 h-3 bg-[#cccccc] dark:bg-[#cccccc] light:bg-slate-300 rounded-t-sm shadow-inner" />
          <div className="absolute -top-5 w-1.5 h-3 bg-[#b3b3b3] dark:bg-[#b3b3b3] light:bg-slate-400" />
          <div className="absolute -top-7 w-3.5 h-3.5 bg-[#f5e156] dark:bg-[#f5e156] light:bg-amber-500 border border-white/40 rounded-full shadow-[0_0_10px_rgba(245,225,86,0.9)] animate-pulse" />

          {/* Mini Screen */}
          <div className="relative w-[86px] h-12 bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-slate-900 rounded-[18px] flex items-center justify-center border-2 border-[#121212] dark:border-[#121212] light:border-slate-800 shadow-inner overflow-hidden">
            {/* Glowing Clay Eyes tracking cursor */}
            <motion.div
              style={{ x: miniPupilX, y: miniPupilY }}
              className="flex gap-3 z-10 relative pointer-events-none"
            >
              <div className="w-4 h-6 bg-[#f5e156] dark:bg-[#f5e156] light:bg-amber-400 rounded-full shadow-[0_0_10px_rgba(245,225,86,0.8),inset_2px_2px_4px_rgba(255,255,255,0.9)] relative overflow-hidden border border-white/40">
                <div className="absolute top-1 right-1 w-1.5 h-2 bg-white rounded-full opacity-90" />
              </div>
              <div className="w-4 h-6 bg-[#f5e156] dark:bg-[#f5e156] light:bg-amber-400 rounded-full shadow-[0_0_10px_rgba(245,225,86,0.8),inset_2px_2px_4px_rgba(255,255,255,0.9)] relative overflow-hidden border border-white/40">
                <div className="absolute top-1 right-1 w-1.5 h-2 bg-white rounded-full opacity-90" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mini Base */}
        <div className="w-20 h-4 bg-[#232323] dark:bg-[#232323] light:bg-slate-800 rounded-full mt-0.5 border-t border-[#4a4a4a] dark:border-[#4a4a4a] light:border-slate-600 flex items-center justify-center shadow-md">
          <div className="w-10 h-1.5 bg-[#f5e156] dark:bg-[#f5e156] light:bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,225,86,0.6)]" />
        </div>
      </motion.div>
    </motion.div>
  );
}
