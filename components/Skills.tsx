"use client";
import { motion } from "framer-motion";

const skills = [
  { category: "Programming", items: ["Python", "SQL", "MySQL"] },
  { category: "Machine Learning", items: ["Regression", "Classification", "Clustering", "Random Forest", "GBM"] },
  { category: "Deep Learning", items: ["ANN", "CNN", "RNN"] },
  { category: "NLP", items: ["TF-IDF", "Sentiment Analysis", "Text Classification"] },
  { category: "Libraries", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "PyTorch"] },
  { category: "Tools & Other", items: ["Jupyter", "Power BI", "Git", "Feature Engineering", "Data Viz"] }
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-zinc-950 relative z-10 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical Arsenal</h2>
          <div className="w-20 h-1 bg-white mb-16"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">
                   {idx + 1}
                </span>
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map(item => (
                  <span key={item} className="px-3 py-1.5 bg-black/50 text-gray-300 rounded-lg text-sm font-medium border border-white/5 hover:border-indigo-500/50 hover:bg-black/80 hover:text-white transition-all cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
