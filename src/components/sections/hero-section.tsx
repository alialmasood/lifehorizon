"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Laptop, Server, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] sm:min-h-[85vh] flex items-center py-20 sm:py-12">
      {/* الخلفية المتحركة */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px_20px]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"
        />
        {/* الأشكال الهندسية المتحركة */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-20 left-[5%] sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute bottom-20 right-[5%] sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-secondary/5 rounded-full blur-3xl"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* العنوان الرئيسي */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 px-4 sm:px-0"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              <span className="text-primary block sm:inline">أفق الحياة</span>{" "}
              <span className="block sm:inline">شريكك في{" "}</span>
              <span className="relative inline-block mt-2 sm:mt-0">
                التحول الرقمي
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 sm:h-2 bg-primary/20 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </span>
              <span className="inline-block"></span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-6">
              نقدم حلولاً تقنية متكاملة لتمكين أعمالك وتحقيق النجاح في العالم الرقمي
            </p>
          </motion.div>

          {/* الأزرار */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 px-4"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all group"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              خدماتنا
              <motion.span
                className="inline-block mr-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
              </motion.span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl transition-all"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              تواصل معنا
            </Button>
          </motion.div>

          {/* الأيقونات التقنية */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto px-4"
          >
            {[
              { icon: Code2, text: "تطوير المواقع" },
              { icon: Laptop, text: "تطوير التطبيقات" },
              { icon: Server, text: "حلول تقنية متكاملة" },
              { icon: Zap, text: "خدمات احترافية" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all group"
              >
                <span className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="w-5 sm:w-6 h-5 sm:h-6" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-primary transition-colors text-center">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 