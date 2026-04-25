"use client";
import { motion } from "framer-motion";

const timeline = [
  {
    year: "Present",
    title: "Junior ML Engineer Intern",
    company: "Brightwave Software",
    description: "Working on ML engineering tasks including data processing, model development, and deployment of scalable solutions. Contributing to the development of the Anti Money Laundering (Cyber Statement Analyzer) project, focusing on transaction analysis and fraud detection. Collaborating with and guiding a small team to ensure smooth workflow, timely delivery, and efficient implementation of features."
  },
  {
    year: "2022 - 2025",
    title: "BSc Information Technology",
    company: "Pillai HOC College of Engineering",
    description: "Built a strong foundation in computer science, algorithms, and data structures. Developed significant interest in AI/ML through various academic and modern side projects."
  },
  {
    year: "2020 - 2022",
    title: "Higher Secondary Certificate",
    company: "Citizen High School Uran",
    description: "Completed secondary education with focused coursework in science, mathematics, and analytical problem-solving."
  },
  {
    year: "Certifications",
    title: "Advanced Data Science with AI",
    company: "Professional Certification",
    description: "Also completed Deloitte Data Analytics program and MySQL Course (Udemy)."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 bg-black relative z-10 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Education & Credentials</h2>
          <div className="w-20 h-1 bg-white mb-16"></div>
        </motion.div>
        
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
          {timeline.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:border-white/50 transition-all z-10">
                <div className="w-3 h-3 bg-white rounded-full group-hover:scale-150 transition-transform"></div>
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 group-hover:border-white/10 group-hover:bg-white/5 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#7c3aed]">{item.year}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                <h4 className="text-sm font-medium text-gray-400 mt-2 mb-4">{item.company}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
