# Replaces the made-up website Flow drew on the phone (last ~1.2 s of clip.mp4) with the real site
# (referencias/web-en-movil.png), keeping the thumb in front. Writes work/phone/NNNN.png for those frames.
# The screen is tracked per frame: inner bezel edges on row 800, top and bottom edges on columns.
import subprocess, numpy as np
from PIL import Image, ImageDraw

CLIP, START, FPS, W, H = "clip.mp4", 8.75, 24, 720, 1280
raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", str(START), "-i", CLIP, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
frames = np.frombuffer(raw, np.uint8).reshape(-1, H, W, 3)
shot = Image.open("referencias/web-en-movil.png").convert("RGB")

def screen_sides(rgb):
    """Inner left/right edges of the screen on row 800, inside the dark bezel; None if not found."""
    row = rgb.mean(axis=2)[800]
    dark = [x for x in range(150, 650) if row[x] < 70]
    if len(dark) < 2:
        return None
    l, r = min(dark), max(dark)
    while l < 719 and row[l] < 120: l += 1
    while r > 0 and row[r] < 120: r -= 1
    return (l, r) if r - l > 150 else None

def screen_top(rgb, x):
    gray = rgb.mean(axis=2)
    col = gray[:, x]
    y = 150
    while y < 700 and col[y] >= 80: y += 1
    while y < 700 and col[y] < 120: y += 1
    return y

import os
os.makedirs("work/phone", exist_ok=True)
def screen_bottom(rgb, x, top):
    """Inner bottom edge: going up from below the phone, the first bright pixel above the dark bezel."""
    col = rgb.mean(axis=2)[:, x]
    y = min(1270, top + 700)
    while y > top + 300 and col[y] >= 70: y -= 1
    while y > top + 300 and col[y] < 120: y -= 1
    return y

sides = (206, 493)
for i, f in enumerate(frames):
    sides = screen_sides(f) or sides
    left, right = sides
    w = right - left
    top = screen_top(f, left + 6)
    # The right side has no thumb over it, so its bottom edge helps when the phone is closer; the detection
    # can overshoot into the bezel, so it may only stretch the usual 584/287 ratio by up to 5 %.
    base = round(w * 584 / 287)
    height = min(max(base, screen_bottom(f, right - 8, top) - top), round(base * 1.05))
    site = shot.resize((w, round(shot.height * w / shot.width)), Image.LANCZOS).crop((0, 0, w, height))
    mask = Image.new("L", (w, height), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w - 1, height + 40), radius=34, fill=255)
    m = np.array(mask) > 0
    # Keep the thumb: skin-coloured pixels connected to the bottom edge stay from the original frame.
    region = f[top:top + height, left:right].astype(int)
    r, g, b = region[..., 0], region[..., 1], region[..., 2]
    # The thumb is shaded skin: warm and fairly dark, unlike the light pink and coral of the drawn website.
    lum = 0.3 * r + 0.59 * g + 0.11 * b
    skin = (lum < 165) & (r - g > 22) & (g - b > 0) & (r > 70)
    keep = np.zeros_like(skin)
    for x in range(int(w * 0.45)):  # the thumb only enters the left part of the screen
        y = height - 1
        while y > height * 0.7 and skin[y, x]:
            keep[y, x] = True
            y -= 1
    # Grow the thumb by 2 px so its soft edge is not cut.
    grown = keep.copy()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1), (2, 0), (0, 2), (0, -2)):
        grown |= np.roll(np.roll(keep, dy, axis=0), dx, axis=1)
    m &= ~grown
    out = f.copy()
    out[top:top + height, left:right][m] = np.array(site)[m]
    Image.fromarray(out).save(f"work/phone/{i:04d}.png")
print(len(frames), "frames")
