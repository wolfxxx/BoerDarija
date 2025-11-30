"""Copy bgheet.mp3 to bghit.mp3"""
import shutil
import os

src = 'audio/bgheet.mp3'
dst = 'audio/lessons/bghit.mp3'

print("=" * 60)
print("COPYING bgheet.mp3 TO bghit.mp3")
print("=" * 60)
print(f"Source: {src}")
print(f"Destination: {dst}")
print()

if os.path.exists(src):
    print(f"✓ Source file exists ({os.path.getsize(src):,} bytes)")
    os.makedirs('audio/lessons', exist_ok=True)
    
    # Remove destination if it exists
    if os.path.exists(dst):
        os.remove(dst)
        print("Removed existing destination file")
    
    # Copy the file
    shutil.copy2(src, dst)
    
    if os.path.exists(dst):
        print(f"✅ SUCCESS: Copied to {dst}")
        print(f"   Size: {os.path.getsize(dst):,} bytes")
    else:
        print("❌ ERROR: Copy failed - destination file not created")
else:
    print(f"❌ ERROR: Source file {src} not found")

print()
print("=" * 60)

