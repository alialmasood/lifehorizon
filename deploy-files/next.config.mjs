/** @type {import('next').NextConfig} */
const nextConfig = {
  // إعدادات للنشر على Hostinger مع Node.js
  // لا نستخدم output: 'export' لأننا نحتاج API routes
  images: {
    unoptimized: true,
    domains: ['lifehorizonit.com', 'localhost'],
  },
  trailingSlash: true,
  // إعدادات إضافية للبيئة الإنتاجية
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://lifehorizonit.com',
  },
  // إعدادات الأمان
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // إعدادات API Routes
  serverExternalPackages: ['firebase'],
};

export default nextConfig;

 