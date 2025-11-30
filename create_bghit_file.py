import os
import shutil
import sys

source = 'ElevenLabs_2025-11-30T09_50_51_Ghizlane - Moroccan Darija Dialect_pvc_sp100_s50_sb30_se20_b_m2.mp3'
destination = 'audio/lessons/bghit.mp3'

print("=" * 60)
print("CREATING bghit.mp3 FILE")
print("=" * 60)
print(f"Working directory: {os.getcwd()}")
print()

# Check source
if not os.path.exists(source):
    print(f"❌ ERROR: Source file not found!")
    print(f"   Looking for: {os.path.abspath(source)}")
    sys.exit(1)

print(f"✓ Source file found: {source}")
print(f"   Size: {os.path.getsize(source):,} bytes")
print()

# Create destination directory
os.makedirs('audio/lessons', exist_ok=True)
print(f"✓ Destination directory ready: audio/lessons")
print()

# Remove old file if it exists
if os.path.exists(destination):
    os.remove(destination)
    print(f"✓ Removed old file")
    print()

# Copy the file
print(f"Copying {source} to {destination}...")
try:
    shutil.copy2(source, destination)
    print(f"✓ Copy completed")
except Exception as e:
    print(f"❌ ERROR during copy: {e}")
    sys.exit(1)

print()

# Verify
if os.path.exists(destination):
    size = os.path.getsize(destination)
    abs_path = os.path.abspath(destination)
    print(f"✅ SUCCESS!")
    print(f"   File created at: {abs_path}")
    print(f"   Size: {size:,} bytes")
    print(f"   File exists: {os.path.exists(destination)}")
    print(f"   Is file: {os.path.isfile(destination)}")
else:
    print(f"❌ ERROR: File was not created!")
    sys.exit(1)

print("=" * 60)
