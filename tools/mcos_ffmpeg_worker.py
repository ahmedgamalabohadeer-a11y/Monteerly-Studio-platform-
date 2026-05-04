import time
import subprocess

def process_video_task():
    print("FFmpeg Worker started...")

    while True:
        try:
            print("Checking tasks...")
            time.sleep(3)

            # مثال (معطل):
            # subprocess.run(["ffmpeg", "-i", "input.mp4", "output.mp4"])

            print("Idle...")
            time.sleep(5)

        except Exception as e:
            print("Error:", e)
            time.sleep(10)

if __name__ == "__main__":
    process_video_task()
