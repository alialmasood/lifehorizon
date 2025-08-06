"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  company: [
    { name: "من نحن", href: "/about", icon: "building" },
    { name: "تواصل معنا", href: "/contact", icon: "phone" },
    { name: "الوظائف", href: "/careers", icon: "briefcase" },
    { name: "الشروط والأحكام", href: "/terms", icon: "file" },
  ],
  services: [
    { name: "تطوير المواقع", href: "/services/web-development", icon: "code" },
    { name: "تطوير التطبيقات", href: "/services/app-development", icon: "smartphone" },
    { name: "التسويق الرقمي", href: "/services/digital-marketing", icon: "trending-up" },
    { name: "الاستشارات التقنية", href: "/services/consulting", icon: "users" },
  ],
  courses: [
    { name: "تطوير الويب", href: "/courses/web-development", icon: "monitor" },
    { name: "تطبيقات الموبايل", href: "/courses/mobile-apps", icon: "smartphone" },
    { name: "البرمجة للمبتدئين", href: "/courses/programming-basics", icon: "code" },
    { name: "جميع الدورات", href: "/courses", icon: "book-open" },
  ],
  social: [
    { name: "تويتر", href: "#", icon: "twitter" },
    { name: "فيسبوك", href: "#", icon: "facebook" },
    { name: "انستغرام", href: "#", icon: "instagram" },
    { name: "لينكد إن", href: "#", icon: "linkedin" },
  ],
  contact: [
    { 
      icon: <Mail className="w-5 h-5" />,
      text: "info@lifehorizon.com",
      href: "mailto:info@lifehorizon.com"
    },
    { 
      icon: <Phone className="w-5 h-5" />,
      text: "+964 770 562 5811",
      href: "tel:+9647705625811"
    },
    { 
      icon: <MapPin className="w-5 h-5" />,
      text: "العراق - البصرة",
      href: "https://maps.google.com"
    },
  ]
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* القسم الأول: الشعار والوصف */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Image src="/images/logo.png" alt="Life Horizon Logo" width={48} height={48} className="brightness-0 invert" />
              <span className="text-2xl font-bold text-white">Life Horizon</span>
            </Link>
            <p className="mt-4 text-base text-gray-400 max-w-xs">
              نساعدك في تحويل أفكارك إلى واقع رقمي متكامل مع خبرتنا وابتكارنا
            </p>

            {/* نموذج الاشتراك */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">
                اشترك في نشرتنا البريدية
              </h4>
              <div className="flex gap-2 max-w-md">
                <Input 
                  type="email" 
                  placeholder="البريد الإلكتروني" 
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4 ml-2" />
                  اشترك
                </Button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                اشترك الآن للحصول على آخر الأخبار والعروض الحصرية
              </p>
            </div>
          </motion.div>

          {/* القسم الثاني: الروابط */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-6"
          >
            {/* الشركة */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center ml-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                الشركة
              </h3>
              <ul className="space-y-4">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-primary transition duration-300 flex items-center"
                    >
                      <span className="w-5 h-5 rounded flex items-center justify-center ml-2">
                        <FooterIcon name={item.icon} />
                      </span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* الخدمات */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center ml-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                الخدمات
              </h3>
              <ul className="space-y-4">
                {footerLinks.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-primary transition duration-300 flex items-center"
                    >
                      <span className="w-5 h-5 rounded flex items-center justify-center ml-2">
                        <FooterIcon name={item.icon} />
                      </span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* الدورات */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center ml-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                الدورات
              </h3>
              <ul className="space-y-4">
                {footerLinks.courses.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-primary transition duration-300 flex items-center"
                    >
                      <span className="w-5 h-5 rounded flex items-center justify-center ml-2">
                        <FooterIcon name={item.icon} />
                      </span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* القسم الثالث: معلومات الاتصال */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center ml-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              تواصل معنا
            </h3>
            <ul className="space-y-4">
              {footerLinks.contact.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary transition duration-300 flex items-center"
                  >
                    <span className="w-5 h-5 rounded flex items-center justify-center ml-2 text-primary">
                      {item.icon}
                    </span>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>

            {/* وسائل التواصل الاجتماعي */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">
                تابعنا على وسائل التواصل الاجتماعي
              </h4>
              <div className="flex gap-4">
                {footerLinks.social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-primary/20 flex items-center justify-center text-gray-400 hover:text-primary transition duration-300"
                  >
                    <span className="sr-only">{item.name}</span>
                    <SocialIcon name={item.icon} />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* حقوق النشر */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <p className="text-base text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Life Horizon. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "facebook":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      );
    case "twitter":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      );
    case "instagram":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
}

function FooterIcon({ name }: { name: string }) {
  switch (name) {
    case "building":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case "phone":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "file":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "code":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "smartphone":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case "trending-up":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    case "users":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case "monitor":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "book-open":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    default:
      return null;
  }
} 