# Script to push cleaned history to GitHub
# This will overwrite GitHub's history with your cleaned local history

Write-Host "=" * 70 -ForegroundColor Yellow
Write-Host "PUSHING CLEANED HISTORY TO GITHUB" -ForegroundColor Yellow
Write-Host "=" * 70 -ForegroundColor Yellow
Write-Host ""

# Check if remote exists
$remotes = git remote -v
if (-not $remotes) {
    Write-Host "WARNING: No remote configured!" -ForegroundColor Red
    Write-Host ""
    Write-Host "You need to add your GitHub repository URL first:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Go to your GitHub repository" -ForegroundColor Cyan
    Write-Host "2. Click the green 'Code' button" -ForegroundColor Cyan
    Write-Host "3. Copy the HTTPS URL" -ForegroundColor Cyan
    Write-Host "4. Run: git remote add origin <your-url>" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Example:" -ForegroundColor Gray
    Write-Host "   git remote add origin https://github.com/username/repo-name.git" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "Remote configured:" -ForegroundColor Green
Write-Host $remotes
Write-Host ""

# Verify file is removed from local history
Write-Host "Verifying file is removed from local history..." -ForegroundColor Cyan
$fileInHistory = git log --all --full-history --oneline -- create_all_lesson7_audio.py
if ($fileInHistory) {
    Write-Host "WARNING: File still found in local history!" -ForegroundColor Red
    Write-Host "   You may need to run git-filter-repo again" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "SUCCESS: File removed from local history" -ForegroundColor Green
    Write-Host ""
}

# Confirm before force pushing
Write-Host "WARNING: This will overwrite GitHub's history!" -ForegroundColor Red
Write-Host "   Anyone who cloned your repo will need to re-clone" -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "Continue with force push? (yes/no)"

if ($confirm -ne "yes") {
    Write-Host "Cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Force pushing to GitHub..." -ForegroundColor Cyan

# Force push all branches
git push origin --force --all
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Error pushing branches" -ForegroundColor Red
    exit 1
}

# Force push tags
git push origin --force --tags
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "WARNING: Error pushing tags (this may be okay if you have no tags)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "SUCCESS: Force push completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to your GitHub repository" -ForegroundColor White
Write-Host "2. Search for your API key to verify it's gone" -ForegroundColor White
Write-Host "3. Check commit history - create_all_lesson7_audio.py should be gone" -ForegroundColor White
Write-Host ""
Write-Host "IMPORTANT: If your repo was ever public, regenerate your API key!" -ForegroundColor Red
