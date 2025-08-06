"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface Registration {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  course: string;
  education: string;
  currentJob: string;
  timePreference: string;
  province: string;
  notes: string;
  status: string;
  submittedAt: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const registrationsRef = collection(db, "person");
        const q = query(registrationsRef, orderBy("submittedAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Registration[];
        
        setRegistrations(data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRegistrations();
  }, []);

  const handleExportToExcel = () => {
    // تحويل البيانات إلى تنسيق CSV
    const headers = [
      "الاسم الكامل",
      "رقم الهاتف",
      "البريد الإلكتروني",
      "الدورة",
      "التحصيل الدراسي",
      "العمل الحالي",
      "الوقت المفضل",
      "المحافظة",
      "الملاحظات",
      "الحالة",
      "تاريخ التسجيل"
    ].join(",");

    const rows = registrations.map(reg => [
      reg.fullName,
      reg.phone,
      reg.email,
      reg.course,
      reg.education,
      reg.currentJob,
      reg.timePreference,
      reg.province,
      reg.notes?.replace(/,/g, ";"),
      reg.status,
      new Date(reg.submittedAt).toLocaleString("ar-IQ")
    ].join(","));

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `registrations-${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">طلبات التسجيل</h1>
          <button
            onClick={handleExportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            تصدير إلى Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-right">الاسم الكامل</th>
                <th className="px-4 py-3 text-right">رقم الهاتف</th>
                <th className="px-4 py-3 text-right">البريد الإلكتروني</th>
                <th className="px-4 py-3 text-right">الدورة</th>
                <th className="px-4 py-3 text-right">التحصيل الدراسي</th>
                <th className="px-4 py-3 text-right">العمل الحالي</th>
                <th className="px-4 py-3 text-right">الوقت المفضل</th>
                <th className="px-4 py-3 text-right">المحافظة</th>
                <th className="px-4 py-3 text-right">الحالة</th>
                <th className="px-4 py-3 text-right">تاريخ التسجيل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{reg.fullName}</td>
                  <td className="px-4 py-3 font-mono">{reg.phone}</td>
                  <td className="px-4 py-3">{reg.email}</td>
                  <td className="px-4 py-3">{reg.course}</td>
                  <td className="px-4 py-3">{reg.education}</td>
                  <td className="px-4 py-3">{reg.currentJob}</td>
                  <td className="px-4 py-3">{reg.timePreference}</td>
                  <td className="px-4 py-3">{reg.province}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      reg.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      reg.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {reg.status === 'pending' ? 'قيد المراجعة' :
                       reg.status === 'approved' ? 'مقبول' : 'مرفوض'}
                    </span>
                  </td>
                  <td className="px-4 py-3">{new Date(reg.submittedAt).toLocaleString("ar-IQ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 