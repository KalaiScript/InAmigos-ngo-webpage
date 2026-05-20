"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const AnimatedCounter = ({ value, suffix = "", prefix = "", label }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  });

  const display = useTransform(spring, (current) => 
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <div ref={ref} className="text-center p-6 glass-card">
      <div className="font-orbitron text-4xl font-black text-neon-blue mb-2 flex items-center justify-center">
        {prefix}
        <motion.span>{display}</motion.span>
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">
        {label}
      </div>
    </div>
  );
};

export default AnimatedCounter;
