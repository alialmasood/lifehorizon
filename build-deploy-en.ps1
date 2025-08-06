# Build and Deploy Script - PowerShell
Write-Host "🚀 Starting build and deploy process..." -ForegroundColor Green

# Build the application for production
Write-Host "📦 Building application..." -ForegroundColor Yellow
npm run build

# Create deployment folder
Write-Host "📁 Creating deployment folder..." -ForegroundColor Yellow
if (Test-Path "deploy-files") {
    Remove-Item -Recurse -Force "deploy-files"
}
New-Item -ItemType Directory -Name "deploy-files"

# Copy required files
Write-Host "📋 Copying files..." -ForegroundColor Yellow
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

# Create .htaccess file
Write-Host "🔧 Creating .htaccess file..." -ForegroundColor Yellow
$htaccessContent = "RewriteEngine On`nRewriteCond %{REQUEST_FILENAME} !-f`nRewriteCond %{REQUEST_FILENAME} !-d`nRewriteRule ^(.*)$ /index.html [QSA,L]`n`n# Security Headers`nHeader always set X-Frame-Options DENY`nHeader always set X-Content-Type-Options nosniff`nHeader always set Referrer-Policy origin-when-cross-origin"
$htaccessContent | Out-File -FilePath "deploy-files/.htaccess" -Encoding UTF8

# Create production package.json
Write-Host "📝 Creating production package.json..." -ForegroundColor Yellow
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

# Create deployment README
Write-Host "📖 Creating deployment guide..." -ForegroundColor Yellow
$readmeContent = "# Hostinger Deployment Guide`n`n## Steps:`n`n1. Upload all files in this folder to public_html/ in Hostinger`n2. cd public_html`n3. npm install`n4. npm run build`n5. npm start`n`n## Node.js Configuration in Hostinger:`n- Application startup file: node_modules/next/dist/bin/next start`n- Application root directory: public_html`n`n## Important Notes:`n- Make sure SSL is enabled on the domain`n- All URLs should use HTTPS`n- Monitor error logs in Hostinger control panel"
$readmeContent | Out-File -FilePath "deploy-files/README.md" -Encoding UTF8

Write-Host "✅ Deployment files created successfully!" -ForegroundColor Green
Write-Host "📁 Files ready in folder: deploy-files/" -ForegroundColor Cyan
Write-Host "🚀 Upload contents of deploy-files/ to public_html/ in Hostinger" -ForegroundColor Cyan 