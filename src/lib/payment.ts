"use client";

import { createPurchase, incrementDownloads } from './games';

export interface PaymentConfig {
  // معلومات بوابة الدفع Areeba
  merchantId: string;
  apiKey: string;
  username: string;
  password: string;
  apiUrl: string;
  currency: string;
  
  // روابط الاستجابة
  successUrl: string;
  cancelUrl: string;
  errorUrl: string;
  callbackUrl: string;
  
  // معلومات إضافية
  testMode: boolean;
}

export interface PaymentRequest {
  gameId: string;
  gameTitle: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  returnUrl: string;
  cancelUrl: string;
  errorUrl: string;
  callbackUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
  message?: string;
}

// تحديد البيئة والروابط المناسبة
const isDevelopment = process.env.NODE_ENV === 'development';
const baseUrl = isDevelopment ? 'http://localhost:3000' : 'http://192.168.1.143:3000'

// إعدادات الدفع لـ Areeba
export const paymentConfig: PaymentConfig = {
  merchantId: 'IQ3093980103',
  apiKey: 'TESTKEYIQ3093980103',
  username: 'Ali.112233445566',
  password: 'Zxxznmmn@123',
  apiUrl: 'https://gateway.areebapayment.com/api/v3/transaction/TESTKEYIQ3093980103/debit',
  currency: 'IQD', // تم تغييرها من USD إلى IQD
  successUrl: `${baseUrl}/payment/success`,
  cancelUrl: `${baseUrl}/payment/cancel`,
  errorUrl: `${baseUrl}/payment/error`,
  callbackUrl: `${baseUrl}/admin/games/test-callback`,
  testMode: isDevelopment
};

// إنشاء طلب دفع مع Areeba
export const createPaymentRequest = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
  try {
    console.log('بدء إنشاء طلب الدفع...');
    console.log('بيانات الدفع المستلمة:', paymentData);
    console.log('البيئة الحالية:', isDevelopment ? 'تطوير' : 'إنتاج');
    console.log('الرابط الأساسي:', baseUrl);

    // تحضير البيانات المرسلة إلى API - الحقول المطلوبة فقط
    const apiRequestData = {
      merchant_id: paymentConfig.merchantId,
      api_key: paymentConfig.apiKey,
      username: paymentConfig.username,
      password: paymentConfig.password,
      amount: paymentData.amount.toString(),
      currency: paymentData.currency,
      order_id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      customer_email: paymentData.customerEmail,
      customer_name: paymentData.customerName,
      customer_phone: paymentData.customerPhone || '',
      return_url: paymentData.returnUrl,
      cancel_url: paymentData.cancelUrl,
      error_url: paymentData.errorUrl,
      callback_url: paymentData.callbackUrl,
      test_mode: paymentConfig.testMode,
      game_id: paymentData.gameId,
      game_title: paymentData.gameTitle
    };

    console.log('البيانات المرسلة إلى API:', apiRequestData);

    // إرسال طلب الدفع إلى API
    const response = await fetch('/api/payment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestData),
    });

    console.log('استجابة API:', response.status);
    console.log('استجابة API Headers:', Object.fromEntries(response.headers.entries()));

    const result = await response.json();
    console.log('نتيجة API:', result);
    console.log('=== تفاصيل نتيجة API ===');
    console.log('Success:', result.success);
    console.log('TransactionId:', result.transactionId);
    console.log('PaymentUrl:', result.paymentUrl);
    console.log('Message:', result.message);
    console.log('Error:', result.error);
    console.log('=== نهاية تفاصيل نتيجة API ===');

    if (result.success) {
      return {
        success: true,
        transactionId: result.transactionId,
        paymentUrl: result.paymentUrl,
        message: 'تم إنشاء طلب الدفع بنجاح'
      };
    } else {
      return {
        success: false,
        error: result.error || 'حدث خطأ في إنشاء طلب الدفع'
      };
    }
  } catch (error) {
    console.error('خطأ في إنشاء طلب الدفع:', error);
    return {
      success: false,
      error: 'حدث خطأ في الاتصال ببوابة الدفع'
    };
  }
};

// التحقق من حالة الدفع مع Areeba
export const verifyPayment = async (transactionId: string): Promise<PaymentResponse> => {
  try {
    const response = await fetch('/api/payment/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        transactionId,
        merchantId: paymentConfig.merchantId,
        apiKey: paymentConfig.apiKey,
        username: paymentConfig.username,
        password: paymentConfig.password
      }),
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        transactionId: result.transactionId,
        message: 'تم التحقق من الدفع بنجاح'
      };
    } else {
      return {
        success: false,
        error: result.error || 'فشل في التحقق من الدفع'
      };
    }
  } catch (error) {
    console.error('خطأ في التحقق من الدفع:', error);
    return {
      success: false,
      error: 'حدث خطأ في التحقق من الدفع'
    };
  }
};

// معالجة نجاح الدفع
export const handlePaymentSuccess = async (transactionId: string, gameId: string) => {
  try {
    // التحقق من الدفع
    const verification = await verifyPayment(transactionId);
    
    if (verification.success) {
      // تسجيل عملية الشراء
      await createPurchase({
        gameId,
        gameTitle: 'Game Title', // سيتم تحديثه من البيانات الفعلية
        userId: `user_${Date.now()}`,
        userEmail: 'user@example.com', // سيتم تحديثه من البيانات الفعلية
        userName: 'User Name', // سيتم تحديثه من البيانات الفعلية
        amount: 0, // سيتم تحديثه من البيانات الفعلية
        status: 'completed',
        paymentMethod: 'areeba',
        transactionId
      });

      // زيادة عدد التحميلات
      await incrementDownloads(gameId);

      return {
        success: true,
        message: 'تم إتمام عملية الدفع بنجاح'
      };
    } else {
      return {
        success: false,
        error: verification.error
      };
    }
  } catch (error) {
    console.error('خطأ في معالجة نجاح الدفع:', error);
    return {
      success: false,
      error: 'حدث خطأ في معالجة الدفع'
    };
  }
}; 