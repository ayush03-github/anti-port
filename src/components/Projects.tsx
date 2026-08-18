'use client';

import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    { id: 1, title: 'Ethereal', category: 'Creative Web', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
    { id: 2, title: 'Lumina', category: 'WebGL Experience', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop' },
    { id: 3, title: 'Nexus', category: 'App Design', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop' },
    { id: 4, title: 'Zenith', category: 'Brand Identity', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop' }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full bg-[#121212] dark:bg-[#121212] light:bg-[#f8f9fa] py-32 px-6 md:px-12 z-20 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 font-cinzel transition-colors duration-300">
            Selected Works
          </h2>
          <p className="mt-6 text-xl text-neutral-400 dark:text-neutral-400 light:text-slate-600 font-light max-w-lg leading-relaxed font-space transition-colors duration-300">
            A curated selection of my latest projects, blending cutting-edge technology with high-end aesthetic design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`group relative rounded-[2rem] overflow-hidden cursor-pointer transform transition-transform duration-700 hover:-translate-y-2 ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2rem] relative bg-neutral-900 dark:bg-neutral-900 light:bg-slate-200 border border-white/5 dark:border-white/5 light:border-slate-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Overlay filter */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/40 light:bg-black/20 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-0" />

                {/* Glass-morphism info card */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-white/85 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-slate-200 shadow-2xl transition-all duration-500 group-hover:bg-white/15 dark:group-hover:bg-white/15 light:group-hover:bg-white">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 font-bold">
                    {project.category}
                  </span>
                  <div className="mt-3 flex justify-between items-end">
                    <h3 className="text-2xl font-semibold text-white dark:text-white light:text-slate-900 tracking-wide font-cinzel transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full border border-white/20 dark:border-white/20 light:border-slate-400 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-black dark:group-hover:bg-white dark:group-hover:text-black light:group-hover:bg-slate-900 light:group-hover:text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nano Banana Footer Accent */}
      <div className="mt-40 border-t border-white/10 dark:border-white/10 light:border-slate-300 pt-10 pb-10 flex flex-col items-center md:flex-row justify-between max-w-7xl mx-auto transition-colors duration-300">
        <p className="text-sm text-neutral-500 dark:text-neutral-500 light:text-slate-600 font-mono">© {new Date().getFullYear()} Ayush Kodle</p>
        <button className="mt-6 md:mt-0 relative px-8 py-3 bg-transparent border border-[#f5e156] dark:border-[#f5e156] light:border-amber-600 text-[#f5e156] dark:text-[#f5e156] light:text-amber-600 hover:bg-[#f5e156] dark:hover:bg-[#f5e156] light:hover:bg-amber-600 hover:text-black dark:hover:text-black light:hover:text-white transition-colors duration-300 rounded-full font-mono text-sm tracking-widest uppercase overflow-hidden group cursor-pointer">
          <span className="relative z-10">Get In Touch</span>
        </button>
      </div>
    </motion.section>
  );
}
