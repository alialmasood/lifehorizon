# 🚀 دليل النشر على Vercel - Life Horizon

## 📋 المتطلبات المسبقة

### 1. إعداد Git Repository
```bash
# تهيئة Git repository
git init
git add .
git commit -m "Initial commit - Life Horizon Game Store"
git branch -M main

# رفع إلى GitHub
git remote add origin https://github.com/yourusername/lifehorizon.git
git push -u origin main
```

### 2. إعداد Firebase
1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. أنشئ مشروع جديد
3. أضف Web App
4. انسخ configuration
5. فعّل Firestore Database
6. أضف قواعد الأمان

### 3. إعداد Areeba Payment Gateway
- تأكد من أن إعدادات Areeba صحيحة
- اختبر الـ payment gateway في بيئة التطوير

## 🚀 خطوات النشر على Vercel

### الطريقة الأولى: عبر Vercel Dashboard

#### 1. إنشاء حساب Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول بـ GitHub أو أنشئ حساب جديد
3. اضغط على "New Project"

#### 2. ربط Git Repository
1. اختر Git repository الخاص بك
2. اضغط "Import"

#### 3. إعدادات المشروع
```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### 4. إضافة Environment Variables
أضف المتغيرات التالية في Vercel Dashboard:

**Firebase Configuration:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

**Areeba Payment Gateway:**
```
AREEBA_MERCHANT_ID=IQ3093980103
AREEBA_API_KEY=TESTKEYIQ3093980103
AREEBA_BASE_URL=https://gateway.areebapayment.com/api/v3
AREEBA_USERNAME=Ali.112233445566
AREEBA_PASSWORD=Zxxznmmn@123
```

**Environment:**
```
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

#### 5. النشر
1. اضغط "Deploy"
2. انتظر حتى يكتمل البناء
3. احصل على رابط المشروع

### الطريقة الثانية: عبر Vercel CLI

#### 1. تثبيت Vercel CLI
```bash
npm i -g vercel
```

#### 2. تسجيل الدخول
```bash
vercel login
```

#### 3. نشر المشروع
```bash
# في مجلد المشروع
vercel

# أو مع إعدادات مخصصة
vercel --prod
```

#### 4. إضافة Environment Variables
```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add AREEBA_MERCHANT_ID
# ... إضافة باقي المتغيرات
```

## 🔧 إعدادات إضافية

### 1. إعدادات Domain
1. اذهب إلى Project Settings في Vercel
2. اختر "Domains"
3. أضف domain مخصص أو استخدم subdomain من Vercel

### 2. إعدادات Functions
- تأكد من أن API routes تعمل بشكل صحيح
- قد تحتاج لتعديل timeout للـ functions

### 3. إعدادات Build
```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

## 🧪 اختبار النشر

### 1. اختبار الصفحات الرئيسية
- ✅ الصفحة الرئيسية: `https://your-domain.vercel.app/`
- ✅ متجر الألعاب: `https://your-domain.vercel.app/services/game-store`
- ✅ لوحة التحكم: `https://your-domain.vercel.app/admin/games`

### 2. اختبار API Routes
- ✅ اختبار payment API: `/api/payment/initiate`
- ✅ اختبار email API: `/api/send-email`

### 3. اختبار الدفع
- ✅ اختبار عملية دفع كاملة
- ✅ اختبار callbacks
- ✅ اختبار error handling

## 🔍 Troubleshooting

### مشاكل شائعة وحلولها:

#### 1. Build Errors
```bash
# تحقق من TypeScript errors
npm run type-check

# تحقق من ESLint errors
npm run lint

# تحقق من dependencies
npm install
```

#### 2. Environment Variables Issues
- تأكد من إضافة جميع المتغيرات المطلوبة
- تحقق من أسماء المتغيرات (case-sensitive)
- أعد deploy بعد إضافة المتغيرات

#### 3. API Errors
- تحقق من logs في Vercel Dashboard
- تأكد من أن Firebase configuration صحيح
- تحقق من إعدادات Areeba

#### 4. CORS Issues
- تأكد من إعدادات CORS في `next.config.mjs`
- تحقق من headers في `vercel.json`

### للتحقق من الـ deployment:
1. اذهب إلى Vercel Dashboard
2. اختر مشروعك
3. تحقق من "Deployments" tab
4. تحقق من "Functions" tab للـ API routes
5. تحقق من "Logs" للـ errors

## 📊 مراقبة الأداء

### 1. Vercel Analytics
- فعّل Vercel Analytics
- راقب الأداء والزوار

### 2. Error Monitoring
- راقب errors في Vercel Dashboard
- استخدم logging للـ debugging

### 3. Performance Monitoring
- راقب Core Web Vitals
- تحقق من Page Speed Insights

## 🔒 الأمان

### 1. Environment Variables
- لا تشارك Environment Variables
- استخدم Vercel's built-in security

### 2. API Security
- تأكد من حماية API routes
- استخدم proper authentication

### 3. CORS Configuration
- حدد origins المسموح بها
- لا تستخدم `*` في production

## 📈 التحسينات

### 1. Performance
- استخدم Image Optimization
- فعّل Compression
- استخدم CDN للـ static assets

### 2. SEO
- أضف meta tags
- فعّل sitemap
- أضف robots.txt

### 3. Monitoring
- أضف error tracking
- راقب performance metrics
- فعّل uptime monitoring

## 🎉 النجاح!

بعد اكتمال النشر:
1. ✅ اختبر جميع الصفحات
2. ✅ اختبر جميع الـ features
3. ✅ اختبر نظام الدفع
4. ✅ راقب الـ performance
5. ✅ أضف domain مخصص (اختياري)

## 📞 الدعم

للمساعدة:
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Firebase Setup**: [firebase.google.com/docs](https://firebase.google.com/docs)

---

**🎮 تم النشر بنجاح! استمتع بمتجر الألعاب الخاص بك!**
