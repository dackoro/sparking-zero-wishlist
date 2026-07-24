# DBSZ Wishlist — los personajes que faltan en Sparking! ZERO

Fan page abierta con la lista de deseos de la comunidad: personajes de Dragon Ball que **no están**
en DRAGON BALL: Sparking! ZERO y que nos gustaría ver como DLC.

Copia el estilo del roster oficial (panal de hexágonos + overlay de ficha), pero todo el contenido lo
mantienen los fans: cada personaje es un JSON y **cualquiera puede abrir un pull request** para añadir
uno nuevo, corregir datos o proponer trajes y variantes que también faltan.

## Qué hace

- **Panal de hexágonos** con todos los candidatos, al estilo de la página *All Fighters* oficial.
- **Filtros y orden** por serie, saga, rol, importancia en la historia, tirón entre los fans, año de
  primera aparición y estado (wishlist / anunciado / ya es DLC).
- **Ficha en overlay** al pulsar un hexágono: render a la izquierda, escena en diagonal a la derecha,
  y debajo la descripción, la saga, el año, las técnicas y un **selector de trajes y variantes**.
- **Selector de trajes con foto**: cada variante es un hexágono con su propia imagen, y al pulsarlo
  cambian a la vez el render y el fondo de la cabecera. Ver
  [Imágenes de cada variante](CONTRIBUTING.md#imágenes-de-cada-variante).
- **Página propia por personaje** (`/fighters/<slug>/`) para que el buscador indexe cada ficha; el
  overlay es solo el atajo desde la portada.
- Sin imágenes oficiales: si una ficha no trae arte, la página **genera un placeholder** con su color.

## Stack

| Pieza | Qué se usa |
| --- | --- |
| Framework | [Astro](https://astro.build) 7, salida estática |
| Estilos | Tailwind CSS 4 (vía `@tailwindcss/vite`, sin `tailwind.config`) |
| Datos | Content collections + esquema Zod en `src/content.config.ts` |
| SEO | Canonical, Open Graph, JSON-LD (`ItemList` y `Article`), `sitemap-index.xml`, `robots.txt` |
| JS en cliente | Unos pocos KB propios: filtros, orden y overlay. Sin frameworks de UI. |

## Arrancar

```bash
npm install
npm run dev
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en <http://localhost:4321> |
| `npm run build` | Genera `dist/` **y valida el esquema de todas las fichas** |
| `npm run preview` | Sirve `dist/` para revisarlo antes de desplegar |

Antes de publicar, cambia `site` en [`astro.config.mjs`](astro.config.mjs) por tu dominio real: de ahí
salen el canonical, las Open Graph y el sitemap.

## Estructura

```
src/
├─ content/fighters/*.json   # una ficha por personaje  ← aquí se contribuye
├─ content.config.ts         # esquema Zod: valida cada ficha en el build
├─ components/
│  ├─ HexTile.astro          # hexágono del panal
│  ├─ FighterPanel.astro     # ficha (se usa en el overlay y en la página del personaje)
│  ├─ FighterArt.astro       # imagen o placeholder generado
│  └─ FilterBar.astro        # filtros y orden
├─ scripts/
│  ├─ roster.ts              # filtrado, orden y overlay
│  └─ looks.ts               # selector de trajes
├─ pages/
│  ├─ index.astro            # portada con el panal
│  ├─ fighters/[slug].astro  # ficha individual (SEO)
│  └─ como-contribuir.astro  # la guía, también dentro de la web
└─ styles/global.css         # tema y geometría del panal
public/fighters/             # arte de los personajes (WebP)
```

## Añadir un personaje

Resumen — la versión larga está en [CONTRIBUTING.md](CONTRIBUTING.md) y en `/como-contribuir`:

1. Crea `src/content/fighters/<slug>.json`. El nombre del archivo es la URL.
2. Rellena los campos obligatorios (`name`, `series`, `saga`, `firstAppearance`, `role`,
   `importance`, `hype`, `accent`, `description`, `whyWanted`).
3. Si tienes arte propio, déjalo en `public/fighters/` en WebP y apunta a él desde `render`,
   `portrait` y `scene`. Cada variante acepta esos mismos tres campos
   (`variants[].image`, `variants[].portrait`, `variants[].scene`) — el `portrait` es la foto que
   sale en su hexágono del selector de trajes. Si no tienes arte, no pongas nada.
4. `npm run build` para validar y ya puedes abrir el PR.

Un personaje que llegue como DLC **no se borra**: se le cambia `status` a `"Ya es DLC"` y se queda
como registro de que la comunidad lo pidió antes.

## Aviso legal

Proyecto de fans sin ánimo de lucro y sin relación con Bandai Namco, Toei Animation, Shueisha ni Bird
Studio. Dragon Ball y DRAGON BALL: Sparking! ZERO son marcas de sus respectivos propietarios. El
código se publica bajo licencia MIT; el arte que suba cada colaborador es responsabilidad suya y debe
ser propio o de licencia compatible.
