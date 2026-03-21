'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Overlay() {
  // Using global window scroll for the overlay text since it's mounted inside the sticky container.
  // We map the first 500vh of scrolling (where the sticky element is active).
  const { scrollYProgress } = useScroll();

  // Fine-tuning the fade/parallax windows:

  // Section 1: "My Name. Creative Developer." (stays visible)
  const opacity1 = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: "I build digital experiences." (starts fading in at 25%, solid at 30%, fades out by 45%)
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.28, 0.38, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.45], [100, -100]);

  // Section 3: "Bridging design and engineering." (starts fading in at 50%, solid at 60%, fades out by 75%)
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.58, 0.68, 0.75], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.75], [100, -100]);

  return (
    <div className="relative w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6">

      {/* Section 1 - Right Aligned */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-end justify-center text-right"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-black drop-shadow-lg mix-blend-difference font-tan-buster [text-shadow:_0_4px_24px_rgba(255,255,255,0.5)]">
          Ayush Kodle
        </h1>
        <p className="mt-4 text-base sm:text-xl md:text-2xl text-black/80 tracking-wide uppercase font-light drop-shadow-lg mix-blend-difference font-tan-buster [text-shadow:_0_2px_12px_rgba(255,255,255,0.5)]">
          Creative Developer
        </p>
      </motion.div>

      {/* Section 2 - Left Aligned */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-start justify-center text-left"
      >
        <h2 className="text-4xl md:text-6xl max-w-2xl font-semibold leading-tight text-black drop-shadow-xl mix-blend-difference">
          I build digital experiences.
        </h2>
      </motion.div>

      {/* Section 3 - Right Aligned */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center text-right"
      >
        <h2 className="text-4xl md:text-6xl max-w-2xl font-semibold leading-tight text-black drop-shadow-xl mix-blend-difference">
          Bridging design <br /> and engineering.
        </h2>
      </motion.div>

    </div>
  );
}
