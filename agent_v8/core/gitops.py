import subprocess, time
class GitOpsEngine:
    def auto_commit(self, msg):
        stamp = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        try:
            subprocess.run(["git", "add", "."], capture_output=True)
            subprocess.run(["git", "commit", "-m", f"[SOV-OS V8] {msg} - {stamp}"], capture_output=True)
            return True
        except Exception: return False
