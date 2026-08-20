'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

const playToggleSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {
    console.error(e);
  }
};

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    playToggleSound();
    toggleTheme();
  };

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`fixed top-6 right-6 z-[200] flex items-center gap-2.5 px-4.5 py-2.5 rounded-full backdrop-blur-xl border shadow-2xl transition-all duration-300 cursor-pointer group ${
        isDark 
          ? 'bg-black/75 border-white/20 text-white hover:border-orange-500/60' 
          : 'bg-white/90 border-slate-300 text-slate-900 hover:border-amber-500/60'
      }`}
      aria-label="Toggle Theme"
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180, scale: [1, 1.2, 1] }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={`w-5 h-5 flex items-center justify-center ${isDark ? 'text-orange-500' : 'text-amber-500'}`}
      >
        {isDark ? (
          // Moon Icon for Dark Mode
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73A8.15 8.15 0 019.08 5.49a8.59 8.59 0 01.25-2A1 1 0 008 2.36 10.14 10.14 0 1022 14.05a1 1 0 00-.36-1.05z" />
          </svg>
        ) : (
          // Sun Icon for Light Mode
          <svg className="w-5 h-5 fill-current text-amber-500" viewBox="0 0 24 24">
            <path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 100-2H2a1 1 0 100 2zm18 0h2a1 1 0 100-2h-2a1 1 0 100 2zM11 2v2a1 1 0 102 0V2a1 1 0 10-2 0zm0 18v2a1 1 0 102 0v-2a1 1 0 10-2 0zM5.99 4.58a1 1 0 10-1.41 1.41l1.41 1.41a1 1 0 101.41-1.41L5.99 4.58zm12.02 12.02a1 1 0 10-1.41 1.41l1.41 1.41a1 1 0 101.41-1.41l-1.41-1.41zM7.41 18.01l-1.41 1.41a1 1 0 101.41 1.41l1.41-1.41a1 1 0 10-1.41-1.41zm12.02-12.02l-1.41 1.41a1 1 0 101.41 1.41l1.41-1.41a1 1 0 10-1.41-1.41z" />
          </svg>
        )}
      </motion.div>

      <span className={`font-mono text-xs font-bold uppercase tracking-wider select-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {isDark ? 'DARK' : 'LIGHT'}
      </span>
    </motion.button>
  );
}
