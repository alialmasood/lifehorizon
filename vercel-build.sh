#!/bin/bash

# Vercel Build Script for Life Horizon Project

echo "🚀 Starting Vercel deployment build..."

# Check if we're in a Vercel environment
if [ "$VERCEL" = "1" ]; then
    echo "✅ Running in Vercel environment"
else
    echo "⚠️  Not running in Vercel environment"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type check
echo "🔍 Running TypeScript check..."
npx tsc --noEmit

# Run linting
echo "🧹 Running ESLint..."
npm run lint

# Build the project
echo "🏗️  Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Vercel deployment build completed!"
