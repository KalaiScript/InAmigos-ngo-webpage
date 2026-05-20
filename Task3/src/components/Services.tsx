"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import { User, Brain, GraduationCap, Activity, ChevronRight } from "lucide-react";
import ServiceInterface from "./ServiceInterface";

const IconMap: { [key: string]: any } = {
  User: User,
  Brain: Brain,
  GraduationCap: GraduationCap,
  Activity: Activity,
};

const Services = () => {
  const [activeServiceId, setActiveServiceId] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 bg-dark-bg/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-orbitron text-4xl md:text-5xl font-bold mb-4"
            >
              CORE <span className="text-neon-purple">SOLUTIONS</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400"
            >
              Our ecosystem of AI services is designed to integrate seamlessly into every aspect of your life. Click a module to initialize the interface.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:block px-6 py-2 border border-neon-blue/30 rounded-full text-neon-blue font-bold text-xs uppercase tracking-widest"
          >
            v2035.0.1 Stable
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = IconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveServiceId(service.id)}
                className="glass-card p-10 flex flex-col md:flex-row gap-8 items-start group cursor-pointer hover:bg-white/10"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-neon-blue/50 group-hover:shadow-[0_0_20px_rgba(0,242,255,0.2)] transition-all duration-500">
                  <Icon className="w-8 h-8 text-neon-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-orbitron text-2xl font-bold mb-3 group-hover:text-neon-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <button className="text-xs font-bold uppercase tracking-widest text-neon-blue flex items-center gap-2 group/btn">
                    Initialize Module <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeServiceId && (
          <ServiceInterface 
            activeId={activeServiceId} 
            onClose={() => setActiveServiceId(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
