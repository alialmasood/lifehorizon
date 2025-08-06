"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // هنا يمكن إضافة منطق إرسال النموذج
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* خلفية الشبكة */}
      <div className="absolute inset-0 bg-grid-gray-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
             هل لديك استفسار أو مشروع؟
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نحن هنا لمساعدتك في تحويل أفكارك إلى واقع رقمي. تواصل معنا الآن، وسنتواصل معك في أقرب وقت!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* نموذج التواصل */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              أرسل لنا رسالة
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  placeholder="الاسم الكامل"
                  required
                  className="bg-gray-50/50"
                />
                <Input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  required
                  className="bg-gray-50/50"
                />
                <Input
                  type="tel"
                  placeholder="رقم الهاتف (اختياري)"
                  className="bg-gray-50/50"
                />
                <Textarea
                  placeholder="رسالتك"
                  required
                  className="min-h-[120px] bg-gray-50/50"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "جاري الإرسال..."
                ) : (
                  <>
                    إرسال الطلب
                    <Send className="w-4 h-4 mr-2" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* معلومات التواصل */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* الخريطة */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.5331337511164!2d47.78912621511576!3d30.508982981714675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fc4c7c0833c3c89%3A0x5e1c75e4f73d5a7e!2sBasra%2C%20Iraq!5e0!3m2!1sen!2s!4v1645789112345!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open("https://maps.google.com", "_blank")}
            >
              احصل على الاتجاهات
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>

            {/* بطاقات معلومات التواصل */}
            <div className="grid gap-6">
              <motion.a
                href="mailto:info@lifehorizon.com"
                whileHover={{ scale: 1.02 }}
                className="flex items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </span>
                <div className="mr-4">
                  <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                  <p className="text-lg font-medium text-gray-900">info@lifehorizon.com</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+9647705625811"
                whileHover={{ scale: 1.02 }}
                className="flex items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </span>
                <div className="mr-4">
                  <p className="text-sm text-gray-500">رقم الهاتف</p>
                  <p className="text-lg font-medium text-gray-900">+964 770 562 5811</p>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </span>
                <div className="mr-4">
                  <p className="text-sm text-gray-500">العنوان</p>
                  <p className="text-lg font-medium text-gray-900">العراق - البصرة</p>
                </div>
              </motion.div>
            </div>

            {/* وسائل التواصل الاجتماعي */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-lg font-medium text-gray-900 mb-4">
                تواصل معنا عبر منصاتنا
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: "#", label: "فيسبوك" },
                  { icon: Twitter, href: "#", label: "تويتر" },
                  { icon: Instagram, href: "#", label: "انستغرام" },
                  { icon: Linkedin, href: "#", label: "لينكد إن" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{social.label}</span>
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 