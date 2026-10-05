# Revisión gratis de la ficha de Google

La que prometen la tarjeta y `/comercios`. Unos 10 minutos con el móvil, y le dejas al comerciante un PDF de una página
con su nota sobre 20, un semáforo por punto y las 3 mejoras que más le ayudarían.

## 1 · Revisa la ficha (10 minutos)

Busca en Google Maps el nombre del negocio y, aparte, lo que vende + el barrio («pastelería Sant Andreu»): ¿sale entre los
primeros? Luego mira estos 10 puntos y ponle a cada uno **2 (bien), 1 (mejorable) o 0 (falta)**:

| Punto | Qué mirar |
| --- | --- |
| `verificada` | Si sale «¿Es el propietario de este negocio?», nadie la gestiona. |
| `categoria` | Nombre como el del rótulo y categoría principal que describe lo que vende. |
| `horario` | Todos los días, igual que el cartel de la puerta, y horario especial en festivos. |
| `contacto` | Teléfono que se puede pulsar y enlace a una web propia (no solo a Instagram). |
| `fotos` | 10 o más: fachada, interior, productos y logo; alguna del último año. |
| `descripcion` | En «Información», un texto sobre qué hace y qué le diferencia. |
| `resenas` | Bien: 4,3 o más con 20 reseñas o más. Buena nota con pocas reseñas: mejorable. |
| `respuestas` | Contesta las reseñas, sobre todo las malas y las recientes. |
| `productos` | Productos, servicios o carta con precios orientativos. |
| `novedades` | Alguna publicación de los últimos 3 meses y atributos marcados (tarjeta, accesible…). |

El consejo de cada punto ya está escrito en `criterios.mjs`. Si quieres afinarlo, añade una nota corta y concreta
(«Solo 4 fotos y ninguna de la fachada»): es lo que hace que el informe suene a ti y no a una plantilla.

## 2 · Crea el informe

Copia `ejemplo.json` a `negocios/<nombre>.json` (esa carpeta no se sube a GitHub), rellena las notas y ejecuta:

```
npm run revision -- media/revision-google/negocios/pasteleria-ana.json
```

Sale `out/pasteleria-ana.pdf` (y una vista previa en PNG). O díselo a Claude: «revisión de Pastelería Ana: categoría
Tienda, 4 fotos sin fachada, 4,7 con 9 reseñas…» y te prepara el archivo y el PDF.

`mejoras` vacío = las 3 mejoras salen solas de los puntos más flojos. Si quieres elegirlas tú, escríbelas ahí.

## 3 · Entrégalo

Mejor en mano o por WhatsApp, con un mensaje corto:

```
¡Hola! Soy Miguel, el vecino que hace webs. Te dejo la revisión de tu ficha de Google que te comenté:
tienes un 9 sobre 20 y con tres cambios sencillos te encontrarán más vecinos. Si quieres, lo vemos juntos un día
en 20 minutos. ¡Sin compromiso!
```

## Reglas

- Solo miras lo que es público. Nunca toques su ficha sin que te dé acceso como administrador desde su cuenta.
- Reseñas siempre de clientes de verdad: Google prohíbe comprarlas, inventarlas o dar regalos a cambio.
- Si la ficha está muy bien (16 o más), díselo: también genera confianza, y la web puede ser el siguiente paso.
