from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class TemplateBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    event_type: str = Field(..., description="wedding, birthday, engagement, annoprasan, etc")
    description: Optional[str] = None
    preview_url: str
    design_config: dict = Field(default_factory=dict)
    
class TemplateCreate(TemplateBase):
    pass

class Template(TemplateBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    usage_count: int = 0
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class TemplateResponse(BaseModel):
    id: str
    name: str
    event_type: str
    description: Optional[str]
    preview_url: str
    design_config: dict
    created_at: datetime
    is_active: bool
    usage_count: int