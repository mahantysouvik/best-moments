from typing import Optional, List
from motor.motor_asyncio import AsyncIOMotorDatabase
from .base_dao import BaseDAO

class ImageDAO(BaseDAO):
    def __init__(self, db: AsyncIOMotorDatabase):
        super().__init__(db, "images")
    
    async def find_by_event_id(self, event_id: str, skip: int = 0, limit: int = 100) -> List[dict]:
        """Find all images for an event"""
        return await self.find_many(
            {"event_id": event_id},
            skip=skip,
            limit=limit,
            sort=[("uploaded_at", -1)]
        )
    
    async def find_by_album_id(self, album_id: str, skip: int = 0, limit: int = 100) -> List[dict]:
        """Find all images in an album"""
        return await self.find_many(
            {"album_id": album_id},
            skip=skip,
            limit=limit,
            sort=[("uploaded_at", -1)]
        )
    
    async def find_by_event_without_album(self, event_id: str, skip: int = 0, limit: int = 100) -> List[dict]:
        """Find images in event that are not in any album"""
        return await self.find_many(
            {"event_id": event_id, "album_id": None},
            skip=skip,
            limit=limit,
            sort=[("uploaded_at", -1)]
        )
    
    async def count_by_event(self, event_id: str) -> int:
        """Count images for an event"""
        return await self.count({"event_id": event_id})
    
    async def count_by_album(self, album_id: str) -> int:
        """Count images in an album"""
        return await self.count({"album_id": album_id})