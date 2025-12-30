import qrcode
from io import BytesIO
from typing import Tuple
from PIL import Image, ImageDraw, ImageFont
import os

class QRGenerator:
    @staticmethod
    def generate_qr_code(data: str, size: int = 300) -> BytesIO:
        """Generate QR code image"""
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=4,
        )
        qr.add_data(data)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        img = img.resize((size, size), Image.Resampling.LANCZOS)
        
        buffer = BytesIO()
        img.save(buffer, format='PNG')
        buffer.seek(0)
        return buffer
    
    @staticmethod
    def generate_event_template(
        event_name: str,
        event_date: str,
        event_code: str,
        qr_data: str,
        template_type: str = "wedding"
    ) -> BytesIO:
        """Generate event template with QR code"""
        # Create a beautiful template image
        width, height = 800, 1200
        
        # Color schemes based on event type
        color_schemes = {
            "wedding": {"bg": "#FFF5F5", "primary": "#D4AF37", "secondary": "#8B4513"},
            "birthday": {"bg": "#FFF9E6", "primary": "#FF6B9D", "secondary": "#C44569"},
            "engagement": {"bg": "#FFF0F5", "primary": "#FF69B4", "secondary": "#C71585"},
            "annoprasan": {"bg": "#FFF8DC", "primary": "#FFD700", "secondary": "#FF8C00"},
        }
        
        colors = color_schemes.get(template_type, color_schemes["wedding"])
        
        # Create image with gradient background
        img = Image.new('RGB', (width, height), colors["bg"])
        draw = ImageDraw.Draw(img)
        
        # Add decorative border
        border_width = 20
        draw.rectangle(
            [border_width, border_width, width - border_width, height - border_width],
            outline=colors["primary"],
            width=5
        )
        
        # Generate QR code
        qr_buffer = QRGenerator.generate_qr_code(qr_data, size=300)
        qr_img = Image.open(qr_buffer)
        
        # Paste QR code in center
        qr_position = ((width - 300) // 2, height // 2 - 50)
        img.paste(qr_img, qr_position)
        
        # Add text (simplified - in production use proper fonts)
        try:
            title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
            subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
            code_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 36)
        except:
            title_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
            code_font = ImageFont.load_default()
        
        # Draw event name
        event_name_bbox = draw.textbbox((0, 0), event_name, font=title_font)
        event_name_width = event_name_bbox[2] - event_name_bbox[0]
        draw.text(
            ((width - event_name_width) // 2, 100),
            event_name,
            fill=colors["primary"],
            font=title_font
        )
        
        # Draw event date
        date_bbox = draw.textbbox((0, 0), event_date, font=subtitle_font)
        date_width = date_bbox[2] - date_bbox[0]
        draw.text(
            ((width - date_width) // 2, 180),
            event_date,
            fill=colors["secondary"],
            font=subtitle_font
        )
        
        # Draw "Scan to Upload Photos" text
        scan_text = "Scan QR Code to Upload Photos"
        scan_bbox = draw.textbbox((0, 0), scan_text, font=subtitle_font)
        scan_width = scan_bbox[2] - scan_bbox[0]
        draw.text(
            ((width - scan_width) // 2, height // 2 - 450),
            scan_text,
            fill=colors["secondary"],
            font=subtitle_font
        )
        
        # Draw event code
        code_text = f"Event Code: {event_code}"
        code_bbox = draw.textbbox((0, 0), code_text, font=code_font)
        code_width = code_bbox[2] - code_bbox[0]
        draw.text(
            ((width - code_width) // 2, height // 2 + 280),
            code_text,
            fill=colors["primary"],
            font=code_font
        )
        
        # Add footer text
        footer_text = "BestMoments.com - Capture & Share Your Special Moments"
        footer_bbox = draw.textbbox((0, 0), footer_text, font=subtitle_font)
        footer_width = footer_bbox[2] - footer_bbox[0]
        draw.text(
            ((width - footer_width) // 2, height - 100),
            footer_text,
            fill=colors["secondary"],
            font=subtitle_font
        )
        
        # Save to buffer
        buffer = BytesIO()
        img.save(buffer, format='PNG', quality=95)
        buffer.seek(0)
        return buffer