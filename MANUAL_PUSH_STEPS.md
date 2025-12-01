# Manual Steps to Push Everything to GitHub

Since automated scripts aren't showing output, please run these commands **manually in PowerShell** one by one:

## Step 1: Navigate to your directory
```powershell
cd "c:\Users\PC\Documents\DARIJA GEMINI"
```

## Step 2: Initialize Git (if not already done)
```powershell
git init
```

## Step 3: Set the remote repository
```powershell
git remote remove origin
git remote add origin https://github.com/wolfxxx/BoerDarija.git
git remote -v
```

You should see:
```
origin  https://github.com/wolfxxx/BoerDarija.git (fetch)
origin  https://github.com/wolfxxx/BoerDarija.git (push)
```

## Step 4: Verify .gitignore is working
```powershell
git check-ignore create_lesson_a2_1_audio.py
```

If it shows the filename, it's being ignored (good!). If nothing shows, it's not ignored (bad!).

## Step 5: Add all files
```powershell
git add -A
```

## Step 6: Check what will be committed
```powershell
git status --short
```

This should show MANY files (HTML, audio, CSS, JS, etc.) but should NOT show:
- `create_lesson*.py`
- `create_lesson_a2_*.py`
- `fix_*_audio.py`

## Step 7: Commit everything
```powershell
git commit -m "Initial commit: Complete Darija learning platform"
```

You should see output like:
```
[main (root-commit) xxxxx] Initial commit: Complete Darija learning platform
 X files changed, Y insertions(+)
```

## Step 8: Set branch to main
```powershell
git branch -M main
```

## Step 9: Push to GitHub
```powershell
git push -u origin main
```

**If you get authentication errors:**
- GitHub no longer accepts passwords
- You need a Personal Access Token
- Go to: https://github.com/settings/tokens
- Create a new token with `repo` permissions
- Use the token as your password when prompted

## Step 10: Verify on GitHub
1. Go to: https://github.com/wolfxxx/BoerDarija
2. You should see all your files
3. Check that `create_lesson*.py` files are NOT there

## Troubleshooting

**If `git status --short` shows nothing:**
- The files might already be committed
- Run: `git log --oneline` to see commits
- Run: `git ls-files | Measure-Object` to count tracked files

**If push fails with "repository not found":**
- Check the repository name is correct: `BoerDarija` (capital B and D)
- Make sure the repository exists on GitHub
- Make sure you have push access

**If you see "nothing to commit":**
- Files might already be committed
- Check: `git log --oneline`
- If there are commits, just push: `git push -u origin main`
