"""
Script to push updated audio files to GitHub
"""
import subprocess
import sys
import os

LOG_FILE = "push_to_github_log.txt"

def log_and_print(msg):
    """Print and log a message"""
    print(msg, flush=True)
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(msg + '\n')
        f.flush()

def run_command(cmd, description):
    """Run a git command and return output"""
    log_and_print(f"\n{'='*60}")
    log_and_print(f"{description}")
    log_and_print(f"{'='*60}")
    log_and_print(f"Running: {cmd}")
    
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace'
        )
        
        output = f"STDOUT:\n{result.stdout}\n" if result.stdout else ""
        error = f"STDERR:\n{result.stderr}\n" if result.stderr else ""
        exit_code = f"Exit code: {result.returncode}\n"
        
        log_and_print(output + error + exit_code)
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        error_msg = f"Error: {e}\n"
        log_and_print(error_msg)
        return False, "", str(e)

# Change to the repository directory
os.chdir(r"c:\Users\PC\Documents\DARIJA GEMINI")

# Clear log file
with open(LOG_FILE, 'w', encoding='utf-8') as f:
    f.write("")

log_and_print("="*60)
log_and_print("PUSHING AUDIO FILES TO GITHUB")
log_and_print("="*60)

# Step 1: Check status
success, stdout, stderr = run_command("git status", "Step 1: Checking Git Status")
if not success:
    print("ERROR: Could not check git status")
    sys.exit(1)

# Step 2: Add all files
success, stdout, stderr = run_command("git add -A", "Step 2: Adding All Files")
if not success:
    print("ERROR: Could not add files")
    sys.exit(1)

# Step 3: Check what will be committed
success, stdout, stderr = run_command("git status --short", "Step 3: Checking What Will Be Committed")
if not success:
    print("ERROR: Could not check status")
    sys.exit(1)

# Check if there are any changes
if not stdout.strip():
    print("\nWARNING: No changes to commit!")
    sys.exit(0)

# Step 4: Commit
success, stdout, stderr = run_command(
    'git commit -m "Update A2 lesson audio files with corrected pronunciations"',
    "Step 4: Committing Changes"
)
if not success:
    print("ERROR: Could not commit")
    sys.exit(1)

# Step 5: Check remote
success, stdout, stderr = run_command("git remote -v", "Step 5: Checking Remote Repository")
if not success:
    print("ERROR: Could not check remote")
    sys.exit(1)

# Step 6: Push
success, stdout, stderr = run_command("git push origin main", "Step 6: Pushing to GitHub")
if not success:
    print("ERROR: Could not push to GitHub")
    print("You may need to authenticate or check your credentials")
    sys.exit(1)

# Step 7: Final status
run_command("git status", "Step 7: Final Status Check")

log_and_print("\n" + "="*60)
log_and_print("SUCCESS! Files have been pushed to GitHub")
log_and_print("="*60)
log_and_print(f"\nFull log saved to: {LOG_FILE}")


