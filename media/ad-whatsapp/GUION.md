# Anuncio para WhatsApp · Tu web: apréndela o te la hago

Vídeo vertical de 22 s con la plantilla de cristal y el fondo de burbujas (`reel.html`). Sin voz: texto y logos.

- `npm run reel -- ad-whatsapp` → `out/ad-whatsapp.mp4` (calidad máxima, para Instagram/TikTok).
- `out/ad-whatsapp-wa.mp4` → versión ligera para WhatsApp (720×1280, ~3 MB, pista de audio en silencio
  para que WhatsApp no lo convierta en GIF):
  `ffmpeg -i out/ad-whatsapp.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo -shortest -vf scale=720:1280 -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -c:a aac -b:a 64k -movflags +faststart out/ad-whatsapp-wa.mp4`

| Tiempo | Escena |
| --- | --- |
| 0–3,6 s | «¿Quieres tu propia web? Hoy se hace con IA. Y no hace falta saber programar.» |
| 3,6–10,6 s | Dos formas: **1. Aprende a hacerla tú** (clases 1:1) · **2. Te la hago yo** (te la entrego publicada) |
| 10,6–14,6 s | «Con las herramientas de hoy»: Claude, Vercel, GitHub, Supabase, Gemini |
| 14,6–18,4 s | ¿Por qué conmigo? 14 años como maestro · +5 webs y apps publicadas · sin jerga |
| 18,4–22 s | ML · Primera clase gratis · vibecoding.miguelliebana.com · Reenvíaselo a quien lo necesite |

## Mensaje para acompañar el vídeo

```
¿Quieres tu propia web? 🌐
Te enseño a hacerla con IA (sin saber programar) o te la hago yo, como prefieras.
La primera clase es gratis 👉 https://vibecoding.miguelliebana.com
Si conoces a alguien a quien le venga bien, reenvíaselo 🙌
```
