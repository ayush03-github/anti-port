'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/ayush03-github', tag: '@ayush03-github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/ayush-kodle', tag: '/in/ayush-kodle' },
  { name: 'LeetCode', href: 'https://leetcode.com/ayushkodle', tag: '@ayushkodle' },
  { name: 'X / Twitter', href: 'https://twitter.com/ayush_kodle', tag: '@ayush_kodle' },
  { name: 'CSSBattle', href: 'https://cssbattle.dev/player/pixelette', tag: 'pixelette' }
];

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  // --- SUBTLE LOW-DENSITY STARFIELD + RARE METEOR STREAKS ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 240);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate 35 Subtle Stars
    const stars: Array<{ x: number; y: number; radius: number; alpha: number; twinkleSpeed: number; maxAlpha: number }> = [];
    for (let i = 0; i < 35; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.4,
        twinkleSpeed: (Math.random() * 0.01 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        maxAlpha: Math.random() * 0.5 + 0.1
      });
    }

    // Rare Shooting Meteors
    const meteors: Array<{ x: number; y: number; length: number; speed: number; dx: number; dy: number; alpha: number }> = [];

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 0.6,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 60 + 40,
        speed: Math.random() * 8 + 6,
        dx: 6 + Math.random() * 3,
        dy: 4 + Math.random() * 2,
        alpha: 0.35
      });
    };
    const meteorInterval = setInterval(spawnMeteor, 7000);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha >= star.maxAlpha || star.alpha <= 0.05) {
          star.twinkleSpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, star.alpha)})`;
        ctx.fill();
      });

      // Draw Rare Meteor Streaks
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.alpha -= 0.008;

        if (m.alpha <= 0 || m.x > width + 150 || m.y > height + 150) {
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
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
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
    <footer className="relative w-full bg-[#08080a] dark:bg-[#08080a] light:bg-[#f8f9fa] text-white dark:text-white light:text-slate-900 border-t border-white/10 dark:border-white/10 light:border-slate-300 py-6 md:py-8 px-4 sm:px-6 md:px-10 overflow-hidden transition-colors duration-300">
      
      {/* CANVAS BACKGROUND */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 dark:opacity-40 light:opacity-20" />

      {/* Ambient Radial Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-orange-500/5 dark:bg-orange-500/5 light:bg-amber-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[94%] mx-auto flex flex-col justify-between gap-6 md:gap-8">
        
        {/* TOP ROW: HEADLINE & EMAIL CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-16">
          
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 dark:bg-white/5 light:bg-amber-100/80 border border-white/10 dark:border-white/10 light:border-amber-300 font-mono text-[10px] uppercase tracking-[0.2em] text-orange-400 dark:text-orange-400 light:text-amber-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for select opportunities</span>
            </div>

            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-cinzel leading-tight">
              Let&apos;s build something <span className="text-orange-500 dark:text-orange-500 light:text-amber-600 italic font-instrument font-normal">extraordinary</span> together.
            </h2>
          </div>

          {/* Email Copy Capsule */}
          <motion.button
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="self-start md:self-auto px-5 py-2.5 rounded-full bg-black/80 dark:bg-black/80 light:bg-white border border-white/20 dark:border-white/20 light:border-slate-300 text-white dark:text-white light:text-slate-900 font-mono text-xs uppercase tracking-widest hover:border-orange-500 hover:text-orange-400 transition-all cursor-pointer shadow-lg backdrop-blur-md flex items-center gap-2.5 shrink-0 group"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 group-hover:animate-ping" />
            <span>{copied ? '✓ Email Copied!' : 'ayushkodle.dev@gmail.com'}</span>
          </motion.button>

        </div>

        {/* MIDDLE ROW: SOCIAL LINKS BAR */}
        <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-slate-300 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex flex-wrap gap-2.5">
            {socialLinks.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 font-mono text-xs text-neutral-300 dark:text-neutral-300 light:text-slate-700 hover:border-orange-500/50 hover:text-orange-400 transition-all flex items-center gap-2"
              >
                <span className="font-semibold">{item.name}</span>
                <span className="text-white/30 dark:text-white/30 light:text-slate-400 text-[10px]">{item.tag}</span>
              </motion.a>
            ))}
          </div>

        </div>

        {/* BOTTOM ROW: MINIMALIST COPYRIGHT & BACK TO TOP */}
        <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/40 dark:text-white/40 light:text-slate-500">
          <div>
            © 2026 <span className="text-orange-500 dark:text-orange-500 light:text-amber-600 font-semibold">AYUSH KODLE</span>. ALL RIGHTS RESERVED.
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-1.5 rounded-full bg-white/5 dark:bg-white/5 light:bg-white border border-white/15 dark:border-white/15 light:border-slate-300 text-white dark:text-white light:text-slate-900 font-mono text-[11px] uppercase tracking-widest hover:border-orange-500 hover:text-orange-400 transition-all cursor-pointer shadow-sm flex items-center gap-2"
          >
            <span>Back to Top</span>
            <span>↑</span>
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
