"use client";

import Link from "next/link";
import { ArrowLeft, XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">تم إلغاء الدفع</h1>
          
          <p className="text-gray-300 mb-6">
            تم إلغاء عملية الدفع. لم يتم خصم أي مبلغ من حسابك.
          </p>

          <div className="space-y-4">
            <Link
              href="/services/game-store"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة إلى متجر الألعاب
            </Link>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            <p>إذا كنت تواجه مشكلة في الدفع، يرجى التواصل معنا.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 