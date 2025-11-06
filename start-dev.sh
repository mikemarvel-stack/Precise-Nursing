#!/bin/bash

echo "🚀 Starting PreciseNursing development servers..."

# Start backend
echo "Starting Strapi backend..."
cd backend
npm run develop &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
cd ..

# Wait for backend to start
echo "Waiting for backend to initialize..."
sleep 15

# Start frontend
echo "Starting Next.js frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
cd ..

echo ""
echo "✅ Services started!"
echo "🌐 Frontend: http://localhost:3000"
echo "⚙️  Backend: http://localhost:1337"
echo "👤 Admin: http://localhost:1337/admin"
echo ""
echo "To stop services, run:"
echo "kill $BACKEND_PID $FRONTEND_PID"

# Keep script running
wait