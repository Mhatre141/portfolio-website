"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { motion } from "framer-motion";

function ParticleCloud(props: any) {
  const ref = useRef<any>(null);
  const count = 5000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = 1.5 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if(ref.current) {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffffff" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ParticleCloud />
        </Canvas>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300 uppercase tracking-widest"
        >
          AI/ML Developer
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          AYUSH MHATRE
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-400 mb-10 max-w-2xl font-light leading-relaxed"
        >
          Building end-to-end data pipelines, predictive models, and intelligent systems using real-world datasets.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#about" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Explore My Work
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
        <span className="text-xs uppercase tracking-widest text-white/50 mt-2">Scroll</span>
      </motion.div>
    </section>
  );
}
