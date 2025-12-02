"""
Complete script to push all files to GitHub (excluding API key files via .gitignore)
"""
import subprocess
import os
import sys

LOG_FILE = "push_all_files_log.txt"

def log(msg):
    """Log message to both console and file"""
    print(msg, flush=True)
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(msg + '\n')
        f.flush()

def run_cmd(cmd, description):
    """Run a command and log the output"""
    log(f"\n{'='*60}")
    log(f"{description}")
    log(f"{'='*60}")
    log(f"Command: {cmd}")
    
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace'
        )
        
        output = result.stdout.strip()
        error = result.stderr.strip()
        
        if output:
            log(f"STDOUT:\n{output}")
        if error:
            log(f"STDERR:\n{error}")
        
        log(f"Exit code: {result.returncode}")
        return result.returncode == 0, output, error
    except Exception as e:
        log(f"Exception: {e}")
        return False, "", str(e)

# Change to repository directory
os.chdir(r"c:\Users\PC\Documents\DARIJA GEMINI")

# Clear log
with open(LOG_FILE, 'w', encoding='utf-8') as f:
    f.write("")

log("="*60)
log("PUSHING ALL FILES TO GITHUB")
log("="*60)

# Step 1: Initialize if needed
log("\nStep 1: Checking Git repository")
if not os.path.exists('.git'):
    log("  Initializing new repository...")
    success, _, _ = run_cmd("git init", "Initialize repository")
    if success:
        log("  Repository initialized")
else:
    log("  Repository already exists")

# Step 2: Set remote
log("\nStep 2: Setting remote")
run_cmd("git remote remove origin", "Remove old remote (if exists)")
run_cmd("git remote add origin https://github.com/wolfxxx/BoerDarija.git", "Add new remote")
success, output, _ = run_cmd("git remote -v", "Verify remote")
log(f"  Remote configured: {output}")

# Step 3: Verify .gitignore
log("\nStep 3: Verifying .gitignore")
test_files = ["create_lesson_a2_1_audio.py", "create_lesson_a2_3_audio.py"]
for test_file in test_files:
    if os.path.exists(test_file):
        success, output, _ = run_cmd(f'git check-ignore "{test_file}"', f"Check if {test_file} is ignored")
        if output:
            log(f"  [OK] {test_file} is ignored")
        else:
            log(f"  [WARNING] {test_file} is NOT ignored!")

# Step 4: Add all files
log("\nStep 4: Adding all files")
success, _, _ = run_cmd("git add -A", "Add all files")

# Step 5: Check what will be committed
log("\nStep 5: Checking staged files")
success, output, _ = run_cmd("git status --short", "List staged files")
if output:
    files = [line for line in output.split('\n') if line.strip()]
    log(f"  Total files to commit: {len(files)}")
    log("  First 30 files:")
    for i, file in enumerate(files[:30], 1):
        log(f"    {i}. {file}")
else:
    log("  [WARNING] No files staged!")

# Step 6: Commit
log("\nStep 6: Committing files")
success, output, error = run_cmd(
    'git commit -m "Initial commit: Complete Darija learning platform with all lessons, audio files, and resources"',
    "Commit all files"
)
if not success:
    log(f"  [ERROR] Commit failed: {error}")
    if "nothing to commit" in error.lower():
        log("  [INFO] Nothing to commit - files may already be committed")
else:
    log("  Commit successful")

# Step 7: Set branch
log("\nStep 7: Setting branch to main")
run_cmd("git branch -M main", "Rename branch to main")

# Step 8: Push
log("\nStep 8: Pushing to GitHub")
success, output, error = run_cmd("git push -u origin main", "Push to GitHub")
if success:
    log("  [SUCCESS] Push completed!")
else:
    log(f"  [ERROR] Push failed: {error}")
    if "authentication" in error.lower() or "permission" in error.lower():
        log("  [INFO] Authentication required - you may need to:")
        log("    - Use a Personal Access Token")
        log("    - Configure Git credentials")

# Step 9: Final verification
log("\nStep 9: Final verification")
success, output, _ = run_cmd("git status", "Final status")
success, output, _ = run_cmd("git log --oneline -1", "Latest commit")
success, output, _ = run_cmd("git ls-files", "List tracked files")
if output:
    file_count = len([line for line in output.split('\n') if line.strip()])
    log(f"  Total tracked files: {file_count}")

log("\n" + "="*60)
log("PROCESS COMPLETE")
log("="*60)
log(f"\nFull log saved to: {LOG_FILE}")
log("\nNext steps:")
log("1. Check the log file above for any errors")
log("2. Visit: https://github.com/wolfxxx/BoerDarija")
log("3. Verify all files are present")
log("4. Verify API key files are NOT present")


