import os
import shutil

source = r'c:\Users\PC\Documents\DARIJA GEMINI\ElevenLabs_2025-11-30T09_50_51_Ghizlane - Moroccan Darija Dialect_pvc_sp100_s50_sb30_se20_b_m2.mp3'
destination = r'c:\Users\PC\Documents\DARIJA GEMINI\audio\lessons\bghit.mp3'

print("Source:", source)
print("Destination:", destination)
print("Source exists:", os.path.exists(source))

os.makedirs(os.path.dirname(destination), exist_ok=True)

print("Copying...")
shutil.copyfile(source, destination)

print("Verifying...")
print("Dest exists:", os.path.exists(destination))
if os.path.exists(destination):
    print("Dest size:", os.path.getsize(destination), "bytes")
    print("SUCCESS!")
