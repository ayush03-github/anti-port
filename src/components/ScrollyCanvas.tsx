'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useMotionValueEvent, motion } from 'framer-motion';

const FRAME_COUNT = 101;

export default function ScrollyCanvas({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track scroll within the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);

  // Auto-scroll variables and logic
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollRef = useRef<number>(undefined);

  const stopAutoScroll = useCallback(() => {
    setIsAutoScrolling(false);
    if (scrollRef.current) {
      cancelAnimationFrame(scrollRef.current);
      scrollRef.current = undefined;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    setIsAutoScrolling(true);
    const scrollStep = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
        stopAutoScroll();
        return;
      }
      const canvasHeight = containerRef.current?.offsetHeight || (window.innerHeight * 5);
      const scrollSpeed = window.scrollY < canvasHeight ? 18 : 3.5;
      
      window.scrollBy({ top: scrollSpeed, behavior: 'instant' });
      scrollRef.current = requestAnimationFrame(scrollStep);
    };
    scrollRef.current = requestAnimationFrame(scrollStep);
  }, [stopAutoScroll]);

  const toggleAutoScroll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAutoScrolling) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  };

  // Instant User Interrupt Listeners
  useEffect(() => {
    if (!isAutoScrolling) return;

    const handleUserInterrupt = (e: Event) => {
      if ((e as MouseEvent).target && ((e as MouseEvent).target as HTMLElement).closest('.auto-play-btn')) {
        return;
      }
      stopAutoScroll();
    };

    window.addEventListener('wheel', handleUserInterrupt, { passive: true });
    window.addEventListener('touchstart', handleUserInterrupt, { passive: true });
    window.addEventListener('touchmove', handleUserInterrupt, { passive: true });
    window.addEventListener('keydown', handleUserInterrupt, { passive: true });
    window.addEventListener('mousedown', handleUserInterrupt, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchstart', handleUserInterrupt);
      window.removeEventListener('touchmove', handleUserInterrupt);
      window.removeEventListener('keydown', handleUserInterrupt);
      window.removeEventListener('mousedown', handleUserInterrupt);
    };
  }, [isAutoScrolling, stopAutoScroll]);

  useEffect(() => {
    return () => {
      if (scrollRef.current) cancelAnimationFrame(scrollRef.current);
    };
  }, []);

  // 1. INSTANT FIRST FRAME PRELOADER
  useEffect(() => {
    const loadedImagesArr: HTMLImageElement[] = new Array(FRAME_COUNT);

    const firstImg = new Image();
    firstImg.src = `/ezgif-split/frame_000_delay-0.071s.png`;
    firstImg.onload = () => {
      loadedImagesArr[0] = firstImg;
      setImages([...loadedImagesArr]);
      setIsFirstFrameLoaded(true);
      drawFrame(firstImg);

      let idx = 1;
      const loadNextChunk = () => {
        if (idx >= FRAME_COUNT) return;
        const img = new Image();
        const frameNum = idx.toString().padStart(3, '0');
        img.src = `/ezgif-split/frame_${frameNum}_delay-0.071s.png`;
        img.onload = img.onerror = () => {
          loadedImagesArr[idx] = img;
          setImages([...loadedImagesArr]);
          idx++;
          if (idx < FRAME_COUNT) {
            if ('requestIdleCallback' in window) {
              (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadNextChunk);
            } else {
              setTimeout(loadNextChunk, 10);
            }
          }
        };
      };
      loadNextChunk();
    };
  }, []);

  const drawFrame = (img: HTMLImageElement) => {
    if (!canvasRef.current || !img) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvas.width !== img.width && img.width > 0) {
      canvas.width = img.width;
      canvas.height = img.height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    try {
      ctx.drawImage(img, 0, 0);
    } catch (e) {
      console.error('Frame render error:', e);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length > 0) {
      const maxIndex = FRAME_COUNT - 1;
      const targetIndex = Math.min(maxIndex, Math.max(0, Math.floor(latest * FRAME_COUNT)));
      
      let bestImg = images[targetIndex];
      if (!bestImg) {
        for (let i = targetIndex; i >= 0; i--) {
          if (images[i]) { bestImg = images[i]; break; }
        }
      }
      if (bestImg) drawFrame(bestImg);
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#121212] dark:bg-[#121212] light:bg-[#f8f9fa] transition-colors duration-300">
        
        {/* Canvas Layer - Zoomed in 8% (scale-105/scale-110) to fill side screens edge-to-edge */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover scale-110 transition-opacity duration-500 ease-in-out"
          style={{ opacity: isFirstFrameLoaded ? 1 : 0 }}
        />
        
        {/* Overlay Over Canvas */}
        {children && (
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child as React.ReactElement<{ containerScrollProgress?: typeof scrollYProgress }>, { containerScrollProgress: scrollYProgress })
                : child
            )}
          </div>
        )}

        {/* Auto Play Button (Placed in Bottom Left Corner) */}
        {isFirstFrameLoaded && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-6 z-[200]"
          >
            <button 
              onClick={toggleAutoScroll}
              className="auto-play-btn px-5 py-2.5 bg-black/70 backdrop-blur-xl border border-white/20 text-white rounded-full font-mono text-xs uppercase tracking-widest hover:border-orange-500 hover:text-orange-400 transition-all flex items-center gap-2.5 shadow-2xl cursor-pointer group"
              aria-label="Toggle Auto Play"
            >
              {isAutoScrolling ? (
                <>
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
                  <span className="font-bold text-red-400">Stop Auto Scroll</span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.9)] animate-pulse" />
                  <span>Auto Play</span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
