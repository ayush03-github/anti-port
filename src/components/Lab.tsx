'use client';

import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

// Web Audio API Synthesizer functions for Lab sound pads and randomizer button
const playSynthPad = (type: 'glitch' | 'sub' | 'laser' | 'cyber' | 'random') => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'glitch') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.18);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'sub') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.4);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'laser') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'cyber') {
      const bufferSize = Math.floor(ctx.sampleRate * 0.15);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      noise.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    } else if (type === 'random') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch (e) {
    console.error('Audio synth error:', e);
  }
};

const playgroundsList = [
  { id: 1, tag: "01", title: "3D Kinetic Tilt Sculpture", desc: "Physics-based 3D clay orb with high-intensity rotational tilt (+60°/-60°) and 3D depth momentum." },
  { id: 2, tag: "02", title: "Web Audio Synth Studio", desc: "Generate browser-native synthesized audio waveforms using real-time Web Audio API oscillators." },
  { id: 3, tag: "03", title: "Live Shader & Glass Studio", desc: "Interactive playground to tweak backdrop blur, glowing neon spread, and hue shifts in real-time." },
  { id: 4, tag: "04", title: "3D Cyberpunk Hologram Cube", desc: "Interactive 3D rotating neon wireframe hologram cube with customizable glow colors." },
  { id: 5, tag: "05", title: "Retro Audio Equalizer Spectrum", desc: "Animated 16-bar retro spectrum equalizer visualizer with custom bounce speed." }
];

export default function Lab() {
  const [activeId, setActiveId] = useState(1);

  // Randomize Playground
  const handleRandomize = () => {
    playSynthPad('random');
    const otherIds = playgroundsList.map(p => p.id).filter(id => id !== activeId);
    const randomId = otherIds[Math.floor(Math.random() * otherIds.length)];
    setActiveId(randomId);
  };

  const currentPlayground = playgroundsList.find(p => p.id === activeId) || playgroundsList[0];

  // --- EXPERIMENT 1: 3D TILT ---
  const tiltCardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { damping: 14, stiffness: 220, mass: 0.2 };
  const tiltX = useSpring(rawX, springConfig);
  const tiltY = useSpring(rawY, springConfig);
  const [tiltDisplay, setTiltDisplay] = useState({ rx: 0, ry: 0 });

  const handleTiltMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltCardRef.current) return;
    const rect = tiltCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(y * -60);
    rawY.set(x * 60);
    setTiltDisplay({ rx: Math.round(y * -60), ry: Math.round(x * 60) });
  };

  const handleTiltMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setTiltDisplay({ rx: 0, ry: 0 });
  };

  // --- EXPERIMENT 3: SHADER STUDIO ---
  const [blurVal, setBlurVal] = useState(18);
  const [glowVal, setGlowVal] = useState(65);
  const [hueShift, setHueShift] = useState(0);

  // --- EXPERIMENT 4: 3D HOLOGRAM CUBE ---
  const [holoTheme, setHoloTheme] = useState<'amber' | 'cyan' | 'magenta' | 'green'>('amber');

  // --- EXPERIMENT 5: RETRO AUDIO EQUALIZER ---
  const [eqSpeed, setEqSpeed] = useState(1);

  // Audio synth pad trigger
  const [activePad, setActivePad] = useState<string | null>(null);
  const triggerPad = (type: 'glitch' | 'sub' | 'laser' | 'cyber') => {
    setActivePad(type);
    playSynthPad(type);
    setTimeout(() => setActivePad(null), 300);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full bg-[#080808] dark:bg-[#080808] light:bg-[#f8f9fa] py-32 px-6 md:px-12 border-t border-white/5 dark:border-white/5 light:border-slate-200 overflow-hidden transition-colors duration-300"
    >
      {/* Ambient Glow & Grid Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-[#080808] dark:bg-[#080808] light:bg-[#f8f9fa] opacity-40"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-[#f5e156]/5 blur-[140px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#f5e156] dark:bg-[#f5e156] light:bg-amber-500 animate-ping" />
              <span>03 // Creative Lab</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 font-cinzel transition-colors duration-300">
              Experimental <span className="text-[#f5e156] dark:text-[#f5e156] light:text-amber-500">Playground</span>
            </h2>
          </div>

          {/* Randomize Button */}
          <button
            onClick={handleRandomize}
            className="px-6 py-3 rounded-full bg-[#f5e156] dark:bg-[#f5e156] light:bg-amber-500 text-black font-syne font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(245,225,86,0.4)] flex items-center gap-2.5 cursor-pointer self-start md:self-auto"
          >
            <span>🎲</span>
            <span>Random Experiment</span>
          </button>
        </div>

        {/* Playground Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {playgroundsList.map((item) => (
            <button
              key={item.id}
              onClick={() => { playSynthPad('random'); setActiveId(item.id); }}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeId === item.id
                  ? 'bg-[#f5e156] text-black font-bold shadow-lg scale-105'
                  : 'bg-[#181818] dark:bg-[#181818] light:bg-white text-white/70 dark:text-white/70 light:text-slate-700 border border-white/10 dark:border-white/10 light:border-slate-300 hover:text-[#f5e156] dark:hover:text-[#f5e156] light:hover:text-amber-600'
              }`}
            >
              <span>{item.tag}</span> : <span className="font-space">{item.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* MAIN LAYOUT: Playground Viewport (Left 60%) + Details & Controls Panel (Right 40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDE (7 Cols): Playground Viewport */}
          <div className="lg:col-span-7 bg-[#121212]/80 dark:bg-[#121212]/80 light:bg-white/85 backdrop-blur-2xl p-6 md:p-8 rounded-[2.5rem] border border-white/10 dark:border-white/10 light:border-slate-200 shadow-2xl flex flex-col justify-between relative overflow-hidden min-h-[420px] transition-colors duration-300">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col justify-center items-center relative z-10"
              >
                {/* 01: 3D Kinetic Tilt */}
                {activeId === 1 && (
                  <div 
                    ref={tiltCardRef}
                    onMouseMove={handleTiltMouseMove}
                    onMouseLeave={handleTiltMouseLeave}
                    className="relative w-full h-[360px] bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-slate-100 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-300 flex items-center justify-center cursor-pointer overflow-hidden group select-none transition-colors duration-300"
                    style={{ perspective: "1000px" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f5e156]/20 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div
                      style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
                      className="w-44 h-44 rounded-full bg-gradient-to-br from-[#ffffff] via-[#eaeaea] to-[#666666] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-center border-2 border-white/40"
                    >
                      <div 
                        className="w-24 h-24 rounded-full bg-[#f5e156] shadow-[0_0_40px_rgba(245,225,86,1),inset_2px_2px_8px_rgba(255,255,255,1)] animate-pulse"
                        style={{ transform: "translateZ(60px)" }}
                      />
                    </motion.div>
                  </div>
                )}

                {/* 02: Web Audio Synth */}
                {activeId === 2 && (
                  <div className="w-full h-[360px] bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-slate-100 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-300 p-6 flex flex-col justify-center items-center gap-6">
                    <div className="w-full h-24 bg-[#080808] dark:bg-[#080808] light:bg-slate-900 rounded-2xl flex items-center justify-center border border-white/10">
                      <div className="flex gap-1 items-end h-12">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="w-1.5 bg-[#f5e156] rounded-full transition-all duration-150"
                            style={{ height: `${activePad ? Math.random() * 100 : Math.sin(i + Date.now() * 0.005) * 30 + 35}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <button onClick={() => triggerPad('glitch')} className={`p-4 rounded-xl border font-mono text-xs uppercase ${activePad === 'glitch' ? 'bg-[#f5e156] text-black' : 'bg-[#181818] light:bg-white text-white light:text-slate-900'}`}>01 // Glitch Saw</button>
                      <button onClick={() => triggerPad('sub')} className={`p-4 rounded-xl border font-mono text-xs uppercase ${activePad === 'sub' ? 'bg-[#f5e156] text-black' : 'bg-[#181818] light:bg-white text-white light:text-slate-900'}`}>02 // Sub Sine</button>
                      <button onClick={() => triggerPad('laser')} className={`p-4 rounded-xl border font-mono text-xs uppercase ${activePad === 'laser' ? 'bg-[#f5e156] text-black' : 'bg-[#181818] light:bg-white text-white light:text-slate-900'}`}>03 // Laser Pulse</button>
                      <button onClick={() => triggerPad('cyber')} className={`p-4 rounded-xl border font-mono text-xs uppercase ${activePad === 'cyber' ? 'bg-[#f5e156] text-black' : 'bg-[#181818] light:bg-white text-white light:text-slate-900'}`}>04 // Cyber Burst</button>
                    </div>
                  </div>
                )}

                {/* 03: Shader Studio */}
                {activeId === 3 && (
                  <div className="w-full h-[360px] bg-[#181818] dark:bg-[#181818] light:bg-slate-100 rounded-3xl border border-white/10 flex items-center justify-center p-8">
                    <div 
                      className="w-full max-w-sm p-8 rounded-3xl border border-white/20 text-center select-none shadow-2xl transition-all duration-300"
                      style={{
                        backdropFilter: `blur(${blurVal}px)`,
                        backgroundColor: `rgba(20, 20, 20, 0.65)`,
                        boxShadow: `0 0 ${glowVal}px rgba(245, 225, 86, ${glowVal / 200})`,
                        filter: `hue-rotate(${hueShift}deg)`
                      }}
                    >
                      <span className="font-cinzel text-2xl font-bold text-white tracking-wide">
                        Tactile <span className="text-[#f5e156]">Shader Card</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* 04: 3D Hologram Cube */}
                {activeId === 4 && (
                  <div className="w-full h-[360px] bg-[#0c0c0c] rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden" style={{ perspective: "800px" }}>
                    <motion.div
                      animate={{
                        rotateX: [0, 360],
                        rotateY: [0, 360],
                        rotateZ: [0, 180]
                      }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      className={`w-36 h-36 border-2 flex items-center justify-center transition-all duration-500 ${
                        holoTheme === 'amber' ? 'border-[#f5e156] shadow-[0_0_40px_rgba(245,225,86,0.6)]' :
                        holoTheme === 'cyan' ? 'border-[#38bdf8] shadow-[0_0_40px_rgba(56,189,248,0.6)]' :
                        holoTheme === 'magenta' ? 'border-[#a855f7] shadow-[0_0_40px_rgba(168,85,247,0.6)]' :
                        'border-[#10b981] shadow-[0_0_40px_rgba(16,185,129,0.6)]'
                      }`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="w-20 h-20 border border-white/40 rotate-45 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/80 rounded-full animate-ping" />
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* 05: Retro Audio Equalizer */}
                {activeId === 5 && (
                  <div className="w-full h-[360px] bg-[#080808] rounded-3xl border border-white/10 p-6 flex items-end justify-center gap-2">
                    {Array.from({ length: 16 }).map((_, idx) => (
                      <div key={idx} className="w-4 bg-[#1e1e1e] rounded-t-sm h-full flex flex-col justify-end overflow-hidden">
                        <motion.div 
                          animate={{ height: `${Math.floor(Math.sin((idx + Date.now() * 0.004 * eqSpeed)) * 35 + 50)}%` }}
                          transition={{ type: 'spring', damping: 15 }}
                          className="w-full bg-gradient-to-t from-[#f5e156] via-amber-400 to-amber-600 rounded-t-sm" 
                        />
                      </div>
                    ))}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>

          {/* RIGHT SIDE (5 Cols): Details & Interactive Control Panel */}
          <div className="lg:col-span-5 bg-[#121212]/80 dark:bg-[#121212]/80 light:bg-white/85 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 dark:border-white/10 light:border-slate-200 shadow-2xl flex flex-col justify-between transition-colors duration-300">
            
            <div>
              {/* Tag & Status */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 uppercase tracking-widest font-bold">
                  [ EXPERIMENT {currentPlayground.tag} ]
                </span>
                <span className="font-mono text-[10px] text-white/40 dark:text-white/40 light:text-slate-500 uppercase">
                  STATUS : ONLINE
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl md:text-3xl font-bold font-cinzel text-white dark:text-white light:text-slate-900 mb-4 transition-colors duration-300">
                {currentPlayground.title}
              </h3>
              <p className="text-sm text-neutral-300 dark:text-neutral-300 light:text-slate-600 font-space leading-relaxed mb-8 transition-colors duration-300">
                {currentPlayground.desc}
              </p>
            </div>

            {/* Dynamic Controls per Playground */}
            <div className="space-y-6 border-t border-white/10 dark:border-white/10 light:border-slate-200 pt-6">
              
              {activeId === 1 && (
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-neutral-400 dark:text-neutral-400 light:text-slate-600">3D Tilt Momentum:</span>
                  <span className="text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 font-bold">RX: {tiltDisplay.rx}° | RY: {tiltDisplay.ry}°</span>
                </div>
              )}

              {activeId === 3 && (
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-neutral-400 dark:text-neutral-400 light:text-slate-600 mb-1">
                      <span>Blur: {blurVal}px</span>
                    </div>
                    <input type="range" min="0" max="40" value={blurVal} onChange={(e) => setBlurVal(Number(e.target.value))} className="w-full accent-[#f5e156]" />
                  </div>
                  <div>
                    <div className="flex justify-between text-neutral-400 dark:text-neutral-400 light:text-slate-600 mb-1">
                      <span>Hue: {hueShift}°</span>
                    </div>
                    <input type="range" min="0" max="360" value={hueShift} onChange={(e) => setHueShift(Number(e.target.value))} className="w-full accent-[#f5e156]" />
                  </div>
                </div>
              )}

              {activeId === 4 && (
                <div className="space-y-3 font-mono text-xs">
                  <span className="text-neutral-400 dark:text-neutral-400 light:text-slate-600">Hologram Wireframe Color:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setHoloTheme('amber')} className={`p-2 rounded-lg border ${holoTheme === 'amber' ? 'bg-[#f5e156] text-black font-bold' : 'bg-[#181818] text-white'}`}>Cyber Amber</button>
                    <button onClick={() => setHoloTheme('cyan')} className={`p-2 rounded-lg border ${holoTheme === 'cyan' ? 'bg-[#38bdf8] text-black font-bold' : 'bg-[#181818] text-white'}`}>Electric Cyan</button>
                    <button onClick={() => setHoloTheme('magenta')} className={`p-2 rounded-lg border ${holoTheme === 'magenta' ? 'bg-[#a855f7] text-white font-bold' : 'bg-[#181818] text-white'}`}>Neon Magenta</button>
                    <button onClick={() => setHoloTheme('green')} className={`p-2 rounded-lg border ${holoTheme === 'green' ? 'bg-[#10b981] text-black font-bold' : 'bg-[#181818] text-white'}`}>Acid Green</button>
                  </div>
                </div>
              )}

              {activeId === 5 && (
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-neutral-400 dark:text-neutral-400 light:text-slate-600">
                    <span>Equalizer Speed</span>
                    <span className="text-[#f5e156] font-bold">{eqSpeed}x</span>
                  </div>
                  <input type="range" min="1" max="4" value={eqSpeed} onChange={(e) => setEqSpeed(Number(e.target.value))} className="w-full accent-[#f5e156]" />
                </div>
              )}

              {/* Switch / Random Playground Button */}
              <div className="pt-4 flex items-center justify-between gap-4 border-t border-white/10 dark:border-white/10 light:border-slate-200">
                <span className="font-mono text-xs text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 font-bold">
                  Playground {activeId} of {playgroundsList.length}
                </span>
                <button
                  onClick={handleRandomize}
                  className="px-6 py-2.5 rounded-full bg-[#f5e156] dark:bg-[#f5e156] light:bg-amber-500 text-black font-syne font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,225,86,0.5)] flex items-center gap-2 cursor-pointer"
                >
                  <span>🎲 Switch Playground</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}
