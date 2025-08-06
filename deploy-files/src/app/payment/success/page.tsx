"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle, Download, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  
  // جمع معلومات الدفع من URL
  const transactionId = searchParams.get('transaction_id');
  const amount = searchParams.get('amount');
  const currency = searchParams.get('currency');
  const gameTitle = searchParams.get('game_title');
  const purchaseId = searchParams.get('purchase_id');
  const uuid = searchParams.get('uuid');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-400 mb-2">تم الدفع بنجاح!</h1>
            <p className="text-gray-300">
              شكراً لك! تم إتمام عملية الدفع بنجاح. يمكنك الآن تحميل اللعبة.
            </p>
          </div>

          {/* تفاصيل الدفع */}
          {(transactionId || amount || gameTitle) && (
            <div className="bg-gray-700 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-semibold text-green-400 mb-2">تفاصيل الدفع:</h3>
              <div className="space-y-1 text-xs text-gray-300">
                {gameTitle && <p><strong>اللعبة:</strong> {gameTitle}</p>}
                {amount && currency && (
                  <p><strong>المبلغ المدفوع:</strong> {amount} {currency}</p>
                )}
                {transactionId && <p><strong>رقم المعاملة:</strong> {transactionId}</p>}
                {purchaseId && <p><strong>رقم الشراء:</strong> {purchaseId}</p>}
                {uuid && <p><strong>UUID:</strong> {uuid}</p>}
              </div>
            </div>
          )}

          {/* أزرار الإجراءات */}
          <div className="space-y-3">
            <button
              onClick={() => {
                // هنا يمكن إضافة منطق التحميل الفعلي
                alert('سيتم إرسال رابط التحميل إلى بريدك الإلكتروني قريباً');
              }}
              className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              تحميل اللعبة
            </button>
            
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
          </div>

          {/* معلومات إضافية */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-2">
              تم إرسال تفاصيل الشراء إلى بريدك الإلكتروني
            </p>
            <div className="flex items-center justify-center text-blue-400">
              <Mail className="w-4 h-4 mr-2" />
              <span>تحقق من صندوق الوارد</span>
            </div>
          </div>

          {/* ملاحظات مهمة */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500 mb-2">
              ملاحظات مهمة:
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>• احتفظ برقم المعاملة للرجوع إليه</p>
              <p>• يمكنك تحميل اللعبة مرة واحدة فقط</p>
              <p>• في حالة وجود مشاكل، تواصل مع الدعم</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-green-400 mb-2">جاري التحميل...</h1>
            </div>
          </div>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
} 