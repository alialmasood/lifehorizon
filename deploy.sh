#!/bin/bash

# تحديث التبعيات
npm install

# بناء التطبيق
npm run build

# تثبيت PM2 إذا لم يكن موجوداً
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

# إعادة تشغيل التطبيق
pm2 reload ecosystem.config.js

# عرض حالة التطبيق
pm2 status 