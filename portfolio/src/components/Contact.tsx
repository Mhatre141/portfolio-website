"use client";
import { motion } from "framer-motion";
import { Mail, Phone, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-zinc-950 relative z-10 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">Let's build something<br/>extraordinary.</h2>
          <p className="text-xl text-gray-400 font-light">Open for opportunities and collaborations.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-6 p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all group">
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white/10 transition-all">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 font-medium">Email</p>
                <a href="mailto:ayushmhatre141@gmail.com" className="text-lg font-bold text-white hover:text-[#7c3aed] transition-colors">ayushmhatre141@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-center gap-6 p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all group">
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white/10 transition-all">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 font-medium">Phone</p>
                <a href="tel:9503968289" className="text-lg font-bold text-white hover:text-[#7c3aed] transition-colors">+91 9503968289</a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
               <a href="https://github.com/Mhatre141" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors">
                  GitHub <ExternalLink className="w-4 h-4" />
               </a>
               <a href="https://www.linkedin.com/in/ayushmhatre/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0a66c2]/20 border border-[#0a66c2]/30 text-white font-semibold hover:bg-[#0a66c2]/40 transition-colors">
                  LinkedIn <ExternalLink className="w-4 h-4" />
               </a>
            </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Name</label>
                <input type="text" className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#7c3aed] transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
                <input type="email" className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#7c3aed] transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2 mb-8">
              <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
              <textarea rows={5} className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#7c3aed] transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
            </div>
            <button className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors shadow-[0_4px_20px_rgba(255,255,255,0.2)]">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
