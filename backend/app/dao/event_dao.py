from typing import Optional, List
from motor.motor_asyncio import AsyncIOMotorDatabase
from .base_dao import BaseDAO
import random
import string

class EventDAO(BaseDAO):
    def __init__(self, db: AsyncIOMotorDatabase):
        super().__init__(db, "events")
    
    async def generate_unique_event_code(self) -> str:
        """Generate a unique 8-character event code"""
        while True:
            code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
            exists = await self.exists({"event_code": code})
            if not exists:
                return code
    
    async def find_by_event_code(self, event_code: str) -> Optional[dict]:
        """Find event by event code"""
        return await self.find_one({"event_code": event_code})
    
    async def find_by_host_phone(self, phone: str, skip: int = 0, limit: int = 100) -> List[dict]:
        """Find events by host phone number"""
        return await self.find_many(
            {"host_phone": phone},
            skip=skip,
            limit=limit,
            sort=[("created_at", -1)]
        )
    
    async def find_active_events(self, skip: int = 0, limit: int = 100) -> List[dict]:
        """Find all active events"""
        return await self.find_many(
            {"is_active": True},
            skip=skip,
            limit=limit,
            sort=[("event_date", -1)]
        )
    
    async def increment_image_count(self, event_id: str) -> bool:
        """Increment total images count for an event"""
        from bson import ObjectId
        if not ObjectId.is_valid(event_id):
            return False
        
        result = await self.collection.update_one(
            {"_id": ObjectId(event_id)},
            {"$inc": {"total_images": 1}}
        )
        return result.modified_count > 0
    
    async def decrement_image_count(self, event_id: str) -> bool:
        """Decrement total images count for an event"""
        from bson import ObjectId
        if not ObjectId.is_valid(event_id):
            return False
        
        result = await self.collection.update_one(
            {"_id": ObjectId(event_id)},
            {"$inc": {"total_images": -1}}
        )
        return result.modified_count > 0