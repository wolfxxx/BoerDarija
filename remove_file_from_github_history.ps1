# Script to remove a specific file from GitHub history
# Usage: .\remove_file_from_github_history.ps1 <filename>

param(
    [Parameter(Mandatory=$true)]
    [string]$FileName
)

Write-Host "=" * 70 -ForegroundColor Yellow
Write-Host "REMOVING FILE FROM GIT HISTORY" -ForegroundColor Yellow
Write-Host "=" * 70 -ForegroundColor Yellow
Write-Host ""

# Check if file exists locally
if (-not (Test-Path $FileName)) {
    Write-Host "⚠️  File '$FileName' not found locally" -ForegroundColor Yellow
    Write-Host "   This is okay - we'll remove it from history anyway" -ForegroundColor Yellow
    Write-Host ""
}

# Check if git-filter-repo is installed
$filterRepoInstalled = Get-Command git-filter-repo -ErrorAction SilentlyContinue

if (-not $filterRepoInstalled) {
    Write-Host "Installing git-filter-repo..." -ForegroundColor Cyan
    pip install git-filter-repo
    Write-Host ""
}

# Check for remote
$remotes = git remote -v
if (-not $remotes) {
    Write-Host "⚠️  No remote configured. You'll need to add it after cleaning." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Removing '$FileName' from entire git history..." -ForegroundColor Cyan
Write-Host "This will rewrite your git history!" -ForegroundColor Yellow
Write-Host ""

# Remove file from history
git filter-repo --path $FileName --invert-paths --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ File removed from git history!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host ""
    
    if (-not $remotes) {
        Write-Host "1. Re-add your remote:" -ForegroundColor Yellow
        Write-Host "   git remote add origin <your-github-repo-url>" -ForegroundColor White
        Write-Host ""
    }
    
    Write-Host "2. Force push to GitHub:" -ForegroundColor Yellow
    Write-Host "   git push origin --force --all" -ForegroundColor White
    Write-Host "   git push origin --force --tags" -ForegroundColor White
    Write-Host ""
    Write-Host "⚠️  WARNING: Force pushing rewrites remote history!" -ForegroundColor Red
    Write-Host "   Make sure you coordinate with any collaborators." -ForegroundColor Red
    Write-Host ""
    Write-Host "3. Verify on GitHub:" -ForegroundColor Yellow
    Write-Host "   - Search for your API key on GitHub" -ForegroundColor White
    Write-Host "   - The file should no longer appear in any commits" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Error removing file from history" -ForegroundColor Red
    Write-Host "   Check the error message above" -ForegroundColor Red
}
