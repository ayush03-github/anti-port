'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, motion } from 'framer-motion';

const FRAME_COUNT = 90;

export default function ScrollyCanvas({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track scroll within the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-scroll variables and logic
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollRef = useRef<number>(undefined);

  const toggleAutoScroll = () => {
    if (isAutoScrolling) {
      setIsAutoScrolling(false);
      if (scrollRef.current) cancelAnimationFrame(scrollRef.current);
    } else {
      setIsAutoScrolling(true);
      const scrollStep = () => {
        // Stop if we hit the bottom of the entire page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
          setIsAutoScrolling(false);
          return;
        }
        // Dynamic speed based on current section
        const canvasHeight = containerRef.current?.offsetHeight || (window.innerHeight * 5);
        const scrollSpeed = window.scrollY < canvasHeight ? 20 : 3.75;
        
        window.scrollBy({ top: scrollSpeed, behavior: 'instant' });
        scrollRef.current = requestAnimationFrame(scrollStep);
      };
      scrollRef.current = requestAnimationFrame(scrollStep);
    }
  };

  useEffect(() => {
    return () => {
      if (scrollRef.current) cancelAnimationFrame(scrollRef.current);
    };
  }, []);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(2, '0');
      // The images in the directory are actually .png instead of .webp
      img.src = `/sequence/frame_${frameNum}_delay-0.066s.png`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Initial draw once loaded
  useEffect(() => {
    if (isLoaded && images.length > 0) {
      drawFrame(images, 0);
    }
  }, [isLoaded, images]);

  const drawFrame = (imgs: HTMLImageElement[], index: number) => {
    if (!canvasRef.current || !imgs[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use intrinsic image dimensions for the canvas resolution
    if (canvas.width !== imgs[0].width) {
      canvas.width = imgs[0].width;
      canvas.height = imgs[0].height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw scaled to fill the canvas to behave like object-fit: cover, 
    // but we can also just let CSS handle it if canvas has fixed aspect ratio.
    ctx.drawImage(imgs[index], 0, 0);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === FRAME_COUNT) {
      const maxIndex = FRAME_COUNT - 1;
      // Map scroll progress (0-1) to an index (0-89)
      const frameIndex = Math.min(maxIndex, Math.max(0, Math.floor(latest * FRAME_COUNT)));
      drawFrame(images, frameIndex);
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      {/* Sticky container that holds the canvas and stays in view */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#121212]">
        
        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-[#121212]">
            <div className="text-white/50 animate-pulse text-sm tracking-widest font-mono">LOADING ASSETS...</div>
          </div>
        )}

        {/* Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
        
        {/* Overlay Over Canvas (In sticky container so it stays fixed relative to viewport, but we pass scrollYProgress to children to animate them based on scroll) */}
        {children && (
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {children}
          </div>
        )}

        {/* Auto Scroll Button */}
        {isLoaded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-[100]"
          >
            <button 
              onClick={toggleAutoScroll}
              className="px-6 py-3 bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-full font-mono text-xs uppercase tracking-widest hover:bg-black/60 hover:border-[#f5e156] hover:text-[#f5e156] transition-all flex items-center gap-3 shadow-lg cursor-pointer"
            >
              {isAutoScrolling ? (
                <>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  Stop Playback
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-[#f5e156] rounded-full shadow-[0_0_8px_rgba(245,225,86,0.6)]" />
                  Auto Play
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
