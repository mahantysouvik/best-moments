from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from typing import Optional
import os

class Database:
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None

db_instance = Database()

async def connect_to_mongo():
    """Connect to MongoDB"""
    mongodb_url = os.getenv('MONGODB_URL', 'mongodb://localhost:27017')
    db_name = os.getenv('MONGODB_DB_NAME', 'best_moments')
    
    db_instance.client = AsyncIOMotorClient(mongodb_url)
    db_instance.db = db_instance.client[db_name]
    
    print(f"Connected to MongoDB at {mongodb_url}")
    print(f"Using database: {db_name}")

async def close_mongo_connection():
    """Close MongoDB connection"""
    if db_instance.client:
        db_instance.client.close()
        print("Closed MongoDB connection")

def get_database() -> AsyncIOMotorDatabase:
    """Get database instance for dependency injection"""
    return db_instance.db