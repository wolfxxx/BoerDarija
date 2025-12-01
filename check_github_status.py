"""
Check if API key exists in local git history and determine GitHub status
"""
import subprocess
import sys
import os

API_KEY = "sk_c7b7881e3d3722e898db3d44d32f9fb7e0540d51c8719f06"

print("=" * 70)
print("CHECKING GIT REPOSITORY FOR API KEY")
print("=" * 70)
print()

# Check for remote
result = subprocess.run(
    ["git", "remote", "-v"],
    capture_output=True,
    text=True,
    cwd=os.getcwd()
)

remotes = result.stdout.strip()
if remotes:
    print("📡 Remote repositories configured:")
    print(remotes)
    print()
else:
    print("⚠️  No remote repositories configured")
    print("   (This is normal if git-filter-repo removed it)")
    print()

# Check tracked files
print("1. Checking currently tracked files...")
result = subprocess.run(
    ["git", "ls-files"],
    capture_output=True,
    text=True,
    cwd=os.getcwd()
)

tracked_files = [f.strip() for f in result.stdout.strip().split('\n') if f.strip()]
files_with_key = []

for file in tracked_files:
    if os.path.exists(file):
        try:
            with open(file, 'r', encoding='utf-8', errors='ignore') as f:
                if API_KEY in f.read():
                    files_with_key.append(file)
        except:
            pass

if files_with_key:
    print(f"   ❌ Found {len(files_with_key)} tracked files with API key!")
    for f in files_with_key:
        print(f"      - {f}")
else:
    print("   ✅ No tracked files contain API key")

# Check git history (limited to avoid huge output)
print()
print("2. Checking git history (this may take a moment)...")
result = subprocess.run(
    ["git", "log", "--all", "--full-history", "-S", API_KEY, "--oneline"],
    capture_output=True,
    text=True,
    cwd=os.getcwd()
)

history_matches = result.stdout.strip()
if history_matches:
    print(f"   ⚠️  Found API key in git history!")
    print("   Commits containing the API key:")
    for line in history_matches.split('\n')[:5]:
        print(f"      {line}")
    if len(history_matches.split('\n')) > 5:
        print(f"      ... and {len(history_matches.split('\n')) - 5} more")
else:
    print("   ✅ No API key found in git history!")

print()
print("=" * 70)
print("SUMMARY")
print("=" * 70)

if files_with_key or history_matches:
    print()
    print("❌ API KEY FOUND IN REPOSITORY!")
    print()
    if files_with_key:
        print("   - Files are currently tracked")
        print("   - Run: git rm --cached <file> for each file")
    if history_matches:
        print("   - API key exists in git history")
        print("   - You need to use git-filter-repo to remove from history")
        print("   - Then force push to GitHub: git push origin --force --all")
    print()
    print("⚠️  If this was already pushed to GitHub, the key may still be there!")
    print("   Check your GitHub repository directly or use GitHub's search")
    sys.exit(1)
else:
    print()
    print("✅ LOCAL REPOSITORY IS CLEAN!")
    print()
    if not remotes:
        print("⚠️  IMPORTANT: No remote configured")
        print("   If you previously pushed to GitHub:")
        print("   1. Re-add your remote: git remote add origin <url>")
        print("   2. Check if GitHub still has old commits with API key")
        print("   3. If yes, force push cleaned history: git push origin --force --all")
        print()
    else:
        print("📡 To verify GitHub is clean:")
        print("   1. Check your GitHub repository directly")
        print("   2. Search for your API key on GitHub")
        print("   3. If found, force push: git push origin --force --all")
    print()
    print("✅ Your local repository contains no API keys!")
