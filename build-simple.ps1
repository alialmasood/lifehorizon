# سكريبت بناء التطبيق - PowerShell
Write-Host "🚀 بدء عملية بناء التطبيق..." -ForegroundColor Green

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

Write-Host "✅ تم إنشاء ملفات النشر بنجاح!" -ForegroundColor Green
Write-Host "📁 الملفات جاهزة في مجلد: deploy-files/" -ForegroundColor Cyan
Write-Host "🚀 ارفع محتويات مجلد deploy-files/ إلى public_html/ في Hostinger" -ForegroundColor Cyan 