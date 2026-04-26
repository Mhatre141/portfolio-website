"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Anti Money Laundering - Cyber Statement Analyzer",
    description: "Built an ML-based system to analyze large volumes of bank statements and detect scammer or malicious accounts using transaction pattern analysis. Implemented asynchronous processing with Celery and Redis, and containerized using Docker with deployment on VPS. Improved fraud detection efficiency by automating transaction analysis.",
    tags: ["Machine Learning", "FastAPI", "Celery", "Redis", "Docker"],
  },
  {
    title: "Rain Sense",
    description: "Built ML pipeline for weather forecasting using classification + regression models. Helps agriculture & travel planning.",
    tags: ["Python", "Pandas", "Scikit", "Random Forest"],
  },
  {
    title: "Customer Churn Prediction",
    description: "Predicts customer churn using telecom dataset. Performed EDA + feature engineering to retain customers.",
    tags: ["Python", "Logistic Regression", "Random Forest"],
  },
  {
    title: "Athlete Performance Analytics",
    description: "Performed EDA on athlete dataset and created visualizations for tracking sports performance trends.",
    tags: ["Python", "Matplotlib", "Seaborn"],
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-black relative z-10 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Works</h2>
          <div className="w-20 h-1 bg-white mb-16"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/30 backdrop-blur-xl transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-gray-200 transition-colors">{project.title}</h3>
              <p className="text-gray-400 mb-8 relative z-10 leading-relaxed text-sm flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-semibold bg-white/5 text-gray-300 rounded-full border border-white/10 group-hover:border-white/20 transition-colors">
                    {tag}
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
