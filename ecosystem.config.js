module.exports = {
  apps: [
    {
      name: 'lifehorizon',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_BASE_URL: 'https://lifehorizonit.com',
        NEXT_PUBLIC_SITE_URL: 'https://lifehorizonit.com'
      }
    }
  ]
}; 