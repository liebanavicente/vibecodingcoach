# Plantilla «cine» (Google Flow + Claude) · plan B

> Experimento guardado como alternativa. La línea principal es la plantilla de cristal con fondo animado
> (`media/kit/bg/README.md`).

La hermana oscura de la plantilla de cristal. Un clip de Flow ocupa toda la pantalla y encima va el guion:
número de paso, titular que golpea, subtítulos que se iluminan palabra a palabra, barra de capítulos arriba
(como las historias) y la marca ML en la esquina. Ejemplo completo: `media/reel-14/reel.html`.

**Para combinar:** alterna un reel de cristal (explicar, comparar, palabra del día) con uno «cine» (contar una
historia o unos pasos con imagen real). Así el perfil no se ve siempre igual.

## Reparto del trabajo

1. **Tú, en Flow:** generas de 3 a 5 clips verticales de 8 s con los prompts de abajo y los guardas en
   `media/reel-XX/clips/`.
2. **Claude:** escribe el guion, monta las escenas, tapa las letras inventadas por Flow y renderiza
   (`npm run reel -- reel-XX`).

## Piezas de la plantilla (en `reel.html`)

| Qué | Cómo |
| --- | --- |
| Escena con clip | `<section class="scene cine" data-start data-end data-video="clips/a.mp4">` + `<video>` |
| Cámara lenta | `data-rate="0.75"` en la escena (estira un clip corto) |
| Zoom lento | `data-zoom="1.1"` en la escena |
| Clip horizontal | `.cine-glow` + `.cine-window` con el `<video>` dentro (ventana flotante) |
| Paso | `<p class="chapter"><b>1</b> Paso uno</p>` |
| Titular | `<p class="slam" data-fx="slam" data-in="0.4">…</p>` (`slam-xl` más grande) |
| Subrayado | `<div class="underline" data-fx="wipe" data-in="0.9">` |
| Subtítulos karaoke | `<p class="karaoke" data-words="Frase…" data-in="1.3" data-dur="3">` |
| Barra de capítulos | `.hud` > `.segments data-segments="0,5.2,10.6"` (inicio de cada escena) |
| Tapar letras de Flow | caja con `data-box="[[t,x,y,ancho,alto,opacidad],…]"` (ver `.flow-bar` en reel-14) |

El texto va en el tercio inferior (`.cine-copy`) o arriba (`.cine-copy top`). No pongas nada en los 250 px de
arriba, los 400 de abajo ni los 150 de la derecha: ahí van los botones de Instagram.

## Reglas para los clips de Flow

- Vertical 9:16, 8 s, cámara lenta y suave (dolly, push-in). Nada de cortes rápidos.
- **Sin texto en pantalla:** Flow se inventa las letras. Pide pantallas «abstractas, sin texto legible».
- **Tercio inferior tranquilo y algo oscuro:** ahí van los subtítulos.
- Misma paleta siempre: luz cálida coral y melocotón, toques de azul `#1f66ff`, materiales de cristal.
- Misma persona en toda la serie si sale alguien (describe siempre la misma ropa y el mismo pelo).

Bloque de estilo para pegar al final de cada prompt:

```
Vertical 9:16, 8 seconds, cinematic, shallow depth of field, slow smooth camera move.
Warm coral and peach light with subtle blue (#1f66ff) accents, frosted glass materials, soft film grain.
Keep the lower third calm and slightly darker for subtitles. No on-screen text, no readable letters,
no logos, no UI words: screens show abstract shapes and blurred layouts only.
```

## Prompts listos para los próximos reels «cine»

**«3 errores que cometí al empezar»**
- A: `Close-up of a person's hands typing on a laptop at night in a cosy room, a glowing screen full of abstract red error shapes, they stop and rub their forehead. Slow push-in.`
- B: `Over-the-shoulder shot of the same person, the screen slowly turns from red blocks to calm green blocks, they lean back and smile. Slow dolly out.`
- C: `A notebook on a wooden desk with three hand-drawn crosses (no words), a coffee cup steaming, warm morning light. Slow top-down rotation.`

**«Mi primera web, de la idea a publicada»**
- A: `A small bakery counter at dawn, a baker in a coral apron takes a photo of fresh bread with a phone. Slow push-in.`
- B: `The same baker at a kitchen table with a laptop, abstract web layout blocks assembling on screen like glass tiles. Slow orbit.`
- C: `A phone in the baker's hand shows a finished abstract website with bread photos, they turn it toward the camera proudly. Slow push-in.`

**«Un día aprendiendo con IA»**
- A: `Sunrise through a window onto a tidy desk with a laptop and headphones, soft dust in the light. Slow pan.`
- B: `Floating frosted-glass chat bubbles (no text) rising from a laptop screen like soap bubbles in warm light. Slow upward camera.`
- C: `Night, the same desk, the laptop closes slowly, a small orange sticky note on the lid (no text). Slow push-in.`
