#!/bin/bash
# Builds the avatar ad without sending the avatar through the browser: the original clip keeps every frame,
# and ffmpeg pastes the brand cards (tarjetas/out/tarjetas.mp4, rendered on the same timeline) and the URL pill
# over it at their times, then holds the last frame under the closing card.
# Usage: bash media/ad-avatar/montar.sh   (after npm run reel -- ad-avatar/tarjetas and npm run carrusel -- ad-avatar/url)
set -euo pipefail
cd "$(dirname "$0")"
AVATAR=clips/avatar-original.mp4   # the clip as it came out of HeyGen/VEED
CARDS=tarjetas/out/tarjetas.mp4
URL=url/out/01.png
mkdir -p out

# Card windows = each card scene's start to its end + 0.35 s fade (see tarjetas/reel.html).
GRAPH="[0:v]scale=in_range=full:out_range=tv,format=yuv420p,tpad=stop_mode=clone:stop_duration=3.5[base];\
[1:v]scale=720:1280:flags=lanczos,format=yuv420p[cards];\
[base][cards]overlay=enable='between(t,11.8,16.3)+between(t,16.5,20.4)+between(t,22.7,26.3)'[withcards];\
[withcards][2:v]overlay=enable='between(t,20.5,22.8)',format=yuv420p[v]"

ffmpeg -v error -y -i "$AVATAR" -i "$CARDS" -loop 1 -i "$URL" -filter_complex "$GRAPH" -map "[v]" -map 0:a \
  -t 26.3 -r 30 -c:v libx264 -profile:v high -crf 17 -preset slow -c:a aac -b:a 192k -movflags +faststart out/ad-avatar.mp4
# WhatsApp: lighter, same frames.
ffmpeg -v error -y -i out/ad-avatar.mp4 -c:v libx264 -profile:v high -crf 22 -preset slow -c:a aac -b:a 128k \
  -movflags +faststart out/ad-avatar-wa.mp4
ls -lh out/ad-avatar.mp4 out/ad-avatar-wa.mp4
