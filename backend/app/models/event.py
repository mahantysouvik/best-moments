from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, validator
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

class EventBase(BaseModel):
    event_name: str = Field(..., min_length=1, max_length=200)
    event_type: str = Field(..., description="wedding, birthday, engagement, annoprasan, etc")
    event_date: datetime
    host_name: str = Field(..., min_length=1, max_length=100)
    host_phone: str = Field(..., pattern=r'^\+?[1-9]\d{1,14}$')
    host_email: Optional[str] = Field(None, regex=r'^[\w\.-]+@[\w\.-]+\.\w+$')
    location: Optional[str] = None
    description: Optional[str] = None
    template_id: str
    
    class Config:
        json_encoders = {ObjectId: str}

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    event_name: Optional[str] = Field(None, min_length=1, max_length=200)
    event_type: Optional[str] = None
    event_date: Optional[datetime] = None
    host_name: Optional[str] = Field(None, min_length=1, max_length=100)
    host_phone: Optional[str] = Field(None, pattern=r'^\+?[1-9]\d{1,14}$')
    host_email: Optional[str] = Field(None, regex=r'^[\w\.-]+@[\w\.-]+\.\w+$')
    location: Optional[str] = None
    description: Optional[str] = None
    template_id: Optional[str] = None
    is_active: Optional[bool] = None

class Event(EventBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    event_code: str = Field(..., description="Unique 8-character event code")
    qr_code_url: str
    template_image_url: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    total_images: int = 0
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class EventResponse(BaseModel):
    id: str
    event_name: str
    event_type: str
    event_date: datetime
    host_name: str
    host_phone: str
    host_email: Optional[str]
    location: Optional[str]
    description: Optional[str]
    template_id: str
    event_code: str
    qr_code_url: str
    template_image_url: str
    created_at: datetime
    updated_at: datetime
    is_active: bool
    total_images: int