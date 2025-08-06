import { NextRequest, NextResponse } from 'next/server';

// إعدادات للـ API route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('=== CALLBACK POST RECEIVED ===');
    console.log('Body:', JSON.stringify(body, null, 2));
    console.log('Headers:', Object.fromEntries(request.headers.entries()));

    // استخراج البيانات من body
    const {
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
      code,
      merchantTransactionId,
      returnType,
      redirectUrl
    } = body;

    console.log('=== EXTRACTED FIELDS ===');
    console.log('transactionId:', transactionId);
    console.log('status:', status);
    console.log('success:', success);
    console.log('code:', code);
    console.log('message:', message);
    console.log('uuid:', uuid);
    console.log('purchaseId:', purchaseId);
    console.log('returnType:', returnType);
    console.log('redirectUrl:', redirectUrl);

    // منطق محسن لتحديد نجاح الدفع
    const isSuccess = 
      status === 'success' || 
      success === true || 
      code === 'success' || 
      message?.toLowerCase().includes('success') ||
      (uuid && purchaseId) ||
      returnType === 'REDIRECT';

    console.log('=== SUCCESS DETERMINATION ===');
    console.log('isSuccess:', isSuccess);
    console.log('status === success:', status === 'success');
    console.log('success === true:', success === true);
    console.log('code === success:', code === 'success');
    console.log('message includes success:', message?.toLowerCase().includes('success'));
    console.log('has uuid and purchaseId:', !!(uuid && purchaseId));
    console.log('returnType === REDIRECT:', returnType === 'REDIRECT');

    const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`;
    const errorUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/error`;

    console.log('=== REDIRECTING ===');
    console.log('Success URL:', successUrl);
    console.log('Error URL:', errorUrl);

    if (isSuccess) {
      console.log('Redirecting to SUCCESS');
      return NextResponse.redirect(successUrl);
    } else {
      console.log('Redirecting to ERROR');
      return NextResponse.redirect(errorUrl);
    }
  } catch (error) {
    console.error('=== CALLBACK ERROR ===');
    console.error('Error processing callback:', error);
    
    const errorUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/error`;
    return NextResponse.redirect(errorUrl);
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    console.log('=== CALLBACK GET RECEIVED ===');
    console.log('Search params:', Object.fromEntries(searchParams.entries()));

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

    console.log('=== EXTRACTED GET PARAMS ===');
    console.log('transactionId:', transactionId);
    console.log('status:', status);
    console.log('success:', success);
    console.log('code:', code);
    console.log('message:', message);
    console.log('uuid:', uuid);
    console.log('purchaseId:', purchaseId);
    console.log('returnType:', returnType);
    console.log('redirectUrl:', redirectUrl);

    // منطق محسن لتحديد نجاح الدفع
    const isSuccess = 
      status === 'success' || 
      success === 'true' || 
      code === 'success' || 
      message?.toLowerCase().includes('success') ||
      (uuid && purchaseId) ||
      returnType === 'REDIRECT';

    console.log('=== SUCCESS DETERMINATION (GET) ===');
    console.log('isSuccess:', isSuccess);
    console.log('status === success:', status === 'success');
    console.log('success === true:', success === 'true');
    console.log('code === success:', code === 'success');
    console.log('message includes success:', message?.toLowerCase().includes('success'));
    console.log('has uuid and purchaseId:', !!(uuid && purchaseId));
    console.log('returnType === REDIRECT:', returnType === 'REDIRECT');

    const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`;
    const errorUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/error`;

    console.log('=== REDIRECTING (GET) ===');
    console.log('Success URL:', successUrl);
    console.log('Error URL:', errorUrl);

    if (isSuccess) {
      console.log('Redirecting to SUCCESS (GET)');
      return NextResponse.redirect(successUrl);
    } else {
      console.log('Redirecting to ERROR (GET)');
      return NextResponse.redirect(errorUrl);
    }
  } catch (error) {
    console.error('=== CALLBACK GET ERROR ===');
    console.error('Error processing GET callback:', error);
    
    const errorUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/error`;
    return NextResponse.redirect(errorUrl);
  }
} 