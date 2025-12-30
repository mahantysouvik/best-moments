from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, HttpUrl
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

class ImageBase(BaseModel):
    filename: str
    original_filename: str
    file_size: int
    mime_type: str
    
class ImageCreate(ImageBase):
    event_id: str
    album_id: Optional[str] = None
    s3_key: str
    s3_url: str
    thumbnail_url: Optional[str] = None

class ImageUpdate(BaseModel):
    album_id: Optional[str] = None

class Image(ImageBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    event_id: str
    album_id: Optional[str] = None
    s3_key: str
    s3_url: str
    thumbnail_url: Optional[str] = None
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    uploaded_by: Optional[str] = None
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ImageResponse(BaseModel):
    id: str
    filename: str
    original_filename: str
    file_size: int
    mime_type: str
    event_id: str
    album_id: Optional[str]
    s3_url: str
    thumbnail_url: Optional[str]
    uploaded_at: datetime
    uploaded_by: Optional[str]