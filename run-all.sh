#!/bin/bash

echo "🚀 Starting PreciseNursing - Complete Development Environment"

# Kill any existing processes
pkill -f "npm run develop"
pkill -f "npm run dev"

# Start backend
echo "📡 Starting Strapi backend..."
cd backend
npm run develop &
BACKEND_PID=$!
cd ..

# Wait for backend
echo "⏳ Waiting for backend to initialize..."
sleep 15

# Start frontend
echo "🌐 Starting Next.js frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ All services running!"
echo ""
echo "🔗 Access Points:"
echo "📱 Frontend (User Site): http://localhost:3000"
echo "⚙️  Backend API: http://localhost:1337"
echo "👤 Admin Panel: http://localhost:1337/admin"
echo ""
echo "📋 Available Pages:"
echo "🏠 Homepage: http://localhost:3000"
echo "📚 Nursing Documents: http://localhost:3000/academic-content"
echo "✏️  Custom Orders: http://localhost:3000/custom-order"
echo "👤 User Dashboard: http://localhost:3000/dashboard"
echo "🔐 Login: http://localhost:3000/auth/login"
echo ""
echo "🛑 To stop all services:"
echo "kill $BACKEND_PID $FRONTEND_PID"

# Keep running
wait