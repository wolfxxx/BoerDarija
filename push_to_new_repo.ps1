# Script to push everything to the new repository
Write-Host "=== Step 1: Verifying remote repository ===" -ForegroundColor Cyan
git remote -v

Write-Host "`n=== Step 2: Checking .gitignore is working ===" -ForegroundColor Cyan
Write-Host "Checking if API key files are ignored..." -ForegroundColor Yellow
$apiKeyFiles = Get-ChildItem -Path . -Filter "create_lesson*.py" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 5
if ($apiKeyFiles) {
    Write-Host "Found API key files (should be ignored):" -ForegroundColor Yellow
    foreach ($file in $apiKeyFiles) {
        $ignored = git check-ignore $file.FullName
        if ($ignored) {
            Write-Host "  [IGNORED] $($file.Name)" -ForegroundColor Green
        } else {
            Write-Host "  [NOT IGNORED!] $($file.Name)" -ForegroundColor Red
        }
    }
}

Write-Host "`n=== Step 3: Adding all files (respecting .gitignore) ===" -ForegroundColor Cyan
git add -A

Write-Host "`n=== Step 4: Checking what will be committed ===" -ForegroundColor Cyan
$status = git status --short
if ($status) {
    Write-Host "Files to be committed:" -ForegroundColor Green
    $status | Select-Object -First 20
    $total = ($status | Measure-Object).Count
    Write-Host "`nTotal files: $total" -ForegroundColor Cyan
} else {
    Write-Host "No changes to commit" -ForegroundColor Yellow
}

Write-Host "`n=== Step 5: Committing all files ===" -ForegroundColor Cyan
git commit -m "Initial commit: Complete Darija learning platform with all lessons, audio files, and resources"

Write-Host "`n=== Step 6: Setting branch to main ===" -ForegroundColor Cyan
git branch -M main

Write-Host "`n=== Step 7: Pushing to new repository ===" -ForegroundColor Cyan
Write-Host "Pushing to: https://github.com/wolfxxx/BoerDarija.git" -ForegroundColor Yellow
git push -u origin main

Write-Host "`n=== Step 8: Final verification ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Done! ===" -ForegroundColor Green
Write-Host "Repository: https://github.com/wolfxxx/BoerDarija" -ForegroundColor Cyan
