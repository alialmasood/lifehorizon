import { NextRequest, NextResponse } from 'next/server';

// إعدادات للـ API route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    console.log('=== بدء معالجة طلب الدفع ===');
    
    const body = await request.json();
    console.log('بيانات الطلب المستلمة:', body);
    
    const {
      merchant_id,
      api_key,
      username,
      password,
      amount,
      currency,
      order_id,
      customer_email,
      customer_name,
      customer_phone,
      return_url,
      cancel_url,
      error_url,
      callback_url,
      test_mode,
      game_id,
      game_title
    } = body;

    // التحقق من البيانات المطلوبة بشكل تفصيلي
    const requiredFields = {
      merchant_id,
      api_key,
      amount,
      customer_email,
      customer_name
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.error('الحقول المفقودة:', missingFields);
      console.error('البيانات المستلمة:', body);
      return NextResponse.json({
        success: false,
        error: `البيانات المطلوبة غير مكتملة. الحقول المفقودة: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    console.log('جميع البيانات المطلوبة موجودة ✅');

    // تحضير بيانات الدفع لـ Areeba بالشكل الصحيح - الحقول المطلوبة فقط
    const areebaPaymentData = {
      merchantTransactionId: order_id || `txn_${Date.now()}`,
      amount: amount.toString(),
      currency: currency || 'USD',
      successUrl: return_url,
      cancelUrl: cancel_url,
      errorUrl: error_url,
      callbackUrl: callback_url,
      customer: {
        firstName: customer_name.split(' ')[0] || customer_name,
        lastName: customer_name.split(' ').slice(1).join(' ') || '',
        email: customer_email,
        company: 'Big Company Inc.',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1'
      },
      language: 'en'
    };

    console.log('بيانات الدفع المحضرة لـ Areeba:', areebaPaymentData);

    // إرسال طلب الدفع إلى Areeba مع BASIC Auth
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
    console.log('Credentials (Base64):', credentials);
    
    const areebaUrl = 'https://gateway.areebapayment.com/api/v3/transaction/TESTKEYIQ3093980103/debit';
    console.log('URL المستهدف:', areebaUrl);
    
    const areebaResponse = await fetch(areebaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'LifeHorizon-GameStore/1.0',
        'Authorization': `Basic ${credentials}`
      },
      body: JSON.stringify(areebaPaymentData)
    });

    console.log('Areeba Response Status:', areebaResponse.status);
    console.log('Areeba Response Headers:', Object.fromEntries(areebaResponse.headers.entries()));

    let areebaResult;
    try {
      areebaResult = await areebaResponse.json();
      console.log('Areeba Response JSON:', areebaResult);
      console.log('=== تفاصيل استجابة Areeba ===');
      console.log('Success:', areebaResult.success);
      console.log('UUID:', areebaResult.uuid);
      console.log('PurchaseId:', areebaResult.purchaseId);
      console.log('ReturnType:', areebaResult.returnType);
      console.log('RedirectUrl:', areebaResult.redirectUrl);
      console.log('PaymentMethod:', areebaResult.paymentMethod);
      console.log('Message:', areebaResult.message);
      console.log('Error:', areebaResult.error);
      console.log('Code:', areebaResult.code);
      console.log('Status:', areebaResult.status);
      console.log('=== نهاية تفاصيل استجابة Areeba ===');
    } catch (jsonError) {
      console.error('Error parsing Areeba response:', jsonError);
      const responseText = await areebaResponse.text();
      console.log('Areeba Response Text:', responseText);
      console.log('=== تفاصيل الاستجابة النصية ===');
      console.log('Response Text Length:', responseText.length);
      console.log('Response Text Preview:', responseText.substring(0, 500));
      console.log('=== نهاية تفاصيل الاستجابة النصية ===');
      
      return NextResponse.json({
        success: false,
        error: 'فشل في الاتصال ببوابة الدفع'
      });
    }

    // معالجة استجابة Areeba - تحسين معالجة المصادقة
    if (areebaResult.success) {
      console.log('نجح طلب الدفع');
      
      // التحقق من وجود رابط الدفع
      const paymentUrl = areebaResult.redirectUrl || areebaResult.paymentUrl || areebaResult.url;
      
      if (paymentUrl) {
        console.log('التوجيه إلى صفحة الدفع:', paymentUrl);
        return NextResponse.json({
          success: true,
          transactionId: areebaResult.uuid || areebaResult.purchaseId || areebaResult.transactionId,
          paymentUrl: paymentUrl,
          message: 'تم إنشاء طلب الدفع بنجاح'
        });
      } else {
        console.error('لا يوجد رابط دفع في الاستجابة:', areebaResult);
        return NextResponse.json({
          success: false,
          error: 'لم يتم الحصول على رابط الدفع من بوابة الدفع'
        });
      }
    } else {
      // فشل في إنشاء طلب الدفع
      console.error('Areeba payment failed:', areebaResult);
      const errorMessage = areebaResult.message || areebaResult.error || areebaResult.reason || 'فشل في إنشاء طلب الدفع';
      return NextResponse.json({
        success: false,
        error: errorMessage
      });
    }

  } catch (error) {
    console.error('خطأ في إنشاء طلب الدفع:', error);
    return NextResponse.json({
      success: false,
      error: 'حدث خطأ في الاتصال ببوابة الدفع'
    }, { status: 500 });
  }
} 