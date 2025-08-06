# دليل اختبار بوابة الدفع أريبا

## نظرة عامة

هذا الدليل يوضح كيفية اختبار بوابة الدفع أريبا في المشروع، سواء من خلال الواجهة أو مباشرة عبر API.

## الملفات المطلوبة

### 1. تثبيت التبعيات
```bash
npm install
```

### 2. تشغيل التطبيق
```bash
npm run dev
```

**ملاحظة:** التطبيق سيعمل على البورت 3000 تلقائياً
```
http://localhost:3000
```

## طرق الاختبار

### الطريقة الأولى: اختبار بوابة أريبا مباشرة

هذا الاختبار يرسل طلب مباشر إلى بوابة أريبا بدون المرور بالتطبيق:

```bash
npm run test-areeba
```

**النتيجة المتوقعة:**
```
🧪 اختبار بوابة الدفع أريبا
==================================================
🚀 بدء اختبار طلب أريبا - مطابق لتعليمات Postman...
📋 بيانات الطلب: {
  "merchantTransactionId": "TXN1234567890",
  "amount": "1000",
  "currency": "USD",
  "successUrl": "http://localhost:3000/payment/success",
  "cancelUrl": "http://localhost:3000/payment/cancel",
  "errorUrl": "http://localhost:3000/payment/error",
  "callbackUrl": "http://localhost:3000/api/payment/callback",
  "customer": {
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "company": "Life Horizon",
    "ipAddress": "127.0.0.1"
  },
  "language": "en"
}

📊 رمز الاستجابة: 200
📄 استجابة أريبا: {
  "returnType": "REDIRECT",
  "redirectUrl": "https://gateway.areebapayment.com/redirect/...",
  "merchantTransactionId": "TXN1234567890",
  "uuid": "0c571fd3c105002a924f",
  "purchaseId": "purchase_123456"
}

✅ تم إنشاء المعاملة بنجاح!
🔗 رابط التوجيه: https://gateway.areebapayment.com/redirect/...
📝 معرف المعاملة: TXN1234567890
🆔 UUID: 0c571fd3c105002a924f
🛒 Purchase ID: purchase_123456
```

### الطريقة الثانية: اختبار API المحلي

هذا الاختبار يختبر API المحلي للتأكد من عمله:

```bash
npm run test-local
```

**النتيجة المتوقعة:**
```
🧪 اختبار API المحلي
==================================================
📋 بيانات الاختبار: {
  "amount": 9.99,
  "customerEmail": "test@example.com",
  "customerName": "Test User",
  "gameId": "game_123",
  "gameTitle": "Test Game",
  "currency": "USD"
}

📊 رمز الاستجابة: 200
📄 استجابة API المحلي: {
  "success": true,
  "redirectUrl": "https://gateway.areebapayment.com/redirect/...",
  "transactionId": "TXN1234567890",
  "amount": 9.99,
  "currency": "USD",
  "uuid": "0c571fd3c105002a924f",
  "purchaseId": "purchase_123456"
}

✅ تم إنشاء المعاملة بنجاح!
🔗 رابط التوجيه: https://gateway.areebapayment.com/redirect/...
📝 معرف المعاملة: TXN1234567890
💰 المبلغ: 9.99
💱 العملة: USD
```

### الطريقة الثالثة: اختبار من الواجهة

1. **افتح المتصفح:**
   ```
   http://localhost:3000
   ```

2. **اذهب إلى متجر الألعاب:**
   ```
   http://localhost:3000/services/game-store
   ```

3. **اضغط على "شراء الآن" لأي لعبة**

4. **ستتم توجيهك مباشرة إلى صفحة الدفع**

5. **في صفحة الدفع:**
   - ستجد البيانات مملوءة مسبقاً ببيانات البطاقة التجريبية
   - يمكنك تعديلها أو استخدامها كما هي
   - اضغط "إتمام الدفع"

6. **ستتم توجيهك إلى بوابة الدفع أريبا**

7. **أكمل عملية الدفع في البوابة**

8. **ستتم إعادتك إلى صفحة النجاح أو الخطأ**

## بيانات البطاقة التجريبية

```json
{
  "cardNumber": "5123 4500 0000 0008",
  "expiryDate": "01/39",
  "securityCode": "123",
  "cardholderName": "test",
  "email": "test@example.com"
}
```

## مراقبة السجلات

### مراقبة console التطبيق
```bash
# في terminal التطبيق
npm run dev
```

### مراقبة callback
عندما يتم إتمام الدفع، ستظهر رسائل في console مثل:
```
استلام إشعار دفع من بوابة أريبا: { ... }
✅ تم الدفع بنجاح للمعاملة: TXN1234567890
Redirecting to SUCCESS: http://localhost:3000/payment/success?transactionId=TXN1234567890&amount=1000&currency=USD
```

## استكشاف الأخطاء

### خطأ في اختبار أريبا المباشر
```bash
# تأكد من صحة البيانات
npm run test-areeba
```

**الأخطاء المحتملة:**
- `401 Unauthorized`: تحقق من صحة بيانات المصادقة
- `400 Bad Request`: تحقق من صحة JSON format
- `500 Internal Server Error`: تحقق من صحة API Key

### خطأ في اختبار API المحلي
```bash
# تأكد من تشغيل التطبيق أولاً
npm run dev

# ثم اختبر API
npm run test-local
```

**الأخطاء المحتملة:**
- `ECONNREFUSED`: تأكد من تشغيل التطبيق
- `404 Not Found`: تحقق من صحة مسار API
- `500 Internal Server Error`: تحقق من logs التطبيق

### خطأ في الواجهة
1. **تحقق من console المتصفح (F12)**
2. **تحقق من Network tab**
3. **تحقق من console التطبيق**

## اختبار Callback

### محاكاة callback ناجح
```bash
curl -X POST http://localhost:3000/api/payment/callback \
  -H "Content-Type: application/json" \
  -d '{
    "merchantTransactionId": "TXN1234567890",
    "status": "SUCCESS",
    "amount": "1000",
    "currency": "USD",
    "uuid": "0c571fd3c105002a924f",
    "purchaseId": "purchase_123456"
  }'
```

### محاكاة callback فاشل
```bash
curl -X POST http://localhost:3000/api/payment/callback \
  -H "Content-Type: application/json" \
  -d '{
    "merchantTransactionId": "TXN1234567890",
    "status": "FAILED",
    "errorCode": "CARD_DECLINED",
    "errorMessage": "Card was declined"
  }'
```

## النتائج المتوقعة

### نجاح الدفع
- توجيه إلى: `/payment/success`
- عرض تفاصيل المعاملة
- إمكانية تحميل اللعبة

### فشل الدفع
- توجيه إلى: `/payment/error`
- عرض رسالة الخطأ
- إمكانية إعادة المحاولة

### إلغاء الدفع
- توجيه إلى: `/payment/cancel`
- عرض رسالة الإلغاء
- إمكانية العودة للمتجر

## ملاحظات مهمة

1. **تأكد من تشغيل التطبيق قبل الاختبار**
2. **استخدم البيانات التجريبية فقط**
3. **راقب console للتأكد من عمل callback**
4. **تحقق من صحة URLs في الإنتاج**
5. **اختبر جميع سيناريوهات الدفع (نجاح، فشل، إلغاء)**

---

© 2024 Life Horizon - جميع الحقوق محفوظة
