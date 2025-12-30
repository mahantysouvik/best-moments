from typing import Optional, Any, Dict
from fastapi.responses import JSONResponse
from fastapi import status

class APIResponse:
    """Standardized API response format"""
    
    @staticmethod
    def success(
        data: Any = None,
        message: str = "Success",
        status_code: int = status.HTTP_200_OK,
        meta: Optional[Dict] = None
    ) -> JSONResponse:
        """Return success response"""
        response = {
            "success": True,
            "message": message,
            "data": data
        }
        
        if meta:
            response["meta"] = meta
        
        return JSONResponse(
            content=response,
            status_code=status_code
        )
    
    @staticmethod
    def error(
        message: str = "Error occurred",
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        errors: Optional[Any] = None
    ) -> JSONResponse:
        """Return error response"""
        response = {
            "success": False,
            "message": message
        }
        
        if errors:
            response["errors"] = errors
        
        return JSONResponse(
            content=response,
            status_code=status_code
        )
    
    @staticmethod
    def created(
        data: Any = None,
        message: str = "Resource created successfully"
    ) -> JSONResponse:
        """Return created response"""
        return APIResponse.success(
            data=data,
            message=message,
            status_code=status.HTTP_201_CREATED
        )
    
    @staticmethod
    def no_content(message: str = "No content") -> JSONResponse:
        """Return no content response"""
        return JSONResponse(
            content={"success": True, "message": message},
            status_code=status.HTTP_204_NO_CONTENT
        )
    
    @staticmethod
    def paginated(
        data: Any,
        page: int,
        limit: int,
        total: int,
        message: str = "Success"
    ) -> JSONResponse:
        """Return paginated response"""
        total_pages = (total + limit - 1) // limit if limit > 0 else 0
        
        meta = {
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": total_pages,
            "has_next": page < total_pages,
            "has_prev": page > 1
        }
        
        return APIResponse.success(
            data=data,
            message=message,
            meta=meta
        )