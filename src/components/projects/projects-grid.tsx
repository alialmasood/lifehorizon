"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "نظام إدارة المدارس",
    description: "نظام متكامل لإدارة المدارس والمؤسسات التعليمية يوفر حلولاً شاملة لجميع العمليات الإدارية والتعليمية",
    category: "enterprise",
    image: "/images/projects/school-management.jpg",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
    features: [
      "واجهة مستخدم سهلة وبسيطة",
      "تقارير تفصيلية وإحصائيات",
      "نظام صلاحيات متقدم",
      "دعم الوصول عبر الأجهزة المحمولة",
    ],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "تطبيق التوصيل",
    description: "تطبيق موبايل لخدمات التوصيل والشحن",
    category: "mobile",
    image: "/images/projects/delivery-app.jpg",
    technologies: ["React Native", "Firebase", "Node.js"],
    features: [
      "تتبع الطلبات في الوقت الحقيقي",
      "نظام دفع آمن",
      "تقييم الخدمة",
      "إشعارات فورية",
    ],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "منصة التعليم الإلكتروني",
    description: "منصة تعليمية متكاملة للتعلم عن بعد",
    category: "web",
    image: "/images/projects/e-learning.jpg",
    technologies: ["Next.js", "Django", "AWS"],
    features: [
      "دروس تفاعلية",
      "اختبارات إلكترونية",
      "شهادات معتمدة",
      "منتدى للنقاش",
    ],
    demoUrl: "#",
    githubUrl: "#",
  },
  // يمكنك إضافة المزيد من المشاريع هنا
];

export function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* صورة المشروع */}
          <div className="relative h-48">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* تفاصيل المشروع */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>

            {/* المميزات */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                المميزات الرئيسية:
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* التقنيات المستخدمة */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* روابط المشروع */}
            <div className="flex gap-4">
              <Link
                href={project.demoUrl}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                <span>معاينة</span>
              </Link>
              <Link
                href={project.githubUrl}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:underline"
              >
                <Github className="w-4 h-4" />
                <span>المصدر</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 