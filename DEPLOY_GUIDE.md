# دليل النشر السريع على Hostinger

## 🚀 خطوات النشر:

### 1. تحضير الملفات
```powershell
# تشغيل سكريبت النشر
.\deploy-hostinger.ps1
```

### 2. رفع الملفات إلى Hostinger
1. **اذهب إلى لوحة تحكم Hostinger**
2. **اختر "مدير الملفات"**
3. **انتقل إلى مجلد `public_html/`**
4. **ارفع جميع محتويات مجلد `deploy-files/`**

### 3. تثبيت التبعيات
```bash
cd public_html
npm install
```

### 4. بناء التطبيق
```bash
npm run build
```

### 5. تكوين Node.js في Hostinger
1. **اذهب إلى "Node.js" في لوحة التحكم**
2. **انقر على "تثبيت"**
3. **اختر أحدث إصدار مستقر (18.x أو أحدث)**
4. **في "Application startup file" اكتب:**
   ```
   node_modules/next/dist/bin/next start
   ```
5. **في "Application root directory" اكتب:**
   ```
   public_html
   ```
6. **احفظ التغييرات**

### 6. تشغيل التطبيق
```bash
npm start
```

## ✅ التحقق من النشر:

### 1. اختبار الروابط
- **الرئيسية:** `https://lifehorizonit.com`
- **متجر الألعاب:** `https://lifehorizonit.com/services/game-store`
- **صفحة النجاح:** `https://lifehorizonit.com/payment/success`
- **صفحة الخطأ:** `https://lifehorizonit.com/payment/error`

### 2. اختبار الدفع
1. **اذهب إلى متجر الألعاب**
2. **اختر لعبة**
3. **اضغط "شراء"**
4. **املأ البيانات**
5. **اختبر الدفع مع Areeba**

## 🔧 إعدادات مهمة:

### 1. SSL Certificate
- **تأكد من تفعيل SSL على النطاق**
- **جميع الروابط يجب أن تستخدم HTTPS**

### 2. Environment Variables
```bash
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://lifehorizonit.com
NEXT_PUBLIC_SITE_URL=https://lifehorizonit.com
```

### 3. Areeba Configuration
```javascript
// الروابط في الإنتاج
successUrl: "https://lifehorizonit.com/payment/success"
cancelUrl: "https://lifehorizonit.com/payment/cancel"
errorUrl: "https://lifehorizonit.com/payment/error"
callbackUrl: "https://lifehorizonit.com/admin/games/test-callback"
```

## 🐛 حل المشاكل:

### 1. إذا لم يعمل الموقع:
- **تحقق من سجلات الأخطاء في لوحة التحكم**
- **تأكد من أن Node.js يعمل**
- **تحقق من صحة مسار التطبيق**

### 2. إذا لم تعمل الروابط:
- **تأكد من أن جميع الصفحات موجودة**
- **تحقق من إعدادات إعادة التوجيه**
- **تأكد من صحة ملف .htaccess**

### 3. إذا لم يعمل الدفع:
- **تحقق من إعدادات Areeba**
- **تأكد من صحة الروابط**
- **راقب سجلات الأخطاء**

## 📞 الدعم:
إذا واجهت أي مشاكل، راجع:
- **سجلات الأخطاء في لوحة تحكم Hostinger**
- **Console في المتصفح (F12)**
- **سجلات Node.js في Terminal**

## 🎉 بعد النشر:
1. **اختبر جميع الروابط**
2. **اختبر عملية الدفع**
3. **تأكد من عمل جميع الميزات**
4. **راقب الأداء والأخطاء** 