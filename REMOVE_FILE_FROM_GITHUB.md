# How to Remove a File with API Key from GitHub

## ⚠️ Important: Why Deleting on GitHub Doesn't Work

When you delete a file using GitHub's web interface, it only removes it from the **current commit**. The file (and your API key) **still exists in all previous commits** and can be accessed by anyone who views the commit history.

## ✅ Solution: Remove from Git History

You need to remove the file from the **entire git history**, then force push to GitHub.

## Step-by-Step Instructions

### Step 1: Identify the File

What file did you find on GitHub? (e.g., `create_all_lesson7_audio.py`, `create_lesson10_audio.py`, etc.)

### Step 2: Remove from History

**Option A: Use the PowerShell Script (Easiest)**

```powershell
.\remove_file_from_github_history.ps1 create_all_lesson7_audio.py
```

Replace `create_all_lesson7_audio.py` with the actual filename you found.

**Option B: Manual Command**

```powershell
# Install git-filter-repo if not already installed
pip install git-filter-repo

# Remove the specific file from history
git filter-repo --path create_all_lesson7_audio.py --invert-paths --force
```

### Step 3: Re-add Remote (if needed)

If git-filter-repo removed your remote:

```powershell
# Find your GitHub repository URL and add it
git remote add origin https://github.com/yourusername/your-repo.git
```

### Step 4: Force Push to GitHub

```powershell
# This overwrites GitHub's history with your cleaned history
git push origin --force --all
git push origin --force --tags
```

**⚠️ WARNING:** This rewrites history on GitHub. Anyone who cloned your repo will need to re-clone or reset their local copy.

### Step 5: Verify on GitHub

1. Go to your repository on GitHub
2. Search for your API key: `sk_c7b7881e3d3722e898db3d44d32f9fb7e0540d51c8719f06`
3. The search should return no results
4. Check the commit history - the file should no longer appear in any commits

## Remove Multiple Files

If you found multiple files, you can remove them all at once:

```powershell
# Remove all files matching a pattern
git filter-repo --path-glob 'create_lesson*.py' --invert-paths --force
git filter-repo --path-glob 'fix_*.py' --invert-paths --force
git filter-repo --path-glob 'test_*.py' --invert-paths --force
git filter-repo --path-glob 'generate_*.py' --invert-paths --force

# Then force push
git push origin --force --all
```

## After Removing from GitHub

1. **Regenerate your API key** at ElevenLabs (if the repo was ever public)
2. **Update all local scripts** with the new key
3. **Monitor your account** for unauthorized usage
4. **Keep `.gitignore` updated** to prevent future commits

## Need Help?

If you're not sure which file to remove, you can:
1. Search GitHub for your API key to find all files containing it
2. List all files in a specific commit: `git ls-tree -r HEAD --name-only`
3. Check what files were in a commit: `git show <commit-hash> --name-only`
