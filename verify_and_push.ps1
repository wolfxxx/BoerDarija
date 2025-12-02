# Verify API key protection and push to GitHub
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verifying API Key Protection" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if API key files are ignored
Write-Host "Checking if API key files are properly ignored..." -ForegroundColor Yellow
$apiFiles = @(
    "check_github_status.py",
    "create_lesson_b1_17_audio.py",
    "create_daily_routine_audio_a2_10.py"
)

foreach ($file in $apiFiles) {
    if (Test-Path $file) {
        $ignored = git check-ignore $file 2>&1
        if ($ignored) {
            Write-Host "  ✓ $file is ignored" -ForegroundColor Green
        } else {
            Write-Host "  ✗ $file is NOT ignored!" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Checking Git Status" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

git status

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Staging Changes" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

git add .gitignore lesson-b1-17.html

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Committing Changes" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

git commit -m "Update lesson-b1-17.html with audio support and ensure API key files are protected in .gitignore"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Pushing to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

git push origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Done!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
