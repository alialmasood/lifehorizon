"use client";

import { useState } from "react";
import Image from "next/image";
import { X, CreditCard, ShoppingCart, Download } from "lucide-react";
import { Game, createPurchase } from "@/lib/games";
import { createPaymentRequest, paymentConfig } from "@/lib/payment";

interface PurchaseModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchaseSuccess: () => void;
}

export function PurchaseModal({ game, isOpen, onClose, onPurchaseSuccess }: PurchaseModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    phoneNumber: "",
    paymentMethod: "card"
  });

  if (!isOpen || !game) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('بدء عملية الشراء...');
      console.log('بيانات اللعبة:', game);
      console.log('بيانات المستخدم:', formData);

      // التحقق من البيانات المطلوبة
      if (!formData.userName || !formData.userEmail) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        setIsLoading(false);
        return;
      }

      // إنشاء طلب الدفع
      const paymentData = {
        gameId: game.id!,
        gameTitle: game.title,
        amount: game.isFree ? 0 : game.price,
        currency: 'IQD',
        customerEmail: formData.userEmail,
        customerName: formData.userName,
        customerPhone: formData.phoneNumber,
        returnUrl: paymentConfig.successUrl,
        cancelUrl: paymentConfig.cancelUrl,
        errorUrl: paymentConfig.errorUrl,
        callbackUrl: paymentConfig.callbackUrl
      };

      console.log('بيانات الدفع المرسلة:', paymentData);

      const paymentResult = await createPaymentRequest(paymentData);

      console.log('نتيجة طلب الدفع:', paymentResult);

      if (paymentResult.success && paymentResult.paymentUrl) {
        console.log('التوجيه إلى:', paymentResult.paymentUrl);
        // توجيه مباشر إلى صفحة دفع Areeba
        window.location.href = paymentResult.paymentUrl;
      } else {
        console.error('خطأ في طلب الدفع:', paymentResult.error);
        alert(`خطأ في إنشاء طلب الدفع: ${paymentResult.error}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('خطأ في عملية الشراء:', error);
      alert('حدث خطأ في عملية الشراء. يرجى المحاولة مرة أخرى.');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">شراء اللعبة</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Game Info */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/64x64/374151/FFFFFF?text=Game";
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{game.title}</h3>
                <p className="text-gray-400 text-sm">{game.size}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-400">⭐ {game.rating}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-green-400 font-bold">
                    {game.isFree ? 'مجاني' : `${game.price} دينار عراقي`}
                  </span>
                </div>
              </div>
            </div>

            {/* Purchase Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  placeholder="أدخل رقم هاتفك"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  طريقة الدفع
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                >
                  <option value="card">بطاقة ائتمان</option>
                  <option value="bank">تحويل بنكي</option>
                  <option value="cash">نقداً</option>
                </select>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">سعر اللعبة:</span>
                  <span className="text-white font-bold">
                    {game.isFree ? 'مجاني' : `${game.price} دينار عراقي`}
                  </span>
                </div>
                {!game.isFree && (
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>رسوم المعاملة:</span>
                    <span>1000 دينار عراقي</span>
                  </div>
                )}
                <div className="border-t border-gray-600 mt-2 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">المجموع:</span>
                    <span className="text-primary font-bold">
                      {game.isFree ? 'مجاني' : `${game.price + 1000} دينار عراقي`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري التوجيه إلى بوابة الدفع...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    {game.isFree ? 'تحميل مجاني' : 'الانتقال إلى الدفع'}
                  </>
                )}
              </button>
            </form>

            {/* Terms */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              بالضغط على زر الدفع، أنت توافق على شروط وأحكام الموقع
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 