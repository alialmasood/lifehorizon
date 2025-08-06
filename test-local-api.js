// ملف اختبار للتحقق من API المحلي
// يمكنك تشغيله باستخدام: node test-local-api.js

import fetch from 'node-fetch';

// بيانات اختبار API المحلي
const testData = {
  amount: 1100, // تم تغييرها من 1000 إلى 1100 (سعر اللعبة + رسوم المعاملة)
  customerEmail: "test@example.com",
  customerName: "Test User",
  gameId: "game_123",
  gameTitle: "Test Game",
  currency: "IQD" // تم تغييرها من USD إلى IQD
};

async function testLocalAPI() {
  try {
    console.log('🧪 اختبار API المحلي');
    console.log('='.repeat(50));
    console.log('📋 بيانات الاختبار:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/payment/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('\n📊 رمز الاستجابة:', response.status);
    console.log('📄 استجابة API المحلي:', JSON.stringify(result, null, 2));
    
    if (response.ok && result.success) {
      console.log('\n✅ تم إنشاء المعاملة بنجاح!');
      console.log('🔗 رابط التوجيه:', result.redirectUrl);
      console.log('📝 معرف المعاملة:', result.transactionId);
      console.log('💰 المبلغ:', result.amount);
      console.log('💱 العملة:', result.currency);
      
      console.log('\n🎯 للاختبار:');
      console.log('1. تأكد من تشغيل التطبيق: npm run dev');
      console.log('2. انسخ رابط التوجيه أعلاه');
      console.log('3. افتحه في المتصفح');
      console.log('4. استخدم بيانات البطاقة التجريبية');
      
    } else {
      console.log('\n❌ فشل في إنشاء المعاملة');
      console.log('🔍 سبب الفشل:', result.error || result.message || 'غير محدد');
    }
    
  } catch (error) {
    console.error('\n💥 خطأ في الطلب:', error.message);
    console.error('📋 تأكد من تشغيل التطبيق: npm run dev');
  }
}

// تشغيل الاختبار
testLocalAPI();
