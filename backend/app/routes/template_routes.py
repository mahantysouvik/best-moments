from fastapi import APIRouter, Depends, Query
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.models.template import TemplateCreate
from app.services.template_service import TemplateService
from app.utils.responses import APIResponse
from app.utils.exceptions import AppException
from app.database import get_database

router = APIRouter(prefix="/templates", tags=["Templates"])

@router.post("/", status_code=201)
async def create_template(
    template_data: TemplateCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new template (Admin only)"""
    try:
        service = TemplateService(db)
        template = await service.create_template(template_data)
        return APIResponse.created(
            data=template.dict(),
            message="Template created successfully"
        )
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.get("/{template_id}")
async def get_template(
    template_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get template details by ID"""
    try:
        service = TemplateService(db)
        template = await service.get_template(template_id)
        return APIResponse.success(data=template.dict())
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.get("/")
async def list_templates(
    event_type: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """List all templates, optionally filtered by event type"""
    try:
        service = TemplateService(db)
        templates, total = await service.list_templates(event_type, page, limit)
        templates_dict = [template.dict() for template in templates]
        return APIResponse.paginated(templates_dict, page, limit, total)
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)

@router.delete("/{template_id}")
async def delete_template(
    template_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Delete template (Admin only)"""
    try:
        service = TemplateService(db)
        await service.delete_template(template_id)
        return APIResponse.success(message="Template deleted successfully")
    except AppException as e:
        return APIResponse.error(e.message, e.status_code, e.details)
    except Exception as e:
        return APIResponse.error(str(e), 500)