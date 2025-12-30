from typing import Optional, List
from motor.motor_asyncio import AsyncIOMotorDatabase
from .base_dao import BaseDAO
from bson import ObjectId

class TemplateDAO(BaseDAO):
    def __init__(self, db: AsyncIOMotorDatabase):
        super().__init__(db, "templates")
    
    async def find_by_event_type(self, event_type: str, skip: int = 0, limit: int = 100) -> List[dict]:
        """Find templates by event type"""
        return await self.find_many(
            {"event_type": event_type, "is_active": True},
            skip=skip,
            limit=limit,
            sort=[("usage_count", -1)]
        )
    
    async def find_active_templates(self, skip: int = 0, limit: int = 100) -> List[dict]:
        """Find all active templates"""
        return await self.find_many(
            {"is_active": True},
            skip=skip,
            limit=limit,
            sort=[("event_type", 1), ("usage_count", -1)]
        )
    
    async def increment_usage_count(self, template_id: str) -> bool:
        """Increment usage count for a template"""
        if not ObjectId.is_valid(template_id):
            return False
        
        result = await self.collection.update_one(
            {"_id": ObjectId(template_id)},
            {"$inc": {"usage_count": 1}}
        )
        return result.modified_count > 0