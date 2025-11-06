#!/bin/bash

echo "🔧 Setting up PreciseNursing..."

# Clean and install backend
echo "📦 Setting up backend..."
cd backend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
cd ..

# Clean and install frontend
echo "📦 Setting up frontend..."
cd frontend
rm -rf node_modules package-lock.json .next
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "To start development:"
echo "1. Backend: cd backend && npm run develop"
echo "2. Frontend: cd frontend && npm run dev"