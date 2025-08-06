# خطوات النشر على Hostinger

## ✅ المشكلة تم حلها:
- تم إزالة `output: 'export'` من `next.config.mjs`
- تم إضافة `export const dynamic = 'force-dynamic'` لجميع API routes
- الآن يمكن بناء التطبيق بدون أخطاء

## 🚀 خطوات النشر:

### 1. بناء التطبيق
```bash
npm run build
```

### 2. إنشاء مجلد النشر
```bash
mkdir deploy-files
```

### 3. نسخ الملفات
```bash
cp -r .next deploy-files/
cp -r public deploy-files/
cp -r src deploy-files/
cp package.json deploy-files/
cp package-lock.json deploy-files/
cp next.config.mjs deploy-files/
cp tailwind.config.ts deploy-files/
cp tsconfig.json deploy-files/
cp ecosystem.config.js deploy-files/
cp postcss.config.mjs deploy-files/
```

### 4. رفع الملفات إلى Hostinger
1. اذهب إلى لوحة تحكم Hostinger
2. اختر "مدير الملفات"
3. انتقل إلى مجلد `public_html/`
4. ارفع جميع محتويات مجلد `deploy-files/`

### 5. تثبيت وتشغيل
```bash
cd public_html
npm install
npm run build
npm start
```

### 6. تكوين Node.js في Hostinger
- اذهب إلى "Node.js" في لوحة التحكم
- اكتب في "Application startup file": `node_modules/next/dist/bin/next start`
- اكتب في "Application root directory": `public_html`

## 🎯 المزايا بعد النشر:

### ✅ الروابط ستكون صحيحة:
```javascript
// في الإنتاج ستستخدم تلقائياً
successUrl: "https://lifehorizonit.com/payment/success"
cancelUrl: "https://lifehorizonit.com/payment/cancel"
errorUrl: "https://lifehorizonit.com/payment/error"
```

### ✅ Areeba سيعمل بشكل صحيح:
- الروابط ستكون قابلة للوصول من الإنترنت
- لن تكون هناك مشكلة 404
- الدفع سيعمل بشكل كامل

## 📋 الملفات المحدثة:
- ✅ `next.config.mjs` - تم إزالة `output: 'export'`
- ✅ `src/app/api/payment/callback/route.ts` - تم إضافة `dynamic = 'force-dynamic'`
- ✅ `src/app/api/payment/create/route.ts` - تم إضافة `dynamic = 'force-dynamic'`
- ✅ `src/app/api/payment/verify/route.ts` - تم إضافة `dynamic = 'force-dynamic'`

## 🎉 النتيجة:
الآن يمكن بناء التطبيق بنجاح ونشره على Hostinger مع دعم كامل لـ API routes! 