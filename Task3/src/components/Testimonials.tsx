"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Aris Thorne",
    role: "Quantum Ethics Researcher",
    content: "The neural-link consistency provided by Neoverse AI is unparalleled. It's the first time I've felt a true synthesis between my research and my intuitive leaps.",
    avatar: "AT",
  },
  {
    name: "Sila Vane",
    role: "Digital Architect",
    content: "Building cities in the 2030s requires more than just CAD. It requires the predictive power of Neoverse to simulate 100 years of urban growth in seconds.",
    avatar: "SV",
  },
  {
    name: "Kaelen Voss",
    role: "Professional Learner",
    content: "Neoverse changed how I learn and work. I mastered three dead languages and quantum field theory in six months. It's not just an assistant; it's an expansion of self.",
    avatar: "KV",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-black to-dark-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-4xl md:text-5xl font-bold mb-4"
          >
            VOICES OF THE <span className="text-neon-purple">NEW ERA</span>
          </motion.h2>
          <p className="text-gray-400">Hear from those already living in the future.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 relative"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-white/5" />
              <p className="text-gray-300 italic mb-8 relative z-10">
                &quot;{t.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neon-purple/20 border border-neon-purple/50 flex items-center justify-center font-orbitron font-bold text-neon-purple">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-neon-blue uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
