"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Brain, Clock, Plus, Zap, Heart, Activity, BookOpen, Layers, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleProps {
  onClose: () => void;
}

// 1. AI Personal Assistant Module
const PersonalAssistantModule = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Optimize neural link bandwidth", status: "completed", time: "08:30" },
    { id: 2, text: "Schedule quantum processing sync", status: "in-progress", time: "10:15" },
    { id: 3, text: "Synthesize weekly cognitive reports", status: "pending", time: "14:00" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-orbitron text-xl font-bold text-neon-blue">Automation Queue</h3>
        <span className="text-[10px] bg-neon-blue/20 text-neon-blue px-2 py-1 rounded border border-neon-blue/30 uppercase">System Optimized</span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="glass p-4 rounded-xl flex items-center justify-between border-l-4 border-l-neon-blue">
            <div>
              <p className="text-sm font-bold text-white">{task.text}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">{task.time} // {task.status}</p>
            </div>
            {task.status === "completed" ? (
              <Zap className="w-4 h-4 text-neon-blue fill-neon-blue" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-neon-blue border-t-transparent animate-spin" />
            )}
          </div>
        ))}
      </div>
      <button className="w-full py-3 border border-dashed border-white/20 rounded-xl text-xs text-gray-400 hover:border-neon-blue hover:text-neon-blue transition-all flex items-center justify-center gap-2">
        <Plus size={14} /> Add New Automation
      </button>
    </div>
  );
};

// 2. Memory Enhancement AI Module
const MemoryModule = () => {
  const [search, setSearch] = useState("");
  const memories = [
    { title: "Quantum Physics Lecture", date: "2035.04.12", tags: ["education", "physics"] },
    { title: "Meeting with Aris Thorne", date: "2035.05.01", tags: ["business", "ethics"] },
    { title: "Dream Synthesis #422", date: "2035.05.18", tags: ["subconscious", "analysis"] },
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search neural storage..." 
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-neon-blue"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest mb-2">
          <Clock size={12} /> Recent Cognitive Syncs
        </div>
        {memories.map((m, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: i * 0.1 }}
            key={m.title} 
            className="p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/5 hover:border-neon-purple/50 cursor-pointer transition-all group"
          >
            <h4 className="text-sm font-bold text-gray-200 group-hover:text-neon-purple transition-colors">{m.title}</h4>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] text-gray-500">{m.date}</span>
              <div className="flex gap-1">
                {m.tags.map(t => (
                  <span key={t} className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400">#{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 3. Smart Education AI Module
const EducationModule = () => {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4 p-4 rounded-2xl bg-neon-blue/5 border border-neon-blue/20">
          <div className="w-12 h-12 rounded-full border-2 border-neon-blue flex items-center justify-center font-orbitron font-bold text-neon-blue">
            72%
          </div>
          <div>
            <h4 className="text-sm font-bold">Quantum Mechanics II</h4>
            <p className="text-[10px] text-gray-400">Next Sync: Entanglement Theory</p>
          </div>
       </div>
       <div className="grid grid-cols-2 gap-4">
          <div className="p-4 glass rounded-xl border border-white/5 space-y-2">
             <BookOpen className="w-4 h-4 text-neon-blue" />
             <h5 className="text-xs font-bold">Concept Map</h5>
             <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-neon-blue w-3/4" />
             </div>
          </div>
          <div className="p-4 glass rounded-xl border border-white/5 space-y-2">
             <Layers className="w-4 h-4 text-neon-purple" />
             <h5 className="text-xs font-bold">Neural Load</h5>
             <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-neon-purple w-1/2" />
             </div>
          </div>
       </div>
       <div className="p-4 rounded-xl border border-white/10 font-mono text-[10px] text-gray-500 bg-black/40">
          <div className="flex items-center gap-2 mb-2 text-neon-blue">
            <Terminal size={12} /> NEURAL_LOADER_V4.0
          </div>
          {`> Loading dataset... Done\n> Calibrating synaptic response... Active\n> Optimization level: HIGH`}
       </div>
    </div>
  );
};

// 4. AI Healthcare Analytics Module
const HealthcareModule = () => {
  return (
    <div className="space-y-6">
       <div className="grid grid-cols-2 gap-4">
          <div className="p-4 glass rounded-xl border border-white/10">
             <div className="flex items-center gap-2 mb-2">
                <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">BPM</span>
             </div>
             <div className="text-2xl font-orbitron font-black text-white">72</div>
          </div>
          <div className="p-4 glass rounded-xl border border-white/10">
             <div className="flex items-center gap-2 mb-2">
                <Activity className="w-3 h-3 text-neon-blue" />
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Neural Flux</span>
             </div>
             <div className="text-2xl font-orbitron font-black text-white">1.2<span className="text-xs ml-1 opacity-50">kv</span></div>
          </div>
       </div>
       <div className="h-32 w-full bg-black/60 rounded-xl border border-white/5 relative overflow-hidden">
          {/* Animated SVG Path for Oscilloscope effect */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 100">
             <motion.path
               d="M 0 50 Q 50 10 100 50 T 200 50 T 300 50 T 400 50"
               fill="none"
               stroke="#00f2ff"
               strokeWidth="2"
               animate={{
                 d: [
                   "M 0 50 Q 50 10 100 50 T 200 50 T 300 50 T 400 50",
                   "M 0 50 Q 50 90 100 50 T 200 50 T 300 50 T 400 50",
                   "M 0 50 Q 50 10 100 50 T 200 50 T 300 50 T 400 50"
                 ]
               }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             />
          </svg>
          <div className="absolute top-2 right-2 text-[8px] font-mono text-neon-blue/50">BIO_SIGNAL_LIVE</div>
       </div>
       <div className="p-4 rounded-xl bg-neon-blue/5 border border-neon-blue/20 flex items-center justify-between">
          <span className="text-xs text-gray-400">Longevity Forecast</span>
          <span className="text-sm font-bold text-neon-blue">+12.4 Years</span>
       </div>
    </div>
  );
};

const ServiceInterface = ({ activeId, onClose }: { activeId: number; onClose: () => void }) => {
  const titles = [
    "Personal Assistant",
    "Memory Enhancement",
    "Smart Education",
    "Healthcare Analytics"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-2xl glass-card overflow-hidden flex flex-col md:flex-row h-[600px]"
      >
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white/5 border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col justify-between">
           <div>
              <div className="w-12 h-12 rounded-xl bg-neon-blue/20 flex items-center justify-center mb-6">
                 {activeId === 1 && <Zap className="text-neon-blue" />}
                 {activeId === 2 && <Brain className="text-neon-purple" />}
                 {activeId === 3 && <BookOpen className="text-white" />}
                 {activeId === 4 && <Activity className="text-red-400" />}
              </div>
              <h2 className="font-orbitron text-2xl font-bold leading-tight mb-2">
                NEO <br /> <span className={cn(
                  activeId === 1 && "text-neon-blue",
                  activeId === 2 && "text-neon-purple",
                  activeId === 3 && "text-white",
                  activeId === 4 && "text-red-400"
                )}>{titles[activeId - 1]}</span>
              </h2>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-4">Module Activated</p>
           </div>
           
           <button 
             onClick={onClose}
             className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors mt-8"
           >
             Disconnect Link
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
           {activeId === 1 && <PersonalAssistantModule />}
           {activeId === 2 && <MemoryModule />}
           {activeId === 3 && <EducationModule />}
           {activeId === 4 && <HealthcareModule />}
           
           <div className="mt-12 pt-8 border-t border-white/5">
              <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono">
                 <div className="w-1 h-1 rounded-full bg-gray-600" />
                 SECURE_CONNECTION_STABLE // HASH: 0x2235AF
              </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceInterface;
