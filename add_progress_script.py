import glob
import os

def add_script_to_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'src="js/progress.js"' in content:
        print("   [SKIP] Script already present.")
        return

    # Insert after navigation.js if present, otherwise before body end
    if 'src="js/navigation.js"></script>' in content:
        new_content = content.replace(
            'src="js/navigation.js"></script>',
            'src="js/navigation.js"></script>\n  <script src="js/progress.js"></script>'
        )
    else:
        new_content = content.replace(
            '</body>',
            '  <script src="js/progress.js"></script>\n</body>'
        )

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("   [UPDATED] Added progress.js script.")
    else:
        print("   [ERROR] Could not find insertion point.")

def main():
    files = glob.glob("lesson*.html")
    for f in files:
        add_script_to_file(f)
    print("Done adding scripts.")

if __name__ == "__main__":
    main()
