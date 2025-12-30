from fastapi import APIRouter, Depends, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.models.album import AlbumCreate, AlbumUpdate
from app.services.album_service import AlbumService
from app.utils.responses import APIResponse
from app.utils.exceptions import AppException
from app.database import get_database

router = APIRouter(prefix="/albums", tags=["Albums"])

@router.post("/", status_code=201)
async def create_album(
    album_data: AlbumCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new album for an event"""
    try:
        service = AlbumService(db)
        album = await service.create_album(album_data)
        return APIResponse.created(
            data=album.dict(),
            message="Album created successfully"
        )
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.get("/{album_id}")
async def get_album(
    album_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get album details by ID"""
    try:
        service = AlbumService(db)
        album = await service.get_album(album_id)
        return APIResponse.success(data=album.dict())
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.put("/{album_id}")
async def update_album(
    album_id: str,
    album_data: AlbumUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update album details"""
    try:
        service = AlbumService(db)
        album = await service.update_album(album_id, album_data)
        return APIResponse.success(
            data=album.dict(),
            message="Album updated successfully"
        )
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.delete("/{album_id}")
async def delete_album(
    album_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Delete album"""
    try:
        service = AlbumService(db)
        await service.delete_album(album_id)
        return APIResponse.success(message="Album deleted successfully")
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.get("/event/{event_id}")
async def list_albums_by_event(
    event_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """List all albums for an event"""
    try:
        service = AlbumService(db)
        albums, total = await service.list_albums_by_event(event_id, page, limit)
        albums_dict = [album.dict() for album in albums]
        return APIResponse.paginated(albums_dict, page, limit, total)
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)