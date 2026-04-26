import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Scrollytelling from "@/components/Scrollytelling";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-[#7c3aed]/30 font-sans">
      <Navbar />
      <Hero />
      <Scrollytelling />
      <Skills />
      <Projects />
      <Experience />
      <Contact />

      <footer className="py-8 bg-black border-t border-white/10 text-center text-gray-500 text-sm relative z-10 w-full overflow-hidden">
        <p>© {new Date().getFullYear()} Ayush Mhatre. All rights reserved.</p>
      </footer>
    </main>
  );
}
