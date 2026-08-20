'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/ayush03-github', tag: '@ayush03-github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/ayush-kodle', tag: '/in/ayush-kodle' },
  { name: 'LeetCode', href: 'https://leetcode.com/ayushkodle', tag: '@ayushkodle' },
  { name: 'X / Twitter', href: 'https://twitter.com/ayush_kodle', tag: '@ayush_kodle' },
  { name: 'Monkeytype', href: 'https://monkeytype.com/profile/ayushkodle', tag: '120+ WPM' }
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

  // --- SUBTLE MONOCHROME STARFIELD + METEOR STREAKS ---
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

    // Mouse coordinates for subtle constellation connection
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Generate 100 Subtle Stars
    const stars: Array<{ x: number; y: number; radius: number; alpha: number; twinkleSpeed: number; maxAlpha: number }> = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.5,
        twinkleSpeed: (Math.random() * 0.015 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        maxAlpha: Math.random() * 0.6 + 0.2
      });
    }

    // Shooting Meteors (Subtle Orange Streaks)
    const meteors: Array<{ x: number; y: number; length: number; speed: number; dx: number; dy: number; alpha: number }> = [];

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 0.7,
        y: Math.random() * (height * 0.3),
        length: Math.random() * 100 + 60,
        speed: Math.random() * 10 + 8,
        dx: 8 + Math.random() * 4,
        dy: 5 + Math.random() * 3,
        alpha: 0.8
      });
    };
    const meteorInterval = setInterval(spawnMeteor, 3200);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Twinkling Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha >= star.maxAlpha || star.alpha <= 0.08) {
          star.twinkleSpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.08, star.alpha)})`;
        ctx.fill();

        // Subtle Constellation Lines near mouse
        const dist = Math.hypot(mouse.x - star.x, mouse.y - star.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(249, 115, 22, ${(1 - dist / 110) * 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // 2. Draw Subtle Meteor Streaks
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.alpha -= 0.01;

        if (m.alpha <= 0 || m.x > width + 200 || m.y > height + 200) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - (m.dx / m.speed) * m.length;
        const tailY = m.y - (m.dy / m.speed) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(249, 115, 22, ${m.alpha})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
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
    <footer className="relative w-full bg-[#08080a] dark:bg-[#08080a] light:bg-[#f8f9fa] text-white dark:text-white light:text-slate-900 border-t border-white/10 dark:border-white/10 light:border-slate-300 py-28 px-6 md:px-12 overflow-hidden transition-colors duration-300">
      
      {/* CANVAS BACKGROUND: TWINKLING STARS & METEOR STREAKS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70 dark:opacity-70 light:opacity-30" />

      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-500/5 dark:bg-orange-500/5 light:bg-amber-500/10 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col justify-between gap-20">
        
        {/* TIER 1: SPACIOUS HEADLINE & EMAIL CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          
          <div className="lg:col-span-8 space-y-6">
            {/* Status Beacon Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 dark:bg-white/5 light:bg-amber-100/80 border border-white/10 dark:border-white/10 light:border-amber-300 font-mono text-[10px] uppercase tracking-[0.2em] text-orange-400 dark:text-orange-400 light:text-amber-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span>Available for select opportunities</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight font-cinzel leading-[1.05]">
              Let&apos;s build something <br />
              <span className="text-orange-500 dark:text-orange-500 light:text-amber-600 italic font-instrument font-normal">extraordinary</span> together.
            </h2>
          </div>

          {/* Email Copy Capsule */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
            <motion.button
              onClick={handleCopyEmail}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3.5 rounded-full bg-black/80 dark:bg-black/80 light:bg-white border border-white/20 dark:border-white/20 light:border-slate-300 text-white dark:text-white light:text-slate-900 font-mono text-xs uppercase tracking-widest hover:border-orange-500 hover:text-orange-400 transition-all cursor-pointer shadow-xl backdrop-blur-md flex items-center gap-3 group"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 group-hover:animate-ping" />
              <span>{copied ? '✓ Email Copied!' : 'ayushkodle.dev@gmail.com'}</span>
            </motion.button>
          </div>

        </div>

        {/* TIER 2: SPACIOUS SOCIAL LINKS & LOCAL IST TIME */}
        <div className="pt-10 border-t border-white/10 dark:border-white/10 light:border-slate-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Social Links Bar */}
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="px-4 py-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 font-mono text-xs text-neutral-300 dark:text-neutral-300 light:text-slate-700 hover:border-orange-500/50 hover:text-orange-400 transition-all flex items-center gap-2"
              >
                <span className="font-semibold">{item.name}</span>
                <span className="text-white/30 dark:text-white/30 light:text-slate-400 text-[10px]">{item.tag}</span>
              </motion.a>
            ))}
          </div>

          {/* Local IST Clock */}
          <div className="font-mono text-xs text-neutral-400 dark:text-neutral-400 light:text-slate-600 flex items-center gap-3 whitespace-nowrap">
            <span>India (IST)</span>
            <span className="text-white/30 dark:text-white/30 light:text-slate-300">//</span>
            <span className="text-white dark:text-white light:text-slate-900 font-bold">{time || '12:00:00 PM'}</span>
          </div>

        </div>

        {/* TIER 3: MINIMALIST COPYRIGHT & BACK TO TOP */}
        <div className="pt-8 border-t border-white/10 dark:border-white/10 light:border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/40 dark:text-white/40 light:text-slate-500">
          <div>
            © 2026 <span className="text-orange-500 dark:text-orange-500 light:text-amber-600 font-semibold">AYUSH KODLE</span>. ALL RIGHTS RESERVED.
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full bg-white/5 dark:bg-white/5 light:bg-white border border-white/15 dark:border-white/15 light:border-slate-300 text-white dark:text-white light:text-slate-900 font-mono text-[11px] uppercase tracking-widest hover:border-orange-500 hover:text-orange-400 transition-all cursor-pointer shadow-md flex items-center gap-2"
          >
            <span>Back to Top</span>
            <span>↑</span>
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
