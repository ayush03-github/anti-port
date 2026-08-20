'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/ayush03-github', icon: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
  )},
  { name: 'LinkedIn', href: 'https://linkedin.com/in/ayush-kodle', icon: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  )},
  { name: 'LeetCode', href: 'https://leetcode.com/ayushkodle', icon: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z"/></svg>
  )},
  { name: 'X / Twitter', href: 'https://twitter.com/ayush_kodle', icon: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  )},
  { name: 'Monkeytype', href: 'https://monkeytype.com/profile/ayushkodle', icon: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v10h14V5H5zm1 12h12v2H6v-2zm3-9h2v2H9V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8zM7 11h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>
  )}
];

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

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

    // 140 Twinkling Stars
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

    const meteors: Array<{ x: number; y: number; length: number; speed: number; dx: number; dy: number; alpha: number; size: number; color: string }> = [];

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

      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha >= star.maxAlpha || star.alpha <= 0.1) {
          star.twinkleSpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, star.alpha)})`;
        ctx.fill();

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

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.alpha -= 0.012;

        if (m.alpha <= 0 || m.x > width + 200 || m.y > height + 200) {
          meteors.splice(i, 1);
          continue;
        }

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="cosmic-footer relative w-full bg-[#050508] text-white border-t border-white/10 pt-24 pb-12 px-6 md:px-12 overflow-hidden">
      
      {/* COSMIC STARFIELD & METEOR CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80" />

      {/* Deep Space Nebulae Ambient Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-orange-500/10 blur-[170px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-500/8 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-between min-h-[520px]">
        
        {/* TOP SECTION: Cosmic Statement */}
        <div>
          {/* Orbital Status HUD Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 font-mono text-[11px] uppercase tracking-[0.25em] text-orange-400 font-bold mb-8 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            <span>ORBITAL TELEMETRY // ALL SYSTEMS NOMINAL 🟢</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-cinzel leading-[1.02] text-white">
            Exploring <br />
            <span className="text-orange-500 italic font-instrument font-normal drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]">uncharted</span> <br />
            digital frontiers.
          </h2>
        </div>

        {/* MIDDLE SECTION: Social Icon Links (with generous vertical spacing) */}
        <div className="mt-20 mb-16 pt-12 border-t border-white/10 flex items-center justify-center">
          <div className="flex items-center gap-5">
            {socialLinks.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/15 text-white/70 flex items-center justify-center hover:border-orange-500/60 hover:text-orange-400 hover:bg-orange-500/10 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all backdrop-blur-md"
                title={item.name}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright & Return to Top Rocket */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50">
          <div>
            © 2026 <span className="text-orange-500 font-bold">AYUSH KODLE</span> // MISSION CONTROL
          </div>

          {/* Back to top rocket button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 rounded-full bg-black/60 border border-white/20 text-white flex items-center gap-2 hover:border-orange-500 hover:text-orange-400 transition-all cursor-pointer shadow-xl backdrop-blur-md group"
            aria-label="Return to Top"
          >
            <span className="group-hover:-translate-y-1 transition-transform">🚀</span>
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">TOP</span>
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
