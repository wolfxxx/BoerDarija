"""
Create all lesson 7 audio files - direct approach
"""
import os
import requests
import time

API_KEY = "sk_c7b7881e3d3722e898db3d44d32f9fb7e0540d51c8719f06"
VOICE_ID = "OfGMGmhShO8iL9jCkXy8" 
OUTPUT_DIR = "audio/lessons"

audio_mappings = {
    'bghit.mp3': 'بغيت',
    'bghiti.mp3': 'بغيتي',
    'bghiti_fem.mp3': 'بغيتي',
    'bgha.mp3': 'بغى',
    'bghat.mp3': 'بغات',
    'bghina.mp3': 'بغينا',
    'bghitu.mp3': 'بغيتو',
    'bghaw.mp3': 'بغاو',
    'bghit_l_ma.mp3': 'بغيت الما',
    'bghat_atay.mp3': 'بغات أتاي',
    'wash_bghiti_l_qhwa.mp3': 'واش بغيتي القهوة',
    'ma.mp3': 'ما',
    'atay.mp3': 'أتاي',
    'qhwa.mp3': 'قهوة',
    '7lib.mp3': 'حليب',
    'khobz.mp3': 'خبز',
    'skkar.mp3': 'سكر',
    'ml7a.mp3': 'ملحة',
    'limun.mp3': 'ليمون',
    'tffa7.mp3': 'تفاح',
    'tajin.mp3': 'طاجين',
    'ksksu.mp3': 'كسكسو',
    'djaj.mp3': 'دجاج',
    'l7m.mp3': 'لحم',
    'khdra.mp3': 'خضرة',
    'shnu_bghiti.mp3': 'شنو بغيتي',
    'shnu_bghiti_fem.mp3': 'شنو بغيتي',
    'shnu_bghitu.mp3': 'شنو بغيتو',
}

os.makedirs(OUTPUT_DIR, exist_ok=True)

url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
headers = {
    "Accept": "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": API_KEY
}

created = 0
failed = 0

print(f"Generating {len(audio_mappings)} audio files...\n")

for i, (filename, arabic_text) in enumerate(audio_mappings.items(), 1):
    filepath = os.path.join(OUTPUT_DIR, filename)
    
    print(f"[{i}/{len(audio_mappings)}] {filename}...", end=' ', flush=True)
    
    data = {
        "text": arabic_text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75
        }
    }
    
    try:
        response = requests.post(url, json=data, headers=headers, timeout=30)
        
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            size = os.path.getsize(filepath)
            print(f"✓ ({size} bytes)")
            created += 1
        else:
            print(f"✗ Error {response.status_code}")
            failed += 1
    except Exception as e:
        print(f"✗ Exception: {str(e)[:50]}")
        failed += 1
    
    time.sleep(0.3)

print(f"\n{'='*50}")
print(f"✅ Created: {created}")
print(f"❌ Failed: {failed}")
print(f"Total: {len(audio_mappings)}")


