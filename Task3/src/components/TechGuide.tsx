"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Brain, BookOpen, Activity, ChevronRight, Fingerprint, Shield, Cpu } from "lucide-react";

const TechGuide = () => {
  const guideData = [
    {
      title: "AI Personal Assistant",
      icon: <Zap className="text-neon-blue" />,
      steps: [
        "Neural Pairing: Sync your biometric signature with the Neoverse core.",
        "Habit Learning: The system observes your workflow for 24 hours.",
        "Automation: Your digital twin begins managing schedules and communications."
      ],
      color: "border-neon-blue/30"
    },
    {
      title: "Memory Enhancement AI",
      icon: <Brain className="text-neon-purple" />,
      steps: [
        "Cognitive Indexing: Upload your current memory clusters to the secure cloud.",
        "Semantic Search: Access any past event via intuitive thought-queries.",
        "Synthesis: The AI connects unrelated memories to generate new insights."
      ],
      color: "border-neon-purple/30"
    },
    {
      title: "Smart Education AI",
      icon: <BookOpen className="text-white" />,
      steps: [
        "Assessment: AI evaluates your current knowledge base and learning style.",
        "Adaptive Pathing: The curriculum reshapes itself as you progress.",
        "Neural Loading: Direct data transfer for rapid skill acquisition."
      ],
      color: "border-white/20"
    },
    {
      title: "AI Healthcare Analytics",
      icon: <Activity className="text-red-400" />,
      steps: [
        "Bio-Sync: Continuous monitoring of your quantum biological data.",
        "Predictive Modeling: AI identifies potential health risks years in advance.",
        "Longevity Tuning: Real-time adjustments to your lifestyle for peak health."
      ],
      color: "border-red-400/20"
    }
  ];

  return (
    <section id="guide" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-4xl font-bold mb-4"
          >
            HOW TO <span className="text-neon-blue">EVOLVE</span>
          </motion.h2>
          <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">A Step-by-Step Guide to Using Neoverse Tech</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guideData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-8 border-l-4 ${item.color}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-xl">
                  {item.icon}
                </div>
                <h3 className="font-orbitron text-xl font-bold">{item.title}</h3>
              </div>
              
              <div className="space-y-4">
                {item.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-neon-blue font-mono text-xs mt-1">0{i+1}.</span>
                    <p className="text-sm text-gray-400 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex -space-x-2">
                   {[Fingerprint, Shield, Cpu].map((Icon, j) => (
                     <div key={j} className="w-6 h-6 rounded-full bg-black border border-white/10 flex items-center justify-center">
                        <Icon size={10} className="text-gray-500" />
                     </div>
                   ))}
                </div>
                <span className="text-[10px] text-gray-600 uppercase tracking-widest">Protocol V3.5</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechGuide;
