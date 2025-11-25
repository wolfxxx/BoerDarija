import glob
import os
import re

def check_links():
    print("Checking for broken audio links...")
    lesson_files = glob.glob("lesson*.html")
    
    missing_files = []
    
    for filepath in lesson_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Find all audio src
        # Pattern: src="audio/lessons/..."
        matches = re.findall(r'src="(audio/lessons/.*?)"', content)
        
        for relative_path in matches:
            # Check if file exists
            # relative_path is like "audio/lessons/foo.mp3"
            # We assume script is running from root
            if not os.path.exists(relative_path):
                missing_files.append((filepath, relative_path))
                print(f" [MISSING] {relative_path} (in {filepath})")

    if not missing_files:
        print("All audio links are valid! ✅")
    else:
        print(f"Found {len(missing_files)} broken links.")
        
        # Optional: Generate a list of missing files to feed into a generator
        with open("missing_audio.txt", "w") as f:
            for _, path in missing_files:
                f.write(path + "\n")

if __name__ == "__main__":
    check_links()
