"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Cpu, 
  Activity, 
  Database, 
  Bell, 
  Settings, 
  ShieldCheck, 
  TrendingUp,
  BarChart3,
  Search,
  MoreVertical,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Total Pioneers", value: "542,012", icon: Users, color: "text-neon-blue" },
    { label: "Neural Load", value: "68.4%", icon: Cpu, color: "text-neon-purple" },
    { label: "Sync Nodes", value: "12,804", icon: Database, color: "text-white" },
    { label: "Uptime", value: "99.998%", icon: Activity, color: "text-green-400" },
  ];

  const recentRegistrations = [
    { name: "Cassian Andor", email: "cassian@rebel.net", tier: "Quantum", status: "Active" },
    { name: "Jyn Erso", email: "jyn@stardust.io", tier: "Neural", status: "Pending" },
    { name: "K-2SO", email: "k2@empire.com", tier: "Legacy", status: "Blocked" },
    { name: "Mon Mothma", email: "mon@senate.gov", tier: "Quantum", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-poppins pt-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Link href="/" className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-neon-blue hover:border-neon-blue transition-all">
               <ArrowLeft size={16} />
            </Link>
            <h1 className="font-orbitron text-3xl font-black flex items-center gap-3">
              <div className="w-8 h-8 bg-neon-blue rounded flex items-center justify-center text-black">A</div>
              NEURAL COMMAND <span className="text-neon-blue">CENTER</span>
            </h1>
          </div>
          <p className="text-gray-500 text-sm uppercase tracking-widest pl-14">
            {currentTime.toLocaleTimeString()} // System Status: Nominal
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Query neural network..." 
              className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-neon-blue"
            />
          </div>
          <button className="p-2 bg-white/5 rounded-lg border border-white/10 hover:border-neon-blue text-gray-400 hover:text-neon-blue transition-all">
            <Bell size={20} />
          </button>
          <button className="p-2 bg-white/5 rounded-lg border border-white/10 hover:border-neon-blue text-gray-400 hover:text-neon-blue transition-all">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 border-l-4 border-l-neon-blue"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={cn("w-6 h-6", stat.color)} />
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-orbitron font-black mb-1">{stat.value}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registration Table */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-orbitron font-bold text-lg">BETA PIONEERS</h3>
            <button className="text-xs text-neon-blue hover:underline">View All Users</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[10px] text-gray-500 uppercase tracking-widest">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Tier</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentRegistrations.map((user, i) => (
                  <tr key={user.email} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-white/5 px-2 py-1 rounded text-[10px] border border-white/10">{user.tier}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          user.status === "Active" ? "bg-green-500 shadow-[0_0_8px_#22c55e]" :
                          user.status === "Pending" ? "bg-yellow-500" : "bg-red-500"
                        )} />
                        {user.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-500 hover:text-white"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-orbitron font-bold text-lg">SECURITY</h3>
              <ShieldCheck className="text-neon-blue w-5 h-5" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-sm">Neural Firewall</span>
                <span className="text-xs text-green-400 font-bold uppercase">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-sm">Data Encryption</span>
                <span className="text-xs text-green-400 font-bold uppercase">Quantum-10</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-sm">Node Vulnerability</span>
                <span className="text-xs text-neon-blue font-bold uppercase">0.02%</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-neon-blue/10 to-transparent">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-orbitron font-bold text-lg">NETWORK</h3>
              <BarChart3 className="text-neon-purple w-5 h-5" />
            </div>
            <div className="h-24 flex items-end gap-1">
              {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-neon-blue/40 rounded-t-sm hover:bg-neon-blue transition-all" 
                  style={{ height: `${h}%` }} 
                />
              ))}
            </div>
            <p className="text-[10px] text-center text-gray-500 mt-4 uppercase tracking-[0.2em]">Neural Throughput // Real-time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
