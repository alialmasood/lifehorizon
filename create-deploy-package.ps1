# تحديد اسم الحزمة
$date = Get-Date -Format "yyyy-MM-dd_HH-mm"
$packageName = "lifehorizon_deploy_$date"

# إنشاء مجلد مؤقت
$tempDir = ".\deploy_temp"
New-Item -ItemType Directory -Path $tempDir -Force

# قائمة الملفات والمجلدات المطلوبة
$items = @(
    "src",
    "public",
    "package.json",
    "package-lock.json",
    "next.config.mjs",
    "tailwind.config.ts",
    "tsconfig.json",
    "postcss.config.mjs",
    "ecosystem.config.js",
    ".env.production",
    "deploy.sh"
)

# نسخ الملفات إلى المجلد المؤقت
foreach ($item in $items) {
    if (Test-Path $item) {
        Copy-Item -Path $item -Destination $tempDir -Recurse
    }
}

# إنشاء ملف الضغط
Compress-Archive -Path "$tempDir\*" -DestinationPath ".\$packageName.zip" -Force

# حذف المجلد المؤقت
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "تم إنشاء حزمة النشر بنجاح: $packageName.zip"
Write-Host "يمكنك الآن رفع هذا الملف إلى Hostinger" 