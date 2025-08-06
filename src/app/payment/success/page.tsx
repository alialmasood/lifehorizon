"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle, Download, ArrowLeft, Mail, Printer } from "lucide-react";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [transactionId, setTransactionId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<string>('');
  const [gameTitle, setGameTitle] = useState<string>('');
  const [purchaseId, setPurchaseId] = useState<string>('');
  const [uuid, setUuid] = useState<string>('');

  useEffect(() => {
    // دعم كلا النوعين من المعاملات
    const txId = searchParams.get('transactionId') || searchParams.get('transaction_id') || '';
    const amt = searchParams.get('amount') || '';
    const curr = searchParams.get('currency') || 'USD';
    const game = searchParams.get('game_title') || '';
    const purchase = searchParams.get('purchase_id') || '';
    const uid = searchParams.get('uuid') || '';
    
    setTransactionId(txId);
    setAmount(amt);
    setCurrency(curr);
    setGameTitle(game);
    setPurchaseId(purchase);
    setUuid(uid);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">تم الدفع بنجاح!</h1>
          <p className="text-gray-600 mb-6">
            شكراً لك على الشراء. تمت معالجة الدفع بنجاح وسيتم إرسال تأكيد إلى بريدك الإلكتروني.
          </p>

          {/* Payment Details */}
          {(amount || transactionId || gameTitle || purchaseId || uuid) && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-semibold text-green-600 mb-2">تفاصيل الدفع:</h3>
              <div className="space-y-1 text-xs text-gray-700">
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

          {/* Success Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              تم إرسال تفاصيل الدفع إلى بريدك الإلكتروني. يمكنك الاحتفاظ برقم المعاملة للرجوع إليه لاحقاً.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => {
                // هنا يمكن إضافة منطق التحميل الفعلي
                alert('سيتم إرسال رابط التحميل إلى بريدك الإلكتروني قريباً');
              }}
              className="flex items-center justify-center w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              تحميل اللعبة
            </button>
            
            <Link
              href="/services/game-store"
              className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة إلى متجر الألعاب
            </Link>
            
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center w-full border border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              <Printer className="w-4 h-4 mr-2" />
              طباعة الإيصال
            </button>
            
            <Link
              href="/"
              className="flex items-center justify-center w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>

          {/* معلومات إضافية */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              تم إرسال تفاصيل الشراء إلى بريدك الإلكتروني
            </p>
            <div className="flex items-center justify-center text-blue-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>تحقق من صندوق الوارد</span>
            </div>
          </div>

          {/* ملاحظات مهمة */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">
              ملاحظات مهمة:
            </p>
            <div className="text-xs text-gray-600 space-y-1">
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">جاري التحميل...</h1>
          </div>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
} 