from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.dao.album_dao import AlbumDAO
from app.dao.event_dao import EventDAO
from app.models.album import AlbumCreate, AlbumUpdate, AlbumResponse
from app.utils.exceptions import NotFoundException, ValidationException

class AlbumService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.album_dao = AlbumDAO(db)
        self.event_dao = EventDAO(db)
    
    async def create_album(self, album_data: AlbumCreate) -> AlbumResponse:
        """Create a new album"""
        # Verify event exists
        event = await self.event_dao.find_by_id(album_data.event_id)
        if not event:
            raise NotFoundException("Event not found")
        
        # Create album
        album_dict = album_data.dict()
        album_dict['image_count'] = 0
        
        album_id = await self.album_dao.create(album_dict)
        
        # Fetch and return created album
        created_album = await self.album_dao.find_by_id(album_id)
        return self._convert_to_response(created_album)
    
    async def get_album(self, album_id: str) -> AlbumResponse:
        """Get album by ID"""
        album = await self.album_dao.find_by_id(album_id)
        if not album:
            raise NotFoundException("Album not found")
        return self._convert_to_response(album)
    
    async def update_album(self, album_id: str, album_data: AlbumUpdate) -> AlbumResponse:
        """Update album"""
        # Check if album exists
        existing_album = await self.album_dao.find_by_id(album_id)
        if not existing_album:
            raise NotFoundException("Album not found")
        
        # Update only provided fields
        update_dict = album_data.dict(exclude_unset=True)
        
        if update_dict:
            await self.album_dao.update(album_id, update_dict)
        
        # Fetch and return updated album
        updated_album = await self.album_dao.find_by_id(album_id)
        return self._convert_to_response(updated_album)
    
    async def delete_album(self, album_id: str) -> bool:
        """Delete album"""
        album = await self.album_dao.find_by_id(album_id)
        if not album:
            raise NotFoundException("Album not found")
        
        return await self.album_dao.delete(album_id)
    
    async def list_albums_by_event(self, event_id: str, page: int = 1, limit: int = 20) -> tuple[List[AlbumResponse], int]:
        """List albums for an event"""
        # Verify event exists
        event = await self.event_dao.find_by_id(event_id)
        if not event:
            raise NotFoundException("Event not found")
        
        skip = (page - 1) * limit
        albums = await self.album_dao.find_by_event_id(event_id, skip=skip, limit=limit)
        total = await self.album_dao.count({"event_id": event_id})
        
        return [self._convert_to_response(album) for album in albums], total
    
    def _convert_to_response(self, album: dict) -> AlbumResponse:
        """Convert database document to response model"""
        return AlbumResponse(
            id=str(album['_id']),
            name=album['name'],
            description=album.get('description'),
            event_id=album['event_id'],
            created_at=album['created_at'],
            updated_at=album['updated_at'],
            image_count=album.get('image_count', 0)
        )