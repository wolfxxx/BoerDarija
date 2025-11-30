import os
import sys

source = 'ElevenLabs_2025-11-30T09_50_51_Ghizlane - Moroccan Darija Dialect_pvc_sp100_s50_sb30_se20_b_m2.mp3'
destination = 'audio/lessons/bghit.mp3'

print("=" * 60)
print("COPYING bghit.mp3")
print("=" * 60)

# Check source
if not os.path.exists(source):
    print(f"ERROR: Source file not found: {source}")
    sys.exit(1)

print(f"Source file found: {os.path.getsize(source):,} bytes")

# Ensure directory exists
os.makedirs('audio/lessons', exist_ok=True)
print("Directory ready")

# Read and write
try:
    print("Reading source file...")
    with open(source, 'rb') as f:
        data = f.read()
    print(f"Read {len(data):,} bytes")
    
    print(f"Writing to {destination}...")
    with open(destination, 'wb') as f:
        f.write(data)
    print("Write completed")
    
    # Verify
    if os.path.exists(destination):
        size = os.path.getsize(destination)
        print(f"SUCCESS! File created: {size:,} bytes")
        print(f"Full path: {os.path.abspath(destination)}")
    else:
        print("ERROR: File was not created!")
        sys.exit(1)
        
except Exception as e:
    print(f"ERROR: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

print("=" * 60)
