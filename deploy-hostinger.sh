#!/bin/bash

# سكريبت النشر على Hostinger
echo "🚀 بدء عملية النشر على Hostinger..."

# بناء التطبيق للإنتاج
echo "📦 بناء التطبيق..."
npm run build

# إنشاء مجلد للنشر
echo "📁 إنشاء مجلد النشر..."
mkdir -p deploy-files

# نسخ الملفات المطلوبة
echo "📋 نسخ الملفات..."
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

# إنشاء ملف .htaccess للـ Apache
echo "🔧 إنشاء ملف .htaccess..."
cat > deploy-files/.htaccess << 'EOF'
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [QSA,L]

# إعدادات الأمان
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set Referrer-Policy origin-when-cross-origin

# تفعيل ضغط Gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# إعدادات ذاكرة التخزين المؤقت
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
EOF

# إنشاء ملف package.json للإنتاج
echo "📝 تحديث package.json..."
cat > deploy-files/package.json << 'EOF'
{
  "name": "lifehorizon-production",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18",
    "react-dom": "^18",
    "lucide-react": "^0.294.0",
    "firebase": "^10.7.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0"
  }
}
EOF

# إنشاء ملف README للنشر
echo "📖 إنشاء دليل النشر..."
cat > deploy-files/README.md << 'EOF'
# دليل النشر على Hostinger

## الخطوات:

1. **رفع الملفات:**
   - ارفع جميع الملفات في هذا المجلد إلى `public_html/` في Hostinger

2. **تثبيت التبعيات:**
   ```bash
   cd public_html
   npm install
   ```

3. **بناء التطبيق:**
   ```bash
   npm run build
   ```

4. **تكوين Node.js في Hostinger:**
   - اذهب إلى لوحة تحكم Hostinger
   - اختر "Node.js"
   - انقر على "تثبيت"
   - اختر أحدث إصدار مستقر
   - في "Application startup file" اكتب: `node_modules/next/dist/bin/next start`
   - في "Application root directory" اكتب: `public_html`
   - احفظ التغييرات

5. **تشغيل التطبيق:**
   ```bash
   npm start
   ```

## ملاحظات مهمة:
- تأكد من أن SSL مفعل على النطاق
- تأكد من أن جميع الروابط تستخدم HTTPS
- راقب سجلات الأخطاء في لوحة تحكم Hostinger
EOF

echo "✅ تم إنشاء ملفات النشر بنجاح!"
echo "📁 الملفات جاهزة في مجلد: deploy-files/"
echo "🚀 ارفع محتويات مجلد deploy-files/ إلى public_html/ في Hostinger" 