# Fondos animados para los reels

Vídeos en bucle que van detrás de las diapositivas de cristal de siempre. Las diapositivas se vuelven
transparentes y mantienen su centro claro, así que los textos y tarjetas se escriben igual que antes.

## Usarlo en un reel

Añade esta línea justo después de `<div id="stage" …>`:

```html
<video class="bg-loop" data-video="../kit/bg/burbujas.mp4" muted playsinline preload="auto"></video>
```

Sin esa línea, el reel usa los fondos fijos de siempre (`fondo-azul` / `fondo-burbujas`).

## Fondos disponibles

| Archivo | Qué es |
| --- | --- |
| `burbujas.mp4` | Burbujas de cristal subiendo sobre crema, con toques coral y azul (Flow). El principal |
| `seda.mp4` | Seda coral ondeando arriba y abajo, centro crema libre (Flow). Ideal para mucho texto |
| `cintas.mp4` | Cintas de cristal coral (el vídeo de la web, en vertical) |

## Crear uno nuevo con Google Flow

1. Genera el clip en Flow con uno de los prompts de abajo (vertical 9:16, 8 s).
2. Déjalo en `media/bg/` con un nombre corto (p. ej. `seda.mp4`).
3. Ejecuta `npm run fondos` (sin nada más). Convierte todos los clips verticales de `media/bg/` que aún no
   tengan bucle: los recorta a 1080×1920 y funden el final con el principio para que no salte. Salen en
   `media/kit/bg/` con el mismo nombre. (O pídeselo a Claude.)
4. Cambia `data-video` en el reel.

### Qué tiene que tener el clip

- **Claro:** el texto es oscuro, así que el fondo tiene que ser luminoso (base melocotón crema).
- **Centro tranquilo:** el movimiento por los bordes y las esquinas; el centro, suave y sin detalles.
- **Lento y continuo:** sin cortes, sin cambios de cámara, sin objetos que entren o salgan.
- **Sin texto, sin logos, sin personas.**
- **Paleta de la marca:** crema `#fdf7f3`, naranja `#ff9440`, coral `#ff6a2c`, rojo coral `#f2452f` y un toque
  de azul `#1f66ff`.

### Prompts

Bloque común (pégalo al final de cada uno):

```
Vertical 9:16, 8 seconds, one continuous shot, no cuts, locked-off camera or very slow drift.
Bright, airy, high-key image on a warm cream background (#fdf7f3). Palette: soft orange #ff9440,
coral #ff6a2c, a touch of coral red #f2452f and a few small accents of electric blue #1f66ff.
Frosted glass and translucent materials, soft diffused light, gentle depth of field.
All motion stays slow, smooth and continuous so the clip can loop. Keep the centre of the frame calm,
light and empty for text overlays; movement lives near the edges and corners.
No text, no letters, no logos, no people, no hard shadows, no dark areas.
```

1. **Burbujas de cristal** (pega con la web): `Translucent frosted-glass bubbles of different sizes float slowly upward along the left and right edges, catching warm coral highlights and tiny blue reflections, some softly out of focus.`
2. **Seda líquida:** `Thin sheets of translucent peach and coral silk ripple slowly in a light breeze along the bottom and top of the frame, light passing through them, with a faint blue sheen on the folds.`
3. **Aurora suave:** `Soft blurred blobs of orange, coral and a little blue light drift and merge slowly like a lava lamp seen through frosted glass, only around the corners of the frame.`
4. **Rejilla de cristal:** `A faint grid of frosted-glass tiles seen at a slight angle, a slow warm coral light sweep travels across the tiles from one corner to the other, small blue glints on the edges.`
