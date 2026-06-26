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

  const [loadedCount, setLoadedCount] = useState(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [showFullLoader, setShowFullLoader] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Store preloaded images in a ref to avoid triggering 40 renders
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));

  // Helper to find the closest loaded frame to a given index
  const getClosestFrame = (index: number): HTMLImageElement | null => {
    // 1. Try exact match
    if (imagesRef.current[index]) return imagesRef.current[index];

    // 2. Search outward (alternating backwards and forwards)
    let left = index - 1;
    let right = index + 1;
    while (left >= 0 || right < FRAME_COUNT) {
      if (left >= 0 && imagesRef.current[left]) return imagesRef.current[left];
      if (right < FRAME_COUNT && imagesRef.current[right]) return imagesRef.current[right];
      left--;
      right++;
    }
    return null;
  };

  const renderFrame = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  // Preload images progressively
  useEffect(() => {
    let active = true;

    // Load first frame immediately to draw as quickly as possible
    const firstImg = new Image();
    firstImg.src = "/sequence/ezgif-frame-001.png";
    firstImg.onload = () => {
      if (!active) return;
      imagesRef.current[0] = firstImg;
      setIsFirstFrameLoaded(true);
      setLoadedCount((prev) => prev + 1);

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) renderFrame(ctx, canvas, firstImg);
      }
    };
    firstImg.onerror = () => {
      console.error("Failed to load the first frame.");
    };

    // Load remaining frames in the background
    for (let i = 2; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${num}.png`;
      img.onload = () => {
        if (!active) return;
        imagesRef.current[i - 1] = img;
        setLoadedCount((prev) => prev + 1);

        // If the newly loaded image corresponds to the current scroll position, draw it
        const canvas = canvasRef.current;
        if (canvas) {
          const currentFrameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(scrollYProgress.get() * FRAME_COUNT)
          );
          if (currentFrameIndex === i - 1) {
            const ctx = canvas.getContext("2d");
            if (ctx) renderFrame(ctx, canvas, img);
          }
        }
      };
      img.onerror = () => {
        console.warn(`Failed to load frame ${i}`);
        if (!active) return;
        // Increment anyway so loaded count progress is updated correctly
        setLoadedCount((prev) => prev + 1);
      };
    }

    return () => {
      active = false;
    };
  }, [scrollYProgress]);

  // Handle Full-Screen Loader Fade Out
  useEffect(() => {
    if (isFirstFrameLoaded) {
      const timer = setTimeout(() => setShowFullLoader(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isFirstFrameLoaded]);

  // Handle Resize and Initial Sizing Immediately (fixing mobile render issue)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        const currentFrameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(scrollYProgress.get() * FRAME_COUNT)
        );
        const ctx = canvas.getContext("2d");
        const imgToRender = getClosestFrame(currentFrameIndex);
        if (ctx && imgToRender) {
          renderFrame(ctx, canvas, imgToRender);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call immediately to set canvas size

    return () => window.removeEventListener("resize", handleResize);
  }, [scrollYProgress, isMounted, isFirstFrameLoaded]);

  // Handle Scroll animations with requestAnimationFrame throttling for maximum smoothness
  const renderPendingRef = useRef(false);
  const latestFrameIndexRef = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(latest * FRAME_COUNT)
      );

      latestFrameIndexRef.current = frameIndex;

      if (!renderPendingRef.current) {
        renderPendingRef.current = true;
        requestAnimationFrame(() => {
          renderPendingRef.current = false;
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              const imgToRender = getClosestFrame(latestFrameIndexRef.current);
              if (imgToRender) {
                renderFrame(ctx, canvas, imgToRender);
              }
            }
          }
        });
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const opacityCenter = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const yCenter = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0, -50]);

  const opacityLeft = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const xLeft = useTransform(scrollYProgress, [0.3, 0.4], [-50, 0]);

  const opacityRight = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 0]);
  const xRight = useTransform(scrollYProgress, [0.6, 0.7], [50, 0]);

  const progress = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black" id="about">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {isMounted ? (
          <>
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            
            {/* Full screen loader until the very first frame is ready */}
            {showFullLoader && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50 transition-opacity duration-500">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-t-indigo-500 animate-spin"></div>
                  </div>
                  <div className="text-gray-400 text-sm font-mono tracking-widest uppercase animate-pulse">
                    Preparing Experience...
                  </div>
                </div>
              </div>
            )}

            {/* Floating background optimization status indicator */}
            {!showFullLoader && loadedCount < FRAME_COUNT && (
              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-gray-400 font-mono transition-opacity duration-300">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <span>Optimizing animation: {progress}%</span>
              </div>
            )}

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
          </>
        ) : (
          <div className="absolute inset-0 bg-black z-10" />
        )}
      </div>
    </div>
  );
}
