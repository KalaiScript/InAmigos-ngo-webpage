"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[150px] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-neon-blue" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            Welcome to the future of intelligence
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-orbitron text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-tight"
        >
          THE FUTURE OF <br />
          <span className="bg-gradient-to-r from-neon-blue via-white to-neon-purple bg-clip-text text-transparent">
            HUMAN-AI COLLABORATION
          </span>
          <br /> STARTS HERE.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed"
        >
          Redefining human intelligence through seamless neural integration. 
          Step into a world where technology doesn&apos;t just assist—it augments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="#services"
            className="group relative px-8 py-4 bg-neon-blue text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Technology <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </a>
          
          <a 
            href="#contact"
            className="px-8 py-4 bg-transparent border border-white/20 hover:border-neon-purple/50 text-white font-bold rounded-xl backdrop-blur-sm transition-all hover:bg-neon-purple/5 flex items-center justify-center"
          >
            Join Beta Program
          </a>
        </motion.div>

        {/* Dashboard Preview Component (Bonus) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 shadow-2xl shadow-neon-blue/20"
        >
          <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black relative flex items-center justify-center">
             {/* Neural Network Visualization Placeholder */}
             <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.1),transparent_50%)]" />
             </div>
             <div className="text-neon-blue/50 font-orbitron text-xl animate-pulse">
                INITIALIZING NEURAL LINK...
             </div>
             
             {/* Fake UI elements */}
             <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
             </div>
             <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-500">
                CORE_SYSTEM_READY // VER: 2035.04.12
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
