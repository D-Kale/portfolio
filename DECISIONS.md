# DECISIONS.md

Registro vivo de decisiones, errores y aprendizajes del portfolio para el AWS Student Builder Challenge.
Formato: fecha · decisión · por qué · alternativas descartadas.

---

## 2026-10-28 · Idioma: español por defecto en la raíz, inglés en /en

- **Décision**: ES en `/`, EN en `/en`, toggle visible en el header.
- **Por qué**: "mantener el español es respetar mis raíces" — la identidad es primero; el inglés abre la puerta a empleo remoto y oportunidades internacionales como extra.
- **Alternativa descartada**: EN por defecto (sería una web que no se siente suya) y detección automática por JS (rompe el objetivo estático y sorprende al visitante).

## 2026-10-28 · Concepto: "Cartografía" — La Ruta

- **Décision**: el portfolio es un mapa dibujado a mano de la carrera: paradas técnicas (proyectos/eventos) y miradores humanos (cultura leonesa: Virgen de la Merced, La Gritería, Museo Ortiz Gurdian).
- **Por qué**: el mapa del objetivo (darte a conocer como persona, no vender producto) + las fotos y links ya existentes: Igora la narrativa sin inventar nada.
- **Alternativa descartada**: modelo 3D fotogramétrico (pesado, riesgo alto, dice "hice un 3D", no "construyo sistemas") y "La Pulpería" (no pega con su identidad de cibernético en León).

## 2026-10-28 · Scope para el deadline: backend post-entrega

- **Décision**: v1 100% estática (Astro → Amplify). La Cajuela (postales de mentores) se alimenta de JSON en el repo, revisado en build. La API real (API Gateway HTTP + Lambda Go `provided.al2023` arm64 + DynamoDB + `/admin` visual con JWT + rate limit) queda documentada como **fase 2, después del deadline**.
- **Por qué**: con 1–2 días, un backend a medias arriesga todo. Estático es hermético y ampliable. La tentación de "mostrar AWS de más" no vale un portfolio roto.
- **Alternativa descartada**: meto la API sí o sí (riesgo alto de no llegar); guestbook sin moderación (spam) — descartado por seguridad.
- **Estado**: la Cajuela como contenido ficticio quedó **retirada** el 2026-11-02 (ver más abajo). La API de fase 2 se mantiene como opción, pero solo con contenido real.

## 2026-10-28 · Trabajo local hasta orden explícita

- **Décisión**: nada sale a GitHub ni a AWS hasta que Andrés lo pida.
- **Por qué**: control total de lo que se publica durante el challenge.
- **Nota**: presupuesto AWS al día de hoy: plan FREE, $100 créditos, expiran **2027-04-28**. Región: **us-east-2**.
- **Estado**: **superado el 2026-11-02** — Andrés dio la orden explícita y el portfolio ya está publicado en `https://main.dxe9dwv4bjpro.amplifyapp.com` (ver la entrada de despliegue más abajo).

## 2026-10-28 · Infraestructura mínima el día del deploy

1. **Amplify Hosting**: repo GitHub → build automático en push. Conexión vía GitHub App (sin claves en repo).
2. **No habrá** VPC, NAT, RDS, Cognito ni WAF en v1: nada paga por cuentas con este monto de tráfico.
3. **Budgets** con alarma a $1 y $5 el primer día.
4. **Roll IAM**: solo lo que Amplify necesita (rol de la app, no usuario), sin claves de acceso en el repo.
5. **DynamoDB + Lambda** (fase 2): tabla on-demand + TTL, concurrencia reservada en 2, throttle 2 rps por stage.

## Errores y aprendizajes (log corrido)

- (2026-10-28) `pnpm install` en red lenta del entorno: timeouts en npm registry. Lección: correr con margen de tiempo y no en paralelo con otras tareas de red pesada.
- (2026-10-30) `pkill -f "[p]ython3 -m http.server"` mató el propio shell: la línea de comandos del shell coincidía con el patrón. Lección: matar el servidor de pruebas con `fuser -k 4321/tcp`.
- (2026-10-30) Un archivo llamado `techday-escenario-marca.webp` era en realidad un escenario de **TEDx Avenida Bolívar**. Lección: el nombre del archivo no es evidencia del contenido — revisar cada foto antes de publicarla (hoja de contactos con `Pillow`).
- (2026-10-30) Los pins del mapa se desplazaban ~8px: en la capa HTML el `top` es un **porcentaje**, no una coordenada del `viewBox`. El factor `Y = 0.64` solo aplica dentro del SVG. Lección: un mismo sistema de coordenadas no puede tener dos unidades.
- (2026-10-30) Dos bugs de CSS que costaron tiempo: `bg-white` en tarjetas sobre fondo oscuro, y `a { color: var(--route) }` sin `@layer base` (ganaba a las utilities de Tailwind). Lección: en Tailwind v4, **toda** regla base debe vivir en `@layer base` y `global.css` importa `tailwindcss` **antes** de `tokens.css`.
- (2026-10-31) Los pines del mapa eran anclas con `width: 0`: sin caja propia el objetivo de toque quedaba en 18px (WCAG 2.2 exige 24px) y Playwright los reportaba como "not visible". Lección: un ancla con hijos posicionados necesita caja propia (`width`/`min-height`), no solo hijos visibles.
- (2026-11-01) El logotipo tipográfico de Waresis (`waresis-full.png`) llega **cortado en los extremos** del lienzo: la W y la S final están truncadas, y el recorte automático no lo arregla. Lección: un asset de marca hay que mirarlo sobre su fondo real antes de publicarlo; se usou la marca "W" y el archivo quedó en cuarentena.
- (2026-11-01) La foto del escenario de TEDx estaba duplicada en disco: `public/assets/techday/techday-escenario-aval-blivar.webp` (sin trackear) y `public/assets/tedx/tedx-escenario-aval-blivar.webp` (trackeada). Como las imágenes lazy no se solicitaban hasta hacer scroll, el 404 no aparecía en las pruebas. Lección: probar con scroll real y no solo con `complete && naturalWidth === 0` en la carga inicial.

## 2026-10-30 · Dirección visual v3: M3 de base fría + acento ámbar (Opción B)

- **Décisión**: se adoptó la **Opción B** de `docs/DESIGN-DIRECTION.md` §1.1 — M3 como gramática de superficie, forma y movimiento sobre la base azul-noche existente. El ámbar queda como acento y tiñe superficies activas (`--elev-route`), en vez de recalentar todos los neutros.
- **Por qué**: la marca "cartografía nocturna de León" se sostiene mejor con la base fría. El M3 ortodoxo (Opción A, neutros cálidos derivados del ámbar) habría cambiado la temperatura del sitio entero a cambio de poco.
- **Alternativa descartada**: M3 puro con semilla ámbar; y usar sombra para separar tarjetas (en oscuro M3 sube el tono de la superficie, no la oscurece).

## 2026-10-30 · El mapa pasa a ser interactivo sin una línea de JavaScript

- **Décisión**: cada pin es `<button popovertarget="sheet-{id}">` y su ficha es un `<div popover>` nativo, con anclado por CSS `anchor()` en ≥640px y bottom sheet en móvil. La placa SVG dibuja solo geometría (trazo + rejilla); los pins y las etiquetas son una capa HTML superpuesta con unidades `cqw`.
- **Por qué**: el mapa era el argumento central y se leía como una imagen. La Popover API da teclado (Esc cierra, el foco vuelve al disparador), top layer y `@starting-style` **sin** hidratar nada — coherente con la garantía estática.
- **Alternativa descartada**: isla Astro/React para el mapa (1–5 KB de JS, foco manual, peor a11y); `:target` como única interacción (gestión de foco pésima); `anchor()` sin fallback (se pierde en navegadores sin soporte).
- **Estado**: **reemplazada** el 2026-10-31 por la decisión de la carretera vertical (ver más abajo): el popover se eliminó y los pines son anclas a las tarjetas.

## 2026-10-30 · Logos de stack con simple-icons, chips de texto cuando no hay logo

- **Décisión**: `simple-icons@16.36.0` self-host, imports nombrados en `src/data/tech.ts`, render monocromo con `fill="currentColor"` + `aria-hidden`, y **siempre** la etiqueta de texto al lado. Si la tecnología no está en el catálogo (`sqlc`, `S3 API`, `Blade`, `matplotlib`), el chip es solo texto.
- **Por qué**: el reconocimiento de stack es instantáneo con logo, y el texto solo no distingue. Nunca un icono genérico inventado.
- **Alternativa descartada**: logos de marca a color (rompe la paleta monocroma y agrega peso visual); CDN de iconos (dependencia externa y riesgo de caída en un sitio 100% estático).

## 2026-10-30 · Pipeline de imágenes: WebP + cuarentena fuera del deploy

- **Decisión**: fotos reales en `public/assets/` como WebP (1400px, q80); `public/assets/manifest.json` como inventario; los recortes descartados se **mueven** a `assets-review/` (fuera de `public/`, fuera del deploy, sin borrar).
- **Por qué**: 19 MB → 7,8 MB de assets. Mover en vez de borrar deja la decisión reversible y documentada.
- **Alternativa descartada**: borrar los descartes (irrecuperable); servir originales y optimizarlos con un plugin de build (añade una dependencia a un sitio que no tiene runtime).

## 2026-10-31 · La ruta pasa a ser una carretera vertical con camión scroll-driven

- **Decisión**: una sola placa SVG con la carretera en serpentina (hombro, asfalto, eje y trazo recorrido) y **un solo camino de lectura**: los pines son anclas `#stop-{id}` a las tarjetas, y el foco salta a la tarjeta al activarlos (`tabindex="-1"` + `scroll-margin-top`). Un script **vanilla** inline de 1,6 KB (0,8 KB gzip, sin librerías) recorre `path.getPointAtLength` + tangente para mover el camión con el scroll y marcar la parada activa.
- **Por qué**: el popover escondía la trayectoria detrás de siete fichas sueltas — el mapa se leía como una imagen, no como un camino. El camión convierte el scroll en avance y las tarjetas quedan como índice legible, imprimible y con URL compartible. El JS mínimo es el precio de esa metáfora y cabe en un bundle de 1 KB.
- **Alternativas descartadas**: mantener el popover y añadir solo el camión (dos modelos de interacción compitiendo); `animation-timeline: view()` (no permite girar el camión según la tangente de la curva); librería de scroll/GSAP (peso y a11y); scroll snapping por tramo (rompe la lectura de tarjetas largas).
- **Consecuencia**: la promesa de "cero JS" del sitio queda **retirada** y documentada como tal: es JS mínimo y declarativo, no cero.

## 2026-10-31 · Logos reales de instituciones y foco de teclado

- **Decisión**: `src/data/brands.ts` centraliza los iconos de `simple-icons` y `BrandMark.astro` los emite como SVG inline `currentColor` + `aria-hidden`; el logo de ULSA es el archivo real (`public/assets/ULSA/ulsa-logo.webp`). Cada parada es un `<li tabindex="-1">` para que el ancla del pin **mueva el foco** a la tarjeta, y el skip link se localiza por `lang`.
- **Por qué**: identificar con logo real (nunca inventado) acelera la lectura, y mover el foco al target del ancla es lo que hace que el mapa sea usable con teclado y no solo navegable con mouse.
- **Alternativas descartadas**: dejar el foco en el pin (el lector de pantalla anuncia el pin, no la historia); iconos genéricos por falta de archivo (mentira visual).

## 2026-11-01 · Logos de marca sobre placa clara

- **Decisión**: los logos oficiales con tinta oscura (TEDx Avenida Bolívar, Cisco Networking Academy, Harvard CS50, ULSA) se muestran sobre una **placa clara** (`--logo-plate`, gris frío #d9dce4) dentro de un sitio oscuro; los que ya son claros (Aspire, marca de Waresis) van directos sobre el fondo. Waresis, que no tiene producto público todavía, usa su marca "W" como portada de tarjeta en vez de una foto.
- **Por qué**: un logo institucional de tinta negra sobre un sitio casi negro no se ve. La placa conserva el color real de la marca (no lo filtra ni lo invierte) y hace que la evidencia sea legible de un vistazo. Seevitó el blanco puro (#f2f2ee) porque resaltaba más que el contenido.
- **Alternativas descartadas**: `filter: invert()` o brillo sobre el logo (falsea el color de marca); chips de texto con simple-icons (son más consistentes, pero no son el logo real que respalda la evidencia); una placa por cada logo con tono distinto (serían cinco sistemas, no uno).

## 2026-11-01 · Formación pasa a ser sección propia

- **Decisión**: "Formación" dejó de ser un sub-bloque dentro de "Comunidad": ahora es una sección de primer nivel con `id="formacion"` y su enlace en el header.
- **Por qué**: cada `h2` del sitio es una sección con ancla y ruta de lectura propia. Con la formación dentro de comunidad, el encabezado quedaba al mismo nivel que una sección y la navegación no ofrecía forma de llegar a la evidencia de formación (CS50, Cisco, Aspire).
- **Alternativa descartada**: mantenerlo anidado y no tocar el header (menos cambios, pero la IA queda desalineada con los títulos).

## 2026-11-01 · Ritmo de la ruta en móvil y orden de cascada

- **Decisión**: en móvil cada parada mide **60svh** (antes ocupaba `70vh` por un problema de cascada), la tarjeta se alinea al fondo (`align-items: flex-end`), la foto de la parada usa proporción 20:9 y el cuerpo 1rem de padding. El bloque de overrides móviles vive **al final** de `global.css`, porque si aparece antes que las reglas base (misma especificidad) gana la base.
- **Por qué**: la evidencia de proyectos (VoxLab, Waresis) estaba a 7.058 px en móvil, 7,4 pantallas de scroll. Con el arreglo llega a 6.012 px (6,1 pantallas) y la ruta baja de 5.760 a 4.714 px. El hallazgo de fondo: los overrides móviles de `.ruta-stop` estaban escritos **antes** de las reglas base, así que en móvil ganaban `min-height: 70vh`, `align-items: center` y `scroll-margin-top: 4rem` — el `scroll-margin-top: calc(44svh + 1rem)` que evita que la parada quede bajo la placa fija **nunca estuvo activo** en móvil. Además había 458 px de espacio en blanco entre la placa y la primera tarjeta (la placa ya ocupa 371 px en flujo, más 405 px de `padding-top` redundante que se eliminó).
- **Alternativas descartadas**: ocultar la foto de las paradas en móvil (es la evidencia y da color al camino); recortar el texto de las paradas (el copy es el argumento); bajar la placa de 44svh (es el elemento que firma la metáfora); tocar el ritmo de escritorio (la versión de dos columnas ya funciona: la evidencia está a 5,8 pantallas).

## 2026-11-02 · Tema claro/oscuro con toggle y script anti-flash

- **Decisión**: el sitio tiene dos temas. `tokens.css` mantiene el tema oscuro como base y define un bloque `[data-theme='light']` que reescribe superficies, tinta y acentos (`--route #b45309`, `--jungle #047857`, `--sky #1d4ed8`, `--logo-plate #e6e9f1`). Un script **inline** en `Base.astro` fija `data-theme` antes del primer pintado (localStorage `tema`, fallback `prefers-color-scheme`), y el toggle del header solo alterna el atributo + persiste.
- **Por qué**: el tema oscuro es la marca (cartografía nocturna de León), pero un sitio de portfolio se consulta de día y en oficinas con luz. El script va inline a propósito: un `<script>` externo llegaría tarde y causaría un flash blanco.
- **Alternativas descartadas**: `prefers-color-scheme` sin toggle (deja al visitante sin control); un `<script>` externo en `<head>` con `defer` (flash garantizado); dos builds separados (rompe el toggle en vivo y duplica el contenido).

## 2026-11-02 · Header rediseñado: sticky, compacto y con menú móvil

- **Decisión**: el header es `sticky top-0 z-50` con altura fija `--header-h: 3.5rem`, nombre + "LEÓN, NICARAGUA" en mono, nav de escritorio en mono uppercase, toggle de tema, chip de idioma y botón de menú en móvil con `aria-expanded`. Suma una barra de progreso de scroll de 2px en ámbar.
- **Por qué**: el header viejo era una barra estática que ocupaba espacio y no indicaba dónde estabas en un documento largo. Sticky + progreso da posición sin agregar un elemento visual pesado.
- **Alternativas descartadas**: barra de progreso con etiquetas (ruido visual); header que se encoge al hacer scroll (salto de layout y foco errático); menú móvil como overlay a pantalla completa (demasiado para 5 enlaces).

## 2026-11-02 · La Cajuela sale: el sitio no inventa frases de terceros

- **Decisión**: se eliminaron `src/components/Cajuela.astro` y `src/data/postcards.ts`. En su lugar existe `Contact.astro` (`id="contacto"`), una sección final honesta con email, GitHub y LinkedIn. El nav, `index.astro` y `en/index.astro` se actualizaron.
- **Por qué**: la Cajuela era un bloque de frases atribuidas a mentores y compañeros que **no existen** en la evidencia del repositorio. El principio de "verdad antes que persuasión" manda: un texto decorativo inventado contamina todo el documento. Un CTA real dice más que tres frases bonitas que nadie escribió.
- **Alternativas descartadas**: reescribir las frases como "reflexiones propias" (seguirían siendo citables como de terceros); dejarlas fuera del deploy pero en el repo (el repo es la fuente de verdad del challenge); mantener la sección con un placeholder visible (placeholder es una promesa rota).

## 2026-11-02 · Alcance internacional explícito

- **Decisión**: hero, sección de contacto y footer dicen León (base), Managua (equipos) y trabajo remoto (clientes fuera del país). El badge del hero pasó de "freelance y open source" a "freelance y trabajo remoto".
- **Por qué**: la versión `/en` ya existía, pero el texto en español sugería que el trabajo se quedaba en el país. Decirlo de frente abre la puerta sin inventar clientes fuera del país.
- **Alternativas descartadas**: una sección nueva de "servicios por país" (más copy, menos evidencia); quitar la referencia a Managua (es real: Flutter Meetup, TechDay, WordCamp).

## 2026-11-02 · Despliegue real en AWS Amplify Hosting (us-east-2)

- **Décisión**: app `andresportfolio` (app id `dxe9dwv4bjpro`) en AWS Amplify Hosting, región **us-east-2**, conectada a `github.com/D-Kale/portfolio` con **auto-build en push a `main`**. Build spec `amplify.yml` (Node 22 + pnpm 11 + `pnpm install --frozen-lockfile` + `pnpm build`, artefactos en `dist`). Variable de entorno `SITE_URL` en la rama, para que el `canonical` de Astro apunte al dominio desplegado. URL viva: `https://main.dxe9dwv4bjpro.amplifyapp.com`.
- **Por qué**: la rúbrica del Student Builder Challenge exige URL pública viva y acceso a la AWS. La conexión se hizo **por CLI** (`aws amplify create-app --platform WEB_COMPUTE --access-token <PAT de gh>`), sin abrir la consola ni instalar la GitHub App a mano: `gh` ya estaba autenticado con scope `repo`.
- **Aprendizaje**: `platform WEB_COMPUTE` exige `deploy-manifest.json` en la salida del build (es el camino de compute/SSR). Para un sitio 100% estático hay que cambiar la app a `platform WEB` (`aws amplify update-app --platform WEB`) y los artefactos se despliegan tal cual. El build en sí era correcto: el fallo era del modelo de hosting, no del build spec.
- **Aprendizaje**: el build spec se aplicó sin cambios, pero el `preBuild` instala `pnpm` global (`npm install -g pnpm@11`) porque la imagen AL2023 de Amplify trae Node 22 y no pnpm; `nvm install 22` + `nvm use 22` funciona porque el shell de build corre bajo nvm.
- **Aprendizaje**: `aws amplify start-job` solo acepta `jobType` ∈ {MANUAL, RELEASE, RETRY, WEB_HOOK}. Para disparar un build a mano: `RELEASE`.
- **Alternativa descartada**: deploy manual con `create-deployment --file-map` (subir el `dist` ya construido). Funciona, pero pierde el auto-deploy: cada cambio futuro exigiría un build local más una subida. Con la app conectada a GitHub, el push dispara el build solo.

## 2026-11-02 · Sección "Superpoderes técnicos", link al repo y pista visible a la ruta

- **Décisión**: tres cambios para cubrir los requisitos del challenge: (1) sección nueva `id="superpowers"` ("Superpoderes técnicos" / "Tech superpowers") con el stack real agrupado en cuatro bloques —Lenguajes, Backend y datos, Frontend y producto, Infraestructura y nube— reusando `TechChip.astro` y `simple-icons`; (2) los links de GitHub del hero, contacto y footer apuntan al **repositorio** `D-Kale/portfolio` (el perfil queda como link secundario "Perfil/Profile" en el footer); (3) el hero incluye una **pista visible** —un bloque con flecha hacia `#ruta`— que anuncia la carretera y sus 78 km.
- **Por qué**: la rúbrica pide tres secciones núcleo (About Me, Skills/Tech Superpowers, Projects/Achievements), un link al repositorio GitHub y que la feature creativa tenga una pista visible. El sitio tenía las dos primeras por separado pero "Formación" es educación, no skills: los chips de stack solo vivían dentro de las tarjetas de proyecto y el link de GitHub llevaba al perfil, no al repo.
- **Alternativas descartadas**: renombrar "Formación" a "Skills" (mentiría: es educación y credenciales); reutilizar la sección de formación como skills (mezcla dos cosas distintas); poner el bloque de skills dentro del hero (el hero ya carga con la presentación y el retrato); quiver de iconos con `simple-icons` inventados para AWS (el catálogo no trae logo de AWS: el chip queda como texto, igual que `sqlc` o `Blade`).

## Pendientes documentados (fase 2, post-deadline)

- API de notas (guestbook) sobre contenido real: `POST /notas` (validación + rate limit por IP con TTL), `GET /notas` (aprobadas), `GET /health`.
- `/admin` visual: passphrase → JWT (HS256), cookie HttpOnly + SameSite, 15 min TTL, rate limit de login 5/15 min por IP, UI con dos listas (pendientes / aprobadas) y acciones aprobar/denegar/eliminar.
- Despliegue del stack serverless vía `sam deploy` desde máquina local, con el perfil `aws-toolkit`.
