#!/bin/bash

echo "🚀 Starting Complete PreciseNursing Platform"

# Kill existing processes
pkill -f "npm run develop" 2>/dev/null
pkill -f "npm run dev" 2>/dev/null

# Start backend
echo "📡 Starting Strapi backend..."
cd backend
NODE_OPTIONS="--max-old-space-size=4096" npm run develop &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
cd ..

# Wait for backend
echo "⏳ Waiting for backend to initialize..."
sleep 20

# Start frontend
echo "🌐 Starting Next.js frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
cd ..

echo ""
echo "✅ Complete Platform Running!"
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
echo "📡 API: http://localhost:1337"
echo ""
echo "💬 Features:"
echo "✅ Tawk.to Live Chat"
echo "✅ Contact: writerprecise@gmail.com"
echo "✅ WhatsApp: +254 701 591 345"
echo "✅ Modern UI/UX"
echo "✅ Functional Forms & Buttons"
echo ""
echo "🛑 Stop: kill $BACKEND_PID $FRONTEND_PID"

wait