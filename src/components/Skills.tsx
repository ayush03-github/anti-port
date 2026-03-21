'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// Pastel/Clay colors
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
    }, 800);
  };

  const handleMouseLeaveGridItem = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredSkill(null);
  };

  const activeSkill = skills.find(s => s.name === hoveredSkill);

  // Claymation style classes for the grid
  const clayClasses = "px-8 py-4 rounded-full bg-[#1e1e1e] text-white/80 font-medium tracking-wide border border-white/5 shadow-[6px_6px_12px_rgba(0,0,0,0.6),-4px_-4px_10px_rgba(255,255,255,0.03),inset_2px_2px_6px_rgba(255,255,255,0.05),inset_-2px_-2px_6px_rgba(0,0,0,0.5)] cursor-pointer hover:text-[#f5e156] transition-colors relative flex items-center justify-center";

  return (
    <section className="relative w-full min-h-[80vh] bg-[#121212] py-40 px-6 md:px-12 z-20 border-t border-white/5 overflow-hidden flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Header - Fades out when a skill is hovered */}
        <motion.div
          animate={{ opacity: hoveredSkill ? 0 : 1, y: hoveredSkill ? -50 : 0 }}
          transition={{ duration: 0.4 }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
            Core Arsenal
          </h2>
          <p className="mt-4 text-sm uppercase tracking-widest text-[#f5e156] font-mono">
            Hover to discover
          </p>
        </motion.div>

        {/* Regular Grid */}
        <motion.div
          animate={{ opacity: hoveredSkill ? 0 : 1, scale: hoveredSkill ? 0.9 : 1 }}
          transition={{ duration: 0.4 }}
          className={`flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto ${hoveredSkill ? 'pointer-events-none' : ''}`}
        >
          {skills.map((skill, idx) => (
            <motion.div
              layoutId={`pill-${skill.name}`}
              key={skill.name}
              onMouseEnter={() => handleMouseEnter(skill.name)}
              onMouseLeave={handleMouseLeaveGridItem}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
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
            className="absolute inset-0 z-50 flex items-center justify-center p-6 md:p-12 bg-[#121212]/90 backdrop-blur-md pointer-events-none"
          >
            {/* 100px padding creates the "mouse taken away 100px" hit box */}
            <div
              className="p-[100px] pointer-events-auto flex items-center justify-center relative"
              onMouseLeave={handleClose}
            >
              <div className="flex flex-col md:flex-row items-center justify-start md:justify-center w-full max-w-6xl gap-10 md:gap-20 relative">

                {/* Left Side: The Morphing Pill */}
                <motion.div
                  layoutId={`pill-${activeSkill.name}`}
                  className="px-10 py-5 md:px-16 md:py-8 rounded-full bg-[#1e1e1e] text-[#f5e156] text-2xl md:text-3xl font-bold tracking-wide border border-white/5 shadow-[12px_12px_24px_rgba(0,0,0,0.8),-6px_-6px_15px_rgba(255,255,255,0.03),inset_2px_2px_6px_rgba(255,255,255,0.05),inset_-2px_-2px_6px_rgba(0,0,0,0.5)] z-50 whitespace-nowrap"
                >
                  {activeSkill.name}
                </motion.div>

                {/* Right Side: Goofy Pastel Claymation Bubble */}
                <motion.div
                  initial={{ scale: 0, x: 100, rotate: 15 }}
                  animate={{ scale: 1, x: 0, rotate: -2, y: [0, -10, 0] }}
                  exit={{ scale: 0, x: 100, rotate: 15 }}
                  transition={{
                    scale: { type: "spring", bounce: 0.6, duration: 0.8 },
                    x: { type: "spring", bounce: 0.6, duration: 0.8 },
                    rotate: { type: "spring", bounce: 0.6, duration: 0.8 },
                    y: { repeat: Infinity, duration: 3, ease: "easeInOut" } // Floating animation
                  }}
                  className={`relative w-[300px] md:w-[450px] p-8 md:p-14 rounded-[4rem] rounded-tl-sm md:rounded-tl-[4rem] md:rounded-bl-sm text-neutral-900 border border-white/40 shadow-[15px_15px_30px_rgba(0,0,0,0.7),-10px_-10px_20px_rgba(255,255,255,0.05),inset_6px_6px_16px_rgba(255,255,255,0.9),inset_-6px_-6px_12px_rgba(0,0,0,0.15)]`}
                  style={{ backgroundColor: activeSkill.color }}
                >
                  {/* Speech Bubble Tail for Desktop (left) */}
                  <div
                    className="hidden md:block absolute -left-6 bottom-16 w-16 h-16 opacity-90"
                    style={{
                      backgroundColor: activeSkill.color,
                      clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                      // Added a filter drop shadow to the tail to match aesthetic
                      filter: "drop-shadow(-4px 4px 4px rgba(0,0,0,0.2))"
                    }}
                  />

                  {/* Speech Bubble Tail for Mobile (top) */}
                  <div
                    className="block md:hidden absolute left-16 -top-6 w-12 h-12"
                    style={{
                      backgroundColor: activeSkill.color,
                      clipPath: "polygon(100% 100%, 0 100%, 0 0)",
                      filter: "drop-shadow(0px -4px 4px rgba(0,0,0,0.2))"
                    }}
                  />

                  <div className="flex flex-col items-start text-left gap-4 md:gap-6">
                    {/* Wiggling Logo */}
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="text-6xl md:text-7xl drop-shadow-[4px_4px_4px_rgba(0,0,0,0.3)] filter"
                    >
                      {activeSkill.logo}
                    </motion.div>

                    {/* Skill Quote - Dark text for light claymation */}
                    <p className="text-2xl md:text-4xl font-black italic tracking-tighter leading-tight drop-shadow-[1px_1px_1px_rgba(255,255,255,0.5)]">
                      "{activeSkill.quote}"
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* User Hint to escape focus */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 text-white/50 font-mono tracking-widest uppercase text-xs animate-pulse pointer-events-none"
            >
              Move mouse away to close 😴
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
