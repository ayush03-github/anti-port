'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

export default function Overlay({ containerScrollProgress }: { containerScrollProgress?: MotionValue<number> }) {
  // Use container scroll progress if passed from ScrollyCanvas, fallback to global window scroll
  const { scrollYProgress: globalScroll } = useScroll();
  const activeProgress = containerScrollProgress || globalScroll;

  // Synchronized non-overlapping scroll visibility ranges over the 500vh container:

  // Section 1: Hero Intro (0% to ~28% scroll)
  const opacity1 = useTransform(activeProgress, [0, 0.2, 0.28], [1, 1, 0]);
  const y1 = useTransform(activeProgress, [0, 0.28], [0, -80]);
  const scale1 = useTransform(activeProgress, [0, 0.28], [1, 0.95]);

  // Section 2: Vision / Philosophy (28% to ~60% scroll - Pinned for ample reading time!)
  const opacity2 = useTransform(activeProgress, [0.26, 0.33, 0.54, 0.60], [0, 1, 1, 0]);
  const y2 = useTransform(activeProgress, [0.26, 0.33, 0.54, 0.60], [60, 0, 0, -60]);

  // Section 3: Craft & Engineering (60% to ~92% scroll - Pinned for ample reading time!)
  const opacity3 = useTransform(activeProgress, [0.58, 0.65, 0.86, 0.92], [0, 1, 1, 0]);
  const y3 = useTransform(activeProgress, [0.58, 0.65, 0.86, 0.92], [60, 0, 0, -60]);

  // Section 4: Outro Lead-in indicator to next section (90% to 100% scroll)
  const opacity4 = useTransform(activeProgress, [0.88, 0.94, 1], [0, 1, 1]);
  const y4 = useTransform(activeProgress, [0.88, 1], [30, 0]);

  return (
    <div className="relative w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 pointer-events-none">

      {/* SECTION 1 - Hero Intro (Right / Center Aligned) */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute inset-0 flex flex-col items-center md:items-end justify-center text-center md:text-right px-6"
      >
        <div className="flex flex-col items-center md:items-end">
          {/* Techy HUD Glassmorphism Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 dark:bg-black/40 light:bg-white/30 border border-white/20 dark:border-white/20 light:border-slate-800/20 backdrop-blur-md shadow-lg mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f5e156] animate-ping" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 font-bold uppercase">
              Portfolio &apos;26 // Creative Dev
            </span>
          </div>

          {/* Main Title - Ayush Kodle in the exact same premium Cinzel font */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-bold tracking-tight font-cinzel drop-shadow-[0_12px_40px_rgba(0,0,0,0.8)] leading-[0.95] transition-colors duration-300">
            <span className="text-white dark:text-white light:text-white">Ayush</span> <span className="text-[#f5e156] dark:text-[#f5e156] light:text-amber-500">Kodle</span>
          </h1>

          {/* Tagline */}
          <p className="mt-4 md:mt-6 text-base sm:text-xl md:text-2xl text-neutral-200 dark:text-neutral-200 light:text-slate-800 tracking-[0.2em] md:tracking-[0.35em] uppercase font-medium max-w-2xl font-space transition-colors duration-300">
            Crafting <span className="text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 font-cinzel normal-case italic font-bold">tactile</span> digital experiences
          </p>

          {/* Scroll Prompt */}
          <div className="mt-10 flex items-center gap-3 font-mono text-xs text-white dark:text-white light:text-white tracking-[0.25em] uppercase animate-pulse drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            <span>Scroll to explore</span>
            <span className="text-[#f5e156] dark:text-[#f5e156] light:text-amber-500">↓</span>
          </div>
        </div>
      </motion.div>

      {/* SECTION 2 - Vision (Left Aligned Ultra Glassmorphism Card) */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-start justify-center text-left px-6"
      >
        <div className="relative max-w-2xl bg-black/40 dark:bg-black/40 light:bg-white/30 backdrop-blur-[6px] p-8 md:p-12 rounded-[2.5rem] border border-white/20 dark:border-white/20 light:border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300">
          {/* Accent Glow Blob */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#f5e156]/20 blur-3xl rounded-full pointer-events-none" />

          {/* HUD Section Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-white/10 light:bg-slate-900/10 border border-white/20 dark:border-white/20 light:border-slate-800/20 backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 mb-6">
            <span>01</span>
            <span className="text-white/40 dark:text-white/40 light:text-slate-500">//</span>
            <span>Vision</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 leading-[1.1] font-cinzel transition-colors duration-300">
            Building digital <br className="hidden sm:block" />
            <span className="text-[#f5e156] dark:text-[#f5e156] light:text-amber-500">experiences</span> with <br />
            depth &amp; purpose.
          </h2>

          <p className="mt-6 text-sm md:text-base text-neutral-200 dark:text-neutral-200 light:text-slate-800 font-light leading-relaxed max-w-lg font-space transition-colors duration-300">
            Merging generative graphics, smooth physics-based motion, and intuitive UI to build interactive web applications that leave a lasting impression.
          </p>
        </div>
      </motion.div>

      {/* SECTION 3 - Engineering & Craft (Right Aligned Ultra Glassmorphism Card) */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center text-right px-6"
      >
        <div className="relative max-w-2xl bg-black/40 dark:bg-black/40 light:bg-white/30 backdrop-blur-[6px] p-8 md:p-12 rounded-[2.5rem] border border-white/20 dark:border-white/20 light:border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300">
          {/* Accent Glow Blob */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#f5e156]/20 blur-3xl rounded-full pointer-events-none" />

          {/* HUD Section Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-white/10 light:bg-slate-900/10 border border-white/20 dark:border-white/20 light:border-slate-800/20 backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 mb-6">
            <span>02</span>
            <span className="text-white/40 dark:text-white/40 light:text-slate-500">//</span>
            <span>Craft</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 leading-[1.1] font-cinzel transition-colors duration-300">
            Bridging <span className="text-[#f5e156] dark:text-[#f5e156] light:text-amber-500">design</span> <br />
            &amp; engineering.
          </h2>

          <p className="mt-6 text-sm md:text-base text-neutral-200 dark:text-neutral-200 light:text-slate-800 font-light leading-relaxed max-w-lg ml-auto transition-colors duration-300">
            Architecting robust frontend infrastructure paired with micro-animations, claymorphism, and modern web standards.
          </p>

          <div className="mt-8 flex items-center justify-end gap-2 font-mono text-xs text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 tracking-widest uppercase font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#f5e156] dark:bg-[#f5e156] light:bg-amber-500 animate-pulse" />
            <span>Ready for new challenges</span>
          </div>
        </div>
      </motion.div>

      {/* SECTION 4 - Outro Lead-in */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="absolute bottom-16 left-0 right-0 flex flex-col items-center justify-center text-center pointer-events-none"
      >
        <div className="px-6 py-2 rounded-full bg-black/40 dark:bg-black/40 light:bg-white/40 border border-white/20 dark:border-white/20 light:border-white/40 backdrop-blur-xl text-neutral-200 dark:text-neutral-200 light:text-slate-800 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-3 shadow-lg transition-colors duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f5e156] dark:bg-[#f5e156] light:bg-amber-500" />
          <span>Keep Scrolling for Core Arsenal</span>
          <span className="text-[#f5e156] dark:text-[#f5e156] light:text-amber-600">↓</span>
        </div>
      </motion.div>

    </div>
  );
}
