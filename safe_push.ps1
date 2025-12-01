# Safe push script that handles locked files
Write-Host "=== Safe Push to GitHub ===" -ForegroundColor Cyan

# Step 1: Try to remove remote (ignore errors if locked)
Write-Host "`nStep 1: Removing old remote..." -ForegroundColor Yellow
git remote remove origin 2>&1 | Out-Null
Start-Sleep -Seconds 1

# Step 2: Add new remote
Write-Host "Step 2: Adding new remote..." -ForegroundColor Yellow
git remote add origin https://github.com/wolfxxx/BoerDarija.git 2>&1 | Out-Null
git remote -v

# Step 3: Add all files
Write-Host "`nStep 3: Adding all files..." -ForegroundColor Yellow
git add -A

# Step 4: Check status
Write-Host "`nStep 4: Checking what will be committed..." -ForegroundColor Yellow
$status = git status --short
$count = ($status | Measure-Object).Count
Write-Host "Files to commit: $count" -ForegroundColor Green
if ($count -gt 0) {
    Write-Host "First 10 files:" -ForegroundColor Cyan
    $status | Select-Object -First 10
}

# Step 5: Commit
Write-Host "`nStep 5: Committing..." -ForegroundColor Yellow
git commit -m "Initial commit: Complete Darija learning platform" 2>&1

# Step 6: Set branch
Write-Host "`nStep 6: Setting branch to main..." -ForegroundColor Yellow
git branch -M main

# Step 7: Push
Write-Host "`nStep 7: Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "Repository: https://github.com/wolfxxx/BoerDarija.git" -ForegroundColor Cyan
git push -u origin main

Write-Host "`n=== Done! ===" -ForegroundColor Green
