# Push Everything to New Repository

## Repository URL
https://github.com/wolfxxx/BoerDarija

## Commands to Run

Run these commands in PowerShell, one by one:

### Step 1: Update remote URL
```powershell
cd "c:\Users\PC\Documents\DARIJA GEMINI"
git remote set-url origin https://github.com/wolfxxx/BoerDarija.git
git remote -v
```

### Step 2: Verify .gitignore is working
```powershell
# This should show the files are ignored (no output means they're ignored)
git check-ignore create_lesson_a2_1_audio.py
git check-ignore create_lesson_a2_3_audio.py
```

### Step 3: Add all files (respecting .gitignore)
```powershell
git add -A
```

### Step 4: Check what will be committed
```powershell
git status --short
```

This should show all your files EXCEPT:
- `create_lesson*.py` files
- `create_lesson_a2_*.py` files
- `fix_*_audio.py` files
- Other API key files listed in .gitignore

### Step 5: Commit everything
```powershell
git commit -m "Initial commit: Complete Darija learning platform with all lessons, audio files, and resources"
```

### Step 6: Set branch to main
```powershell
git branch -M main
```

### Step 7: Push to new repository
```powershell
git push -u origin main
```

If you get authentication errors:
- You may need to use a Personal Access Token
- Or configure Git credentials

### Step 8: Verify on GitHub
1. Go to: https://github.com/wolfxxx/BoerDarija
2. Check that all files are there
3. Verify that API key files are NOT visible

## What Should Be Pushed

✅ **Should be pushed:**
- All HTML lesson files
- All audio files in `audio/lessons/`
- CSS and JavaScript files
- Dictionary and data files
- README.md and other documentation
- .gitignore file itself

❌ **Should NOT be pushed (already in .gitignore):**
- `create_lesson*.py` files
- `create_lesson_a2_*.py` files
- `fix_*_audio.py` files
- `generate_*.py` files
- Any other files with API keys


