"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ArrowLeft,
  LayoutDashboard,
  UserPlus,
  Terminal as TerminalIcon,
  Zap,
  Menu,
  Trash2,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Lock,
  Globe
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ManagePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Nodes State
  const [nodes, setNodes] = useState([
    { id: "NODE_01", loc: "Neo Tokyo", load: "42%", status: "Stable" },
    { id: "NODE_02", loc: "Mars Colony A", load: "89%", status: "High" },
    { id: "NODE_03", loc: "Deep Space 9", load: "12%", status: "Stable" },
    { id: "NODE_04", loc: "San Francisco", load: "65%", status: "Stable" },
  ]);

  const [users, setUsers] = useState([
    { id: "U_102", name: "Cassian Andor", email: "cassian@rebel.net", tier: "Quantum", lastSync: "2m ago" },
    { id: "U_105", name: "Jyn Erso", email: "jyn@stardust.io", tier: "Neural", lastSync: "15m ago" },
    { id: "U_201", name: "Mon Mothma", email: "mon@senate.gov", tier: "Quantum", lastSync: "1h ago" },
    { id: "U_098", name: "Din Djarin", email: "mando@bounty.com", tier: "Legacy", lastSync: "3d ago" },
  ]);

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "User Management", icon: Users },
    { id: "system", label: "System Health", icon: Activity },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "terminal", label: "Command Line", icon: TerminalIcon },
  ];

  // Logic Functions
  const deleteNode = (id: string) => setNodes(nodes.filter(n => n.id !== id));
  const toggleStatus = (id: string) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, status: n.status === "Stable" ? "Critical" : "Stable" } : n));
  };

  // Sub-Components for Tabs
  const DashboardTab = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Nodes", value: nodes.length.toString(), icon: Database, color: "text-neon-blue" },
          { label: "Neural Load", value: "64.2%", icon: Cpu, color: "text-neon-purple" },
          { label: "New Pioneers", value: "+1,240", icon: UserPlus, color: "text-green-400" },
          { label: "Latency", value: "14ms", icon: Activity, color: "text-red-400" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 flex flex-col justify-between h-32 border-l-2 border-l-neon-purple">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{stat.label}</span>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div className="text-2xl font-orbitron font-black">{stat.value}</div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-orbitron text-sm font-bold uppercase tracking-widest">Active Neural Nodes</h3>
            <button onClick={() => setNodes([...nodes, { id: `NODE_0${nodes.length + 1}`, loc: "Remote Node", load: "0%", status: "Stable" }])} className="text-[10px] text-neon-blue uppercase font-bold hover:underline">Add Node</button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] text-gray-600 uppercase tracking-widest border-b border-white/5">
                  <th className="px-6 py-4">Node ID</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Load</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {nodes.map((node) => (
                  <tr key={node.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-mono text-neon-blue">{node.id}</td>
                    <td className="px-6 py-4 text-gray-400">{node.loc}</td>
                    <td className="px-6 py-4"><div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-neon-purple" style={{ width: node.load }} /></div></td>
                    <td className="px-6 py-4"><span className={cn("px-2 py-0.5 rounded-full text-[8px] font-bold uppercase cursor-pointer", node.status === "Stable" ? "bg-green-500/10 text-green-500" : node.status === "High" ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500")} onClick={() => toggleStatus(node.id)}>{node.status}</span></td>
                    <td className="px-6 py-4 text-right"><button onClick={() => deleteNode(node.id)} className="text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col h-full">
           <h3 className="font-orbitron text-sm font-bold uppercase tracking-widest mb-8">Quick Health</h3>
           <div className="space-y-6">
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500"><span>Core Stability</span><span className="text-neon-blue">98.2%</span></div>
                 <div className="h-1 bg-white/5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "98.2%" }} className="h-full bg-neon-blue" /></div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500"><span>Neural Flux</span><span className="text-white">Active</span></div>
                 <div className="h-12 w-full bg-black/40 rounded border border-white/5 relative overflow-hidden">
                    <motion.div animate={{ x: [-100, 100] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-0 bottom-0 w-20 bg-neon-blue/20 blur-xl" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const UserManagementTab = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="font-orbitron text-xl font-bold uppercase tracking-widest">Pioneer Registry</h3>
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input type="text" placeholder="Search pioneers..." className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-neon-blue outline-none" />
           </div>
           <button className="px-4 py-2 bg-neon-blue text-black font-bold rounded-lg text-sm">Add Pioneer</button>
        </div>
      </div>
      <div className="glass-card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] text-gray-500 uppercase tracking-widest">
              <th className="px-6 py-4">Pioneer ID</th>
              <th className="px-6 py-4">Name / Identity</th>
              <th className="px-6 py-4">Cognitive Tier</th>
              <th className="px-6 py-4">Last Sync</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map(user => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-mono text-neon-blue">{user.id}</td>
                <td className="px-6 py-4">
                  <div className="font-bold">{user.name}</div>
                  <div className="text-[10px] text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold border",
                    user.tier === "Quantum" ? "border-neon-purple text-neon-purple" : "border-gray-600 text-gray-500"
                  )}>{user.tier}</span>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">{user.lastSync}</td>
                <td className="px-6 py-4 text-right text-gray-500"><MoreVertical size={16} className="ml-auto cursor-pointer" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SystemHealthTab = () => (
    <div className="space-y-8">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border-l-2 border-l-green-500">
             <div className="text-[10px] uppercase font-bold text-gray-500 mb-2">Core Temp</div>
             <div className="text-2xl font-orbitron">24.2°C <span className="text-xs text-green-500 uppercase ml-2 tracking-widest">Optimal</span></div>
          </div>
          <div className="glass-card p-6 border-l-2 border-l-neon-blue">
             <div className="text-[10px] uppercase font-bold text-gray-500 mb-2">Neural Bandwidth</div>
             <div className="text-2xl font-orbitron">1.2 PB/s</div>
          </div>
          <div className="glass-card p-6 border-l-2 border-l-neon-purple">
             <div className="text-[10px] uppercase font-bold text-gray-500 mb-2">Power Source</div>
             <div className="text-2xl font-orbitron">Fusion Core 2</div>
          </div>
       </div>
       <div className="glass-card p-8">
          <h4 className="font-orbitron text-sm font-bold uppercase tracking-widest mb-10">Neural Stability Timeline</h4>
          <div className="h-64 w-full flex items-end gap-2">
             {[30, 45, 32, 70, 40, 90, 85, 45, 60, 40, 80, 75, 50, 95, 60, 40, 80, 50].map((h, i) => (
                <motion.div 
                   key={i} 
                   initial={{ height: 0 }} 
                   animate={{ height: `${h}%` }} 
                   transition={{ delay: i * 0.05 }}
                   className={cn(
                     "flex-1 rounded-t-sm",
                     h > 80 ? "bg-neon-blue shadow-[0_0_10px_#00f2ff]" : "bg-neon-purple/40"
                   )}
                />
             ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
             <span>00:00 UTC</span>
             <span>12:00 UTC</span>
             <span>23:59 UTC</span>
          </div>
       </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-8 max-w-4xl">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 space-y-6">
             <div className="flex items-center gap-4 text-neon-blue">
                <ShieldCheck size={32} />
                <h3 className="font-orbitron font-bold">Neural Firewall v9</h3>
             </div>
             <p className="text-sm text-gray-500">Real-time packet inspection for all cognitive data streams active. No threats detected in the last 24 cycles.</p>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                   <div className="flex items-center gap-3">
                      <Lock size={16} className="text-green-500" />
                      <span className="text-xs">Encryption Level</span>
                   </div>
                   <span className="text-[10px] font-bold text-neon-blue">AES-1024 Quantum</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                   <div className="flex items-center gap-3">
                      <Globe size={16} className="text-neon-blue" />
                      <span className="text-xs">Global Nodes Protected</span>
                   </div>
                   <span className="text-[10px] font-bold text-white">12,804 / 12,804</span>
                </div>
             </div>
          </div>
          <div className="glass-card p-8">
             <h3 className="font-orbitron font-bold mb-6">Threat Intelligence</h3>
             <div className="space-y-4">
                {[
                  { msg: "Unauthorized neural ping blocked", time: "2m ago", level: "Low" },
                  { msg: "Brute force attempt (San Francisco)", time: "1h ago", level: "Med" },
                  { msg: "Synaptic spoofing detected", time: "4h ago", level: "Low" },
                ].map((t, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/5">
                     <AlertCircle size={16} className={t.level === "Med" ? "text-yellow-500" : "text-neon-blue"} />
                     <div className="flex-1">
                        <div className="text-xs font-bold">{t.msg}</div>
                        <div className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">{t.time} // {t.level} Severity</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );

  const CommandTab = () => {
    const [history, setHistory] = useState([
      "> NEOSYSTEM BOOT V2035.04.12",
      "> Initializing neural link...",
      "> Ready for commands."
    ]);
    const [cmd, setCmd] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleCmd = (e: React.FormEvent) => {
      e.preventDefault();
      if (!cmd.trim()) return;
      
      let response = `> Unknown command: ${cmd}`;
      if (cmd.toLowerCase() === "help") response = "> Available: help, status, nodes, clear, whoami";
      if (cmd.toLowerCase() === "status") response = "> System: NOMINAL // Load: 64.2% // Nodes: 12,804";
      if (cmd.toLowerCase() === "nodes") response = `> Listing ${nodes.length} active nodes...`;
      if (cmd.toLowerCase() === "whoami") response = "> Root Administrator [ID: 0xAF32]";
      if (cmd.toLowerCase() === "clear") {
        setHistory(["> Terminal cleared."]);
        setCmd("");
        return;
      }

      setHistory([...history, `> ${cmd}`, response]);
      setCmd("");
    };

    useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [history]);

    return (
      <div className="glass-card bg-black/90 h-[500px] flex flex-col font-mono text-green-500 p-6 border border-neon-blue/20">
         <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-hide">
            {history.map((line, i) => <div key={i} className="text-sm">{line}</div>)}
         </div>
         <form onSubmit={handleCmd} className="flex items-center gap-3 border-t border-white/10 pt-4">
            <span className="text-neon-blue font-bold tracking-widest">ROOT@NEOVERSE:~$</span>
            <input 
              autoFocus
              value={cmd}
              onChange={(e) => setCmd(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white text-sm"
              placeholder="..."
            />
         </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-poppins">
      {/* Sidebar */}
      <aside className={cn("bg-black border-r border-white/5 transition-all duration-300 flex flex-col z-50", isSidebarOpen ? "w-64" : "w-20")}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-neon-purple rounded flex items-center justify-center shrink-0"><Zap size={18} className="text-black fill-black" /></div>
          {isSidebarOpen && <span className="font-orbitron font-bold tracking-tighter">NEO_ADMIN</span>}
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          {sidebarLinks.map((link) => (
            <button key={link.id} onClick={() => setActiveTab(link.id)} className={cn("w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group", activeTab === link.id ? "bg-neon-purple text-black font-bold" : "text-gray-500 hover:bg-white/5 hover:text-white")}>
              <link.icon size={20} className={cn(activeTab === link.id ? "text-black" : "group-hover:text-neon-purple")} />
              {isSidebarOpen && <span>{link.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5"><Link href="/" className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-white transition-colors"><ArrowLeft size={20} />{isSidebarOpen && <span className="text-sm">Exit to Public</span>}</Link></div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-white"><Menu size={24} /></button>
            <h2 className="font-orbitron text-lg font-bold uppercase tracking-widest text-gray-400">{activeTab.replace("_", " ")} <span className="text-gray-700 mx-2">//</span> <span className="text-neon-blue text-xs tracking-[0.3em]">Session: 0xAF32</span></h2>
          </div>
          <div className="flex items-center gap-6">
            <Bell size={20} className="text-gray-500 cursor-pointer hover:text-white" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
           <div className="max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                 <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    {activeTab === "dashboard" && <DashboardTab />}
                    {activeTab === "users" && <UserManagementTab />}
                    {activeTab === "system" && <SystemHealthTab />}
                    {activeTab === "security" && <SecurityTab />}
                    {activeTab === "terminal" && <CommandTab />}
                 </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </main>
    </div>
  );
};

export default ManagePage;
