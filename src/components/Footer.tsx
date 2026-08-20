'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/ayush03-github', icon: '📡', tag: '@ayush03-github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/ayush-kodle', icon: '🛸', tag: '/in/ayush-kodle' },
  { name: 'LeetCode', href: 'https://leetcode.com/ayushkodle', icon: '⚡', tag: '@ayushkodle' },
  { name: 'X / Twitter', href: 'https://twitter.com/ayush_kodle', icon: '🌌', tag: '@ayush_kodle' },
  { name: 'Monkeytype', href: 'https://monkeytype.com/profile/ayushkodle', icon: '⌨️', tag: '120+ WPM' }
];

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- COSMIC CANVAS: TWINKLING STARS + SHOOTING METEORS + CONSTELLATION LINES ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates for constellation effect
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // Spawn a shooting meteor on rapid mouse drag!
      if (Math.random() < 0.25) {
        meteors.push({
          x: mouse.x - Math.random() * 100,
          y: mouse.y - Math.random() * 100,
          length: Math.random() * 80 + 60,
          speed: Math.random() * 10 + 8,
          dx: Math.cos(Math.PI / 4) * (Math.random() * 8 + 8),
          dy: Math.sin(Math.PI / 4) * (Math.random() * 8 + 8),
          alpha: 1,
          size: Math.random() * 2 + 1.5,
          color: ['#f5e156', '#f97316', '#38bdf8', '#ffffff'][Math.floor(Math.random() * 4)]
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Generate 140 Twinkling Stars
    const stars: Array<{ x: number; y: number; radius: number; alpha: number; twinkleSpeed: number; maxAlpha: number }> = [];
    for (let i = 0; i < 140; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        alpha: Math.random(),
        twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        maxAlpha: Math.random() * 0.7 + 0.3
      });
    }

    // Shooting Meteors Array
    const meteors: Array<{ x: number; y: number; length: number; speed: number; dx: number; dy: number; alpha: number; size: number; color: string }> = [];

    // Periodic automatic meteor spawner
    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 120 + 80,
        speed: Math.random() * 12 + 10,
        dx: 8 + Math.random() * 6,
        dy: 6 + Math.random() * 5,
        alpha: 1,
        size: Math.random() * 2.5 + 1.5,
        color: ['#f5e156', '#f97316', '#38bdf8', '#ffffff'][Math.floor(Math.random() * 4)]
      });
    };
    const meteorInterval = setInterval(spawnMeteor, 2200);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Twinkling Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha >= star.maxAlpha || star.alpha <= 0.1) {
          star.twinkleSpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, star.alpha)})`;
        ctx.fill();

        // Constellation Lines to Mouse Cursor
        const dist = Math.hypot(mouse.x - star.x, mouse.y - star.y);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(249, 115, 22, ${(1 - dist / 130) * 0.45})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // 2. Draw Shooting Meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.alpha -= 0.012;

        if (m.alpha <= 0 || m.x > width + 200 || m.y > height + 200) {
          meteors.splice(i, 1);
          continue;
        }

        // Meteor Trail Gradient
        const tailX = m.x - (m.dx / m.speed) * m.length;
        const tailY = m.y - (m.dy / m.speed) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, m.color);
        grad.addColorStop(0.3, `rgba(249, 115, 22, ${m.alpha * 0.8})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.size;
        ctx.stroke();

        // Meteor Glowing Head
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = m.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = m.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(meteorInterval);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ayushkodle.dev@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#050508] dark:bg-[#050508] light:bg-[#f1f5f9] text-white dark:text-white light:text-slate-900 border-t border-white/10 dark:border-white/10 light:border-slate-300 pt-24 pb-12 px-6 md:px-12 overflow-hidden transition-colors duration-300">
      
      {/* COSMIC STARFIELD & METEOR CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80 dark:opacity-80 light:opacity-40" />

      {/* Deep Space Nebulae Ambient Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-orange-500/10 dark:bg-orange-500/10 light:bg-amber-400/15 blur-[170px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-500/10 dark:bg-amber-500/10 light:bg-orange-400/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-between min-h-[520px]">
        
        {/* TOP SECTION: Cosmic Statement & CTA */}
        <div>
          {/* Orbital Status HUD Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 dark:bg-black/60 light:bg-white border border-white/15 dark:border-white/15 light:border-slate-300 font-mono text-[11px] uppercase tracking-[0.25em] text-orange-400 dark:text-orange-400 light:text-amber-700 font-bold mb-8 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            <span>ORBITAL TELEMETRY // ALL SYSTEMS NOMINAL 🟢</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-cinzel leading-[1.02]">
                Exploring <br />
                <span className="text-orange-500 dark:text-orange-500 light:text-amber-600 italic font-instrument font-normal drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]">uncharted</span> <br />
                digital frontiers.
              </h2>
            </div>

            {/* Launch Project CTA Capsule */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
              <p className="text-sm font-space text-neutral-300 dark:text-neutral-300 light:text-slate-700 mb-4 max-w-xs leading-relaxed">
                Ready to launch your next Web3, 3D, or full-stack application into orbit?
              </p>
              
              <motion.button
                onClick={handleCopyEmail}
                whileHover={{ scale: 1.04, boxShadow: "0 0 35px rgba(249,115,22,0.6)" }}
                whileTap={{ scale: 0.96 }}
                className="relative px-7 py-4 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-syne font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all cursor-pointer flex items-center gap-3"
              >
                <span>{copied ? '🚀 TRANSMISSION COPIED!' : '☄️ LAUNCH PROJECT // COPY EMAIL'}</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Orbital Satellite Links & Telemetry */}
        <div className="my-16 pt-12 border-t border-white/10 dark:border-white/10 light:border-slate-300 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Satellite Orbit Social Links */}
          <div className="md:col-span-8 flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.03 }}
                className="px-5 py-2.5 rounded-2xl bg-black/50 dark:bg-black/50 light:bg-white border border-white/15 dark:border-white/15 light:border-slate-300 text-white dark:text-white light:text-slate-900 font-mono text-xs hover:border-orange-500/60 hover:text-orange-400 transition-all flex items-center gap-2.5 shadow-xl group backdrop-blur-md"
              >
                <span className="text-sm">{item.icon}</span>
                <span className="font-bold">{item.name}</span>
                <span className="text-white/40 dark:text-white/40 light:text-slate-500 group-hover:text-orange-400/80 font-normal">{item.tag}</span>
              </motion.a>
            ))}
          </div>

          {/* Real-time IST Location & Orbit Clock */}
          <div className="md:col-span-4 flex flex-col md:items-end justify-center font-mono text-xs text-neutral-400 dark:text-neutral-400 light:text-slate-600 gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span>COORDINATES: LAT 20.59° N, LONG 78.96° E (INDIA)</span>
            </div>
            <div className="text-white dark:text-white light:text-slate-900 font-bold text-sm">
              ORBITAL TIME: {time || '12:00:00 PM'} IST
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Telemetry Copyright & Return to Top Rocket */}
        <div className="pt-8 border-t border-white/10 dark:border-white/10 light:border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50 dark:text-white/50 light:text-slate-600">
          <div>
            © 2026 <span className="text-orange-500 dark:text-orange-500 light:text-amber-600 font-bold">AYUSH KODLE</span> // MISSION CONTROL
          </div>

          <div className="flex items-center gap-6">
            <span>Powered by Next.js, Framer Motion &amp; Canvas Physics</span>

            {/* Back to top rocket button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 rounded-full bg-black/60 dark:bg-black/60 light:bg-white border border-white/20 dark:border-white/20 light:border-slate-300 text-white dark:text-white light:text-slate-900 flex items-center gap-2 hover:border-orange-500 hover:text-orange-400 transition-all cursor-pointer shadow-xl backdrop-blur-md group"
              aria-label="Return to Top"
            >
              <span className="group-hover:-translate-y-1 transition-transform">🚀</span>
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold">TOP</span>
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}
