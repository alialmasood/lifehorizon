// ملف اختبار لإرسال طلب إلى بوابة أريبا - مطابق لتعليمات Postman
// يمكنك تشغيله باستخدام: node test-areeba-request.js

import fetch from 'node-fetch';

// البيانات المطلوبة - مطابقة لتعليمات Postman
const API_KEY = 'TESTKEYIQ3093980103';
const USERNAME = 'Ali.112233445566';
const PASSWORD = 'Zxxznmmn@123';

// إنشاء Basic Auth
const credentials = `${USERNAME}:${PASSWORD}`;
const base64Auth = Buffer.from(credentials).toString('base64');

// بيانات الطلب - مطابقة تماماً لتعليمات Postman
const paymentData = {
  merchantTransactionId: `TXN${Date.now()}`, // يتغير في كل طلب
  amount: "1000",
  currency: "IQD", // تم تغييرها من USD إلى IQD لتطابق المشروع القديم
  successUrl: "http://localhost:3000/payment/success",
  cancelUrl: "http://localhost:3000/payment/cancel",
  errorUrl: "http://localhost:3000/payment/error",
  callbackUrl: "http://localhost:3000/api/payment/callback",
  customer: {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    company: "Life Horizon",
    ipAddress: "127.0.0.1"
  },
  language: "en"
};

async function testAreebaRequest() {
  try {
    console.log('🚀 بدء اختبار طلب أريبا - مطابق لتعليمات Postman...');
    console.log('📋 بيانات الطلب:', JSON.stringify(paymentData, null, 2));
    console.log('🔑 Basic Auth:', base64Auth);
    console.log('🔗 URL الطلب:', `https://gateway.areebapayment.com/api/v3/transaction/${API_KEY}/debit`);
    
    const response = await fetch(
      `https://gateway.areebapayment.com/api/v3/transaction/${API_KEY}/debit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${base64Auth}`,
          'Accept': 'application/json',
          'User-Agent': 'LifeHorizon-Test/1.0'
        },
        body: JSON.stringify(paymentData),
      }
    );

    const result = await response.json();
    
    console.log('\n📊 رمز الاستجابة:', response.status);
    console.log('📄 استجابة أريبا:', JSON.stringify(result, null, 2));
    
    if (response.ok && result.returnType === 'REDIRECT') {
      console.log('\n✅ تم إنشاء المعاملة بنجاح!');
      console.log('🔗 رابط التوجيه:', result.redirectUrl);
      console.log('📝 معرف المعاملة:', result.merchantTransactionId);
      console.log('🆔 UUID:', result.uuid);
      console.log('🛒 Purchase ID:', result.purchaseId);
      
      console.log('\n🎯 للاختبار:');
      console.log('1. انسخ رابط التوجيه أعلاه');
      console.log('2. افتحه في المتصفح');
      console.log('3. استخدم بيانات البطاقة التجريبية');
      console.log('4. تحقق من callback في console التطبيق');
      
    } else {
      console.log('\n❌ فشل في إنشاء المعاملة');
      console.log('🔍 سبب الفشل:', result.error || result.message || 'غير محدد');
    }
    
  } catch (error) {
    console.error('\n💥 خطأ في الطلب:', error.message);
    console.error('📋 تفاصيل الخطأ:', error);
  }
}

// تشغيل الاختبار
console.log('🧪 اختبار بوابة الدفع أريبا');
console.log('='.repeat(50));
testAreebaRequest();
