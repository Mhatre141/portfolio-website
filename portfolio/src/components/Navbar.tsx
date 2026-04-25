"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter text-white">AM.</div>
        <div className="hidden md:flex gap-8 text-sm text-gray-300 font-medium">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="flex gap-4 items-center">
          <a href="https://github.com/Mhatre141" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/ayushmhatre/" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors">
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
