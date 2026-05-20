"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Rocket, ShieldCheck } from "lucide-react";

const About = () => {
  const values = [
    {
      title: "Mission",
      description: "To amplify human potential through ethical and seamless AI integration, making complex intelligence accessible to everyone.",
      icon: <Target className="w-8 h-8 text-neon-blue" />,
    },
    {
      title: "Vision",
      description: "A future where human and machine consciousness collaborate to solve the world's most pressing challenges.",
      icon: <Eye className="w-8 h-8 text-neon-purple" />,
    },
    {
      title: "AI Future",
      description: "We are building the foundation for a post-AGI world where technology serves as a natural extension of human thought.",
      icon: <Rocket className="w-8 h-8 text-white" />,
    },
    {
      title: "Ethical Innovation",
      description: "Safety and transparency are at our core. Every neural link we build is designed with human agency as the priority.",
      icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-4xl md:text-5xl font-bold mb-4"
          >
            OUR <span className="text-neon-blue">PHILOSOPHY</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-1 bg-neon-blue mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Neoverse AI isn&apos;t just another tech company. We are architects of the next stage of human evolution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-orbitron text-xl font-bold mb-4 group-hover:text-neon-blue transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
