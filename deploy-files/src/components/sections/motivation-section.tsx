"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  width: number;
  height: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function MotivationSection() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      width: Math.random() * 10 + 5,
      height: Math.random() * 10 + 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 10 + 10}s`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* الصورة الخلفية */}
      <Image
        src="/images/tech-vision.jpg"
        alt="رؤية تقنية مستقبلية"
        fill
        className="object-cover transform scale-105 transition-transform duration-[30000ms] hover:scale-110"
        priority
      />

      {/* طبقة التدرج */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-primary/70" />

      {/* طبقة الزخارف */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10 tech-grid" />
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-primary/20 animate-float"
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>
      </div>

      {/* المحتوى */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl mx-auto space-y-8 text-white text-center"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              نحول أفكارك إلى
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500 mx-3">
                واقع رقمي
              </span>
              متكامل
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              مع خبرتنا وابتكارنا، نصنع مستقبلاً رقمياً يتجاوز التوقعات ونحقق رؤيتك بأعلى معايير الجودة
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-8 items-center text-lg"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="font-medium">ابتكار</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="font-medium">تطور</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="font-medium">نجاح</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* تأثير الضوء المتحرك */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full tech-glow opacity-30" />
      </div>
    </section>
  );
} 