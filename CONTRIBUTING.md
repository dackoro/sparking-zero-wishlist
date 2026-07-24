# Cómo contribuir

Gracias por pasarte. Aquí se contribuye sobre todo **añadiendo personajes**, pero también valen
correcciones de datos, trajes que se nos han pasado, arte propio y mejoras de la web.

## Añadir un personaje

1. Haz fork y crea una rama: `add/<slug>` (por ejemplo `add/pikkon`).
2. Crea el archivo `src/content/fighters/<slug>.json`. **El nombre del archivo es la URL**
   (`/fighters/pikkon/`): minúsculas, sin acentos y con guiones.
3. Ejecuta `npm run build`. Si un campo no cumple el esquema, el build falla y te dice cuál.
4. Abre el pull request contando de dónde salen los datos.

Un archivo por personaje, un personaje por pull request. Así nunca hay conflictos de merge.

## El esquema

La fuente de verdad es [`src/content.config.ts`](src/content.config.ts). Resumen:

| Campo | Obligatorio | Qué es |
| --- | --- | --- |
| `name` | sí | Nombre en español, como lo llama la comunidad. |
| `nameJa` | no | Nombre original en japonés. |
| `series` | sí | `Dragon Ball` · `Dragon Ball Z` · `Dragon Ball GT` · `Dragon Ball Super` · `Películas` · `Especiales de TV` · `Spin-off` |
| `saga` | sí | Arco donde aparece por primera vez. |
| `firstAppearance.year` | sí | Año (1984-2030). |
| `firstAppearance.work` | sí | Obra concreta: capítulo, episodio o película. |
| `firstAppearance.medium` | sí | `Manga` · `Anime` · `Película` · `Videojuego` |
| `role` | sí | `Protagonista` · `Antagonista` · `Secundario` · `Apoyo` · `Relleno` · `Cameo` |
| `importance` | sí | 1-5. Su peso **en la historia**. 1 = figurante, 5 = capital en su arco. |
| `hype` | sí | 1-5. Cuánto lo **pide la gente**. No tiene por qué coincidir con `importance`. |
| `status` | no | `Wishlist` (por defecto) · `Anunciado` · `Ya es DLC` |
| `accent` | sí | Hex de 6 dígitos que tiñe toda su ficha. |
| `quote` | no | Frase corta suya. |
| `description` | sí | Quién es, en una o dos frases. |
| `whyWanted` | sí | Por qué merece entrar al juego. Es la parte que de verdad importa. |
| `signatureMoves` | no | Lista de técnicas. |
| `variants` | no | Trajes o formas que también faltan: `name`, `source`, `description`, `image`, `portrait`, `scene`, `accent`. |
| `render` / `portrait` / `scene` | no | Rutas dentro de `public/`. Si faltan se dibuja un placeholder. |

### Imágenes de cada variante

El selector de trajes de la ficha dibuja **un hexágono por variante**, y cada uno lleva su propia
foto, igual que el panal de la portada. Cada variante acepta tres imágenes y las tres se usan en un
sitio distinto:

| Campo | Dónde se ve | Cómo debe ser |
| --- | --- | --- |
| `variants[].portrait` | El hexágono de esa variante en el selector | Recorte de la cara. Se muestra con `object-fit: cover` anclado arriba, así que la cabeza debe estar en la parte superior. |
| `variants[].image` | El render grande a la izquierda de la cabecera | Cuerpo entero con **fondo transparente**. |
| `variants[].scene` | El fondo de la cabecera, detrás del marco | Apaisado (16:9), sin transparencia. |

Las tres son opcionales y degradan solas:

- Si no pones `portrait`, el hexágono usa `image`.
- Si tampoco hay `image`, el hexágono queda liso con el color de `accent`.
- Si no pones `scene`, la cabecera se queda con el fondo genérico.

El primer traje de la lista es siempre **el look por defecto**, y no se declara: sale automáticamente
del `portrait`, `render` y `scene` del propio personaje. Por eso su hexágono muestra exactamente la
misma cara que ya aparece en el panal de la portada.

Al pulsar un hexágono cambian a la vez el render y el fondo de la cabecera, así que si añades una
variante conviene rellenar los tres campos: si solo pones `image`, el fondo se quedará con el de la
forma base y el cambio se notará a medias.

Ejemplo, con los archivos ya en `public/fighters/`:

```json
"variants": [
  {
    "name": "Forma Majin",
    "source": "FighterZ",
    "description": "Piel rosa, cola y orejas de Majin.",
    "image": "/fighters/androide-21-forma-maligna.webp",
    "portrait": "/fighters/androide-21-forma-maligna-portrait.webp",
    "scene": "/fighters/androide-21-forma-maligna-scene.webp",
    "accent": "#db2777"
  }
]
```
| `tags` | no | Etiquetas libres en minúscula. |

## Reglas

- **Solo personajes que no estén ya en el juego.** Si ya está, el PR se cierra.
- Si un personaje se anuncia como DLC, **no lo borres**: cambia `status` a `"Ya es DLC"`.
- `importance` y `hype` son subjetivos, pero justifícalos en el PR si vas a poner un 5.
- Nada de arte sacado del juego, del anime o de artistas sin permiso. Sube solo trabajo propio o con
  licencia compatible, en **WebP** y con fondo transparente si es un render.
- Escribe en español neutro y sin faltas. La ficha se lee, no solo se mira.

## Tocar el código

- Estilos: Tailwind 4 en clases; lo que no se puede expresar con utilidades está en
  `src/styles/global.css` (tema y geometría del panal).
- El panal calcula el escalonado de las filas con `:nth-child`, así que el filtrado **reordena nodos**
  en vez de ocultarlos. Si tocas `roster.ts`, mantén esa idea o las filas dejarán de engranar.
- `FighterPanel.astro` se usa igual en el overlay de la portada y en la página del personaje: cambia
  ahí una vez y cambia en los dos sitios.
- Antes de abrir el PR: `npm run build`.
