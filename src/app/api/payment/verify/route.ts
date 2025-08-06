import { NextRequest, NextResponse } from 'next/server';

// إعدادات للـ API route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      transactionId,
      merchantId,
      apiKey,
      username,
      password
    } = body;

    if (!transactionId) {
      return NextResponse.json({
        success: false,
        error: 'معرف المعاملة مطلوب'
      }, { status: 400 });
    }

    // التحقق من حالة الدفع مع Areeba
    const verifyData = {
      merchant_id: merchantId || 'IQ3093980103',
      api_key: apiKey || 'TESTKEYIQ3093980103',
      username: username || 'Ali.112233445566',
      password: password || 'Zxxznmmn@123',
      transaction_id: transactionId
    };

    // إرسال طلب التحقق إلى Areeba
    const areebaResponse = await fetch('https://gateway.areebapayment.com/api/v3/transaction/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(verifyData)
    });

    const areebaResult = await areebaResponse.json();

    console.log('Areeba Verification Response:', areebaResult);

    // معالجة استجابة التحقق
    if (areebaResult.success || areebaResult.status === 'success' || areebaResult.payment_status === 'completed') {
      return NextResponse.json({
        success: true,
        transactionId,
        message: 'تم التحقق من الدفع بنجاح'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: areebaResult.message || areebaResult.error || 'فشل في التحقق من الدفع'
      });
    }

  } catch (error) {
    console.error('خطأ في التحقق من الدفع:', error);
    return NextResponse.json({
      success: false,
      error: 'حدث خطأ في التحقق من الدفع'
    }, { status: 500 });
  }
} 