#!/bin/bash

# Best Moments Backend Startup Script

echo "Starting Best Moments Backend..."

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    echo "Activating virtual environment..."
    source venv/bin/activate
else
    echo "Virtual environment not found. Creating one..."
    python3 -m venv venv
    source venv/bin/activate
    echo "Installing dependencies..."
    pip install -r requirements.txt
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Warning: .env file not found. Please create one from .env.example"
    cp .env.example .env
    echo "Created .env file. Please update it with your configuration."
    exit 1
fi

# Seed templates if needed
echo "Checking templates..."
python seed_templates.py

# Start the server
echo "Starting FastAPI server on port 8000..."
python main.py
