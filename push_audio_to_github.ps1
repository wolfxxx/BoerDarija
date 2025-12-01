# Script to push updated audio files to GitHub
Write-Host "=== Checking Git Status ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Adding all changes ===" -ForegroundColor Cyan
git add -A

Write-Host "`n=== Checking what will be committed ===" -ForegroundColor Cyan
git status --short

Write-Host "`n=== Committing changes ===" -ForegroundColor Cyan
git commit -m "Update A2 lesson audio files with corrected pronunciations"

Write-Host "`n=== Checking remote repository ===" -ForegroundColor Cyan
git remote -v

Write-Host "`n=== Pushing to GitHub ===" -ForegroundColor Cyan
git push origin main

Write-Host "`n=== Final Status ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Done! ===" -ForegroundColor Green
