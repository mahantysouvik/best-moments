from fastapi import APIRouter, Depends, Query, UploadFile, File, Form
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.services.image_service import ImageService
from app.utils.responses import APIResponse
from app.utils.exceptions import AppException, ValidationException
from app.database import get_database

router = APIRouter(prefix="/images", tags=["Images"])

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

@router.post("/upload", status_code=201)
async def upload_image(
    event_id: str = Form(...),
    album_id: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Upload an image to an event"""
    try:
        # Validate file type
        if file.content_type not in ALLOWED_TYPES:
            raise ValidationException(f"File type {file.content_type} not allowed")
        
        # Read file
        contents = await file.read()
        file_size = len(contents)
        
        # Validate file size
        if file_size > MAX_FILE_SIZE:
            raise ValidationException("File size exceeds 10MB limit")
        
        # Create file-like object
        from io import BytesIO
        file_obj = BytesIO(contents)
        
        service = ImageService(db)
        image = await service.upload_image(
            event_id=event_id,
            file_obj=file_obj,
            filename=file.filename,
            file_size=file_size,
            mime_type=file.content_type,
            album_id=album_id
        )
        
        return APIResponse.created(
            data=image.dict(),
            message="Image uploaded successfully"
        )
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.get("/{image_id}")
async def get_image(
    image_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get image details by ID"""
    try:
        service = ImageService(db)
        image = await service.get_image(image_id)
        return APIResponse.success(data=image.dict())
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.delete("/{image_id}")
async def delete_image(
    image_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Delete an image"""
    try:
        service = ImageService(db)
        await service.delete_image(image_id)
        return APIResponse.success(message="Image deleted successfully")
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.get("/event/{event_id}")
async def list_images_by_event(
    event_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """List all images for an event"""
    try:
        service = ImageService(db)
        images, total = await service.list_images_by_event(event_id, page, limit)
        images_dict = [image.dict() for image in images]
        return APIResponse.paginated(images_dict, page, limit, total)
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.get("/album/{album_id}")
async def list_images_by_album(
    album_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """List all images in an album"""
    try:
        service = ImageService(db)
        images, total = await service.list_images_by_album(album_id, page, limit)
        images_dict = [image.dict() for image in images]
        return APIResponse.paginated(images_dict, page, limit, total)
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.patch("/{image_id}/move")
async def move_image_to_album(
    image_id: str,
    album_id: Optional[str] = None,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Move image to a different album or remove from album"""
    try:
        service = ImageService(db)
        image = await service.move_image_to_album(image_id, album_id)
        return APIResponse.success(
            data=image.dict(),
            message="Image moved successfully"
        )
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)