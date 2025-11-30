"""Verify lesson 7 audio files"""
import os

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

audio_dir = "audio/lessons"
existing = []
missing = []

for filename, arabic_text in audio_mappings.items():
    filepath = os.path.join(audio_dir, filename)
    if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
        size = os.path.getsize(filepath)
        existing.append((filename, size))
    else:
        missing.append(filename)

print(f"Lesson 7 Audio Files Status:")
print(f"  Existing: {len(existing)}/{len(audio_mappings)}")
print(f"  Missing: {len(missing)}/{len(audio_mappings)}")

if existing:
    print(f"\n✅ Existing files:")
    for filename, size in existing[:10]:
        print(f"  - {filename} ({size} bytes)")
    if len(existing) > 10:
        print(f"  ... and {len(existing) - 10} more")

if missing:
    print(f"\n❌ Missing files:")
    for filename in missing[:10]:
        print(f"  - {filename}")
    if len(missing) > 10:
        print(f"  ... and {len(missing) - 10} more")

# Write results to file
with open('lesson7_audio_status.txt', 'w', encoding='utf-8') as f:
    f.write(f"Lesson 7 Audio Files Status:\n")
    f.write(f"  Existing: {len(existing)}/{len(audio_mappings)}\n")
    f.write(f"  Missing: {len(missing)}/{len(audio_mappings)}\n\n")
    
    if existing:
        f.write(f"✅ Existing files:\n")
        for filename, size in existing:
            f.write(f"  - {filename} ({size} bytes)\n")
    
    if missing:
        f.write(f"\n❌ Missing files:\n")
        for filename in missing:
            f.write(f"  - {filename}\n")

print("\nResults written to lesson7_audio_status.txt")


