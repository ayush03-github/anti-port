'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function AvatarSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  
  const physicsX = useSpring(mouseX, springConfig);
  const physicsY = useSpring(mouseY, springConfig);

  const bodyRotateX = useTransform(physicsY, [-1, 1], [5, -5]);
  const bodyRotateY = useTransform(physicsX, [-1, 1], [-10, 10]);

  const headRotateX = useTransform(physicsY, [-1, 1], [15, -15]);
  const headRotateY = useTransform(physicsX, [-1, 1], [-15, 15]);
  const headMoveX = useTransform(physicsX, [-1, 1], [-12, 12]);
  const headMoveY = useTransform(physicsY, [-1, 1], [-12, 12]);

  const pupilMoveX = useTransform(physicsX, [-1, 1], [-25, 25]);
  const pupilMoveY = useTransform(physicsY, [-1, 1], [-25, 25]);
  
  // Hands move opposite to create sweeping 3D parallax
  const handMoveX = useTransform(physicsX, [-1, 1], [15, -15]); 
  const handMoveY = useTransform(physicsY, [-1, 1], [15, -15]);
  const rightHandMoveX = useTransform(physicsX, [-1, 1], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full min-h-[100vh] bg-[#080808] flex items-center justify-center overflow-hidden border-t border-white/5 py-20">
      
      {/* Techy Minimalist Grid Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-[#080808] opacity-50"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/10 to-[#080808] opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#080808] via-transparent to-[#080808] opacity-90" />
        
        {/* Core Yellow Background Glow highlighting the Bot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f5e156] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Physics-Based Claymation Bot Component */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none scale-75 md:scale-100 mt-10 md:mt-20"
        style={{ perspective: "1500px" }}
      >
        <motion.div 
          style={{ rotateX: bodyRotateX, rotateY: bodyRotateY }}
          className="relative flex flex-col items-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
        >
          
          {/* ---- HEAD LAYER ---- */}
          <motion.div 
            style={{ rotateX: headRotateX, rotateY: headRotateY, x: headMoveX, y: headMoveY }}
            className="relative w-80 h-64 z-30 flex flex-col items-center justify-center bg-[#eaeaea] rounded-[90px] shadow-[15px_15px_30px_rgba(0,0,0,0.5),-10px_-10px_20px_rgba(255,255,255,0.05),inset_6px_6px_15px_rgba(255,255,255,1),inset_-6px_-6px_20px_rgba(0,0,0,0.2)]"
          >
            {/* Antenna Base */}
            <div className="absolute -top-6 w-12 h-8 bg-[#cccccc] rounded-t-2xl shadow-[inset_2px_2px_6px_rgba(255,255,255,0.9),inset_-2px_-2px_6px_rgba(0,0,0,0.2)] z-0" />
            {/* Antenna Stem */}
            <div className="absolute -top-14 w-4 h-12 bg-[#b3b3b3] shadow-[inset_2px_0_4px_rgba(255,255,255,0.6),inset_-2px_0_4px_rgba(0,0,0,0.2)] z-0" />
            {/* Antenna Glowing Orb */}
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -top-20 w-10 h-10 bg-[#f5e156] border border-white/40 rounded-full shadow-[0_0_25px_rgba(245,225,86,0.9),inset_4px_4px_6px_rgba(255,255,255,0.9),inset_-4px_-4px_6px_rgba(0,0,0,0.2)] z-10" 
            />

            {/* Screen / Face Area (Inset Screen) */}
            <div className="relative w-64 h-36 bg-[#1a1a1a] rounded-[50px] shadow-[inset_0_15px_30px_rgba(0,0,0,1),_0_2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center overflow-hidden border-[6px] border-[#121212]">
              
              {/* Soft inner glow to mimic a screen CRT/Glass reflection */}
              <div className="absolute inset-0 bg-[#f5e156]/5 shadow-[inset_0_0_40px_rgba(245,225,86,0.1)] blur-xl" />
              
              {/* Screen Glare Layer (Static) */}
              <div className="absolute -top-12 -right-10 w-48 h-24 bg-white/10 rounded-full rotate-45 blur-[1px] pointer-events-none" />

              {/* The Glowing Clay Eyes tracking the cursor */}
              <motion.div 
                style={{ x: pupilMoveX, y: pupilMoveY }}
                className="flex gap-10 z-10"
              >
                {/* Left Eye */}
                <div className="w-12 h-16 bg-[#f5e156] rounded-[30px] shadow-[0_0_20px_rgba(245,225,86,0.7),inset_3px_3px_6px_rgba(255,255,255,0.9),inset_-3px_-3px_6px_rgba(0,0,0,0.3)] relative overflow-hidden border border-[#fff]/40">
                   {/* Cute Anime-style highlight dot */}
                   <div className="absolute top-2 right-2 w-4 h-5 bg-white rounded-full opacity-90 blur-[0.5px]" />
                </div>
                {/* Right Eye */}
                <div className="w-12 h-16 bg-[#f5e156] rounded-[30px] shadow-[0_0_20px_rgba(245,225,86,0.7),inset_3px_3px_6px_rgba(255,255,255,0.9),inset_-3px_-3px_6px_rgba(0,0,0,0.3)] relative overflow-hidden border border-[#fff]/40">
                   {/* Cute Anime-style highlight dot */}
                   <div className="absolute top-2 right-2 w-4 h-5 bg-white rounded-full opacity-90 blur-[0.5px]" />
                </div>
              </motion.div>
            </div>
            


          </motion.div>

          {/* ---- FLOATING CLAY HANDS ---- */}
          {/* Left Hand */}
          <motion.div 
            style={{ x: handMoveX, y: handMoveY }} 
            className="absolute top-[40%] -left-20 w-16 h-20 bg-[#eaeaea] rounded-[30px] shadow-[15px_15px_30px_rgba(0,0,0,0.6),-5px_-5px_15px_rgba(255,255,255,0.05),inset_4px_4px_10px_rgba(255,255,255,1),inset_-6px_-6px_15px_rgba(0,0,0,0.2)] z-40 rotate-[20deg]"
          />
          {/* Right Hand */}
          <motion.div 
            style={{ x: rightHandMoveX, y: handMoveY }}
            className="absolute top-[40%] -right-20 w-16 h-20 bg-[#eaeaea] rounded-[30px] shadow-[15px_15px_30px_rgba(0,0,0,0.6),-5px_-5px_15px_rgba(255,255,255,0.05),inset_4px_4px_10px_rgba(255,255,255,1),inset_-6px_-6px_15px_rgba(0,0,0,0.2)] z-40 -rotate-[20deg]"
          />

          {/* ---- FLOATING GRAVITY BASE (Replaces the Body) ---- */}
          <motion.div 
            className="absolute -bottom-16 w-56 h-20 bg-[#232323] rounded-full shadow-[10px_10px_25px_rgba(0,0,0,0.8),inset_2px_2px_5px_rgba(255,255,255,0.1),inset_-4px_-4px_15px_rgba(0,0,0,0.6)] z-10 flex items-center justify-center border-t-4 border-[#4a4a4a]"
          >
             {/* Yellow Core Energy Generator */}
             <div className="w-32 h-8 bg-[#f5e156] rounded-full shadow-[0_0_30px_rgba(245,225,86,0.5),inset_3px_3px_6px_rgba(255,255,255,0.9),inset_-3px_-3px_6px_rgba(0,0,0,0.3)] animate-pulse" />
          </motion.div>

        </motion.div>
      </div>

      {/* Floating HUD Details (from original techy theme) */}
      <motion.div 
        style={{ x: useTransform(physicsX, [-1, 1], [-50, 50]), y: useTransform(physicsY, [-1, 1], [-50, 50]) }}
        className="absolute top-1/4 right-[25%] w-12 h-12 border border-white/10 flex items-center justify-center pointer-events-none opacity-40 mix-blend-screen rounded-full"
      >
        <div className="w-1.5 h-1.5 bg-[#f5e156] rounded-full" />
      </motion.div>
      
      <motion.div 
        style={{ x: useTransform(physicsX, [-1, 1], [70, -70]), y: useTransform(physicsY, [-1, 1], [70, -70]) }}
        className="absolute bottom-[25%] left-[25%] font-mono text-[10px] tracking-[0.2em] text-white/40 pointer-events-none opacity-60 uppercase"
      >
        [ AWAKE : ONLINE ]
      </motion.div>

      <motion.div 
        style={{ x: useTransform(physicsX, [-1, 1], [-30, 30]), y: useTransform(physicsY, [-1, 1], [90, -90]) }}
        className="absolute top-[25%] left-[30%] opacity-20 pointer-events-none w-20 border-t border-dashed border-white/30"
      />
      
    </section>
  );
}
