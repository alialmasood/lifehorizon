# تكامل بوابة الدفع أريبا - دليل مفصل

## نظرة عامة

هذا الدليل يوضح كيفية تكامل بوابة الدفع الخاصة بشركة أريبا في تطبيق Next.js، مطابق تماماً لتعليمات Postman المقدمة.

## البيانات المطلوبة

### بيانات المصادقة
```typescript
API_KEY: 'TESTKEYIQ3093980103'
USERNAME: 'Ali.112233445566'
PASSWORD: 'Zxxznmmn@123'
MERCHANT_ID: 'IQ3093980103'
```

### Basic Auth
```typescript
// Concatenation: Ali.112233445566:Zxxznmmn@123
// Base64 encoded: QWxpLjExMjIzMzQ0NTU2NjpaeHh6bm1tbkAxMjM=
```

## إعداد الطلب

### 1. الرابط (URL)
```
POST https://gateway.areebapayment.com/api/v3/transaction/TESTKEYIQ3093980103/debit
```

### 2. Headers
```json
{
  "Content-Type": "application/json",
  "Authorization": "Basic QWxpLjExMjIzMzQ0NTU2NjpaeHh6bm1tbkAxMjM="
}
```

### 3. Body (JSON)
```json
{
  "merchantTransactionId": "TXN123456789",
  "amount": "1000",
  "currency": "IQD",
  "successUrl": "https://example.com/payment/success",
  "cancelUrl": "https://example.com/payment/cancel",
  "errorUrl": "https://example.com/payment/error",
  "callbackUrl": "https://example.com/api/payment/callback",
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "company": "Life Horizon",
    "ipAddress": "127.0.0.1"
  },
  "language": "en"
}
```

## الاستجابة المتوقعة

### نجاح الطلب
```json
{
  "returnType": "REDIRECT",
  "redirectUrl": "https://gateway.areebapayment.com/redirect/0c571fd3c105002a924f/Y2YzYTY5Nzk1M2I2MDFlOTJlMGY4NDZjZmIyZGYwOTQwNmE1Yzg3MGMyMDM1NDI1OTZmMzNjZGU0MGQyYTVmNDM1NmIxYTIxMjliMDZhYTBmMzkxZDIxMWM4YzQ3ZTk1MWUwMTcwNmU2ZGZlNDU2Y2RmNGVlZjMzYzIwZTYyMmI=",
  "merchantTransactionId": "TXN123456789",
  "uuid": "0c571fd3c105002a924f",
  "purchaseId": "purchase_123456"
}
```

### رابط التوجيه
الرابط المستلم من `redirectUrl` سيوجه المستخدم إلى بوابة الدفع الحقيقية من أريبا، مثل:
```
https://gateway.areebapayment.com/redirect/0c571fd3c105002a924f/Y2YzYTY5Nzk1M2I2MDFlOTJlMGY4NDZjZmIyZGYwOTQwNmE1Yzg3MGMyMDM1NDI1OTZmMzNjZGU0MGQyYTVmNDM1NmIxYTIxMjliMDZhYTBmMzkxZDIxMWM4YzQ3ZTk1MWUwMTcwNmU2ZGZlNDU2Y2RmNGVlZjMzYzIwZTYyMmI=
```

## كيفية العمل في التطبيق

### 1. بدء عملية الدفع
```typescript
// في صفحة checkout
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const response = await fetch('/api/payment/initiate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: parseFloat(amount),
      customerEmail: formData.customerEmail,
      customerName: formData.cardholderName,
      gameId: gameId,
      gameTitle: gameTitle,
      currency: 'USD'
    }),
  });

  const result = await response.json();
  if (result.success && result.redirectUrl) {
    // توجيه مباشر إلى بوابة الدفع
    window.location.href = result.redirectUrl;
  }
};
```

### 2. إنشاء المعاملة
```typescript
// في API route (/api/payment/initiate)
const paymentData = {
  merchantTransactionId: generateTransactionId(), // TXN123456789
  amount: amount.toString(),
  currency: currency,
  successUrl: `${request.nextUrl.origin}/payment/success?transactionId=${merchantTransactionId}&amount=${amount}&currency=${currency}${gameId ? `&game_id=${gameId}` : ''}${gameTitle ? `&game_title=${encodeURIComponent(gameTitle)}` : ''}`,
  cancelUrl: `${request.nextUrl.origin}/payment/cancel?transactionId=${merchantTransactionId}`,
  errorUrl: `${request.nextUrl.origin}/payment/error?transactionId=${merchantTransactionId}`,
  callbackUrl: `${request.nextUrl.origin}/api/payment/callback`,
  customer: {
    firstName: customerName.split(' ')[0] || customerName,
    lastName: customerName.split(' ').slice(1).join(' ') || '',
    email: customerEmail,
    company: 'Life Horizon',
    ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1'
  },
  language: 'en'
};
```

### 3. إرسال الطلب
```typescript
const response = await fetch(
  `${AREEBA_CONFIG.BASE_URL}/transaction/${AREEBA_CONFIG.API_KEY}/debit`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'LifeHorizon-GameStore/1.0',
      'Authorization': `Basic ${getBase64Auth()}`,
    },
    body: JSON.stringify(paymentData),
  }
);
```

### 4. التوجيه إلى بوابة الدفع
```typescript
const result = await response.json();
if (result.returnType === 'REDIRECT' && result.redirectUrl) {
  return NextResponse.json({
    success: true,
    redirectUrl: result.redirectUrl,
    transactionId: merchantTransactionId,
    amount: amount,
    currency: currency,
    uuid: result.uuid,
    purchaseId: result.purchaseId
  });
}
```

## تدفق الدفع المحسن

### 1. المستخدم يضغط "شراء الآن"
```
/services/game-store → /payment/checkout?amount=9.99&game_id=game_123&game_title=Test%20Game
```

### 2. المستخدم يدخل بيانات البطاقة ويضغط "إتمام الدفع"
```
/payment/checkout → POST /api/payment/initiate → بوابة الدفع أريبا
```

### 3. بوابة الدفع تعالج الدفع وتعيد المستخدم
```
بوابة الدفع أريبا → POST/GET /api/payment/callback → /payment/success أو /payment/error
```

### 4. المستخدم يرى النتيجة النهائية
```
/payment/success → تحميل اللعبة
/payment/error → إعادة المحاولة
```

## اختبار النظام

### 1. تشغيل التطبيق
```bash
npm run dev
```

### 2. اختبار بوابة أريبا مباشرة
```bash
npm run test-areeba
```
هذا الأمر سيرسل طلب مباشر إلى بوابة أريبا ويظهر النتيجة.

### 3. اختبار API المحلي
```bash
npm run test-local
```
هذا الأمر يختبر API المحلي للتأكد من عمله بشكل صحيح.

### 4. فتح المتصفح
```
http://localhost:3000
```

### 5. اختبار الدفع من الواجهة
- اذهب إلى `/services/game-store`
- اضغط على "شراء الآن" لأي لعبة
- أدخل بيانات البطاقة التجريبية
- اضغط على "إتمام الدفع"
- ستتم توجيهك مباشرة إلى بوابة الدفع من أريبا
- بعد إتمام الدفع، ستتم إعادتك إلى صفحة النجاح أو الخطأ

### 6. اختبار API مباشرة
```bash
curl -X POST http://localhost:3000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 9.99,
    "customerEmail": "test@example.com",
    "customerName": "Test User",
    "gameId": "game_123",
    "gameTitle": "Test Game",
    "currency": "USD"
  }'
```

## بيانات البطاقة التجريبية

```json
{
  "cardNumber": "5123 4500 0000 0008",
  "expiryDate": "01/39",
  "securityCode": "123",
  "cardholderName": "test"
}
```

## صفحات الدفع

### 1. صفحة Checkout
```
/payment/checkout?amount=9.99&game_id=game_123&game_title=Test%20Game
```

### 2. صفحة النجاح
```
/payment/success?transactionId=TXN123456789&amount=9.99&currency=USD&game_id=game_123&game_title=Test%20Game
```

### 3. صفحة الخطأ
```
/payment/error?transactionId=TXN123456789&error=Payment%20failed
```

### 4. صفحة الإلغاء
```
/payment/cancel?transactionId=TXN123456789
```

## API Routes

### 1. إنشاء الدفع (المفضل)
```
POST /api/payment/initiate
```

### 2. إنشاء الدفع (الطريقة البديلة)
```
POST /api/payment/create
```

### 3. التحقق من الدفع
```
POST /api/payment/verify
```

### 4. استقبال Callback
```
POST /api/payment/callback
GET /api/payment/callback
```

## ملاحظات مهمة

1. **merchantTransactionId**: يجب أن يكون فريداً في كل طلب
2. **currency**: استخدم "IQD" للدينار العراقي
3. **amount**: استخدم "1000" للمبلغ (1000 دينار عراقي)
4. **URLs**: تأكد من أن الروابط صحيحة وقابلة للوصول
5. **Basic Auth**: تأكد من صحة بيانات المصادقة
6. **Customer Data**: تأكد من إرسال بيانات العميل الصحيحة
7. **IP Address**: استخدم IP العميل الحقيقي في الإنتاج
8. **التدفق المباشر**: لا توجد صفحة process - التوجيه مباشر من checkout إلى بوابة الدفع

## استكشاف الأخطاء

### خطأ 401 (Unauthorized)
- تحقق من صحة بيانات المصادقة
- تأكد من Base64 encoding
- تحقق من صحة API Key

### خطأ 400 (Bad Request)
- تحقق من صحة JSON format
- تأكد من وجود جميع الحقول المطلوبة
- تحقق من صحة بيانات العميل

### خطأ 500 (Internal Server Error)
- تحقق من صحة API Key
- تأكد من أن الحساب مفعل
- تحقق من صحة URLs

### خطأ في Callback
- تحقق من صحة callback URL
- تأكد من أن الخادم يستقبل POST/GET requests
- تحقق من معالجة البيانات المستلمة

### مشاكل في التوجيه
- تأكد من أن جميع URLs صحيحة
- تحقق من أن callback يعيد البيانات المطلوبة
- تأكد من أن صفحات النجاح والخطأ تعمل بشكل صحيح

## المراجع

- [بوابة الدفع أريبا](https://gateway.areebapayment.com)
- [تعليمات Postman](https://gateway.areebapayment.com/redirect/0c571fd3c105002a924f/Y2YzYTY5Nzk1M2I2MDFlOTJlMGY4NDZjZmIyZGYwOTQwNmE1Yzg3MGMyMDM1NDI1OTZmMzNjZGU0MGQyYTVmNDM1NmIxYTIxMjliMDZhYTBmMzkxZDIxMWM4YzQ3ZTk1MWUwMTcwNmU2ZGZlNDU2Y2RmNGVlZjMzYzIwZTYyMmI=)

---

© 2024 Life Horizon - جميع الحقوق محفوظة
