import { NextRequest, NextResponse } from 'next/server';

// إعدادات للـ API route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('=== CALLBACK RECEIVED ===');
    console.log('استلام إشعار دفع من بوابة أريبا:', body);

    // استخراج البيانات المهمة
    const {
      merchantTransactionId,
      transactionId,
      status,
      amount,
      currency,
      customer,
      errorCode,
      errorMessage,
      uuid,
      purchaseId,
      success,
      message,
      code,
      returnType,
      redirectUrl
    } = body;

    // تسجيل تفاصيل المعاملة
    console.log(`=== TRANSACTION DETAILS ===`);
    console.log(`معاملة: ${merchantTransactionId || transactionId || uuid}`);
    console.log(`حالة الدفع: ${status || success || code}`);
    console.log(`المبلغ: ${amount} ${currency}`);
    console.log(`UUID: ${uuid}`);
    console.log(`Purchase ID: ${purchaseId}`);
    
    if (customer) {
      console.log(`العميل: ${customer.firstName} ${customer.lastName}`);
      console.log(`البريد الإلكتروني: ${customer.email}`);
    }

    // منطق محسن لتحديد نجاح الدفع
    const isSuccess = 
      status === 'SUCCESS' || 
      status === 'success' || 
      success === true || 
      success === 'true' ||
      code === 'success' || 
      message?.toLowerCase().includes('success') ||
      (uuid && purchaseId) ||
      returnType === 'REDIRECT';

    console.log('=== SUCCESS DETERMINATION ===');
    console.log('isSuccess:', isSuccess);
    console.log('status === SUCCESS:', status === 'SUCCESS');
    console.log('success === true:', success === true);
    console.log('code === success:', code === 'success');
    console.log('message includes success:', message?.toLowerCase().includes('success'));
    console.log('has uuid and purchaseId:', !!(uuid && purchaseId));
    console.log('returnType === REDIRECT:', returnType === 'REDIRECT');

    // التحقق من حالة الدفع
    if (isSuccess) {
      console.log(`✅ تم الدفع بنجاح للمعاملة: ${merchantTransactionId || transactionId || uuid}`);
      
      // هنا يمكنك إضافة منطق إضافي للدفع الناجح:
      // - تحديث حالة الطلب في قاعدة البيانات
      // - إرسال إشعار للمستخدم
      // - إرسال تأكيد بالبريد الإلكتروني
      // - تحديث المخزون
      
    } else if (status === 'FAILED' || status === 'failed') {
      console.log(`❌ فشل الدفع للمعاملة: ${merchantTransactionId || transactionId || uuid}`);
      console.log(`رمز الخطأ: ${errorCode}`);
      console.log(`رسالة الخطأ: ${errorMessage}`);
      
      // هنا يمكنك إضافة منطق إضافي للدفع الفاشل:
      // - تحديث حالة الطلب في قاعدة البيانات
      // - إرسال إشعار للمستخدم
      // - إعادة المخزون
      
    } else if (status === 'CANCELLED' || status === 'cancelled') {
      console.log(`🚫 تم إلغاء الدفع للمعاملة: ${merchantTransactionId || transactionId || uuid}`);
      
      // هنا يمكنك إضافة منطق إضافي للإلغاء:
      // - تحديث حالة الطلب في قاعدة البيانات
      // - إرسال إشعار للمستخدم
      // - إعادة المخزون
    }

    // حفظ تفاصيل المعاملة في السجل (يمكن استبدالها بقاعدة بيانات)
    const transactionLog = {
      timestamp: new Date().toISOString(),
      merchantTransactionId: merchantTransactionId || transactionId || uuid,
      transactionId: transactionId || merchantTransactionId || uuid,
      status: status || success || code,
      amount,
      currency,
      customer,
      errorCode,
      errorMessage,
      uuid,
      purchaseId,
      returnType,
      redirectUrl
    };

    console.log('=== TRANSACTION LOG ===');
    console.log('تفاصيل المعاملة المحفوظة:', transactionLog);

    // تحديد URL للتوجيه مع البيانات المطلوبة
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const transactionIdParam = merchantTransactionId || transactionId || uuid;
    
    if (isSuccess) {
      const successUrl = `${baseUrl}/payment/success?transactionId=${transactionIdParam}&amount=${amount}&currency=${currency}`;
      console.log('=== REDIRECTING TO SUCCESS ===');
      console.log('Redirecting to SUCCESS:', successUrl);
      return NextResponse.redirect(successUrl);
    } else {
      const errorUrl = `${baseUrl}/payment/error?transactionId=${transactionIdParam}&error=${encodeURIComponent(errorMessage || 'Payment failed')}`;
      console.log('=== REDIRECTING TO ERROR ===');
      console.log('Redirecting to ERROR:', errorUrl);
      return NextResponse.redirect(errorUrl);
    }

  } catch (error) {
    console.error('=== CALLBACK ERROR ===');
    console.error('خطأ في معالجة إشعار الدفع:', error);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const errorUrl = `${baseUrl}/payment/error?error=${encodeURIComponent('خطأ في معالجة الدفع')}`;
    return NextResponse.redirect(errorUrl);
  }
}

// دعم GET requests أيضاً (في حالة استخدام GET للـ callback)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    console.log('استلام callback GET:', Object.fromEntries(searchParams.entries()));

    // استخراج البيانات من query parameters
    const transactionId = searchParams.get('transaction_id') || searchParams.get('transactionId');
    const status = searchParams.get('status');
    const amount = searchParams.get('amount');
    const currency = searchParams.get('currency');
    const orderId = searchParams.get('order_id') || searchParams.get('orderId');
    const paymentMethod = searchParams.get('payment_method') || searchParams.get('paymentMethod');
    const errorCode = searchParams.get('error_code') || searchParams.get('errorCode');
    const errorMessage = searchParams.get('error_message') || searchParams.get('errorMessage');
    const uuid = searchParams.get('uuid');
    const purchaseId = searchParams.get('purchase_id') || searchParams.get('purchaseId');
    const success = searchParams.get('success');
    const message = searchParams.get('message');
    const code = searchParams.get('code');
    const merchantTransactionId = searchParams.get('merchant_transaction_id') || searchParams.get('merchantTransactionId');
    const returnType = searchParams.get('return_type') || searchParams.get('returnType');
    const redirectUrl = searchParams.get('redirect_url') || searchParams.get('redirectUrl');

    console.log('=== EXTRACTED GET FIELDS ===');
    console.log('transactionId:', transactionId);
    console.log('status:', status);
    console.log('success:', success);
    console.log('code:', code);
    console.log('message:', message);
    console.log('uuid:', uuid);
    console.log('purchaseId:', purchaseId);
    console.log('returnType:', returnType);
    console.log('redirectUrl:', redirectUrl);
    console.log('amount:', amount);
    console.log('currency:', currency);
    console.log('orderId:', orderId);
    console.log('paymentMethod:', paymentMethod);
    console.log('errorCode:', errorCode);
    console.log('errorMessage:', errorMessage);
    console.log('merchantTransactionId:', merchantTransactionId);

    // منطق محسن لتحديد نجاح الدفع
    const isSuccess = 
      status === 'SUCCESS' ||
      status === 'success' || 
      success === 'true' || 
      code === 'success' || 
      message?.toLowerCase().includes('success') ||
      (uuid && purchaseId) ||
      returnType === 'REDIRECT';

    console.log('=== SUCCESS DETERMINATION (GET) ===');
    console.log('isSuccess:', isSuccess);
    console.log('status === SUCCESS:', status === 'SUCCESS');
    console.log('success === true:', success === 'true');
    console.log('code === success:', code === 'success');
    console.log('message includes success:', message?.toLowerCase().includes('success'));
    console.log('has uuid and purchaseId:', !!(uuid && purchaseId));
    console.log('returnType === REDIRECT:', returnType === 'REDIRECT');

    // معالجة البيانات المستلمة عبر GET
    if (status && (merchantTransactionId || transactionId || uuid)) {
      console.log(`معاملة ${merchantTransactionId || transactionId || uuid}: ${status}`);
      
      if (isSuccess) {
        console.log(`✅ تم الدفع بنجاح للمعاملة: ${merchantTransactionId || transactionId || uuid}`);
      } else if (status === 'FAILED' || status === 'failed') {
        console.log(`❌ فشل الدفع للمعاملة: ${merchantTransactionId || transactionId || uuid}`);
      } else if (status === 'CANCELLED' || status === 'cancelled') {
        console.log(`🚫 تم إلغاء الدفع للمعاملة: ${merchantTransactionId || transactionId || uuid}`);
      }
    }

    // تحديد URL للتوجيه مع البيانات المطلوبة
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const transactionIdParam = merchantTransactionId || transactionId || uuid;
    
    if (isSuccess) {
      const successUrl = `${baseUrl}/payment/success?transactionId=${transactionIdParam}&amount=${amount}&currency=${currency}`;
      console.log('Redirecting to SUCCESS (GET):', successUrl);
      return NextResponse.redirect(successUrl);
    } else {
      const errorUrl = `${baseUrl}/payment/error?transactionId=${transactionIdParam}&error=${encodeURIComponent(errorMessage || 'Payment failed')}`;
      console.log('Redirecting to ERROR (GET):', errorUrl);
      return NextResponse.redirect(errorUrl);
    }
  } catch (error) {
    console.error('خطأ في معالجة callback GET:', error);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const errorUrl = `${baseUrl}/payment/error?error=${encodeURIComponent('خطأ في معالجة الدفع')}`;
    return NextResponse.redirect(errorUrl);
  }
} 