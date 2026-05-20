import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TechGuide from "@/components/TechGuide";
import Timeline from "@/components/Timeline";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import ChatbotPopup from "@/components/ChatbotPopup";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      
      {/* Metrics Section */}
      <section className="py-20 relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCounter value={2.4} suffix="B+" label="Neural Connections" />
            <AnimatedCounter value={99.9} suffix="%" label="Sync Accuracy" />
            <AnimatedCounter value={142} suffix="ms" label="Response Latency" />
            <AnimatedCounter value={500} suffix="K+" label="Beta Pioneers" />
          </div>
        </div>
      </section>

      <About />
      <Services />
      <TechGuide />
      
      {/* Bonus Feature: Neural Link Visualization Section */}
      <section className="py-24 overflow-hidden bg-black relative">
        <div className="absolute inset-0 bg-neon-blue/5 opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative">
           <div className="glass-card p-1 text-center">
              <div className="bg-black/80 rounded-2xl p-12 border border-white/5">
                <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-8">
                  NEURAL LINK <span className="text-neon-blue">STATUS</span>
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                   <div className="w-64 h-64 rounded-full border-4 border-neon-blue/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-t-4 border-neon-blue animate-spin" />
                      <div className="absolute inset-4 rounded-full border-b-4 border-neon-purple animate-pulse" />
                      <div className="text-center">
                        <div className="font-orbitron text-4xl font-black text-white">88%</div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-500">Integration</div>
                      </div>
                   </div>
                   <div className="text-left space-y-4 max-w-md">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                        <span className="text-sm font-mono text-gray-400">Core Matrix: OPTIMIZED</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                        <span className="text-sm font-mono text-gray-400">Data Stream: ENCRYPTED</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                        <span className="text-sm font-mono text-gray-400">Synaptic Bridge: CALIBRATING...</span>
                      </div>
                      <div className="mt-8">
                        <p className="text-gray-500 text-sm italic">
                          &quot;Directing the flow of information through quantum-stabilized neural clusters for maximum cognitive throughput.&quot;
                        </p>
                      </div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </section>

      <Timeline />
      <Testimonials />
      <Contact />
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="font-orbitron text-xl font-bold mb-4">
            NEOVERSE <span className="text-neon-blue">AI</span>
          </div>
          <p className="text-gray-500 text-sm mb-8">
            &copy; 2035 Neoverse Systems Inc. All rights reserved. 
            <br />Built for the next era of human intelligence.
          </p>
          <div className="flex justify-center gap-6 text-xs uppercase tracking-[0.3em] text-gray-600">
            <a href="#" className="hover:text-neon-blue transition-colors">Privacy</a>
            <a href="#" className="hover:text-neon-blue transition-colors">Terms</a>
            <a href="#" className="hover:text-neon-blue transition-colors">Safety</a>
          </div>
        </div>
      </footer>

      <ChatbotPopup />
    </main>
  );
}
