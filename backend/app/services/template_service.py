from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.dao.template_dao import TemplateDAO
from app.models.template import TemplateCreate, TemplateResponse
from app.utils.exceptions import NotFoundException

class TemplateService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.template_dao = TemplateDAO(db)
    
    async def create_template(self, template_data: TemplateCreate) -> TemplateResponse:
        """Create a new template"""
        template_dict = template_data.dict()
        template_dict['usage_count'] = 0
        template_dict['is_active'] = True
        
        template_id = await self.template_dao.create(template_dict)
        
        # Fetch and return created template
        created_template = await self.template_dao.find_by_id(template_id)
        return self._convert_to_response(created_template)
    
    async def get_template(self, template_id: str) -> TemplateResponse:
        """Get template by ID"""
        template = await self.template_dao.find_by_id(template_id)
        if not template:
            raise NotFoundException("Template not found")
        return self._convert_to_response(template)
    
    async def list_templates(
        self,
        event_type: Optional[str] = None,
        page: int = 1,
        limit: int = 20
    ) -> tuple[List[TemplateResponse], int]:
        """List templates, optionally filtered by event type"""
        skip = (page - 1) * limit
        
        if event_type:
            templates = await self.template_dao.find_by_event_type(event_type, skip=skip, limit=limit)
            total = await self.template_dao.count({"event_type": event_type, "is_active": True})
        else:
            templates = await self.template_dao.find_active_templates(skip=skip, limit=limit)
            total = await self.template_dao.count({"is_active": True})
        
        return [self._convert_to_response(template) for template in templates], total
    
    async def delete_template(self, template_id: str) -> bool:
        """Delete template (soft delete)"""
        template = await self.template_dao.find_by_id(template_id)
        if not template:
            raise NotFoundException("Template not found")
        
        await self.template_dao.update(template_id, {"is_active": False})
        return True
    
    def _convert_to_response(self, template: dict) -> TemplateResponse:
        """Convert database document to response model"""
        return TemplateResponse(
            id=str(template['_id']),
            name=template['name'],
            event_type=template['event_type'],
            description=template.get('description'),
            preview_url=template['preview_url'],
            design_config=template.get('design_config', {}),
            created_at=template['created_at'],
            is_active=template['is_active'],
            usage_count=template.get('usage_count', 0)
        )