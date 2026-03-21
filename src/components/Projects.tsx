export default function Projects() {
  const projects = [
    { id: 1, title: 'Ethereal', category: 'Creative Web', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
    { id: 2, title: 'Lumina', category: 'WebGL Experience', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop' },
    { id: 3, title: 'Nexus', category: 'App Design', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop' },
    { id: 4, title: 'Zenith', category: 'Brand Identity', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop' }
  ];

  return (
    <section className="relative w-full bg-[#121212] py-32 px-6 md:px-12 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            Selected Works
          </h2>
          <p className="mt-6 text-xl text-neutral-400 font-light max-w-lg leading-relaxed">
            A curated selection of my latest projects, blending cutting-edge technology with high-end aesthetic design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`group relative rounded-[2rem] overflow-hidden cursor-pointer transform transition-transform duration-700 hover:-translate-y-2 ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2rem] relative bg-neutral-900 border border-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Overlay filter */}
                <div className="absolute inset-0 bg-black/40 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-0" />

                {/* Glass-morphism info card */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#f5e156]">
                    {project.category}
                  </span>
                  <div className="mt-3 flex justify-between items-end">
                    <h3 className="text-2xl font-semibold text-white tracking-wide">
                      {project.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-black">
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
      <div className="mt-40 border-t border-white/10 pt-10 pb-10 flex flex-col items-center flex-col md:flex-row justify-between max-w-7xl mx-auto">
        <p className="text-sm text-neutral-500 font-mono">© {new Date().getFullYear()} Ayush Kodle</p>
        <button className="mt-6 md:mt-0 relative px-8 py-3 bg-transparent border border-[#f5e156] text-[#f5e156] hover:bg-[#f5e156] hover:text-black transition-colors duration-300 rounded-full font-mono text-sm tracking-widest uppercase overflow-hidden group">
          <span className="relative z-10">Get In Touch</span>
        </button>
      </div>
    </section>
  );
}
