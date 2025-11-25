import re

def test_regex():
    filepath = "lesson1.html"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"Read {len(content)} bytes from {filepath}")

    pattern = r'src="audio/lessons/(.*?)".*?<span class="transcription-text">(.*?)</span>'
    
    matches = re.findall(pattern, content, re.DOTALL)
    print(f"Found {len(matches)} matches.")
    
    for i, m in enumerate(matches):
        print(f"Match {i}: {m}")

if __name__ == "__main__":
    test_regex()
