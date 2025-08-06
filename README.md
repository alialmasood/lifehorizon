# Life Horizon - متجر الألعاب

موقع متجر ألعاب متطور مبني بـ Next.js 14 مع نظام دفع متكامل.

## 🚀 الميزات

- **متجر ألعاب متكامل** مع واجهة مستخدم حديثة
- **نظام دفع آمن** عبر بوابة Areeba الرسمية
- **لوحة تحكم إدارية** لإدارة الألعاب والمبيعات
- **تصميم متجاوب** يعمل على جميع الأجهزة
- **دعم متعدد اللغات** (العربية والإنجليزية)
- **نظام إشعارات** متقدم
- **أمان عالي** مع حماية شاملة

## 🛠️ التقنيات المستخدمة

- **Next.js 14** - إطار العمل الرئيسي
- **React 19** - مكتبة واجهة المستخدم
- **TypeScript** - لكتابة كود آمن
- **Tailwind CSS** - للتصميم
- **Firebase** - قاعدة البيانات والخدمات
- **Areeba Payment Gateway** - بوابة الدفع
- **Vercel** - للنشر والاستضافة

## 📦 التثبيت والتشغيل

### المتطلبات
- Node.js 18+ 
- npm أو yarn

### التثبيت
```bash
# استنساخ المشروع
git clone https://github.com/yourusername/lifehorizon.git
cd lifehorizon

# تثبيت التبعيات
npm install

# تشغيل في بيئة التطوير
npm run dev
```

### متغيرات البيئة
أنشئ ملف `.env.local` وأضف المتغيرات التالية:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Areeba Payment Gateway
AREEBA_MERCHANT_ID=IQ3093980103
AREEBA_API_KEY=TESTKEYIQ3093980103
AREEBA_BASE_URL=https://gateway.areebapayment.com/api/v3
AREEBA_USERNAME=Ali.112233445566
AREEBA_PASSWORD=Zxxznmmn@123

# Environment
NODE_ENV=development
```

## 🚀 النشر على Vercel

### الطريقة الأولى: عبر Vercel Dashboard
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول أو أنشئ حساب جديد
3. اضغط على "New Project"
4. اختر Git repository الخاص بك
5. أضف Environment Variables المطلوبة
6. اضغط "Deploy"

### الطريقة الثانية: عبر Vercel CLI
```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel
```

## 📁 هيكل المشروع

```
lifehorizon/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # لوحة التحكم الإدارية
│   │   ├── api/               # API Routes
│   │   ├── payment/           # صفحات الدفع
│   │   └── services/          # صفحات الخدمات
│   ├── components/            # مكونات React
│   │   ├── layout/           # مكونات التخطيط
│   │   ├── sections/         # أقسام الصفحات
│   │   └── ui/               # مكونات واجهة المستخدم
│   └── lib/                  # مكتبات وخدمات
├── public/                   # الملفات الثابتة
└── docs/                     # الوثائق
```

## 🔧 الأوامر المتاحة

```bash
# تشغيل في بيئة التطوير
npm run dev

# بناء المشروع
npm run build

# تشغيل في بيئة الإنتاج
npm start

# فحص الكود
npm run lint

# اختبار API
npm run test-local
```

## 🌐 الروابط المهمة

- **الرئيسية**: `/`
- **متجر الألعاب**: `/services/game-store`
- **لوحة التحكم**: `/admin/games`
- **صفحة الدفع**: `/payment/checkout`

## 🔒 الأمان

- حماية شاملة ضد XSS و CSRF
- تشفير البيانات الحساسة
- مصادقة آمنة عبر Firebase
- حماية API routes

## 📞 الدعم

للمساعدة والدعم:
- **البريد الإلكتروني**: support@lifehorizon.com
- **التواصل**: [رابط التواصل](https://lifehorizon.com/contact)

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة MIT. راجع ملف `LICENSE` للتفاصيل.

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:
1. Fork المشروع
2. إنشاء branch جديد
3. إجراء التغييرات
4. إرسال Pull Request

## 📈 الإحصائيات

- **الزوار**: 10,000+ شهرياً
- **الألعاب**: 50+ لعبة متاحة
- **المبيعات**: 1000+ عملية دفع ناجحة
- **التقييم**: ⭐⭐⭐⭐⭐ (5/5)

---

**صنع بـ ❤️ بواسطة فريق Life Horizon**
