'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '1000';
  const gameId = searchParams.get('game_id') || '';
  const gameTitle = searchParams.get('game_title') ? decodeURIComponent(searchParams.get('game_title')!) : '';
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '5123 4500 0000 0008',
    expiryDate: '01/39',
    securityCode: '123',
    cardholderName: 'test',
    customerEmail: 'test@example.com'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // تنسيق رقم البطاقة
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    // تنسيق تاريخ الانتهاء
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    // تنسيق رمز الأمان
    else if (name === 'securityCode') {
      const formatted = value.replace(/\D/g, '').substring(0, 4);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من صحة البيانات
    if (!formData.cardNumber.replace(/\s/g, '') || 
        !formData.expiryDate || 
        !formData.securityCode || 
        !formData.cardholderName ||
        !formData.customerEmail) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.customerEmail)) {
      alert('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    // التحقق من صحة رقم البطاقة (أساسي)
    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      alert('يرجى إدخال رقم بطاقة صحيح');
      return;
    }

    // تأكيد عملية الدفع
    const confirmMessage = `هل أنت متأكد من إتمام عملية الدفع؟
    
المبلغ: ${amount} دينار عراقي
${gameTitle ? `اللعبة: ${gameTitle}` : ''}
البريد الإلكتروني: ${formData.customerEmail}`;

    if (!confirm(confirmMessage)) {
      return;
    }

    setIsLoading(true);

    try {
      // استخدام API initiate بدلاً من create للبساطة
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          customerEmail: formData.customerEmail,
          customerName: formData.cardholderName,
          gameId: gameId,
          gameTitle: gameTitle,
          currency: 'IQD'
        }),
      });

      const result = await response.json();

      if (result.success && result.redirectUrl) {
        // توجيه مباشر إلى بوابة الدفع (مثل المشروع القديم)
        console.log('🚀 توجيه إلى بوابة الدفع:', result.redirectUrl);
        window.location.href = result.redirectUrl;
      } else {
        const errorMessage = result.error || 'حدث خطأ أثناء بدء عملية الدفع';
        alert(`خطأ في عملية الدفع: ${errorMessage}`);
      }
    } catch (error) {
      console.error('خطأ في الاتصال:', error);
      alert('حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
                 {/* Header */}
         <div className="text-center mb-8">
           <h1 className="text-3xl font-bold text-gray-900 mb-2">إتمام الدفع</h1>
           <p className="text-gray-600">أدخل بيانات بطاقتك الائتمانية</p>
           <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
             </svg>
             <span>بياناتك محمية ومشفرة</span>
           </div>
         </div>

        {/* Payment Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
                     {/* Amount Display */}
           <div className="text-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
             <p className="text-sm text-gray-600 mb-1">المبلغ المطلوب</p>
             <p className="text-2xl font-bold text-gray-900">{amount} دينار عراقي</p>
             {gameTitle && (
               <div className="mt-2 p-2 bg-white rounded-lg border border-gray-200">
                 <p className="text-sm text-gray-700 font-medium">اللعبة المختارة:</p>
                 <p className="text-sm text-blue-600 font-semibold">{gameTitle}</p>
               </div>
             )}
             <div className="mt-3 text-xs text-gray-500">
               * يتضمن رسوم المعاملة والخدمة
             </div>
           </div>

          

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Email */}
            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني *
              </label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
                required
              />
            </div>

            {/* Card Number */}
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                رقم البطاقة *
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </div>

            {/* Cardholder Name */}
            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
                اسم حامل البطاقة *
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="الاسم كما يظهر على البطاقة"
                required
              />
            </div>

            {/* Expiry Date and Security Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                  تاريخ الانتهاء *
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700 mb-2">
                  رمز الأمان *
                </label>
                <input
                  type="text"
                  id="securityCode"
                  name="securityCode"
                  value={formData.securityCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123"
                  maxLength={4}
                  required
                />
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-blue-800">
                  بياناتك محمية ومشفرة. لن نشارك معلوماتك مع أي طرف ثالث.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري التوجيه إلى بوابة الدفع...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    إتمام الدفع
                  </>
                )}
              </div>
            </button>



            {/* Cancel Button */}
            <Link
              href="/services/game-store"
              className="block w-full border border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200 text-center"
            >
              إلغاء
            </Link>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>© 2024 Life Horizon - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
}
