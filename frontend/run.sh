#!/bin/bash

# Best Moments Frontend Startup Script

echo "Starting Best Moments Frontend..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Dependencies not found. Installing..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Warning: .env file not found. Creating from .env.example"
    cp .env.example .env
fi

# Start development server
echo "Starting Vite development server on port 3000..."
npm run dev
