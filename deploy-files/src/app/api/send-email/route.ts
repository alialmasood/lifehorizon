import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// بريد المسؤول المسجل في Resend
const ADMIN_EMAIL = "info@lifehorizonit.com"; // قم بتغيير هذا إلى بريدك المسجل في Resend

export async function POST(request: Request) {
  try {
    console.log('=== بدء معالجة طلب إرسال البريد الإلكتروني ===');
    
    // التحقق من مفتاح API
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY غير موجود في متغيرات البيئة');
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const data = await request.json();
    const { fullName, email, phone, course } = data;
    
    console.log('البيانات المستلمة:', {
      fullName,
      email,
      phone,
      course,
      apiKey: process.env.RESEND_API_KEY?.substring(0, 5) + '...'
    });

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(`بريد إلكتروني غير صالح: ${email}`);
    }

    console.log('=== إرسال بريد إلى المسؤول ===');
    
    // رسالة المسؤول
    const adminEmailOptions = {
      from: "Resend <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: `تسجيل جديد: ${course} - ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px;">
              <h2 style="color: #1a56db; margin-bottom: 20px;">تسجيل جديد في الدورات</h2>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p><strong>الاسم:</strong> ${fullName}</p>
                <p><strong>البريد الإلكتروني:</strong> ${email}</p>
                <p><strong>رقم الهاتف:</strong> <span dir="ltr">${phone}</span></p>
                <p><strong>الدورة:</strong> ${course}</p>
              </div>
              <p style="color: #666; font-size: 12px; text-align: center;">
                هذه رسالة آلية من نظام التسجيل
              </p>
            </div>
          </body>
        </html>
      `,
      text: `تسجيل جديد في الدورات\n\nالاسم: ${fullName}\nالبريد الإلكتروني: ${email}\nرقم الهاتف: ${phone}\nالدورة: ${course}`,
      reply_to: email
    };

    // إرسال بريد المسؤول
    const adminEmailData = await resend.emails.send(adminEmailOptions);
    console.log('تم إرسال بريد المسؤول:', JSON.stringify(adminEmailData, null, 2));

    // رسالة المستخدم
    console.log('=== إرسال بريد إلى المستخدم ===');
    const userEmailOptions = {
      from: "Resend <onboarding@resend.dev>",
      to: [ADMIN_EMAIL], // نرسل إلى المسؤول مؤقتاً حتى يتم تفعيل الحساب
      subject: `تأكيد التسجيل في ${course} - شركة أفق الحياة`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px;">
              <h2 style="color: #1a56db; margin-bottom: 20px;">مرحباً ${fullName}،</h2>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p>شكراً لتسجيلك في <strong>${course}</strong>.</p>
                <p>تم استلام طلبك وسيتم مراجعته من قبل فريقنا.</p>
                <p>سنتواصل معك قريباً على الرقم <span dir="ltr">${phone}</span> لتأكيد التسجيل وتحديد موعد بدء الدورة.</p>
              </div>
              <p style="margin-top: 20px;">مع تحيات،<br><strong>فريق شركة أفق الحياة</strong></p>
              <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="color: #666; font-size: 12px; text-align: center;">
                هذه رسالة آلية، يرجى عدم الرد عليها.<br>
                للتواصل: info@lifehorizonit.com | هاتف: 009647822110731
              </p>
            </div>
          </body>
        </html>
      `,
      text: `مرحباً ${fullName}،\n\nشكراً لتسجيلك في ${course}.\n\nتم استلام طلبك وسيتم مراجعته من قبل فريقنا.\nسنتواصل معك قريباً على الرقم ${phone} لتأكيد التسجيل وتحديد موعد بدء الدورة.\n\nمع تحيات،\nفريق شركة أفق الحياة\n\n---\nللتواصل: info@lifehorizonit.com | هاتف: 009647822110731`,
      reply_to: "info@lifehorizonit.com"
    };

    // إرسال بريد المستخدم
    const userEmailData = await resend.emails.send(userEmailOptions);
    console.log('تم إرسال بريد المستخدم:', JSON.stringify(userEmailData, null, 2));

    return NextResponse.json({
      success: true,
      message: 'تم استلام طلب التسجيل وسيتم التواصل معك قريباً',
      data: {
        adminEmail: adminEmailData,
        userEmail: userEmailData
      }
    });

  } catch (error: any) {
    console.error('=== خطأ في العملية ===');
    console.error({
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
      response: error.response?.body
    });

    return NextResponse.json(
      {
        success: false,
        error: 'فشل في إرسال البريد الإلكتروني',
        details: {
          message: error.message,
          code: error.code,
          response: error.response?.body
        }
      },
      { status: 500 }
    );
  }
} 