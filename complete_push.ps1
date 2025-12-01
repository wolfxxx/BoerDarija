# Complete script to initialize and push everything to GitHub
$logFile = "push_complete_log.txt"

function Log-Output {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    Write-Host $logMessage
    Add-Content -Path $logFile -Value $logMessage
}

# Clear log file
"" | Out-File -FilePath $logFile -Encoding UTF8

Log-Output "=== Starting Complete Push Process ==="

# Step 1: Initialize repository if needed
Log-Output "Step 1: Checking/Initializing Git repository"
if (-not (Test-Path .git)) {
    Log-Output "  Initializing new Git repository..."
    git init
    Log-Output "  Repository initialized"
} else {
    Log-Output "  Repository already exists"
}

# Step 2: Set remote
Log-Output "Step 2: Setting remote repository"
git remote remove origin -ErrorAction SilentlyContinue
git remote add origin https://github.com/wolfxxx/BoerDarija.git
$remote = git remote -v
Log-Output "  Remote set to: $remote"

# Step 3: Verify .gitignore
Log-Output "Step 3: Verifying .gitignore excludes API key files"
$testFiles = @("create_lesson_a2_1_audio.py", "create_lesson_a2_3_audio.py")
foreach ($file in $testFiles) {
    if (Test-Path $file) {
        $ignored = git check-ignore $file 2>&1
        if ($ignored) {
            Log-Output "  [OK] $file is ignored"
        } else {
            Log-Output "  [WARNING] $file is NOT ignored!"
        }
    }
}

# Step 4: Add all files
Log-Output "Step 4: Adding all files (respecting .gitignore)"
git add -A
$status = git status --short
$fileCount = ($status | Measure-Object).Count
Log-Output "  Files staged: $fileCount"

# Show first 20 files
Log-Output "  First 20 files to be committed:"
$status | Select-Object -First 20 | ForEach-Object {
    Log-Output "    $_"
}

# Step 5: Commit
Log-Output "Step 5: Committing files"
$commitOutput = git commit -m "Initial commit: Complete Darija learning platform with all lessons, audio files, and resources" 2>&1
Log-Output "  Commit output: $commitOutput"

# Step 6: Set branch
Log-Output "Step 6: Setting branch to main"
git branch -M main

# Step 7: Push
Log-Output "Step 7: Pushing to GitHub"
Log-Output "  Repository: https://github.com/wolfxxx/BoerDarija.git"
$pushOutput = git push -u origin main 2>&1
Log-Output "  Push output: $pushOutput"

# Step 8: Verify
Log-Output "Step 8: Final verification"
$finalStatus = git status
Log-Output "  Final status: $finalStatus"

$commitCount = (git log --oneline | Measure-Object).Count
Log-Output "  Total commits: $commitCount"

$trackedFiles = (git ls-files | Measure-Object).Count
Log-Output "  Total tracked files: $trackedFiles"

Log-Output "=== Process Complete ==="
Log-Output "Check the log file: $logFile"
Write-Host "`nFull log saved to: $logFile" -ForegroundColor Green
