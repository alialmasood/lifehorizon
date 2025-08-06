"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, AlertTriangle, Mail, Bug } from "lucide-react";
import Link from "next/link";

function PaymentErrorContent() {
  const searchParams = useSearchParams();
  
  // جمع معلومات الخطأ من URL
  const errorCode = searchParams.get('error_code');
  const errorMessage = searchParams.get('error_message');
  const transactionId = searchParams.get('transaction_id');
  const amount = searchParams.get('amount');
  const currency = searchParams.get('currency');
  const uuid = searchParams.get('uuid');
  const purchaseId = searchParams.get('purchase_id');
  const success = searchParams.get('success');
  const status = searchParams.get('status');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <div className="mb-6">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-400 mb-2">خطأ في الدفع</h1>
            <p className="text-gray-300">
              حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى أو التواصل معنا للمساعدة.
            </p>
          </div>

          {/* تفاصيل الخطأ */}
          {(errorCode || errorMessage || transactionId || uuid || purchaseId) && (
            <div className="bg-gray-700 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-semibold text-yellow-400 mb-2">تفاصيل الخطأ:</h3>
              <div className="space-y-1 text-xs text-gray-300">
                {errorCode && <p><strong>رمز الخطأ:</strong> {errorCode}</p>}
                {errorMessage && <p><strong>رسالة الخطأ:</strong> {errorMessage}</p>}
                {transactionId && <p><strong>رقم المعاملة:</strong> {transactionId}</p>}
                {uuid && <p><strong>UUID:</strong> {uuid}</p>}
                {purchaseId && <p><strong>رقم الشراء:</strong> {purchaseId}</p>}
                {amount && currency && (
                  <p><strong>المبلغ:</strong> {amount} {currency}</p>
                )}
                {success && <p><strong>النجاح:</strong> {success}</p>}
                {status && <p><strong>الحالة:</strong> {status}</p>}
              </div>
            </div>
          )}

          {/* أزرار الإجراءات */}
          <div className="space-y-3">
            <Link
              href="/services/game-store"
              className="flex items-center justify-center w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة إلى متجر الألعاب
            </Link>
            
            <Link
              href="/"
              className="flex items-center justify-center w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              العودة إلى الصفحة الرئيسية
            </Link>

            <Link
              href="/admin/games/diagnosis"
              className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Bug className="w-4 h-4 mr-2" />
              صفحة التشخيص
            </Link>
          </div>

          {/* معلومات التواصل */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-2">
              إذا استمرت المشكلة، يرجى التواصل معنا على:
            </p>
            <div className="flex items-center justify-center text-blue-400">
              <Mail className="w-4 h-4 mr-2" />
              <a 
                href="mailto:support@lifehorizon.com"
                className="hover:text-blue-300 transition-colors"
              >
                support@lifehorizon.com
              </a>
            </div>
          </div>

          {/* معلومات إضافية للتشخيص */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500 mb-2">
              للمساعدة في التشخيص، يرجى مشاركة:
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>• وقت حدوث الخطأ</p>
              <p>• اسم اللعبة المطلوبة</p>
              <p>• البيانات المستخدمة في الدفع</p>
              <p>• أي رسائل خطأ إضافية</p>
              <p>• معلومات Console (F12)</p>
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500 mb-2">
              صفحات التشخيص المتاحة:
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>• /admin/games/diagnosis</p>
              <p>• /admin/games/test-diagnosis</p>
              <p>• /admin/games/working-test</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="mb-6">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-red-400 mb-2">جاري التحميل...</h1>
            </div>
          </div>
        </div>
      </div>
    }>
      <PaymentErrorContent />
    </Suspense>
  );
} 