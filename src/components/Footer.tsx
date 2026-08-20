'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

const socialLinks = [
  { 
    name: 'GitHub', 
    href: 'https://github.com/ayush03-github', 
    tag: '@ayush03-github',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )
  },
  { 
    name: 'LinkedIn', 
    href: 'https://linkedin.com/in/ayush-kodle', 
    tag: '/in/ayush-kodle',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    )
  },
  { 
    name: 'LeetCode', 
    href: 'https://leetcode.com/ayushkodle', 
    tag: '@ayushkodle',
    icon: (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none">
        <path d="M16.102 17.93l-8.528-8.529a1.69 1.69 0 0 1 0-2.39L15.938 1.48a1.69 1.69 0 0 1 2.39 0l.542.541a1.69 1.69 0 0 1 0 2.39L11.536 11.74l7.334 7.334a1.69 1.69 0 0 1 0 2.39l-.542.542a1.69 1.69 0 0 1-2.226-.076z" fill="currentColor" />
        <path d="M22.25 15.545a1.69 1.69 0 0 1-2.39 0l-5.328-5.328a1.69 1.69 0 0 1 0-2.39l.542-.542a1.69 1.69 0 0 1 2.39 0l5.328 5.328a1.69 1.69 0 0 1 0 2.39l-.542.542z" fill="#FFA116" />
        <path d="M9.6 13.2h8.8a1.2 1.2 0 0 1 1.2 1.2v.4a1.2 1.2 0 0 1-1.2 1.2H9.6a1.2 1.2 0 0 1-1.2-1.2v-.4a1.2 1.2 0 0 1 1.2-1.2z" fill="#9E9E9E" />
      </svg>
    )
  },
  { 
    name: 'X / Twitter', 
    href: 'https://twitter.com/ayush_kodle', 
    tag: '@ayush_kodle',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  { 
    name: 'CSSBattle', 
    href: 'https://cssbattle.dev/player/pixelette', 
    tag: 'pixelette',
    icon: (
      <svg className="w-4.5 h-4.5 text-amber-500 dark:text-amber-400 group-hover:text-amber-300" viewBox="0 0 24 24">
        <path d="M5 4c-1.1 0-2 .9-2 2v3c0 1.1-.9 2-2 2 .9 0 2 .9 2 2v3c0 1.1.9 2 2 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M19 4c1.1 0 2 .9 2 2v3c0 1.1.9 2 2 2-.9 0-2 .9-2 2v3c0 1.1-.9 2-2 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 16l8-8M16 16L8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M7.5 13.5l2.5 2.5M16.5 13.5l-2.5 2.5M7.5 10.5l2.5-2.5M16.5 10.5l-2.5-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
];

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // --- SUBTLE LOW-DENSITY STARFIELD + RARE METEOR STREAKS ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const stars: Array<{ x: number; y: number; radius: number; alpha: number; twinkleSpeed: number; maxAlpha: number }> = [];
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.4,
        twinkleSpeed: (Math.random() * 0.01 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        maxAlpha: Math.random() * 0.5 + 0.1
      });
    }

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
    const meteorInterval = setInterval(spawnMeteor, 6500);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha >= star.maxAlpha || star.alpha <= 0.05) {
          star.twinkleSpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${Math.max(0.05, star.alpha)})` : `rgba(15, 23, 42, ${Math.max(0.05, star.alpha * 0.6)})`;
        ctx.fill();
      });

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
        const streakColor = isDark ? '249, 115, 22' : '217, 119, 6';
        grad.addColorStop(0, `rgba(${streakColor}, ${m.alpha})`);
        grad.addColorStop(1, isDark ? 'rgba(255, 255, 255, 0)' : 'rgba(15, 23, 42, 0)');

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
  }, [isDark]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#08080a] dark:bg-[#08080a] light:bg-[#f8f9fa] text-white dark:text-white light:text-slate-900 border-t border-white/10 dark:border-white/10 light:border-slate-300 py-12 md:py-16 px-4 sm:px-6 md:px-10 overflow-hidden transition-colors duration-300">
      
      {/* CANVAS BACKGROUND */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 dark:opacity-40 light:opacity-20" />

      {/* Ambient Radial Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-orange-500/5 dark:bg-orange-500/5 light:bg-amber-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[94%] mx-auto flex flex-col justify-between gap-10 md:gap-12">
        
        {/* TOP ROW: HEADLINE & STATUS BEACON */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-16">
          
          <div className="space-y-2 my-10 md:my-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 dark:bg-white/5 light:bg-amber-100/80 border border-white/10 dark:border-white/10 light:border-amber-300 font-mono text-[10px] uppercase tracking-[0.2em] text-orange-400 dark:text-orange-400 light:text-amber-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for select opportunities</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight font-cinzel leading-tight text-white dark:text-white light:text-slate-900">
              Let&apos;s build something <br /><span className="text-orange-500 dark:text-orange-500 light:text-amber-600 italic font-instrument font-normal">extraordinary</span> together.
            </h2>
          </div>

        </div>

        {/* MIDDLE ROW: OFFICIAL SOCIAL SVG ICON BUTTONS */}
        <div className="pt-6 border-t border-white/10 dark:border-white/10 light:border-slate-300 flex flex-wrap items-center justify-between gap-4">
          
          {/* Minimalist Social Icon Buttons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 text-neutral-300 dark:text-neutral-300 light:text-slate-700 hover:text-orange-400 dark:hover:text-orange-400 light:hover:text-amber-600 hover:border-orange-500/50 dark:hover:border-orange-500/50 light:hover:border-amber-500/50 transition-all shadow-md group flex items-center justify-center"
                aria-label={item.name}
              >
                {item.icon}

                {/* Minimalist Tooltip on Hover */}
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 dark:bg-black/90 light:bg-slate-900 text-white text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-lg">
                  {item.name}
                </span>
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
            className="px-4 py-1.5 rounded-full bg-white/5 dark:bg-white/5 light:bg-white border border-white/15 dark:border-white/15 light:border-slate-300 text-white dark:text-white light:text-slate-900 font-mono text-[11px] uppercase tracking-widest hover:border-orange-500 dark:hover:border-orange-500 light:hover:border-amber-500 hover:text-orange-400 dark:hover:text-orange-400 light:hover:text-amber-600 transition-all cursor-pointer shadow-sm flex items-center gap-2"
          >
            <span>Back to Top</span>
            <span>↑</span>
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
