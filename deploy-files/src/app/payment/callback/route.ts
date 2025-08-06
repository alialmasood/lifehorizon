import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== معالجة استجابة Areeba (POST) ===');
    
    const body = await request.json();
    console.log('بيانات الاستجابة من Areeba (POST):', body);
    
    const {
      transactionId,
      status,
      amount,
      currency,
      orderId,
      paymentMethod,
      errorCode,
      errorMessage,
      // إضافة المزيد من الحقول المحتملة
      uuid,
      purchaseId,
      success,
      message,
      code
    } = body;

    console.log('الحقول المستخرجة:', {
      transactionId,
      status,
      amount,
      currency,
      orderId,
      paymentMethod,
      errorCode,
      errorMessage,
      uuid,
      purchaseId,
      success,
      message,
      code
    });

    // التحقق من حالة الدفع - تحسين المنطق
    const isSuccess = status === 'success' || 
                     status === 'completed' || 
                     success === true || 
                     code === 'success' ||
                     (message && message.toLowerCase().includes('success'));

    if (isSuccess) {
      console.log('تم إتمام الدفع بنجاح ✅');
      
      // توجيه إلى صفحة النجاح
      const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success?transaction_id=${transactionId || uuid || purchaseId}&amount=${amount}&currency=${currency}`;
      
      return NextResponse.json({
        success: true,
        redirectUrl: successUrl,
        message: 'تم إتمام الدفع بنجاح'
      });
    } else {
      console.log('فشل في الدفع ❌:', errorMessage || message);
      
      // توجيه إلى صفحة الخطأ
      const errorUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/error?error=${encodeURIComponent(errorMessage || message || 'فشل في الدفع')}`;
      
      return NextResponse.json({
        success: false,
        redirectUrl: errorUrl,
        error: errorMessage || message || 'فشل في الدفع'
      });
    }

  } catch (error) {
    console.error('خطأ في معالجة استجابة Areeba (POST):', error);
    
    const errorUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/error?error=${encodeURIComponent('حدث خطأ في معالجة الدفع')}`;
    
    return NextResponse.json({
      success: false,
      redirectUrl: errorUrl,
      error: 'حدث خطأ في معالجة الدفع'
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('=== معالجة GET callback من Areeba ===');
    
    const searchParams = request.nextUrl.searchParams;
    const transactionId = searchParams.get('transaction_id');
    const status = searchParams.get('status');
    const amount = searchParams.get('amount');
    const currency = searchParams.get('currency');
    const errorCode = searchParams.get('error_code');
    const errorMessage = searchParams.get('error_message');
    const uuid = searchParams.get('uuid');
    const purchaseId = searchParams.get('purchaseId');
    const success = searchParams.get('success');
    const message = searchParams.get('message');
    const code = searchParams.get('code');
    
    console.log('معاملات URL:', {
      transactionId,
      status,
      amount,
      currency,
      errorCode,
      errorMessage,
      uuid,
      purchaseId,
      success,
      message,
      code
    });

    // التحقق من حالة الدفع - تحسين المنطق
    const isSuccess = status === 'success' || 
                     status === 'completed' || 
                     success === 'true' || 
                     code === 'success' ||
                     (message && message.toLowerCase().includes('success'));

    if (isSuccess) {
      console.log('تم إتمام الدفع بنجاح ✅');
      
      // توجيه إلى صفحة النجاح
      const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success?transaction_id=${transactionId || uuid || purchaseId}&amount=${amount}&currency=${currency}`;
      
      return NextResponse.redirect(successUrl);
    } else {
      console.log('فشل في الدفع ❌:', errorMessage || message);
      
      // توجيه إلى صفحة الخطأ
      const errorUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/error?error=${encodeURIComponent(errorMessage || message || 'فشل في الدفع')}`;
      
      return NextResponse.redirect(errorUrl);
    }

  } catch (error) {
    console.error('خطأ في معالجة GET callback:', error);
    
    const errorUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/error?error=${encodeURIComponent('حدث خطأ في معالجة الدفع')}`;
    
    return NextResponse.redirect(errorUrl);
  }
} 