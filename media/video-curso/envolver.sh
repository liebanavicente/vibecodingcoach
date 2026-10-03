#!/bin/bash
# Wraps a video made elsewhere (e.g. a NotebookLM / Gemini Notebook video overview) with the brand: our 4.5 s
# opening, the video (cut before its own end card), our 7 s closing, all in 1080p at 30 fps, with soft music
# under the opening and closing. Needs `node --no-warnings media/video-curso/leccion.mjs <slug>` first.
# Usage: bash media/video-curso/envolver.sh modulo-0 notebooklm.mp4 393.7 [musicadefondo.mp3]
#   393.7 = second where to cut the source (just before its end card).
set -euo pipefail
cd "$(dirname "$0")/../.."
SLUG=$1; SRC=media/video-curso/$SLUG/$2; CUT=$3; TRACK=media/video-curso/${4:-musicadefondo.mp3}
npm run -s reel -- "video-curso/$SLUG/entrada" >/dev/null
npm run -s reel -- "video-curso/$SLUG/cierre" >/dev/null
IN=media/video-curso/$SLUG/entrada/out/entrada.mp4
OUTRO=media/video-curso/$SLUG/cierre/out/cierre.mp4
OUT=media/video-curso/$SLUG/out/$SLUG-notebooklm-youtube.mp4
mkdir -p "$(dirname "$OUT")"
V="scale=1920:1080:flags=lanczos,fps=30,format=yuv420p,setsar=1"
A="aformat=sample_rates=48000:channel_layouts=stereo"
ffmpeg -v error -y -i "$IN" -i "$SRC" -i "$OUTRO" -i "$TRACK" -filter_complex "\
[0:v]$V[v0];[1:v]trim=0:$CUT,setpts=PTS-STARTPTS,$V[v1];[2:v]$V[v2];\
[3:a]asplit=2[m0][m2];\
[m0]atrim=0:4.5,asetpts=PTS-STARTPTS,volume=0.45,afade=t=in:d=0.8,afade=t=out:st=3.5:d=1,$A[a0];\
[1:a]atrim=0:$CUT,asetpts=PTS-STARTPTS,$A[a1];\
[m2]atrim=20:27,asetpts=PTS-STARTPTS,volume=0.45,afade=t=in:d=1,afade=t=out:st=5.5:d=1.5,$A[a2];\
[v0][a0][v1][a1][v2][a2]concat=n=3:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" -c:v libx264 -profile:v high -crf 18 -preset slow -c:a aac -b:a 192k -movflags +faststart "$OUT"
echo "→ $OUT"
