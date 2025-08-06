# تعليمات رفع المشروع على Vercel

## الخطوات المطلوبة:

### 1. إعداد Git Repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/lifehorizon.git
git push -u origin main
```

### 2. رفع المشروع على Vercel

#### الطريقة الأولى: عبر Vercel Dashboard
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول أو أنشئ حساب جديد
3. اضغط على "New Project"
4. اختر Git repository الخاص بك
5. اضبط الإعدادات التالية:

#### Environment Variables المطلوبة:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

AREEBA_MERCHANT_ID=IQ3093980103
AREEBA_API_KEY=TESTKEYIQ3093980103
AREEBA_BASE_URL=https://gateway.areebapayment.com/api/v3
AREEBA_USERNAME=Ali.112233445566
AREEBA_PASSWORD=Zxxznmmn@123

NODE_ENV=production
```

#### الطريقة الثانية: عبر Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

### 3. إعدادات Build
- **Framework Preset**: Next.js
- **Root Directory**: ./
- **Build Command**: `npm run build`
- **Output Directory**: .next
- **Install Command**: `npm install`

### 4. إعدادات Domain
- يمكنك إضافة domain مخصص
- أو استخدام subdomain من Vercel

### 5. إعدادات Environment
تأكد من إضافة جميع المتغيرات البيئية في Vercel Dashboard:
1. اذهب إلى Project Settings
2. اختر Environment Variables
3. أضف جميع المتغيرات المذكورة أعلاه

### 6. إعدادات Functions
- تأكد من أن API routes تعمل بشكل صحيح
- قد تحتاج لتعديل timeout للـ functions

## ملاحظات مهمة:

### 1. Firebase Configuration
تأكد من إعداد Firebase بشكل صحيح:
- أنشئ مشروع Firebase جديد
- أضف web app
- انسخ configuration
- أضف Environment Variables

### 2. Areeba Payment Gateway
- تأكد من أن إعدادات Areeba صحيحة
- اختبر الـ payment gateway في بيئة التطوير أولاً

### 3. API Routes
- تأكد من أن جميع API routes تعمل
- اختبر الـ endpoints قبل الـ deployment

### 4. Static Assets
- تأكد من أن جميع الصور والملفات الثابتة متاحة
- استخدم CDN للصور الكبيرة

## Troubleshooting:

### مشاكل شائعة:
1. **Build Errors**: تحقق من TypeScript errors
2. **Environment Variables**: تأكد من إضافة جميع المتغيرات
3. **API Errors**: تحقق من logs في Vercel Dashboard
4. **CORS Issues**: تأكد من إعدادات CORS

### للتحقق من الـ deployment:
1. اذهب إلى Vercel Dashboard
2. اختر مشروعك
3. تحقق من Deployments tab
4. تحقق من Functions tab للـ API routes

## روابط مفيدة:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
