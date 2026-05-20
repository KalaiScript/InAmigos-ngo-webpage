"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Greetings, traveler. I am NV-1, your guide to Neoverse. How may I assist your evolution today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages or typing status changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInputValue("");
    setIsTyping(true);

    // Simulated Bot logic
    setTimeout(() => {
      let botResponse = "Processing your request through the neural cluster... Transmission received. How else can I help?";
      
      const lowerMsg = userMessage.toLowerCase();
      if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
        botResponse = "Hello, Pioneer. The Neoverse is synchronized and ready for your commands.";
      } else if (lowerMsg.includes("assistant")) {
        botResponse = "The AI Personal Assistant module uses 2035-level precision to learn your habits. You can initialize it in the Services section.";
      } else if (lowerMsg.includes("help")) {
        botResponse = "I can guide you through our core technologies: Assistant, Memory, Education, and Healthcare. What would you like to explore?";
      }

      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 glass-card overflow-hidden shadow-2xl flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-neon-blue/10 border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neon-blue flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-orbitron text-sm font-bold tracking-tight">NV-1 ASSISTANT</h4>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Neural Link Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user" 
                    ? "bg-neon-blue text-black rounded-tr-none shadow-[0_0_15px_rgba(0,242,255,0.2)]" 
                    : "bg-white/5 border border-white/10 text-gray-300 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-neon-blue" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Processing...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/40">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isTyping ? "NV-1 is thinking..." : "Ask Neoverse..."}
                  disabled={isTyping}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-neon-blue transition-colors disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-11 h-11 rounded-lg bg-neon-blue flex items-center justify-center text-black shrink-0 hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-neon-blue text-black shadow-[0_0_20px_rgba(0,242,255,0.4)] flex items-center justify-center relative group"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-bold text-white">
            1
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatbotPopup;
