import boto3
from botocore.exceptions import ClientError
from typing import Optional, BinaryIO
import os
from datetime import datetime
import uuid
from app.utils.exceptions import InternalServerException

class S3Helper:
    def __init__(self):
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_REGION', 'us-east-1')
        )
        self.bucket_name = os.getenv('S3_BUCKET_NAME')
        self.cloudfront_domain = os.getenv('CLOUDFRONT_DOMAIN', '')
    
    def generate_s3_key(self, event_id: str, filename: str, folder: str = "images") -> str:
        """Generate unique S3 key for file"""
        timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
        unique_id = str(uuid.uuid4())[:8]
        ext = os.path.splitext(filename)[1]
        return f"{folder}/{event_id}/{timestamp}_{unique_id}{ext}"
    
    async def upload_file(
        self,
        file_obj: BinaryIO,
        s3_key: str,
        content_type: str = 'application/octet-stream'
    ) -> str:
        """Upload file to S3 and return URL"""
        try:
            self.s3_client.upload_fileobj(
                file_obj,
                self.bucket_name,
                s3_key,
                ExtraArgs={
                    'ContentType': content_type,
                    'ACL': 'public-read'
                }
            )
            
            # Return CloudFront URL if available, otherwise S3 URL
            if self.cloudfront_domain:
                return f"https://{self.cloudfront_domain}/{s3_key}"
            else:
                return f"https://{self.bucket_name}.s3.amazonaws.com/{s3_key}"
        
        except ClientError as e:
            raise InternalServerException(f"Failed to upload file to S3: {str(e)}")
    
    async def delete_file(self, s3_key: str) -> bool:
        """Delete file from S3"""
        try:
            self.s3_client.delete_object(
                Bucket=self.bucket_name,
                Key=s3_key
            )
            return True
        except ClientError as e:
            raise InternalServerException(f"Failed to delete file from S3: {str(e)}")
    
    async def get_presigned_url(self, s3_key: str, expiration: int = 3600) -> str:
        """Generate presigned URL for private file access"""
        try:
            url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={
                    'Bucket': self.bucket_name,
                    'Key': s3_key
                },
                ExpiresIn=expiration
            )
            return url
        except ClientError as e:
            raise InternalServerException(f"Failed to generate presigned URL: {str(e)}")