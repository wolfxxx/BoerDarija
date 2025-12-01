# Script to pull remote changes and push local audio updates
Write-Host "=== Step 1: Pulling remote changes ===" -ForegroundColor Cyan
git pull origin main

Write-Host "`n=== Step 2: Checking status ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Step 3: Adding all changes ===" -ForegroundColor Cyan
git add -A

Write-Host "`n=== Step 4: Checking what will be committed ===" -ForegroundColor Cyan
git status --short

Write-Host "`n=== Step 5: Committing changes ===" -ForegroundColor Cyan
git commit -m "Update A2 lesson audio files with corrected pronunciations"

Write-Host "`n=== Step 6: Pushing to GitHub ===" -ForegroundColor Cyan
git push origin main

Write-Host "`n=== Step 7: Final status ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Done! ===" -ForegroundColor Green
