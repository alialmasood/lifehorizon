# سكريبت بناء ونشر التطبيق - PowerShell
Write-Host "🚀 بدء عملية بناء ونشر التطبيق..." -ForegroundColor Green

# بناء التطبيق للإنتاج
Write-Host "📦 بناء التطبيق..." -ForegroundColor Yellow
npm run build

# إنشاء مجلد للنشر
Write-Host "📁 إنشاء مجلد النشر..." -ForegroundColor Yellow
if (Test-Path "deploy-files") {
    Remove-Item -Recurse -Force "deploy-files"
}
New-Item -ItemType Directory -Name "deploy-files"

# نسخ الملفات المطلوبة
Write-Host "📋 نسخ الملفات..." -ForegroundColor Yellow
Copy-Item -Recurse ".next" "deploy-files/"
Copy-Item -Recurse "public" "deploy-files/"
Copy-Item -Recurse "src" "deploy-files/"
Copy-Item "package.json" "deploy-files/"
Copy-Item "package-lock.json" "deploy-files/"
Copy-Item "next.config.mjs" "deploy-files/"
Copy-Item "tailwind.config.ts" "deploy-files/"
Copy-Item "tsconfig.json" "deploy-files/"
Copy-Item "ecosystem.config.js" "deploy-files/"
Copy-Item "postcss.config.mjs" "deploy-files/"

# إنشاء ملف .htaccess
Write-Host "🔧 إنشاء ملف .htaccess..." -ForegroundColor Yellow
$htaccessContent = "RewriteEngine On`nRewriteCond %{REQUEST_FILENAME} !-f`nRewriteCond %{REQUEST_FILENAME} !-d`nRewriteRule ^(.*)$ /index.html [QSA,L]`n`n# إعدادات الأمان`nHeader always set X-Frame-Options DENY`nHeader always set X-Content-Type-Options nosniff`nHeader always set Referrer-Policy origin-when-cross-origin"
$htaccessContent | Out-File -FilePath "deploy-files/.htaccess" -Encoding UTF8

# إنشاء ملف package.json للإنتاج
Write-Host "📝 تحديث package.json..." -ForegroundColor Yellow
$packageJsonContent = '{
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
}'
$packageJsonContent | Out-File -FilePath "deploy-files/package.json" -Encoding UTF8

# إنشاء ملف README للنشر
Write-Host "📖 إنشاء دليل النشر..." -ForegroundColor Yellow
$readmeContent = "# دليل النشر على Hostinger`n`n## الخطوات:`n`n1. ارفع جميع الملفات في هذا المجلد إلى public_html/ في Hostinger`n2. cd public_html`n3. npm install`n4. npm run build`n5. npm start`n`n## تكوين Node.js في Hostinger:`n- Application startup file: node_modules/next/dist/bin/next start`n- Application root directory: public_html"
$readmeContent | Out-File -FilePath "deploy-files/README.md" -Encoding UTF8

Write-Host "✅ تم إنشاء ملفات النشر بنجاح!" -ForegroundColor Green
Write-Host "📁 الملفات جاهزة في مجلد: deploy-files/" -ForegroundColor Cyan
Write-Host "🚀 ارفع محتويات مجلد deploy-files/ إلى public_html/ في Hostinger" -ForegroundColor Cyan 