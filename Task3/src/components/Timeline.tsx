"use client";

import React from "react";
import { motion } from "framer-motion";
import { timeline } from "@/data/timeline";

const Timeline = () => {
  return (
    <section id="timeline" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-4xl md:text-5xl font-bold mb-4"
          >
            INNOVATION <span className="text-neon-blue">ROADMAP</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            Tracking the evolution of intelligence from assistance to integration.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-blue to-transparent opacity-30 hidden md:block" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year Bubble */}
                <div className="relative z-10 w-24 h-24 rounded-full glass border border-neon-blue/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,242,255,0.2)]">
                  <span className="font-orbitron text-xl font-black text-neon-blue">
                    {item.year}
                  </span>
                </div>

                {/* Content Card */}
                <div className={`flex-1 glass-card p-8 relative ${
                  index % 2 === 0 ? "text-left" : "md:text-right"
                }`}>
                   <h3 className="font-orbitron text-2xl font-bold mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Decorator Arrow */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-neon-blue/20 border border-neon-blue/50 rotate-45 hidden md:block ${
                    index % 2 === 0 ? "-left-2" : "-right-2"
                  }`} />
                </div>
                
                {/* Spacer for desktop */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
