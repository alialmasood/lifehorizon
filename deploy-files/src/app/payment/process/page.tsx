"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Clock } from "lucide-react";

function PaymentProcessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');
  const [countdown, setCountdown] = useState(5);

  const transactionId = searchParams.get('transaction_id');
  const amount = searchParams.get('amount');
  const gameId = searchParams.get('game_id');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // محاكاة نجاح الدفع بعد 5 ثوانٍ
          setStatus('success');
          clearInterval(timer);
          
          // توجيه إلى صفحة النجاح
          setTimeout(() => {
            window.location.href = `/payment/success?transaction_id=${transactionId}&game_id=${gameId}`;
          }, 2000);
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [transactionId, gameId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full">
        <div className="text-center">
          {status === 'processing' && (
            <>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">جاري معالجة الدفع</h1>
              <p className="text-gray-300 mb-6">
                يرجى الانتظار بينما نقوم بمعالجة الدفع...
              </p>
              <div className="text-4xl font-bold text-primary mb-4">{countdown}</div>
              <p className="text-gray-400 text-sm">سيتم إعادة التوجيه تلقائياً</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">تم الدفع بنجاح!</h1>
              <p className="text-gray-300 mb-6">
                جاري التوجيه إلى صفحة التحميل...
              </p>
            </>
          )}

          {status === 'failed' && (
            <>
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">فشل في الدفع</h1>
              <p className="text-gray-300 mb-6">
                حدث خطأ أثناء معالجة الدفع.
              </p>
            </>
          )}

          <div className="mt-6 text-xs text-gray-500">
            <p>معرف المعاملة: {transactionId}</p>
            <p>المبلغ: {amount} ريال</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentProcessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">جاري التحميل...</h1>
        </div>
      </div>
    }>
      <PaymentProcessContent />
    </Suspense>
  );
} 