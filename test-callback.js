// ملف اختبار لفحص callback
// يمكنك تشغيله باستخدام: node test-callback.js

import fetch from 'node-fetch';

// محاكاة callback ناجح
async function testSuccessfulCallback() {
  try {
    console.log('🧪 اختبار callback ناجح');
    console.log('='.repeat(50));
    
    const callbackData = {
      merchantTransactionId: "TXN1754503214119",
      transactionId: "TXN1754503214119",
      status: "SUCCESS",
      amount: "1000",
      currency: "IQD",
      uuid: "3212da561d9a68342803",
      purchaseId: "20250806-3212da561d9a68342803",
      success: true,
      returnType: "REDIRECT",
      customer: {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com"
      }
    };

    console.log('📋 بيانات callback:', JSON.stringify(callbackData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/payment/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(callbackData),
    });

    console.log('\n📊 رمز الاستجابة:', response.status);
    console.log('📄 استجابة callback:', response.statusText);
    
    if (response.status === 302) {
      const location = response.headers.get('location');
      console.log('🔗 التوجيه إلى:', location);
    }
    
  } catch (error) {
    console.error('\n💥 خطأ في اختبار callback:', error.message);
  }
}

// محاكاة callback فاشل
async function testFailedCallback() {
  try {
    console.log('\n🧪 اختبار callback فاشل');
    console.log('='.repeat(50));
    
    const callbackData = {
      merchantTransactionId: "TXN1754503214119",
      transactionId: "TXN1754503214119",
      status: "FAILED",
      amount: "1000",
      currency: "IQD",
      errorCode: "CARD_DECLINED",
      errorMessage: "Card was declined",
      success: false
    };

    console.log('📋 بيانات callback:', JSON.stringify(callbackData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/payment/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(callbackData),
    });

    console.log('\n📊 رمز الاستجابة:', response.status);
    console.log('📄 استجابة callback:', response.statusText);
    
    if (response.status === 302) {
      const location = response.headers.get('location');
      console.log('🔗 التوجيه إلى:', location);
    }
    
  } catch (error) {
    console.error('\n💥 خطأ في اختبار callback:', error.message);
  }
}

// تشغيل الاختبارات
async function runTests() {
  console.log('🧪 اختبار callback API');
  console.log('='.repeat(50));
  
  await testSuccessfulCallback();
  await testFailedCallback();
  
  console.log('\n✅ انتهت الاختبارات');
}

runTests();
