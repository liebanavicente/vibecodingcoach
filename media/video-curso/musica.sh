#!/bin/bash
# Adds background music to a rendered lesson: the track loops with a 4 s crossfade if it is shorter than the
# video, sits at a medium level (there is no voice) and fades in and out. The video stream is copied untouched.
# Usage: bash media/video-curso/musica.sh modulo-0 musicadefondo.mp3   → <slug>/out/<slug>-youtube.mp4
set -euo pipefail
cd "$(dirname "$0")"
SLUG=$1
TRACK=${2:-musicadefondo.mp3}
VIDEO="$SLUG/out/$SLUG.mp4"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIDEO")
OUT=$(python3 -c "print(round($D - 4, 2))")
ffmpeg -v error -y -i "$VIDEO" -i "$TRACK" -i "$TRACK" -i "$TRACK" \
  -filter_complex "[1:a][2:a]acrossfade=d=4:c1=tri:c2=tri[ab];[ab][3:a]acrossfade=d=4:c1=tri:c2=tri,volume=0.45,afade=t=in:d=1.5,afade=t=out:st=$OUT:d=4[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -t "$D" -movflags +faststart "$SLUG/out/$SLUG-youtube.mp4"
echo "→ $SLUG/out/$SLUG-youtube.mp4"
