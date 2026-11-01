# Andrés Sánchez — Portfolio

Cartografía de mi carrera: estudio Cibernética Electrónica (ULSA, León, Nicaragua) y desarrollo sistemas full-stack con Go y Astro.

> **"I build modern systems and communities that learn."**

## Estructura

```
src/
  i18n/ui.ts              Diccionarios ES/EN
  data/
    route.ts              Paradas y miradores del mapa (7 paradas: coords, foto, alt)
    routeCopy.ts          Copy de la ruta (ES/EN)
    projects.ts           Proyectos del taller (ES/EN)
    postcards.ts          Postales estáticas de la cajuela
    community.ts          Comunidad y formación (ES/EN)
    tech.ts               Mapa etiqueta de stack -> logo simple-icons
  components/
    Header.astro          Navegación + toggle ES/EN
    Footer.astro          Pie de página
    Hero.astro            Introducción + retrato real + badge + enlaces
    RouteMap.astro        Placa SVG + pins numerados + camión scroll-driven + tarjetas ancla
    Workshop.astro        Proyectos destacados y secundarios
    CommunityEducation.astro  Comunidad + formación
    TechChip.astro        Chip de stack (logo simple-icons + texto)
    Cajuela.astro         Postales de mentores y compañeros
  styles/
    tokens.css            Sistema de tokens (superficies M3, forma, motion)
    global.css            Capas base, estilos del mapa,details, animaciones
  layouts/
    Base.astro            esqueleto HTML (i18n alternates, saltar al contenido)
    Page.astro            Header + main + Footer
  pages/
    index.astro           versión ES (raíz)
    en/index.astro        versión EN
public/
  assets/                 Fotos reales en WebP + manifest.json + README.md
  favicon.svg
assets-review/            Recortes descartados (fuera del deploy, no se borran)
```

## Cómo se ejecuta (local)

```bash
pnpm install
pnpm dev        # localhost:4321 (es) y /en/ (en inglés)
pnpm build      # sitio estático en dist/
pnpm preview    # sirve la build localmente
pnpm check      # astro check + TypeScript
```

El sitio se construye **estático**: cero servidor. Todo es HTML/CSS/SVG salvo **un script vanilla de ~1 KB sin librerías** que mueve el camión por la carretera según el scroll. Todo en español por defecto; inglés en `/en` con `hreflang`.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Astro 5, TypeScript, Tailwind CSS v4, fuentes auto-hospedadas (@fontsource: Bricolage Grotesque + IBM Plex Mono) |
| Estilos | CSS custom properties (tokens en `src/styles/tokens.css`) + `@layer base` para que las utilities de Tailwind ganen + `prefers-reduced-motion` |
| Logos | `simple-icons` (imports nombrados, tree-shaking) — monocromos, self-host, sin CDN |
| Idiomas | ES raíz + `/en` toggle (routing manual, sin dependencias) |
| JavaScript | **mínimo**: un script vanilla (~1 KB, sin dependencias) para el camión scroll-driven y el resalte pin ↔ tarjeta. Sin hidratación, sin librerías, sin framework |
| Calidad | `astro check`, pruebas de teclado, `prefers-reduced-motion`, Lighthouse |
| Despliegue (pendiente tu orden) | GitHub → AWS Amplify Hosting (GitHub App, sin claves en repo) |
| Backend (fase 2) | API Gateway HTTP + Lambda Go (`provided.al2023`) + DynamoDB on-demand |

## Decisiones clave (ver DECISIONS.md)

- **ES por defecto en la raíz; inglés en `/en`**: raíces primero.
- **"Cartografía"**: mapa dibujado a mano (sin Mapbox/tiles) con paradas técnicas y miradores humanos (La Gritería, Virgen de la Merced, Museo Ortiz Gurdian).
- **M3 de base fría + acento ámbar**: M3 como gramática de superficie, forma y movimiento; el ámbar solo tiñe superficies activas (`--elev-route`).
- **La ruta es una carretera vertical en serpentina**: el camión avanza con el scroll (script vanilla, `path.getPointAtLength` + tangente), cada pin es un ancla a su parada y al activarlo el foco salta a la tarjeta.
- **Sin backend todavía**: el portfolio es 100% estático. La API de postales (Go Lambda + DynamoDB + área visual `/admin` con JWT) queda como fase 2 documentada en `DECISIONS.md`, tras el deadline del AWS Student Builder Challenge.
- **Cero secretos en el repo**: ninguna clave; si llega la fase 2, variables de entorno en Amplify y `sam deploy` con el rol de IAM (nunca access keys).

## Las imágenes

Las fotos ya son reales: están en `public/assets/` en WebP (1400px, q80) y el retrato en `public/assets/portrait.webp`.

- `public/assets/manifest.json` inventaría cada archivo con su evento y su alt.
- `public/assets/README.md` explica el criterio de recorte y los nombres.
- `assets-review/` guarda los recortes que **no** se usan (no se deployan, no se borran) por si más adelante sirven.
- Los 13 descartes salieron del deploy: el sitio pasó de 19 MB a 7,8 MB de assets.

Para cambiar una foto: reemplazar el archivo conservando el nombre (o actualizar el `image`/`alt` en `src/data/route.ts`, `src/data/projects.ts` o `src/data/community.ts`) y volver a compilar. Si agregas una tecnología al stack sin logo en simple-icons, `src/data/tech.ts` la deja como chip de texto automáticamente.

## Próximo paso

El sitio está completo y verificado en local: build pasa, `astro check` limpio, navegación por teclado OK, móvil y EN incluidos.

**No subo nada hasta tu orden explícita.** Cuando digas, crearé el repo en GitHub, conectaré AWS Amplify Hosting (tu región us-east-2) y subiré con commits pequeños ya organizados en la historia de git.
