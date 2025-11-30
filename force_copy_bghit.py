"""Force copy the correct bghit audio file with verification"""
import shutil
import os
import sys

source = 'ElevenLabs_2025-11-30T09_50_51_Ghizlane - Moroccan Darija Dialect_pvc_sp100_s50_sb30_se20_b_m2.mp3'
destination = 'audio/lessons/bghit.mp3'

sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("FORCE COPYING CORRECT bghit AUDIO FILE")
print("=" * 60)
print(f"Source: {source}")
print(f"Destination: {destination}")
print()

if not os.path.exists(source):
    print(f"❌ ERROR: Source file not found!")
    print(f"   Looking for: {os.path.abspath(source)}")
    sys.exit(1)

os.makedirs('audio/lessons', exist_ok=True)

# Remove destination if it exists
if os.path.exists(destination):
    os.remove(destination)
    print(f"✓ Removed existing {destination}")

# Copy the file
print(f"Copying {source} to {destination}...")
shutil.copy2(source, destination)

# Verify by comparing file sizes
if os.path.exists(destination):
    src_size = os.path.getsize(source)
    dst_size = os.path.getsize(destination)
    print(f"✓ File copied")
    print(f"  Source size: {src_size:,} bytes")
    print(f"  Dest size: {dst_size:,} bytes")
    
    if src_size == dst_size:
        print(f"✅ SUCCESS: Files match perfectly!")
        print(f"   Location: {os.path.abspath(destination)}")
    else:
        print(f"⚠️  WARNING: File sizes don't match!")
        sys.exit(1)
else:
    print(f"❌ ERROR: Copy failed - destination not created")
    sys.exit(1)

print("=" * 60)

