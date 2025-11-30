"""Copy the correct bghit audio file"""
import shutil
import os

source = 'ElevenLabs_2025-11-30T09_50_51_Ghizlane - Moroccan Darija Dialect_pvc_sp100_s50_sb30_se20_b_m2.mp3'
destination = 'audio/lessons/bghit.mp3'

print("=" * 60)
print("COPYING CORRECT bghit AUDIO FILE")
print("=" * 60)

if not os.path.exists(source):
    print(f"❌ ERROR: Source file not found: {source}")
    exit(1)

os.makedirs('audio/lessons', exist_ok=True)

# Remove destination if it exists
if os.path.exists(destination):
    os.remove(destination)
    print(f"Removed existing {destination}")

# Copy the file
shutil.copy2(source, destination)

# Verify
if os.path.exists(destination):
    src_size = os.path.getsize(source)
    dst_size = os.path.getsize(destination)
    print(f"✅ SUCCESS: Copied to {destination}")
    print(f"   Source size: {src_size:,} bytes")
    print(f"   Dest size: {dst_size:,} bytes")
    print(f"   Match: {src_size == dst_size}")
else:
    print(f"❌ ERROR: Copy failed - destination not created")

print("=" * 60)

