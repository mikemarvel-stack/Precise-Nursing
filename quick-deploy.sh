#!/bin/bash

# Quick PreciseNursing Setup
set -e

echo "🚀 Quick PreciseNursing setup..."

# Install dependencies
echo "📦 Installing dependencies..."
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Build frontend
echo "🏗️ Building frontend..."
cd frontend && npm run build && cd ..

# Start services in development mode
echo "🚀 Starting services..."

# Start backend in background
cd backend
npm run develop &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 10

# Start frontend in background  
cd frontend
npm run start &
FRONTEND_PID=$!
cd ..

echo "✅ Services started!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:1337"
echo "Admin: http://localhost:1337/admin"
echo ""
echo "To stop services:"
echo "kill $BACKEND_PID $FRONTEND_PID"

# Keep script running
wait