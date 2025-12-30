"""Script to seed initial templates to the database"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

async def seed_templates():
    # Connect to MongoDB
    mongodb_url = os.getenv('MONGODB_URL', 'mongodb://localhost:27017')
    db_name = os.getenv('MONGODB_DB_NAME', 'best_moments')
    
    client = AsyncIOMotorClient(mongodb_url)
    db = client[db_name]
    templates_collection = db['templates']
    
    # Sample templates
    templates = [
        # Wedding Templates
        {
            'name': 'Elegant Wedding',
            'event_type': 'wedding',
            'description': 'Classic and elegant wedding template with gold accents',
            'preview_url': 'https://via.placeholder.com/400x600/FFE5E5/D4AF37?text=Elegant+Wedding',
            'design_config': {'color_scheme': 'gold', 'style': 'elegant'},
            'is_active': True,
            'usage_count': 0
        },
        {
            'name': 'Romantic Wedding',
            'event_type': 'wedding',
            'description': 'Romantic template with pink and white tones',
            'preview_url': 'https://via.placeholder.com/400x600/FFF0F5/FF69B4?text=Romantic+Wedding',
            'design_config': {'color_scheme': 'pink', 'style': 'romantic'},
            'is_active': True,
            'usage_count': 0
        },
        {
            'name': 'Royal Wedding',
            'event_type': 'wedding',
            'description': 'Grand royal style with purple and gold',
            'preview_url': 'https://via.placeholder.com/400x600/F5F0FF/9333EA?text=Royal+Wedding',
            'design_config': {'color_scheme': 'purple', 'style': 'royal'},
            'is_active': True,
            'usage_count': 0
        },
        
        # Birthday Templates
        {
            'name': 'Colorful Birthday',
            'event_type': 'birthday',
            'description': 'Vibrant and colorful birthday celebration template',
            'preview_url': 'https://via.placeholder.com/400x600/FFF9E6/FF6B9D?text=Colorful+Birthday',
            'design_config': {'color_scheme': 'rainbow', 'style': 'fun'},
            'is_active': True,
            'usage_count': 0
        },
        {
            'name': 'Elegant Birthday',
            'event_type': 'birthday',
            'description': 'Sophisticated birthday template for adults',
            'preview_url': 'https://via.placeholder.com/400x600/FFF5F0/FFD700?text=Elegant+Birthday',
            'design_config': {'color_scheme': 'gold', 'style': 'elegant'},
            'is_active': True,
            'usage_count': 0
        },
        
        # Engagement Templates
        {
            'name': 'Love & Romance',
            'event_type': 'engagement',
            'description': 'Romantic engagement template with hearts',
            'preview_url': 'https://via.placeholder.com/400x600/FFF0F5/C71585?text=Love+Romance',
            'design_config': {'color_scheme': 'pink', 'style': 'romantic'},
            'is_active': True,
            'usage_count': 0
        },
        {
            'name': 'Modern Engagement',
            'event_type': 'engagement',
            'description': 'Modern and chic engagement design',
            'preview_url': 'https://via.placeholder.com/400x600/F0F0FF/9333EA?text=Modern+Engagement',
            'design_config': {'color_scheme': 'purple', 'style': 'modern'},
            'is_active': True,
            'usage_count': 0
        },
        
        # Annaprasan Templates
        {
            'name': 'Traditional Annaprasan',
            'event_type': 'annoprasan',
            'description': 'Traditional Indian rice ceremony template',
            'preview_url': 'https://via.placeholder.com/400x600/FFF8DC/FFD700?text=Annaprasan',
            'design_config': {'color_scheme': 'gold', 'style': 'traditional'},
            'is_active': True,
            'usage_count': 0
        },
        {
            'name': 'Cute Baby Annaprasan',
            'event_type': 'annoprasan',
            'description': 'Adorable template for baby\'s first rice ceremony',
            'preview_url': 'https://via.placeholder.com/400x600/FFF5E6/FF8C00?text=Baby+Annaprasan',
            'design_config': {'color_scheme': 'orange', 'style': 'cute'},
            'is_active': True,
            'usage_count': 0
        },
    ]
    
    # Check if templates already exist
    existing_count = await templates_collection.count_documents({})
    
    if existing_count > 0:
        print(f"Templates already exist ({existing_count} templates). Skipping seed.")
        return
    
    # Insert templates
    result = await templates_collection.insert_many(templates)
    print(f"Successfully seeded {len(result.inserted_ids)} templates!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_templates())
