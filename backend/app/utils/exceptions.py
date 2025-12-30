from typing import Optional, Any

class AppException(Exception):
    """Base exception class for application"""
    def __init__(self, message: str, status_code: int = 500, details: Optional[Any] = None):
        self.message = message
        self.status_code = status_code
        self.details = details
        super().__init__(self.message)

class ValidationException(AppException):
    """Exception for validation errors"""
    def __init__(self, message: str = "Validation error", details: Optional[Any] = None):
        super().__init__(message, status_code=400, details=details)

class NotFoundException(AppException):
    """Exception for resource not found"""
    def __init__(self, message: str = "Resource not found", details: Optional[Any] = None):
        super().__init__(message, status_code=404, details=details)

class ConflictException(AppException):
    """Exception for resource conflicts"""
    def __init__(self, message: str = "Resource conflict", details: Optional[Any] = None):
        super().__init__(message, status_code=409, details=details)

class UnauthorizedException(AppException):
    """Exception for unauthorized access"""
    def __init__(self, message: str = "Unauthorized", details: Optional[Any] = None):
        super().__init__(message, status_code=401, details=details)

class ForbiddenException(AppException):
    """Exception for forbidden access"""
    def __init__(self, message: str = "Forbidden", details: Optional[Any] = None):
        super().__init__(message, status_code=403, details=details)

class InternalServerException(AppException):
    """Exception for internal server errors"""
    def __init__(self, message: str = "Internal server error", details: Optional[Any] = None):
        super().__init__(message, status_code=500, details=details)

class BadRequestException(AppException):
    """Exception for bad requests"""
    def __init__(self, message: str = "Bad request", details: Optional[Any] = None):
        super().__init__(message, status_code=400, details=details)