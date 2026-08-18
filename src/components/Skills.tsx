'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const skills = [
  { name: "Python", quote: "Import antigravity.", logo: "🐍", color: "#a3b1c6" },
  { name: "Oracle SQL", quote: "SELECT * FROM wizardry;", logo: "🗄️", color: "#ffcfd2" },
  { name: "Django", quote: "The framework for perfectionists.", logo: "🎸", color: "#b9fbc0" },
  { name: "JavaScript", quote: "undefined is not a function.", logo: "⚡", color: "#fbf8cc" },
  { name: "PowerBI", quote: "Making data look beautiful.", logo: "📊", color: "#e8dff5" },
  { name: "Excel", quote: "The original database.", logo: "📗", color: "#d0f4de" },
  { name: "Web Tech", quote: "Building the digital frontier.", logo: "🌐", color: "#fde4cf" },
  { name: "Next.js", quote: "React, but make it fast.", logo: "▲", color: "#e5e5e5" }
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHoveredSkill(name);
    }, 600);
  };

  const handleMouseLeaveGridItem = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredSkill(null);
  };

  const activeSkill = skills.find(s => s.name === hoveredSkill);

  const clayClasses = "px-8 py-4 rounded-full bg-[#1e1e1e] dark:bg-[#1e1e1e] light:bg-white text-white/90 dark:text-white/90 light:text-slate-900 font-space font-semibold tracking-wide border border-white/5 dark:border-white/5 light:border-slate-300 shadow-lg hover:text-[#f5e156] dark:hover:text-[#f5e156] light:hover:text-amber-600 transition-all relative flex items-center justify-center cursor-pointer select-none";

  return (
    <section className="relative w-full min-h-[80vh] bg-[#121212] dark:bg-[#121212] light:bg-[#f8f9fa] py-40 px-6 md:px-12 z-20 border-t border-white/5 dark:border-white/5 light:border-slate-200 overflow-hidden flex flex-col justify-center transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Header */}
        <motion.div
          animate={{ opacity: hoveredSkill ? 0 : 1, y: hoveredSkill ? -50 : 0 }}
          transition={{ duration: 0.3 }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 font-cinzel transition-colors duration-300">
            Core Arsenal
          </h2>
          <p className="mt-4 text-xs md:text-sm uppercase tracking-widest text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 font-mono font-bold">
            Hover to discover
          </p>
        </motion.div>

        {/* Regular Grid */}
        <motion.div
          animate={{ opacity: hoveredSkill ? 0 : 1, scale: hoveredSkill ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
          className={`flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto ${hoveredSkill ? 'pointer-events-none' : ''}`}
        >
          {skills.map((skill, idx) => (
            <motion.div
              layoutId={`pill-${skill.name}`}
              key={skill.name}
              onMouseEnter={() => handleMouseEnter(skill.name)}
              onMouseLeave={handleMouseLeaveGridItem}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className={clayClasses}
            >
              {skill.name}
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Hovered State Full Overlay */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 md:p-12 bg-[#121212]/90 dark:bg-[#121212]/90 light:bg-white/95 backdrop-blur-md pointer-events-none transition-colors duration-300"
          >
            <div
              className="p-[100px] pointer-events-auto flex items-center justify-center relative"
              onMouseLeave={handleClose}
            >
              <div className="flex flex-col md:flex-row items-center justify-start md:justify-center w-full max-w-6xl gap-10 md:gap-20 relative">

                {/* Left Side: The Morphing Pill */}
                <motion.div
                  layoutId={`pill-${activeSkill.name}`}
                  className="px-10 py-5 md:px-16 md:py-8 rounded-full bg-[#1e1e1e] dark:bg-[#1e1e1e] light:bg-slate-900 text-[#f5e156] dark:text-[#f5e156] light:text-amber-400 font-cinzel text-2xl md:text-3xl font-bold tracking-wide border border-white/5 dark:border-white/5 light:border-slate-800 shadow-2xl z-50 whitespace-nowrap"
                >
                  {activeSkill.name}
                </motion.div>

                {/* Right Side: Goofy Pastel Claymation Bubble */}
                <motion.div
                  initial={{ scale: 0, x: 100, rotate: 15 }}
                  animate={{ scale: 1, x: 0, rotate: -2, y: [0, -10, 0] }}
                  exit={{ scale: 0, x: 100, rotate: 15 }}
                  transition={{
                    scale: { type: "spring", bounce: 0.5, duration: 0.6 },
                    x: { type: "spring", bounce: 0.5, duration: 0.6 },
                    rotate: { type: "spring", bounce: 0.5, duration: 0.6 },
                    y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                  }}
                  className={`relative w-[300px] md:w-[450px] p-8 md:p-14 rounded-[4rem] rounded-tl-sm md:rounded-tl-[4rem] md:rounded-bl-sm text-neutral-900 border border-white/40 shadow-2xl`}
                  style={{ backgroundColor: activeSkill.color }}
                >
                  {/* Speech Bubble Tail for Desktop */}
                  <div
                    className="hidden md:block absolute -left-6 bottom-16 w-16 h-16 opacity-90"
                    style={{
                      backgroundColor: activeSkill.color,
                      clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                      filter: "drop-shadow(-4px 4px 4px rgba(0,0,0,0.2))"
                    }}
                  />

                  {/* Speech Bubble Tail for Mobile */}
                  <div
                    className="block md:hidden absolute left-16 -top-6 w-12 h-12"
                    style={{
                      backgroundColor: activeSkill.color,
                      clipPath: "polygon(100% 100%, 0 100%, 0 0)",
                      filter: "drop-shadow(0px -4px 4px rgba(0,0,0,0.2))"
                    }}
                  />

                  <div className="flex flex-col items-start text-left gap-4 md:gap-6">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="text-6xl md:text-7xl drop-shadow-[4px_4px_4px_rgba(0,0,0,0.3)] filter"
                    >
                      {activeSkill.logo}
                    </motion.div>

                    <p className="text-2xl md:text-4xl font-cinzel font-bold italic tracking-tight leading-tight drop-shadow-[1px_1px_1px_rgba(255,255,255,0.5)] text-slate-900">
                      &quot;{activeSkill.quote}&quot;
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-10 text-neutral-400 dark:text-white/50 light:text-slate-600 font-mono tracking-widest uppercase text-xs font-semibold animate-pulse pointer-events-none"
            >
              Move mouse away to close 😴
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
