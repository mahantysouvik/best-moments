from typing import Optional, List
from motor.motor_asyncio import AsyncIOMotorDatabase
from .base_dao import BaseDAO
from bson import ObjectId

class AlbumDAO(BaseDAO):
    def __init__(self, db: AsyncIOMotorDatabase):
        super().__init__(db, "albums")
    
    async def find_by_event_id(self, event_id: str, skip: int = 0, limit: int = 100) -> List[dict]:
        """Find all albums for an event"""
        return await self.find_many(
            {"event_id": event_id},
            skip=skip,
            limit=limit,
            sort=[("created_at", -1)]
        )
    
    async def increment_image_count(self, album_id: str) -> bool:
        """Increment image count for an album"""
        if not ObjectId.is_valid(album_id):
            return False
        
        result = await self.collection.update_one(
            {"_id": ObjectId(album_id)},
            {"$inc": {"image_count": 1}}
        )
        return result.modified_count > 0
    
    async def decrement_image_count(self, album_id: str) -> bool:
        """Decrement image count for an album"""
        if not ObjectId.is_valid(album_id):
            return False
        
        result = await self.collection.update_one(
            {"_id": ObjectId(album_id)},
            {"$inc": {"image_count": -1}}
        )
        return result.modified_count > 0
    
    async def check_album_belongs_to_event(self, album_id: str, event_id: str) -> bool:
        """Check if album belongs to event"""
        if not ObjectId.is_valid(album_id):
            return False
        
        album = await self.find_by_id(album_id)
        return album is not None and album.get('event_id') == event_id