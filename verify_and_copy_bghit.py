"""Verify and copy the correct bghit file"""
import os
import shutil
import hashlib

source = 'ElevenLabs_2025-11-30T09_50_51_Ghizlane - Moroccan Darija Dialect_pvc_sp100_s50_sb30_se20_b_m2.mp3'
destination = 'audio/lessons/bghit.mp3'

print("=" * 60)
print("VERIFYING AND COPYING bghit AUDIO FILE")
print("=" * 60)

# Check source
if not os.path.exists(source):
    print(f"❌ ERROR: Source file not found: {source}")
    exit(1)

src_size = os.path.getsize(source)
print(f"✓ Source file found: {src_size:,} bytes")

# Read source file and calculate hash
with open(source, 'rb') as f:
    src_data = f.read()
src_hash = hashlib.md5(src_data).hexdigest()
print(f"✓ Source hash: {src_hash}")

# Check destination
os.makedirs('audio/lessons', exist_ok=True)

if os.path.exists(destination):
    dst_size = os.path.getsize(destination)
    with open(destination, 'rb') as f:
        dst_data = f.read()
    dst_hash = hashlib.md5(dst_data).hexdigest()
    
    print(f"\nCurrent destination file:")
    print(f"  Size: {dst_size:,} bytes")
    print(f"  Hash: {dst_hash}")
    print(f"  Match: {src_hash == dst_hash}")
    
    if src_hash != dst_hash:
        print(f"\n⚠️  Files are DIFFERENT! Removing old file...")
        os.remove(destination)
    else:
        print(f"\n✅ Files already match!")
        exit(0)

# Copy the file
print(f"\nCopying {source} to {destination}...")
shutil.copyfile(source, destination)

# Verify
if os.path.exists(destination):
    dst_size = os.path.getsize(destination)
    with open(destination, 'rb') as f:
        dst_data = f.read()
    dst_hash = hashlib.md5(dst_data).hexdigest()
    
    print(f"\n✅ Copy complete!")
    print(f"  Destination size: {dst_size:,} bytes")
    print(f"  Destination hash: {dst_hash}")
    print(f"  Files match: {src_hash == dst_hash}")
    
    if src_hash == dst_hash:
        print(f"\n✅ SUCCESS: Files are identical!")
    else:
        print(f"\n❌ ERROR: Files don't match after copy!")
else:
    print(f"\n❌ ERROR: Copy failed - destination not created")

print("=" * 60)
