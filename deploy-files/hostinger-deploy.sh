#!/bin/bash

# تثبيت Node.js إذا لم يكن موجوداً
if ! command -v node &> /dev/null; then
    curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# تثبيت PM2 إذا لم يكن موجوداً
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

# تثبيت التبعيات
npm install

# بناء التطبيق
npm run build

# إعادة تشغيل التطبيق باستخدام PM2
pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js

# عرض حالة التطبيق
pm2 status

# عرض السجلات
pm2 logs --lines 50 