"use client";

import { Laptop, Code2, School, Settings, CheckCircle2 } from "lucide-react";
import { ContactButton } from "@/components/ui/contact-button";

const services = [
  {
    icon: Settings,
    title: "الخدمات التقنية",
    emoji: "🔹",
    description: "حلول تقنية متطورة تهدف إلى تعزيز كفاءة الأعمال من خلال أحدث التقنيات الرقمية.",
    features: [
      "استشارات تقنية متخصصة",
      "حلول البنية التحتية التقنية",
      "تحسين الأداء الرقمي"
    ]
  },
  {
    icon: School,
    title: "الدورات التدريبية",
    emoji: "🏆",
    description: "دورات تدريبية متقدمة في مختلف مجالات تكنولوجيا المعلومات والتطوير المهني.",
    features: [
      "برامج تدريبية احترافية للشركات والمؤسسات",
      "دورات متخصصة في البرمجة والتكنولوجيا",
      "ورش عمل عملية لتعزيز المهارات"
    ]
  },
  {
    icon: Code2,
    title: "الحلول البرمجية",
    emoji: "⚙️",
    description: "حلول برمجية متكاملة مصممة خصيصًا لرفع كفاءة المؤسسات وتحسين الإنتاجية.",
    features: [
      "تطوير أنظمة إدارة الأعمال",
      "حلول برمجية مخصصة للشركات",
      "تحسين العمليات الرقمية والتشغيلية"
    ]
  },
  {
    icon: Laptop,
    title: "تطوير المواقع والتطبيقات",
    emoji: "🌐",
    description: "تصميم وتطوير مواقع إلكترونية وتطبيقات احترافية تلبي احتياجات عملك بأحدث التقنيات.",
    features: [
      "تصميم مواقع ويب عصرية ومتجاوبة",
      "تطوير تطبيقات موبايل متقدمة",
      "تحسين تجربة المستخدم (UX/UI)"
    ]
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* العنوان والوصف */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">خدماتنا</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            نقدم مجموعة متكاملة من الخدمات التقنية والحلول البرمجية المتطورة التي تساعد الأفراد والشركات على تحقيق التحول الرقمي بكفاءة واحترافية. نحن نحرص على تقديم حلول مبتكرة تلبي احتياجات عملائنا وفقًا لأعلى المعايير.
          </p>
        </div>

        {/* بطاقات الخدمات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* رأس البطاقة */}
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="text-2xl ml-2">{service.emoji}</span>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
              </div>

              {/* وصف الخدمة */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground"> </span>
                  {service.description}
                </p>
              </div>

              {/* قائمة المميزات */}
              <div>
                <p className="font-semibold mb-3">✅ ما نقدمه:</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* دعوة للتواصل */}
        <div className="text-center max-w-2xl mx-auto space-y-6 bg-primary/5 p-8 rounded-2xl">
          <p className="text-xl font-semibold">
             مع شركة أفق الحياة، احصل على الحلول التقنية التي تدفع عملك نحو النجاح!
          </p>
          <p className="text-muted-foreground">
             تواصل معنا اليوم لمعرفة المزيد عن خدماتنا وكيف يمكننا مساعدتك.
          </p>
          <ContactButton />
        </div>
      </div>
    </section>
  );
} 