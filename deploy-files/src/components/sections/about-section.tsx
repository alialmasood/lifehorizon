"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { ContactButton } from "@/components/ui/contact-button";

const values = [
  { title: "الابتكار", description: "نؤمن بأهمية التفكير الإبداعي في تقديم الحلول التقنية" },
  { title: "الجودة", description: "نحرص على تقديم خدمات بأعلى المعايير لضمان رضا العملاء" },
  { title: "الشفافية", description: "نلتزم بالمصداقية والوضوح في جميع تعاملاتنا" },
  { title: "التطوير المستمر", description: "نعمل على تحسين خدماتنا باستمرار لمواكبة التطورات التكنولوجية" },
  { title: "رضا العملاء", description: "نجاح عملائنا هو أساس نجاحنا" },
];

const advantages = [
  "خبرة واسعة في مجال التكنولوجيا والخدمات الرقمية",
  "فريق محترف يضم نخبة من الخبراء والاستشاريين",
  "حلول مخصصة تلبي احتياجات الشركات والأفراد",
  "دعم فني متواصل لضمان استمرارية الأعمال بكفاءة",
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function AboutSection() {
  return (
    <>
      {/* قسم من نحن */}
      <section id="about" className="py-20 bg-white dark:bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">من نحن</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                شركة أفق الحياة هي شركة متخصصة في تكنولوجيا المعلومات، الخدمات العامة، والتدريب والتطوير، نسعى إلى تمكين الأفراد والشركات من خلال تقديم حلول تقنية متكاملة وخدمات احترافية تواكب أحدث التطورات في العالم الرقمي. نعمل بشغف وإبداع لتلبية احتياجات عملائنا وتحقيق تطلعاتهم نحو التحول الرقمي والنمو المستدام.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <motion.div 
                variants={fadeInUp}
                whileInView="animate"
                initial="initial"
                viewport={{ once: true }}
                className="bg-muted/50 p-6 rounded-lg hover:bg-muted/70 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-3 text-primary">رؤيتنا</h3>
                <p className="text-muted-foreground">
                  أن نكون الشريك الأول لعملائنا في التحول الرقمي وتطوير الأعمال، من خلال توفير تقنيات مبتكرة وخدمات موثوقة تساعد على تحقيق النجاح والتفوق في مختلف القطاعات.
                </p>
              </motion.div>
              <motion.div 
                variants={fadeInUp}
                whileInView="animate"
                initial="initial"
                viewport={{ once: true }}
                className="bg-muted/50 p-6 rounded-lg hover:bg-muted/70 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-3 text-primary">رسالتنا</h3>
                <p className="text-muted-foreground">
                  تقديم حلول تقنية مبتكرة وخدمات متكاملة تساهم في تمكين الأفراد والشركات، وتعزز من كفاءة الأعمال عبر استخدام أحدث التقنيات وأفضل الممارسات.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* قيمنا */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4">قيمنا</h3>
                <div className="grid gap-4">
                  {values.map((value, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-3 items-start hover:bg-muted/30 p-2 rounded-lg transition-colors"
                    >
                      <div className="mt-1 bg-primary/10 p-1 rounded-full">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="font-semibold">{value.title}: </span>
                        <span className="text-muted-foreground">{value.description}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* لماذا نحن */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4">لماذا نحن؟</h3>
                <div className="grid gap-4">
                  {advantages.map((advantage, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-3 items-center bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-primary">🔹</div>
                      <span className="text-muted-foreground">{advantage}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* دعوة للتواصل */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-primary/5 p-8 rounded-lg space-y-4 mt-12 text-center"
            >
              <p className="text-lg font-semibold"> نحن هنا لنساعدك على تحقيق أهدافك الرقمية!</p>
              <p className="text-muted-foreground">
                تواصل معنا اليوم لاكتشاف كيف يمكننا دعم أعمالك وتقديم الحلول المناسبة لك.
              </p>
              <ContactButton />
            </motion.div>
          </div>
        </div>
      </section>

      {/* قسم الصورة التحفيزية */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden group">
        {/* الصورة */}
        <Image
          src="/images/tech-banner.jpg"
          alt="التكنولوجيا والابتكار"
          fill
          className="object-cover transform scale-105 transition-transform duration-[30000ms] group-hover:scale-110"
          priority
        />
        
        {/* طبقة التدرج */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/70 to-transparent" />
        
        {/* طبقة الزخارف */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10 tech-grid" />
          <div className="absolute inset-0 tech-circles" />
        </div>

        {/* المحتوى */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10"
            >
              <h2 className="text-3xl md:text-5xl font-bold max-w-4xl mx-auto leading-tight">
                نبتكر
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500 mx-3">
                  حلولاً رقمية
                </span>
                تصنع المستقبل
              </h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
                مع أفق الحياة، التحول الرقمي ليس مجرد هدف، بل رحلة نخوضها معاً نحو النجاح
              </p>

              {/* أيقونات تفاعلية */}
              <div className="flex flex-wrap justify-center gap-8 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="font-medium">تقنيات متطورة</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="font-medium">حلول مبتكرة</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="font-medium">نتائج متميزة</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* تأثير الضوء المتحرك */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full tech-glow opacity-30" />
        </div>
      </section>
    </>
  );
} 