#!/bin/bash

echo "🚀 Starting Modern PreciseNursing Platform"

# Kill existing processes
pkill -f "npm run develop"
pkill -f "npm run dev"

# Start backend
echo "📡 Starting Strapi backend..."
cd backend
npm run develop &
BACKEND_PID=$!
cd ..

# Wait for backend
echo "⏳ Waiting for backend..."
sleep 15

# Start frontend
echo "🌐 Starting Next.js frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Modern Platform Running!"
echo ""
echo "🔗 User Frontend:"
echo "🏠 Homepage: http://localhost:3000"
echo "📚 Documents: http://localhost:3000/documents"
echo "✏️  Custom Orders: http://localhost:3000/custom-order"
echo "👤 My Orders: http://localhost:3000/my-orders"
echo "🔐 Login: http://localhost:3000/auth/login"
echo "📝 Register: http://localhost:3000/auth/register"
echo ""
echo "⚙️  Admin Dashboard:"
echo "🛠️  Admin Panel: http://localhost:3000/admin"
echo "📊 Strapi Admin: http://localhost:1337/admin"
echo ""
echo "🛑 Stop: kill $BACKEND_PID $FRONTEND_PID"

wait