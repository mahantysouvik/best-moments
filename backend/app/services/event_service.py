from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.dao.event_dao import EventDAO
from app.dao.template_dao import TemplateDAO
from app.models.event import EventCreate, EventUpdate, EventResponse
from app.utils.exceptions import NotFoundException, ValidationException
from app.utils.qr_generator import QRGenerator
from app.utils.s3_helper import S3Helper
from datetime import datetime
import os

class EventService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.event_dao = EventDAO(db)
        self.template_dao = TemplateDAO(db)
        self.s3_helper = S3Helper()
    
    async def create_event(self, event_data: EventCreate) -> EventResponse:
        """Create a new event"""
        # Verify template exists
        template = await self.template_dao.find_by_id(event_data.template_id)
        if not template:
            raise NotFoundException("Template not found")
        
        # Generate unique event code
        event_code = await self.event_dao.generate_unique_event_code()
        
        # Generate QR code with event URL
        frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
        event_url = f"{frontend_url}/event/{event_code}"
        qr_buffer = QRGenerator.generate_qr_code(event_url)
        
        # Upload QR code to S3
        qr_s3_key = self.s3_helper.generate_s3_key(event_code, "qr_code.png", folder="qr_codes")
        qr_url = await self.s3_helper.upload_file(qr_buffer, qr_s3_key, "image/png")
        
        # Generate event template image
        template_buffer = QRGenerator.generate_event_template(
            event_name=event_data.event_name,
            event_date=event_data.event_date.strftime("%B %d, %Y"),
            event_code=event_code,
            qr_data=event_url,
            template_type=event_data.event_type
        )
        
        # Upload template to S3
        template_s3_key = self.s3_helper.generate_s3_key(event_code, "template.png", folder="templates")
        template_url = await self.s3_helper.upload_file(template_buffer, template_s3_key, "image/png")
        
        # Create event document
        event_dict = event_data.dict()
        event_dict['event_code'] = event_code
        event_dict['qr_code_url'] = qr_url
        event_dict['template_image_url'] = template_url
        event_dict['total_images'] = 0
        event_dict['is_active'] = True
        
        # Save to database
        event_id = await self.event_dao.create(event_dict)
        
        # Increment template usage count
        await self.template_dao.increment_usage_count(event_data.template_id)
        
        # Fetch and return created event
        created_event = await self.event_dao.find_by_id(event_id)
        return self._convert_to_response(created_event)
    
    async def get_event(self, event_id: str) -> EventResponse:
        """Get event by ID"""
        event = await self.event_dao.find_by_id(event_id)
        if not event:
            raise NotFoundException("Event not found")
        return self._convert_to_response(event)
    
    async def get_event_by_code(self, event_code: str) -> EventResponse:
        """Get event by event code"""
        event = await self.event_dao.find_by_event_code(event_code)
        if not event:
            raise NotFoundException("Event not found")
        return self._convert_to_response(event)
    
    async def update_event(self, event_id: str, event_data: EventUpdate) -> EventResponse:
        """Update event"""
        # Check if event exists
        existing_event = await self.event_dao.find_by_id(event_id)
        if not existing_event:
            raise NotFoundException("Event not found")
        
        # Update only provided fields
        update_dict = event_data.dict(exclude_unset=True)
        
        if update_dict:
            await self.event_dao.update(event_id, update_dict)
        
        # Fetch and return updated event
        updated_event = await self.event_dao.find_by_id(event_id)
        return self._convert_to_response(updated_event)
    
    async def delete_event(self, event_id: str) -> bool:
        """Delete event (soft delete by setting is_active to False)"""
        event = await self.event_dao.find_by_id(event_id)
        if not event:
            raise NotFoundException("Event not found")
        
        await self.event_dao.update(event_id, {"is_active": False})
        return True
    
    async def list_events(self, page: int = 1, limit: int = 20) -> tuple[List[EventResponse], int]:
        """List all active events"""
        skip = (page - 1) * limit
        events = await self.event_dao.find_active_events(skip=skip, limit=limit)
        total = await self.event_dao.count({"is_active": True})
        
        return [self._convert_to_response(event) for event in events], total
    
    async def list_events_by_host(self, phone: str, page: int = 1, limit: int = 20) -> tuple[List[EventResponse], int]:
        """List events by host phone number"""
        skip = (page - 1) * limit
        events = await self.event_dao.find_by_host_phone(phone, skip=skip, limit=limit)
        total = await self.event_dao.count({"host_phone": phone})
        
        return [self._convert_to_response(event) for event in events], total
    
    def _convert_to_response(self, event: dict) -> EventResponse:
        """Convert database document to response model"""
        return EventResponse(
            id=str(event['_id']),
            event_name=event['event_name'],
            event_type=event['event_type'],
            event_date=event['event_date'],
            host_name=event['host_name'],
            host_phone=event['host_phone'],
            host_email=event.get('host_email'),
            location=event.get('location'),
            description=event.get('description'),
            template_id=event['template_id'],
            event_code=event['event_code'],
            qr_code_url=event['qr_code_url'],
            template_image_url=event['template_image_url'],
            created_at=event['created_at'],
            updated_at=event['updated_at'],
            is_active=event['is_active'],
            total_images=event.get('total_images', 0)
        )