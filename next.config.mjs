/** @type {import('next').NextConfig} */
const nextConfig = {
  // إعدادات للصور
  images: {
    unoptimized: true,
    domains: [
      'lifehorizonit.com', 
      'localhost', 
      'vercel.app',
      'vercel.com',
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // إعدادات للـ trailing slash
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
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  
  // إعدادات API Routes
  serverExternalPackages: ['firebase'],
  
  // إعدادات للـ experimental features
  experimental: {
    serverComponentsExternalPackages: ['firebase'],
  },
  
  // إعدادات للـ webpack
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // إعدادات للـ TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // إعدادات للـ ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

 