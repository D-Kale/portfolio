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
    community.ts          Comunidad y formación (ES/EN)
    tech.ts               Mapa etiqueta de stack -> logo simple-icons
  components/
    Header.astro          Navegación sticky + menú móvil + toggle tema + toggle ES/EN
    Footer.astro          Pie de página
    Hero.astro            Introducción + retrato real + badge + enlaces
    RouteMap.astro        Placa SVG + pins numerados + camión scroll-driven + tarjetas ancla
    Workshop.astro        Proyectos destacados y secundarios
    CommunityEducation.astro  Comunidad + formación
    Contact.astro         Cierre con email, GitHub y LinkedIn
    TechChip.astro        Chip de stack (logo simple-icons + texto)
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
  assets/                 25 fotos WebP publicadas + manifest.json + README.md
  favicon.svg
assets-review/            Fotos revisadas que no se enlazan (fuera del deploy y del repo)
docs/
  screenshots/            Capturas de referencia en WebP
```

## Cómo se ejecuta (local)

```bash
pnpm install
pnpm dev        # localhost:4321 (es) y /en/ (en inglés)
pnpm build      # sitio estático en dist/
pnpm preview    # sirve la build localmente
pnpm check      # astro check + TypeScript
```

El sitio se construye **estático**: cero servidor. Todo es HTML/CSS/SVG salvo **scripts vanilla inline (~3,8 KB raw, ~2 KB gzip, sin librerías)** que mueven el camión por la carretera según el scroll, animan la entrada de las tarjetas, controlan el menú móvil y el toggle de tema. Todo en español por defecto; inglés en `/en` con `hreflang`.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Astro 5, TypeScript, Tailwind CSS v4, fuentes auto-hospedadas (@fontsource: Bricolage Grotesque + IBM Plex Mono) |
| Estilos | CSS custom properties (tokens en `src/styles/tokens.css`) + `@layer base` para que las utilities de Tailwind ganen + `prefers-reduced-motion` |
| Logos | `simple-icons` (imports nombrados, tree-shaking) — monocromos, self-host, sin CDN |
| Idiomas | ES raíz + `/en` toggle (routing manual, sin dependencias) |
| JavaScript | **mínimo**: scripts vanilla inline (~3,8 KB / ~2 KB gzip, sin dependencias) para el camión scroll-driven, el resalte pin ↔ tarjeta, el toggle de tema, el menú móvil y la animación de entrada. Sin hidratación, sin librerías, sin framework |
| Calidad | `astro check`, pruebas de teclado, `prefers-reduced-motion`, Lighthouse |
| Despliegue (pendiente tu orden) | GitHub → AWS Amplify Hosting (GitHub App, sin claves en repo) |
| Backend (fase 2) | API Gateway HTTP + Lambda Go (`provided.al2023`) + DynamoDB on-demand |

## Decisiones clave (ver DECISIONS.md)

- **ES por defecto en la raíz; inglés en `/en`**: raíces primero.
- **"Cartografía"**: mapa dibujado a mano (sin Mapbox/tiles) con paradas técnicas y miradores humanos (La Gritería, Virgen de la Merced, Museo Ortiz Gurdian).
- **M3 de base fría + acento ámbar**: M3 como gramática de superficie, forma y movimiento; el ámbar solo tiñe superficies activas (`--elev-route`).
- **La ruta es una carretera vertical en serpentina**: el camión avanza con el scroll (script vanilla, `path.getPointAtLength` + tangente), cada pin es un ancla a su parada y al activarlo el foco salta a la tarjeta.
- **Sin backend todavía**: el portfolio es 100% estático. No hay contenido inventado: si una frase no tiene evidencia real en el repositorio, no se publica (por eso la Cajuela de frases ficticias salió y en su lugar quedó una sección de contacto honesta).
- **Tema claro/oscuro**: toggle en el header, persistido en `localStorage`, con el tema aplicado antes del primer pintado (sin flash).
- **Cero secretos en el repo**: ninguna clave; si llega la fase 2, variables de entorno en Amplify y `sam deploy` con el rol de IAM (nunca access keys).

## Las imágenes

Las fotos ya son reales y están en `public/assets/` en WebP (1400px, q80); el retrato en `public/assets/portrait.webp` (800x1000, 4:5).

- Se revisaron **91** imágenes y se publican **25**: 1,9 MB de assets.
- `public/assets/manifest.json` inventaría cada archivo publicado con su origen, evento y sección.
- `public/assets/README.md` lista qué se publica, por qué, y la regla de curateo.
- `assets-review/` guarda el resto (fotos validas no enlazadas, descartes y originales PNG de logos): **fuera del deploy y fuera del repo**, no se borran por si más adelante sirven.
- Regla: **una imagen se publica si y solo si el sitio la enlaza.** Los PNG de las capturas de referencia en `docs/screenshots/` también son WebP.

Para cambiar una foto: reemplazar el archivo conservando el nombre (o actualizar el `image`/`alt` en `src/data/route.ts`, `src/data/projects.ts` o `src/data/community.ts`) y volver a compilar. Si agregas una tecnología al stack sin logo en simple-icons, `src/data/tech.ts` la deja como chip de texto automáticamente.

## Despliegue

El sitio está **publicado en AWS**:

- **URL**: https://main.dxe9dwv4bjpro.amplifyapp.com (canonical y `SITE_URL` apuntan ahí)
- **Servicio**: AWS Amplify Hosting, app `andresportfolio` (`dxe9dwv4bjpro`), región **us-east-2**
- **Pipeline**: push a `main` en `D-Kale/portfolio` → build automático con `amplify.yml` (Node 22 + pnpm 11) → deploy + verify
- **Variables**: `SITE_URL` en la rama `main` (nunca access keys en el repo)

Rebuild manual:

```bash
aws amplify start-job --app-id dxe9dwv4bjpro --branch-name main \
  --job-type RELEASE --profile aws-toolkit --region us-east-2
```

El detalle de los comandos, los fallos previstos y el plan completo están en `docs/DEPLOY-PLAN.md`; las decisiones y aprendizajes del deploy, en `DECISIONS.md`.
