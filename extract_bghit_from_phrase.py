"""Extract 'bghit' from 'bghit_l_ma.mp3' which has correct pronunciation"""
try:
    from pydub import AudioSegment
    
    source_file = 'audio/lessons/bghit_l_ma.mp3'
    output_file = 'audio/lessons/bghit.mp3'
    
    print("=" * 60)
    print("EXTRACTING 'bghit' FROM 'bghit_l_ma.mp3'")
    print("=" * 60)
    print(f"Source: {source_file}")
    print(f"Output: {output_file}")
    print()
    
    # Load the audio file
    audio = AudioSegment.from_mp3(source_file)
    duration_ms = len(audio)
    print(f"Total duration: {duration_ms / 1000:.2f} seconds")
    
    # Extract first portion - try different lengths to get just "bghit"
    # "بغيت" should be about 0.6-1.0 seconds
    # Try 700ms first, then 600ms, then 500ms
    for extract_length in [700, 600, 500]:
        trimmed = audio[:extract_length]
        trimmed.export(output_file, format="mp3")
        print(f"✅ Extracted first {extract_length}ms ({len(trimmed) / 1000:.2f}s) to {output_file}")
        break  # Use first length - user can test and we can adjust
    
except ImportError:
    print("pydub not installed. Installing...")
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pydub"])
    print("Please run this script again after pydub is installed.")
except Exception as e:
    print(f"❌ ERROR: {e}")
    print("\nTrying alternative: Copy bgheet.mp3 and we'll trim it manually")
    import shutil
    import os
    if os.path.exists('audio/bgheet.mp3'):
        shutil.copy2('audio/bgheet.mp3', 'audio/lessons/bghit_temp.mp3')
        print("Copied bgheet.mp3 as temporary file")

