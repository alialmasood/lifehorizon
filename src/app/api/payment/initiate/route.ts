import { NextRequest, NextResponse } from 'next/server';
import { AREEBA_CONFIG, generateTransactionId, getBase64Auth } from '@/lib/areeba-config';

// إعدادات للـ API route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    console.log('=== بدء معالجة طلب الدفع ===');
    
    const body = await request.json();
    console.log('بيانات الطلب المستلمة:', body);
    
    const { 
      amount, 
      customerEmail, 
      customerName,
      gameId,
      gameTitle,
      currency = 'IQD'
    } = body;

    // التحقق من البيانات المطلوبة
    if (!amount || !customerEmail || !customerName) {
      console.error('البيانات المطلوبة غير مكتملة:', { amount, customerEmail, customerName });
      return NextResponse.json(
        { error: 'البيانات المطلوبة غير مكتملة' },
        { status: 400 }
      );
    }

    // إنشاء معرف المعاملة الفريد
    const merchantTransactionId = generateTransactionId();
    
    console.log(`بدء معاملة جديدة: ${merchantTransactionId}`);
    console.log(`المبلغ: ${amount} ${currency}`);
    console.log(`العميل: ${customerName}`);
    console.log(`البريد الإلكتروني: ${customerEmail}`);

    // تحضير بيانات الطلب - مطابق لتعليمات Areeba
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000'  // استخدام localhost مثل المشروع القديم
      : request.nextUrl.origin;
      
    const paymentData = {
      merchantTransactionId,
      amount: amount.toString(),
      currency: currency,
      successUrl: `${baseUrl}/payment/success?transactionId=${merchantTransactionId}&amount=${amount}&currency=${currency}${gameId ? `&game_id=${gameId}` : ''}${gameTitle ? `&game_title=${encodeURIComponent(gameTitle)}` : ''}`,
      cancelUrl: `${baseUrl}/payment/cancel?transactionId=${merchantTransactionId}`,
      errorUrl: `${baseUrl}/payment/error?transactionId=${merchantTransactionId}`,
      callbackUrl: `${baseUrl}/api/payment/callback`,
      customer: {
        firstName: customerName.split(' ')[0] || customerName,
        lastName: customerName.split(' ').slice(1).join(' ') || '',
        email: customerEmail,
        company: 'Life Horizon',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1'
      },
      language: 'en'
    };

    console.log('بيانات الدفع المرسلة:', paymentData);

    // إرسال الطلب إلى بوابة الدفع
    const areebaUrl = `${AREEBA_CONFIG.BASE_URL}/transaction/${AREEBA_CONFIG.API_KEY}/debit`;
    console.log('URL المستهدف:', areebaUrl);
    
    const response = await fetch(areebaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'LifeHorizon-GameStore/1.0',
        'Authorization': `Basic ${getBase64Auth()}`,
      },
      body: JSON.stringify(paymentData),
    });

    console.log('Areeba Response Status:', response.status);
    console.log('Areeba Response Headers:', Object.fromEntries(response.headers.entries()));

    let result;
    try {
      result = await response.json();
      console.log('استجابة بوابة الدفع:', result);
    } catch (jsonError) {
      console.error('Error parsing Areeba response:', jsonError);
      const responseText = await response.text();
      console.log('Areeba Response Text:', responseText);
      
      return NextResponse.json(
        { error: 'خطأ في الاتصال ببوابة الدفع' },
        { status: 500 }
      );
    }

    if (!response.ok) {
      console.error('خطأ في بوابة الدفع:', result);
      return NextResponse.json(
        { error: 'خطأ في الاتصال ببوابة الدفع', details: result },
        { status: response.status }
      );
    }

    // التحقق من نوع الاستجابة
    if (result.returnType === 'REDIRECT' && result.redirectUrl) {
      console.log(`✅ تم إنشاء معاملة بنجاح: ${merchantTransactionId}`);
      console.log(`رابط التوجيه: ${result.redirectUrl}`);
      
      return NextResponse.json({
        success: true,
        redirectUrl: result.redirectUrl,
        transactionId: merchantTransactionId,
        amount: amount,
        currency: currency,
        uuid: result.uuid,
        purchaseId: result.purchaseId
      });
    } else if (result.success && (result.redirectUrl || result.paymentUrl || result.url)) {
      // دعم الاستجابة البديلة
      const paymentUrl = result.redirectUrl || result.paymentUrl || result.url;
      console.log(`✅ تم إنشاء معاملة بنجاح: ${merchantTransactionId}`);
      console.log(`رابط التوجيه: ${paymentUrl}`);
      
      return NextResponse.json({
        success: true,
        redirectUrl: paymentUrl,
        transactionId: merchantTransactionId,
        amount: amount,
        currency: currency,
        uuid: result.uuid,
        purchaseId: result.purchaseId
      });
    } else {
      console.error('استجابة غير متوقعة من بوابة الدفع:', result);
      return NextResponse.json(
        { error: 'استجابة غير متوقعة من بوابة الدفع', details: result },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('خطأ في معالجة الدفع:', error);
    return NextResponse.json(
      { error: 'خطأ داخلي في الخادم' },
      { status: 500 }
    );
  }
}
