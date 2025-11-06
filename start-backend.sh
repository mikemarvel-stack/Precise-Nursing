#!/bin/bash

echo "🚀 Starting Backend Only..."

cd backend
NODE_OPTIONS="--max-old-space-size=4096" npm run develop