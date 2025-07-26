# One - Gamifying Coding
# Back to python, and learning all these datetime things

import os
from datetime import datetime, timedelta

# Set your desired log directory
BASE_DIR = os.path.expanduser("/Projects/365-days/streak_log")
os.makedirs(BASE_DIR, exist_ok=True)

# Create today's log file
today = datetime.now().strftime("%Y-%m-%d")
today_file = os.path.join(BASE_DIR, f"{today}.txt")

# List and parse all dates
dates = sorted([
    datetime.strptime(f.split(".")[0], "%Y-%m-%d")
    for f in os.listdir(BASE_DIR)
    if f.endswith(".txt")
])

# Count streak
streak = 1
for i in range(len(dates) - 1, 0, -1):
    if dates[i] - dates[i - 1] == timedelta(days=1):
        streak += 1
    else:
        break

print(f"🔥 Current streak: {streak} day{'s' if streak > 1 else ''}!")
print(f"📅 Today's log saved to: {today}.txt")

# Force UTF-8 encoding to support emojis or special characters
if not os.path.exists(today_file):
    with open(today_file, "w", encoding="utf-8") as f:
        f.write(f"Date: {today}\n✅ Thanks for showing up for yourself!\n🔥 Streak: {streak}\n\nDaily Log:\n- ") 