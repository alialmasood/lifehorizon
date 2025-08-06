"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, AlertTriangle, Mail, Bug } from "lucide-react";
import Link from "next/link";

function PaymentErrorContent() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('حدث خطأ أثناء معالجة الدفع');
  const [transactionId, setTransactionId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<string>('');
  const [errorCode, setErrorCode] = useState<string>('');
  const [uuid, setUuid] = useState<string>('');
  const [purchaseId, setPurchaseId] = useState<string>('');

  useEffect(() => {
    // دعم كلا النوعين من المعاملات والأخطاء
    const error = searchParams.get('error') || searchParams.get('error_message') || '';
    const txId = searchParams.get('transactionId') || searchParams.get('transaction_id') || '';
    const amt = searchParams.get('amount') || '';
    const curr = searchParams.get('currency') || 'USD';
    const code = searchParams.get('error_code') || '';
    const uid = searchParams.get('uuid') || '';
    const purchase = searchParams.get('purchase_id') || '';
    
    if (error) {
      setErrorMessage(decodeURIComponent(error));
    }
    setTransactionId(txId);
    setAmount(amt);
    setCurrency(curr);
    setErrorCode(code);
    setUuid(uid);
    setPurchaseId(purchase);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">فشل في الدفع</h1>
          <p className="text-gray-600 mb-6">
            {errorMessage}
          </p>

          {/* Error Details */}
          {(errorCode || transactionId || amount || uuid || purchaseId) && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-semibold text-red-600 mb-2">تفاصيل الخطأ:</h3>
              <div className="space-y-1 text-xs text-gray-700">
                {errorCode && <p><strong>رمز الخطأ:</strong> {errorCode}</p>}
                {transactionId && <p><strong>رقم المعاملة:</strong> {transactionId}</p>}
                {amount && currency && (
                  <p><strong>المبلغ:</strong> {amount} {currency}</p>
                )}
                {uuid && <p><strong>UUID:</strong> {uuid}</p>}
                {purchaseId && <p><strong>رقم الشراء:</strong> {purchaseId}</p>}
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              يمكنك المحاولة مرة أخرى أو التواصل مع خدمة العملاء للحصول على المساعدة. 
              سيتم إنشاء معاملة جديدة عند المحاولة مرة أخرى.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/services/game-store"
              className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة إلى متجر الألعاب
            </Link>
            
            <Link
              href={`/services/game-store${amount ? `?amount=${amount}` : ''}`}
              className="flex items-center justify-center w-full border border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              المحاولة مرة أخرى
            </Link>
            
            <Link
              href="/"
              className="flex items-center justify-center w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>

          {/* معلومات التواصل */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              إذا استمرت المشكلة، يرجى التواصل معنا على:
            </p>
            <div className="flex items-center justify-center text-blue-600">
              <Mail className="w-4 h-4 mr-2" />
              <a 
                href="mailto:support@lifehorizon.com"
                className="hover:text-blue-500 transition-colors"
              >
                support@lifehorizon.com
              </a>
            </div>
          </div>

          {/* معلومات إضافية للتشخيص */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">
              للمساعدة في التشخيص، يرجى مشاركة:
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>• وقت حدوث الخطأ</p>
              <p>• اسم اللعبة المطلوبة</p>
              <p>• البيانات المستخدمة في الدفع</p>
              <p>• أي رسائل خطأ إضافية</p>
              <p>• معلومات Console (F12)</p>
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">جاري التحميل...</h1>
          </div>
        </div>
      </div>
    }>
      <PaymentErrorContent />
    </Suspense>
  );
} 