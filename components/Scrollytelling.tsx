"use client";
import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 40;

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, '0');
      img.src = `/sequence/ezgif-frame-${num}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) renderFrame(ctx, canvas, loadedImages[0]);
          }
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const renderFrame = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && images.length > 0) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const currentFrameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(scrollYProgress.get() * FRAME_COUNT)
        );
        const ctx = canvas.getContext('2d');
        if (ctx && images[currentFrameIndex]) {
          renderFrame(ctx, canvas, images[currentFrameIndex]);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, [images, scrollYProgress]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (images.length === 0) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(latest * FRAME_COUNT)
      );

      if (ctx && canvas && images[frameIndex]) {
        requestAnimationFrame(() => renderFrame(ctx, canvas, images[frameIndex]));
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, images]);

  const opacityCenter = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const yCenter = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0, -50]);

  const opacityLeft = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const xLeft = useTransform(scrollYProgress, [0.3, 0.4], [-50, 0]);

  const opacityRight = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 0]);
  const xRight = useTransform(scrollYProgress, [0.6, 0.7], [50, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black" id="about">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        
        <motion.div 
          style={{ opacity: opacityCenter, y: yCenter }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            AYUSH MHATRE
          </h2>
          <p className="text-xl md:text-3xl font-medium text-gray-300">
            AI/ML Developer.
          </p>
        </motion.div>

        <motion.div 
          style={{ opacity: opacityLeft, x: xLeft }}
          className="absolute inset-0 flex flex-col items-start justify-center text-left z-10 max-w-7xl mx-auto px-6 w-full"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight">
            I build digital<br/>experiences.
          </h2>
        </motion.div>

        <motion.div 
          style={{ opacity: opacityRight, x: xRight }}
          className="absolute inset-0 flex flex-col items-end justify-center text-right z-10 max-w-7xl mx-auto px-6 w-full"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight">
            Bridging design<br/><span className="text-indigo-400">and engineering.</span>
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
