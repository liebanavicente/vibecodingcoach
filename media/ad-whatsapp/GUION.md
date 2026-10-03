# Anuncio para WhatsApp · «Si ella pudo»

Vídeo vertical de 25 s para Estados de WhatsApp y para reenviar por chats y grupos.

## La idea

En WhatsApp no te ven desconocidos: te ven tus contactos, y el vídeo viaja reenviado. Por eso el
objetivo no es «vender» sino que quien lo vea piense en alguien: *«esto para mi madre / mi tía / mi
amiga la de la peluquería»*. La protagonista es esa persona: una mujer de unos 55 años con un pequeño
negocio que siempre ha dicho «yo no sé nada de ordenadores».

## El stack

| Pieza | Herramienta | Quién |
| --- | --- | --- |
| Personaje y escenas (vídeo + sonido ambiente) | Google Flow (Veo) | Tú |
| Textos en pantalla, cierre con tu marca, montaje | Kit de reels (`media/kit`, `npm run reel`) | Claude |
| Tapar letras inventadas por Flow | `data-box` del kit | Claude |
| Voz (opcional, recomendada) | Tu móvil, nota de voz de 20 s | Tú |
| Exportar para WhatsApp (< 16 MB, H.264 + AAC) | ffmpeg | Claude |
| Mensaje que acompaña al vídeo + vista previa del enlace | Imagen Open Graph de la web | Ya hecho |

## Guion (25 s)

| Tiempo | Imagen (Flow) | Texto en pantalla | Voz en off (si la grabas) |
| --- | --- | --- | --- |
| 0–3 s | **A.** Ella frente al portátil, resopla y lo cierra un poco | «Yo no sé nada de ordenadores.» | — (se oye el suspiro) |
| 3–8 s | **B.** Videollamada: sonríe, toma notas en una libreta | «Una clase. Sin jerga. A su ritmo.» | «Eso decía Carmen. Le enseñé a hablar con la IA como habla con sus clientas.» |
| 8–14 s | **C.** Teclea tranquila; en la pantalla, una web que se monta sola (sin texto) | «Le cuenta a la IA lo que quiere…» | «Le contó lo que quería…» |
| 14–19 s | **D.** En su pastelería enseña el móvil con su web a una clienta | «…y en una tarde tiene su web.» | «…y esa misma tarde tenía su web.» |
| 19–25 s | Cierre del kit (fondo de burbujas) | «Si ella pudo, tú también.» · **Clase de prueba gratis · 30 min** · ML + vibecoding.miguelliebana.com · «Reenvíaselo a quien lo necesite 💬» | «La primera clase es gratis. Pásaselo a quien siempre dice que no sabe.» |

## Prompts para Flow

**Truco para que sea siempre la misma persona:** genera primero una imagen de Carmen (prompt 0) y úsala
como «ingrediente» en los cuatro vídeos. Haz los clips en vertical 9:16 de 8 s.

**Bloque común (pégalo al final de cada prompt de vídeo):**

```
Vertical 9:16, 8 seconds, cinematic but natural, warm soft daylight, shallow depth of field, slow
handheld camera. Warm palette of cream, peach and coral with a small touch of blue. Realistic,
documentary feel, no glamour. No readable text anywhere: screens, signs and papers show abstract
shapes only. No logos. Natural ambient sound, no music, no dialogue.
```

**0 · Personaje (imagen):**
```
Portrait of Carmen, a warm 55-year-old Spanish woman, short wavy chestnut hair with some grey,
reading glasses on a cord, cream knitted cardigan over a coral blouse, friendly tired eyes, in a small
cosy bakery kitchen. Natural light, photographic, realistic, vertical 9:16.
```

**A · «Yo no sé nada de ordenadores»:**
```
Carmen sits at a kitchen table in front of an open laptop, frowning at the screen. She sighs audibly,
takes off her reading glasses and half-closes the laptop lid in frustration. Close-up, slow push-in.
```

**B · La clase:**
```
Carmen at the same table on a video call on her laptop (the other person is a blurred, out-of-focus
shape on screen). She laughs, nods and writes notes in a paper notebook. Over-the-shoulder shot from
behind the laptop toward her face, gentle slow dolly.
```

**C · Habla con la IA:**
```
Close-up of Carmen typing calmly on the laptop, a small confident smile. On the screen, soft abstract
blocks of a warm website layout assemble themselves like glass tiles, no readable text. Slow orbit
from her hands to the screen.
```

**D · Su web, en su pastelería:**
```
Carmen behind the counter of her small bakery full of pastries, proudly showing her phone to a smiling
customer; the phone screen shows an abstract warm website with pastry photos, no readable text.
Medium shot, slow push-in, morning light through the shop window.
```

## Cómo me los pasas

Deja los clips en `media/ad-whatsapp/clips/` como `a.mp4`, `b.mp4`, `c.mp4` y `d.mp4` (y, si grabas
la voz, `voz.m4a`). Yo monto, tapo las letras raras y saco `ad-whatsapp.mp4` listo para WhatsApp.

## Mensaje para acompañar el vídeo

```
¿Conoces a alguien que siempre dice «yo no sé de ordenadores»? 😄
Doy clases de vibe coding para principiantes absolutos: crear tu propia web con IA, sin jerga y a tu ritmo.
La primera clase es gratis 👉 https://vibecoding.miguelliebana.com
```

(Al pegar el enlace sale sola la vista previa con tu marca.)
