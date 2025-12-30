from typing import Optional, List, Dict, Any
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime

class BaseDAO:
    def __init__(self, db: AsyncIOMotorDatabase, collection_name: str):
        self.db = db
        self.collection = db[collection_name]
    
    async def create(self, data: dict) -> str:
        """Create a new document"""
        data['created_at'] = datetime.utcnow()
        data['updated_at'] = datetime.utcnow()
        result = await self.collection.insert_one(data)
        return str(result.inserted_id)
    
    async def find_by_id(self, id: str) -> Optional[dict]:
        """Find document by ID"""
        if not ObjectId.is_valid(id):
            return None
        return await self.collection.find_one({"_id": ObjectId(id)})
    
    async def find_one(self, filter: dict) -> Optional[dict]:
        """Find one document by filter"""
        return await self.collection.find_one(filter)
    
    async def find_many(self, filter: dict = None, skip: int = 0, limit: int = 100, sort: List[tuple] = None) -> List[dict]:
        """Find multiple documents"""
        if filter is None:
            filter = {}
        
        cursor = self.collection.find(filter).skip(skip).limit(limit)
        
        if sort:
            cursor = cursor.sort(sort)
        
        return await cursor.to_list(length=limit)
    
    async def update(self, id: str, data: dict) -> bool:
        """Update document by ID"""
        if not ObjectId.is_valid(id):
            return False
        
        data['updated_at'] = datetime.utcnow()
        result = await self.collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}
        )
        return result.modified_count > 0
    
    async def delete(self, id: str) -> bool:
        """Delete document by ID"""
        if not ObjectId.is_valid(id):
            return False
        
        result = await self.collection.delete_one({"_id": ObjectId(id)})
        return result.deleted_count > 0
    
    async def count(self, filter: dict = None) -> int:
        """Count documents"""
        if filter is None:
            filter = {}
        return await self.collection.count_documents(filter)
    
    async def exists(self, filter: dict) -> bool:
        """Check if document exists"""
        count = await self.collection.count_documents(filter, limit=1)
        return count > 0