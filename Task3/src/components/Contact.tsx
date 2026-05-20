"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Mail, Globe, Cpu, Layers } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-orbitron text-4xl md:text-5xl font-bold mb-6"
            >
              CONNECT WITH <br />
              <span className="text-neon-blue">NEOVERSE</span>
            </motion.h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Ready to transcend the limits of traditional intelligence? Join our beta program or reach out to our team of architects.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-neon-blue" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Email Us</p>
                  <p className="font-bold">hello@neoverse.ai</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mt-12">
                <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:border-neon-blue hover:text-neon-blue transition-all">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:border-neon-blue hover:text-neon-blue transition-all">
                  <Cpu className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:border-neon-blue hover:text-neon-blue transition-all">
                  <Layers className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-10"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-neon-blue transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-neon-blue transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-neon-blue transition-colors appearance-none">
                  <option className="bg-black">Join Beta Program</option>
                  <option className="bg-black">Partnership Inquiry</option>
                  <option className="bg-black">Technical Support</option>
                  <option className="bg-black">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-neon-blue transition-colors"
                  placeholder="How can we help you evolve?"
                />
              </div>
              <button className="w-full py-4 bg-neon-blue text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all">
                Send Transmission <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
