"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const courses = [
  {
    title: "تطوير تطبيقات الويب",
    description: "تعلم أحدث تقنيات تطوير الويب مع React و Next.js",
    duration: "3 أشهر",
    level: "متوسط",
    image: "/images/tech-vision.jpg",
  },
  {
    title: "برمجة تطبيقات الموبايل",
    description: "تطوير تطبيقات الهواتف الذكية باستخدام React Native",
    duration: "4 أشهر",
    level: "متقدم",
    image: "/images/tech-banner.jpg",
  },
  {
    title: "أساسيات البرمجة",
    description: "مقدمة شاملة في عالم البرمجة للمبتدئين",
    duration: "2 أشهر",
    level: "مبتدئ",
    image: "/images/about.jpg",
  },
];

export function CoursesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="courses">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            الدورات التدريبية
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            انضم إلى دوراتنا التدريبية المتخصصة وابدأ رحلتك في عالم التكنولوجيا
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden group">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    المدة: {course.duration}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    المستوى: {course.level}
                  </span>
                </div>
                <Link
                  href={`/courses/${index + 1}`}
                  className="block w-full text-center bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition duration-300"
                >
                  تفاصيل الدورة
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/courses"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg border-2 border-primary hover:bg-primary/5 transition duration-300"
          >
            عرض جميع الدورات
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 