# تحديد التاريخ والوقت الحالي
$date = Get-Date -Format "yyyy-MM-dd_HH-mm"
$backupName = "lifehorizon_backup_$date"

# إنشاء مجلد للنسخ الاحتياطية إذا لم يكن موجوداً
$backupDir = ".\backups"
if (-not (Test-Path -Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir
}

# قائمة المجلدات والملفات المراد نسخها
$itemsToBackup = @(
    "src",
    "public",
    "package.json",
    "package-lock.json",
    "next.config.mjs",
    "tailwind.config.ts",
    "tsconfig.json",
    "postcss.config.mjs",
    ".gitignore",
    "README.md"
)

# إنشاء مجلد مؤقت للنسخ
$tempDir = ".\temp_backup"
New-Item -ItemType Directory -Path $tempDir

# نسخ الملفات والمجلدات
foreach ($item in $itemsToBackup) {
    if (Test-Path $item) {
        Copy-Item -Path $item -Destination $tempDir -Recurse
    }
}

# ضغط المجلد
Compress-Archive -Path "$tempDir\*" -DestinationPath "$backupDir\$backupName.zip"

# حذف المجلد المؤقت
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "تم إنشاء النسخة الاحتياطية بنجاح في: $backupDir\$backupName.zip" 