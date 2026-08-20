'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/ayush03-github', icon: '💻', tag: '@ayush03-github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/ayush-kodle', icon: '💼', tag: '/in/ayush-kodle' },
  { name: 'LeetCode', href: 'https://leetcode.com/ayushkodle', icon: '⚡', tag: '@ayushkodle' },
  { name: 'X / Twitter', href: 'https://twitter.com/ayush_kodle', icon: '🐦', tag: '@ayush_kodle' },
  { name: 'Monkeytype', href: 'https://monkeytype.com/profile/ayushkodle', icon: '⌨️', tag: '120+ WPM' }
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');

  // Live IST Clock (India Standard Time)
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ayushkodle.dev@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#0a0a0a] dark:bg-[#0a0a0a] light:bg-[#f1f5f9] text-white dark:text-white light:text-slate-900 border-t border-white/10 dark:border-white/10 light:border-slate-300 pt-24 pb-12 px-6 md:px-12 overflow-hidden transition-colors duration-300">
      
      {/* Ambient Radial Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 dark:bg-orange-500/10 light:bg-amber-500/15 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-between min-h-[500px]">
        
        {/* TOP SECTION: Massive Statement Headline */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 dark:bg-white/5 light:bg-amber-100 border border-white/10 dark:border-white/10 light:border-amber-300 font-mono text-[11px] uppercase tracking-[0.25em] text-orange-400 dark:text-orange-400 light:text-amber-700 font-bold mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <span>Open for new opportunities &amp; freelance</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-cinzel leading-[1.02]">
                Let&apos;s build <br />
                <span className="text-orange-500 dark:text-orange-500 light:text-amber-600 italic font-instrument font-normal">something</span> <br />
                extraordinary.
              </h2>
            </div>

            {/* Email Copy CTA Card */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
              <p className="text-sm font-space text-neutral-400 dark:text-neutral-400 light:text-slate-600 mb-4 max-w-xs">
                Have an idea, project, or opportunity? Drop me a line anytime.
              </p>
              
              <motion.button
                onClick={handleCopyEmail}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative px-7 py-4 rounded-full bg-orange-500 dark:bg-orange-500 light:bg-amber-500 text-black font-syne font-bold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transition-all cursor-pointer flex items-center gap-3"
              >
                <span>{copied ? '✓ Email Copied!' : '✉️ ayushkodle.dev@gmail.com'}</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Social Links Grid & Info */}
        <div className="my-16 pt-16 border-t border-white/10 dark:border-white/10 light:border-slate-300 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Social Links */}
          <div className="md:col-span-8 flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.03 }}
                className="px-5 py-2.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 font-mono text-xs hover:border-orange-500/50 hover:text-orange-400 transition-all flex items-center gap-2.5 shadow-lg group"
              >
                <span className="text-sm">{item.icon}</span>
                <span className="font-bold">{item.name}</span>
                <span className="text-white/40 dark:text-white/40 light:text-slate-400 group-hover:text-orange-400/70 font-normal">{item.tag}</span>
              </motion.a>
            ))}
          </div>

          {/* Real-time IST Location & Time */}
          <div className="md:col-span-4 flex flex-col md:items-end justify-center font-mono text-xs text-neutral-400 dark:text-neutral-400 light:text-slate-600 gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span>Location: India // IST (UTC+5:30)</span>
            </div>
            <div className="text-white dark:text-white light:text-slate-900 font-bold text-sm">
              Local Time: {time || '12:00:00 PM'}
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/10 dark:border-white/10 light:border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50 dark:text-white/50 light:text-slate-500">
          <div>
            © 2026 <span className="text-orange-500 dark:text-orange-500 light:text-amber-600 font-bold">AYUSH KODLE</span> // ALL RIGHTS RESERVED
          </div>

          <div className="flex items-center gap-6">
            <span>Built with Next.js &amp; Framer Motion</span>

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/5 dark:bg-white/5 light:bg-white border border-white/15 dark:border-white/15 light:border-slate-300 text-white dark:text-white light:text-slate-900 flex items-center justify-center hover:border-orange-500 hover:text-orange-400 transition-all cursor-pointer shadow-lg"
              aria-label="Back to Top"
            >
              ↑
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}
