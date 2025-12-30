from typing import List, Optional, BinaryIO
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.dao.image_dao import ImageDAO
from app.dao.event_dao import EventDAO
from app.dao.album_dao import AlbumDAO
from app.models.image import ImageCreate, ImageUpdate, ImageResponse
from app.utils.exceptions import NotFoundException, ValidationException
from app.utils.s3_helper import S3Helper

class ImageService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.image_dao = ImageDAO(db)
        self.event_dao = EventDAO(db)
        self.album_dao = AlbumDAO(db)
        self.s3_helper = S3Helper()
    
    async def upload_image(
        self,
        event_id: str,
        file_obj: BinaryIO,
        filename: str,
        file_size: int,
        mime_type: str,
        album_id: Optional[str] = None
    ) -> ImageResponse:
        """Upload an image"""
        # Verify event exists
        event = await self.event_dao.find_by_id(event_id)
        if not event:
            raise NotFoundException("Event not found")
        
        # Verify album if provided
        if album_id:
            album = await self.album_dao.find_by_id(album_id)
            if not album:
                raise NotFoundException("Album not found")
            
            # Verify album belongs to event
            if album['event_id'] != event_id:
                raise ValidationException("Album does not belong to this event")
        
        # Generate S3 key and upload
        s3_key = self.s3_helper.generate_s3_key(event_id, filename)
        s3_url = await self.s3_helper.upload_file(file_obj, s3_key, mime_type)
        
        # Create image document
        image_data = ImageCreate(
            event_id=event_id,
            album_id=album_id,
            filename=filename,
            original_filename=filename,
            file_size=file_size,
            mime_type=mime_type,
            s3_key=s3_key,
            s3_url=s3_url
        )
        
        image_id = await self.image_dao.create(image_data.dict())
        
        # Increment counters
        await self.event_dao.increment_image_count(event_id)
        if album_id:
            await self.album_dao.increment_image_count(album_id)
        
        # Fetch and return created image
        created_image = await self.image_dao.find_by_id(image_id)
        return self._convert_to_response(created_image)
    
    async def get_image(self, image_id: str) -> ImageResponse:
        """Get image by ID"""
        image = await self.image_dao.find_by_id(image_id)
        if not image:
            raise NotFoundException("Image not found")
        return self._convert_to_response(image)
    
    async def delete_image(self, image_id: str) -> bool:
        """Delete image"""
        image = await self.image_dao.find_by_id(image_id)
        if not image:
            raise NotFoundException("Image not found")
        
        # Delete from S3
        await self.s3_helper.delete_file(image['s3_key'])
        
        # Decrement counters
        await self.event_dao.decrement_image_count(image['event_id'])
        if image.get('album_id'):
            await self.album_dao.decrement_image_count(image['album_id'])
        
        # Delete from database
        return await self.image_dao.delete(image_id)
    
    async def list_images_by_event(
        self,
        event_id: str,
        page: int = 1,
        limit: int = 50
    ) -> tuple[List[ImageResponse], int]:
        """List all images for an event"""
        # Verify event exists
        event = await self.event_dao.find_by_id(event_id)
        if not event:
            raise NotFoundException("Event not found")
        
        skip = (page - 1) * limit
        images = await self.image_dao.find_by_event_id(event_id, skip=skip, limit=limit)
        total = await self.image_dao.count_by_event(event_id)
        
        return [self._convert_to_response(image) for image in images], total
    
    async def list_images_by_album(
        self,
        album_id: str,
        page: int = 1,
        limit: int = 50
    ) -> tuple[List[ImageResponse], int]:
        """List all images in an album"""
        # Verify album exists
        album = await self.album_dao.find_by_id(album_id)
        if not album:
            raise NotFoundException("Album not found")
        
        skip = (page - 1) * limit
        images = await self.image_dao.find_by_album_id(album_id, skip=skip, limit=limit)
        total = await self.image_dao.count_by_album(album_id)
        
        return [self._convert_to_response(image) for image in images], total
    
    async def move_image_to_album(self, image_id: str, album_id: Optional[str]) -> ImageResponse:
        """Move image to a different album or remove from album"""
        image = await self.image_dao.find_by_id(image_id)
        if not image:
            raise NotFoundException("Image not found")
        
        old_album_id = image.get('album_id')
        
        # Verify new album if provided
        if album_id:
            album = await self.album_dao.find_by_id(album_id)
            if not album:
                raise NotFoundException("Album not found")
            
            # Verify album belongs to same event
            if album['event_id'] != image['event_id']:
                raise ValidationException("Album does not belong to the same event")
        
        # Update image
        await self.image_dao.update(image_id, {"album_id": album_id})
        
        # Update album counters
        if old_album_id:
            await self.album_dao.decrement_image_count(old_album_id)
        if album_id:
            await self.album_dao.increment_image_count(album_id)
        
        # Fetch and return updated image
        updated_image = await self.image_dao.find_by_id(image_id)
        return self._convert_to_response(updated_image)
    
    def _convert_to_response(self, image: dict) -> ImageResponse:
        """Convert database document to response model"""
        return ImageResponse(
            id=str(image['_id']),
            filename=image['filename'],
            original_filename=image['original_filename'],
            file_size=image['file_size'],
            mime_type=image['mime_type'],
            event_id=image['event_id'],
            album_id=image.get('album_id'),
            s3_url=image['s3_url'],
            thumbnail_url=image.get('thumbnail_url'),
            uploaded_at=image['uploaded_at'],
            uploaded_by=image.get('uploaded_by')
        )