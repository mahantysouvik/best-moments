from fastapi import APIRouter, Depends, Query
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.models.event import EventCreate, EventUpdate
from app.services.event_service import EventService
from app.utils.responses import APIResponse
from app.utils.exceptions import AppException
from app.database import get_database

router = APIRouter(prefix="/events", tags=["Events"])

@router.post("/", status_code=201)
async def create_event(
    event_data: EventCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new event with QR code and template"""
    try:
        service = EventService(db)
        event = await service.create_event(event_data)
        return APIResponse.created(
            data=event.dict(),
            message="Event created successfully"
        )
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.get("/{event_id}")
async def get_event(
    event_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get event details by ID"""
    try:
        service = EventService(db)
        event = await service.get_event(event_id)
        return APIResponse.success(data=event.dict())
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.get("/code/{event_code}")
async def get_event_by_code(
    event_code: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get event details by event code"""
    try:
        service = EventService(db)
        event = await service.get_event_by_code(event_code)
        return APIResponse.success(data=event.dict())
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.put("/{event_id}")
async def update_event(
    event_id: str,
    event_data: EventUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update event details"""
    try:
        service = EventService(db)
        event = await service.update_event(event_id, event_data)
        return APIResponse.success(
            data=event.dict(),
            message="Event updated successfully"
        )
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.delete("/{event_id}")
async def delete_event(
    event_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Delete event (soft delete)"""
    try:
        service = EventService(db)
        await service.delete_event(event_id)
        return APIResponse.success(message="Event deleted successfully")
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.get("/")
async def list_events(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    host_phone: Optional[str] = None,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """List events with pagination"""
    try:
        service = EventService(db)
        
        if host_phone:
            events, total = await service.list_events_by_host(host_phone, page, limit)
        else:
            events, total = await service.list_events(page, limit)
        
        events_dict = [event.dict() for event in events]
        return APIResponse.paginated(events_dict, page, limit, total)
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)