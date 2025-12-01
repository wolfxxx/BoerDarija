# Commands to Push Audio Files to GitHub

Since automated scripts aren't working in your environment, please run these commands manually in PowerShell:

## Step 1: Navigate to your repository
```powershell
cd "c:\Users\PC\Documents\DARIJA GEMINI"
```

## Step 2: Check current status
```powershell
git status
```

## Step 3: Add all changes (including audio files)
```powershell
git add -A
```

## Step 4: Check what will be committed
```powershell
git status --short
```

## Step 5: Commit the changes
```powershell
git commit -m "Update A2 lesson audio files with corrected pronunciations"
```

## Step 6: Verify your remote repository
```powershell
git remote -v
```

This should show:
```
origin  https://github.com/wolfxxx/boerdarija.git (fetch)
origin  https://github.com/wolfxxx/boerdarija.git (push)
```

## Step 7: Push to GitHub
```powershell
git push origin main
```

If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Configure Git credentials: `git config --global credential.helper wincred`

## Step 8: Verify the push succeeded
```powershell
git status
```

You should see: "Your branch is up to date with 'origin/main'"

## Alternative: If audio files aren't being tracked

If the audio files aren't showing up in `git status`, they might not be tracked. Force add them:

```powershell
git add -f audio/lessons/*.mp3
git status
git commit -m "Add/update A2 lesson audio files"
git push origin main
```

## Check on GitHub

After pushing, verify the files are on GitHub:
1. Go to: https://github.com/wolfxxx/boerdarija
2. Navigate to: `audio/lessons/`
3. Check if your updated audio files are there
