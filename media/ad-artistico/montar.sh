#!/bin/bash
# Final artistic ad: Flow clip with the real site on the phone (pantalla.py) + 4 s brand closing, 1080x1920.
set -euo pipefail
cd "$(dirname "$0")"
python3 pantalla.py
(cd ../.. && npm run -s reel -- ad-artistico/cierre >/dev/null)
mkdir -p out
V="scale=1080:1920:flags=lanczos,fps=30,format=yuv420p,setsar=1"
ffmpeg -v error -y -i clip.mp4 -framerate 24 -i work/phone/%04d.png -i cierre/out/cierre.mp4 -filter_complex "\
[0:v]trim=0:8.75,setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0,$V[clipv];\
[2:v]$V[endv];\
[0:a]atrim=0:10,asetpts=PTS-STARTPTS,afade=t=out:st=9.4:d=0.6,aformat=sample_rates=48000:channel_layouts=stereo[ca];\
anullsrc=r=48000:cl=stereo,atrim=0:4[ea];\
[clipv][ca][endv][ea]concat=n=2:v=1:a=1[v][au]" \
  -map "[v]" -map "[au]" -c:v libx264 -profile:v high -crf 18 -preset slow -c:a aac -b:a 160k -movflags +faststart out/ad-artistico.mp4
ffmpeg -v error -y -i out/ad-artistico.mp4 -vf scale=720:1280 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart out/ad-artistico-wa.mp4
ls -lh out/*.mp4
