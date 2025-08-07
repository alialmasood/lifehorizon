"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const courses = [
  "دورة اللغة الانكليزية",
  "دورة c++",
  "التحليلات",
  "انشاء وتصميم المواقع الإلكترونية (front end - Wix)",
  "اساسيات استخدام الذكاء الاصطناعي (LLMs) - الاستخدام الشخصي",
  "اساسيات استعمال ادوات الذكاء الاصطناعي في العمل والنشاط التجاري",
  "استعمال ادوات الذكاء الاصطناعي لانشاء الصور والتصاميم ( AI Image generator usage)",
  "احتراف اعلانات فيسبوك",
  "دورة ادارة الاعمال",
  "دورة plc",
  "دورة برمجة التطبيقات",
  "project planing",
  "QC",
  "السلامة المهنية",
  "الامن السيبراني",
];

const educationLevels = [
  "ابتدائية",
  "متوسطة",
  "إعدادية",
  "دبلوم",
  "بكالوريوس",
  "ماجستير",
  "دكتوراه",
];

const timePreferences = ["صباحي", "مسائي", "كلاهما"];

const provinces = [
  "بغداد",
  "البصرة",
  "نينوى",
  "أربيل",
  "النجف",
  "كربلاء",
  "كركوك",
  "الأنبار",
  "ديالى",
  "واسط",
  "ذي قار",
  "ميسان",
  "المثنى",
  "صلاح الدين",
  "بابل",
  "القادسية",
  "دهوك",
  "السليمانية",
];

const API_URL = 'https://www.lifehorizonit.com';

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    course: "",
    education: "",
    currentJob: "",
    timePreference: "",
    province: "",
    notes: "",
  });

  const validateForm = () => {
    // التحقق من أن جميع الحقول المطلوبة مملوءة
    if (!formData.fullName || !formData.phone || !formData.email || !formData.course || 
        !formData.education || !formData.currentJob || !formData.timePreference || !formData.province) {
      toast.error("جميع الحقول مطلوبة باستثناء الملاحظات");
      return false;
    }

    // التحقق من رقم الهاتف العراقي
    const phoneRegex = /^07[3-9][0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("يرجى إدخال رقم هاتف عراقي صحيح");
      return false;
    }

    // التحقق من البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("يرجى إدخال بريد إلكتروني صحيح");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("بدء عملية حفظ البيانات...");
      
      // إنشاء مستند جديد في مجموعة person
      const personRef = collection(db, "person");
      
      // تجهيز البيانات للإرسال
      const personData = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        course: formData.course,
        education: formData.education,
        currentJob: formData.currentJob.trim(),
        timePreference: formData.timePreference,
        province: formData.province,
        notes: formData.notes.trim(),
        createdAt: serverTimestamp(),
        status: "pending",
        submittedAt: new Date().toISOString()
      };

      console.log("البيانات التي سيتم حفظها:", personData);

      try {
        // إنشاء مستند جديد في Firestore
        const docRef = await addDoc(personRef, personData);
        console.log("تم حفظ البيانات بنجاح! معرف المستند:", docRef.id);
        
        // إرسال البريد الإلكتروني عبر API
        console.log("محاولة إرسال البريد الإلكتروني...");
        const emailResponse = await fetch(`${API_URL}/api/send-email.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify({
            fullName: personData.fullName,
            email: personData.email,
            phone: personData.phone,
            course: personData.course
          }),
        });

        const emailResult = await emailResponse.json();
        console.log("نتيجة إرسال البريد:", emailResult);

        if (!emailResponse.ok) {
          console.warn('فشل في إرسال البريد الإلكتروني:', emailResult);
          toast.error("تم حفظ التسجيل ولكن فشل إرسال بريد التأكيد");
        } else {
          toast.success("تم إرسال طلب التسجيل بنجاح! سيصلك بريد إلكتروني للتأكيد.");
        }
        
        // إعادة تعيين النموذج
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          course: "",
          education: "",
          currentJob: "",
          timePreference: "",
          province: "",
          notes: "",
        });
      } catch (firebaseError: any) {
        console.error("خطأ Firebase:", {
          code: firebaseError.code,
          message: firebaseError.message,
          details: firebaseError
        });
        
        if (firebaseError.code === 'permission-denied') {
          toast.error("خطأ في الصلاحيات. يرجى التحقق من إعدادات Firebase.");
        } else {
          toast.error("حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى.");
        }
      }
    } catch (error) {
      console.error("خطأ عام:", error);
      toast.error("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      course: "",
      education: "",
      currentJob: "",
      timePreference: "",
      province: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        {/* رأس الصفحة */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            التسجيل في الدورات التدريبية
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            يرجى ملء النموذج التالي للتسجيل في إحدى دوراتنا التدريبية
          </p>
        </div>

        {/* النموذج */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* الاسم الكامل */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              الاسم الكامل <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base text-gray-900"
              placeholder="أدخل اسمك الكامل"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          {/* رقم الهاتف */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              رقم الهاتف <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                required
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base text-gray-900"
                placeholder="07xxxxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <span className="text-sm">🇮🇶</span>
              </div>
            </div>
          </div>

          {/* البريد الإلكتروني */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base text-gray-900"
              placeholder="example@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* التحصيل الدراسي */}
          <div className="space-y-2">
            <label htmlFor="education" className="block text-sm font-medium text-gray-700">
              التحصيل الدراسي <span className="text-red-500">*</span>
            </label>
            <select
              id="education"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base bg-white text-gray-900"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            >
              <option value="">اختر التحصيل الدراسي</option>
              {educationLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* العمل الحالي */}
          <div className="space-y-2">
            <label htmlFor="currentJob" className="block text-sm font-medium text-gray-700">
              العمل الحالي <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="currentJob"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base text-gray-900"
              placeholder="أدخل عملك الحالي"
              value={formData.currentJob}
              onChange={(e) => setFormData({ ...formData, currentJob: e.target.value })}
            />
          </div>

          {/* الدورة */}
          <div className="space-y-2">
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">
              اختر الدورة <span className="text-red-500">*</span>
            </label>
            <select
              id="course"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base bg-white text-gray-900"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            >
              <option value="">اختر دورة</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* المحافظة */}
          <div className="space-y-2">
            <label htmlFor="province" className="block text-sm font-medium text-gray-700">
              المحافظة <span className="text-red-500">*</span>
            </label>
            <select
              id="province"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base bg-white text-gray-900"
              value={formData.province}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
            >
              <option value="">اختر المحافظة</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          {/* الوقت المفضل */}
          <div className="space-y-2">
            <label htmlFor="timePreference" className="block text-sm font-medium text-gray-700">
              الوقت المفضل للدورة <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {timePreferences.map((time) => (
                <label
                  key={time}
                  className={`flex items-center justify-center px-4 py-3 border rounded-xl cursor-pointer transition duration-200 ${
                    formData.timePreference === time
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="timePreference"
                    value={time}
                    checked={formData.timePreference === time}
                    onChange={(e) => setFormData({ ...formData, timePreference: e.target.value })}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{time}</span>
                </label>
              ))}
            </div>
          </div>

          {/* الملاحظات */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              ملاحظات إضافية
            </label>
            <textarea
              id="notes"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base min-h-[100px] text-gray-900"
              placeholder="أي ملاحظات أو استفسارات إضافية"
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          {/* أزرار التحكم */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-base justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <span className="ml-2">جاري التسجيل...</span>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                </>
              ) : (
                "تسجيل"
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200 text-base"
            >
              إعادة تعيين
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 