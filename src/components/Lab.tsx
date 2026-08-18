'use client';

import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Web Audio API Synthesizer functions for Lab sound pads and randomizer button
const playSynthPad = (type: 'glitch' | 'sub' | 'laser' | 'cyber' | 'random') => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
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
  { id: 1, tag: "01", title: "3D Kinetic Tilt Sculpture", desc: "Physics-based 3D clay orb that rotates dynamically based on cursor position and spring momentum." },
  { id: 2, tag: "02", title: "Web Audio Synth Studio", desc: "Generate browser-native synthesized audio waveforms using real-time Web Audio API oscillators." },
  { id: 3, tag: "03", title: "Generative Particle Canvas", desc: "Hover or drag across the viewport to stream glowing yellow particle clusters." },
  { id: 4, tag: "04", title: "Live Shader & Glass Studio", desc: "Interactive playground to tweak backdrop blur, glowing neon spread, and hue shifts in real-time." },
  { id: 5, tag: "05", title: "Matrix Cyber Digital Rain", desc: "Classic 8-bit digital rain canvas with speed and character density controls." },
  { id: 6, tag: "06", title: "Magnetic Physics Nodes", desc: "Interactive node graph where floating energy nodes magnetize towards your cursor." },
  { id: 7, tag: "07", title: "Interactive Water Ripple Surface", desc: "Click anywhere inside the viewport to generate expanding 2D shockwaves on a fluid grid." },
  { id: 8, tag: "08", title: "3D Clay Morphing Sculpture", desc: "Interactive geometric clay shape that morphs between Sphere, Torus, Cube, and Diamond." },
  { id: 9, tag: "09", title: "Retro Audio Equalizer Spectrum", desc: "Animated 16-bar retro spectrum equalizer visualizer with custom bounce speed." }
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

  // --- EXPERIMENT 1: 3D TILT STATE ---
  const tiltCardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const tiltX = useSpring(rawX, springConfig);
  const tiltY = useSpring(rawY, springConfig);
  const [tiltDisplay, setTiltDisplay] = useState({ rx: 0, ry: 0 });

  const handleTiltMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltCardRef.current) return;
    const rect = tiltCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(y * -35);
    rawY.set(x * 35);
    setTiltDisplay({ rx: Math.round(y * -35), ry: Math.round(x * 35) });
  };

  const handleTiltMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setTiltDisplay({ rx: 0, ry: 0 });
  };

  // --- EXPERIMENT 3: PARTICLE CANVAS ---
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [activeParticlesCount, setActiveParticlesCount] = useState(0);

  useEffect(() => {
    if (activeId !== 3) return;
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number }> = [];

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resize();

    const addParticle = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 3.5,
          vy: (Math.random() - 0.5) * 3.5,
          radius: Math.random() * 4 + 2,
          alpha: 1
        });
      }
    };

    const handleCanvasMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      addParticle(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener('mousemove', handleCanvasMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 225, 86, ${p.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#f5e156';
        ctx.fill();
      }

      setActiveParticlesCount(particles.length);
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      canvas.removeEventListener('mousemove', handleCanvasMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeId]);

  // --- EXPERIMENT 4: SHADER STUDIO ---
  const [blurVal, setBlurVal] = useState(18);
  const [glowVal, setGlowVal] = useState(65);
  const [hueShift, setHueShift] = useState(0);

  // --- EXPERIMENT 5: MATRIX DIGITAL RAIN ---
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const [matrixSpeed, setMatrixSpeed] = useState(33);

  useEffect(() => {
    if (activeId !== 5) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 500;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const chars = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ#@$%&*";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(8, 8, 8, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#f5e156";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, matrixSpeed);

    return () => clearInterval(interval);
  }, [activeId, matrixSpeed]);

  // --- EXPERIMENT 6: MAGNETIC PHYSICS NODES ---
  const nodeCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (activeId !== 6) return;
    const canvas = nodeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 500;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    let animId: number;
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const nodes = Array.from({ length: 9 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      baseRadius: Math.random() * 6 + 4,
    }));

    const handleNodeMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleNodeMouseMove);

    const renderNodes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          node.x += (dx / dist) * force * 3;
          node.y += (dy / dist) * force * 3;

          // Draw spring tension line
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(245, 225, 86, ${force * 0.7})`;
          ctx.lineWidth = force * 2;
          ctx.stroke();
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 10 || node.x > canvas.width - 10) node.vx *= -1;
        if (node.y < 10 || node.y > canvas.height - 10) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#f5e156';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#f5e156';
        ctx.fill();
      });

      animId = requestAnimationFrame(renderNodes);
    };

    renderNodes();
    return () => {
      canvas.removeEventListener('mousemove', handleNodeMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [activeId]);

  // --- EXPERIMENT 7: WATER RIPPLE ---
  const rippleCanvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Array<{ x: number; y: number; radius: number; alpha: number }>>([]);

  const handleRippleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = rippleCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    ripplesRef.current.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 5,
      alpha: 1
    });
  };

  useEffect(() => {
    if (activeId !== 7) return;
    const canvas = rippleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 500;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    let animId: number;

    const renderRipples = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += 3.5;
        r.alpha -= 0.015;

        if (r.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 225, 86, ${r.alpha})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#f5e156';
        ctx.stroke();
      }

      animId = requestAnimationFrame(renderRipples);
    };

    renderRipples();
    return () => cancelAnimationFrame(animId);
  }, [activeId]);

  // --- EXPERIMENT 8: 3D CLAY MORPHING SHAPE ---
  const [clayShape, setClayShape] = useState<'orb' | 'cube' | 'diamond' | 'capsule'>('orb');

  // --- EXPERIMENT 9: RETRO AUDIO EQUALIZER ---
  const [eqSpeed, setEqSpeed] = useState(1);
  const [eqBars, setEqBars] = useState<number[]>([40, 70, 25, 90, 50, 80, 30, 95, 60, 45, 85, 35, 75, 55, 65, 90]);

  useEffect(() => {
    if (activeId !== 9) return;
    const interval = setInterval(() => {
      setEqBars(Array.from({ length: 16 }, () => Math.floor(Math.random() * 85) + 15));
    }, 150 / eqSpeed);
    return () => clearInterval(interval);
  }, [activeId, eqSpeed]);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
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
        {/* <div className="flex flex-wrap gap-2.5 mb-10 overflow-x-auto pb-2 scrollbar-none">
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
        </div> */}

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
                transition={{ duration: 0.3 }}
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
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f5e156]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div
                      style={{ rotateX: tiltX, rotateY: tiltY }}
                      className="w-40 h-40 rounded-full bg-gradient-to-br from-[#eaeaea] to-[#888888] shadow-2xl flex items-center justify-center border border-white/30"
                    >
                      <div className="w-20 h-20 rounded-full bg-[#f5e156] shadow-[0_0_30px_rgba(245,225,86,0.95),inset_2px_2px_6px_rgba(255,255,255,0.9)] animate-pulse" />
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

                {/* 03: Particle Canvas */}
                {activeId === 3 && (
                  <div className="w-full h-[360px] bg-[#181818] dark:bg-[#181818] light:bg-slate-900 rounded-3xl border border-white/10 overflow-hidden cursor-crosshair">
                    <canvas ref={particleCanvasRef} className="w-full h-full block" />
                  </div>
                )}

                {/* 04: Shader Studio */}
                {activeId === 4 && (
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

                {/* 05: Matrix Rain */}
                {activeId === 5 && (
                  <div className="w-full h-[360px] bg-[#080808] rounded-3xl border border-white/10 overflow-hidden">
                    <canvas ref={matrixCanvasRef} className="w-full h-full block" />
                  </div>
                )}

                {/* 06: Physics Nodes */}
                {activeId === 6 && (
                  <div className="w-full h-[360px] bg-[#0d0d0d] rounded-3xl border border-white/10 overflow-hidden cursor-crosshair">
                    <canvas ref={nodeCanvasRef} className="w-full h-full block" />
                  </div>
                )}

                {/* 07: Water Ripple */}
                {activeId === 7 && (
                  <div className="w-full h-[360px] bg-[#121212] rounded-3xl border border-white/10 overflow-hidden cursor-pointer">
                    <canvas ref={rippleCanvasRef} onClick={handleRippleClick} className="w-full h-full block" />
                  </div>
                )}

                {/* 08: 3D Clay Morphing */}
                {activeId === 8 && (
                  <div className="w-full h-[360px] bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-slate-100 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      animate={{
                        rotate: [0, 180, 360],
                        scale: [0.95, 1.05, 0.95]
                      }}
                      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      className={`shadow-2xl flex items-center justify-center transition-all duration-700 ${
                        clayShape === 'orb' ? 'w-36 h-36 rounded-full bg-gradient-to-br from-[#f5e156] to-[#d97706]' :
                        clayShape === 'cube' ? 'w-32 h-32 rounded-2xl bg-gradient-to-br from-[#38bdf8] to-[#0284c7]' :
                        clayShape === 'diamond' ? 'w-32 h-32 rotate-45 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#7e22ce]' :
                        'w-44 h-24 rounded-full bg-gradient-to-br from-[#10b981] to-[#047857]'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/40 backdrop-blur-md animate-ping" />
                    </motion.div>
                  </div>
                )}

                {/* 09: Retro Audio Equalizer */}
                {activeId === 9 && (
                  <div className="w-full h-[360px] bg-[#080808] rounded-3xl border border-white/10 p-6 flex items-end justify-center gap-2">
                    {eqBars.map((val, idx) => (
                      <div key={idx} className="w-4 bg-[#1e1e1e] rounded-t-sm h-full flex flex-col justify-end overflow-hidden">
                        <motion.div 
                          animate={{ height: `${val}%` }}
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
                  <span className="text-neutral-400 dark:text-neutral-400 light:text-slate-600">3D Tilt Readouts:</span>
                  <span className="text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 font-bold">RX: {tiltDisplay.rx}° | RY: {tiltDisplay.ry}°</span>
                </div>
              )}

              {activeId === 3 && (
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-neutral-400 dark:text-neutral-400 light:text-slate-600">Active Particles:</span>
                  <span className="text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 font-bold">{activeParticlesCount} Particles</span>
                </div>
              )}

              {activeId === 4 && (
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

              {activeId === 5 && (
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-neutral-400 dark:text-neutral-400 light:text-slate-600">
                    <span>Rain Speed</span>
                    <span className="text-[#f5e156] font-bold">{matrixSpeed}ms</span>
                  </div>
                  <input type="range" min="10" max="100" value={matrixSpeed} onChange={(e) => setMatrixSpeed(Number(e.target.value))} className="w-full accent-[#f5e156]" />
                </div>
              )}

              {activeId === 7 && (
                <div className="text-center font-mono text-xs text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 font-bold uppercase animate-pulse">
                  Click inside the left viewport to ripple! 🌊
                </div>
              )}

              {activeId === 8 && (
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <button onClick={() => setClayShape('orb')} className={`p-2.5 rounded-lg border ${clayShape === 'orb' ? 'bg-[#f5e156] text-black' : 'bg-[#181818] text-white'}`}>Sphere</button>
                  <button onClick={() => setClayShape('cube')} className={`p-2.5 rounded-lg border ${clayShape === 'cube' ? 'bg-[#f5e156] text-black' : 'bg-[#181818] text-white'}`}>Cube</button>
                  <button onClick={() => setClayShape('diamond')} className={`p-2.5 rounded-lg border ${clayShape === 'diamond' ? 'bg-[#f5e156] text-black' : 'bg-[#181818] text-white'}`}>Diamond</button>
                  <button onClick={() => setClayShape('capsule')} className={`p-2.5 rounded-lg border ${clayShape === 'capsule' ? 'bg-[#f5e156] text-black' : 'bg-[#181818] text-white'}`}>Capsule</button>
                </div>
              )}

              {activeId === 9 && (
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
