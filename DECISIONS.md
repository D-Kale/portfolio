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

## 2026-10-28 · Trabajo local hasta orden explícita

- **Décision**: nada sale a GitHub ni a AWS hasta que Andrés lo pida.
- **Por qué**: control total de lo que se publica durante el challenge.
- **Nota**: presupuesto AWS al día de hoy: plan FREE, $100 créditos, expiran **2027-04-28**. Región: **us-east-2**.

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

- **Decisión**: una sola placa SVG con la carretera en serpentina (hombro, asfalto, eje y trazo recorrido) y **un solo camino de lectura**: los pines son anclas `#stop-{id}` a las tarjetas, y el foco salta a la tarjeta al activarlos (`tabindex="-1"` + `scroll-margin-top`). Un script **vanilla** de ~1 KB (sin librerías) recorre `path.getPointAtLength` + tangente para mover el camión con el scroll y marcar la parada activa.
- **Por qué**: el popover escondía la trayectoria detrás de siete fichas sueltas — el mapa se leía como una imagen, no como un camino. El camión convierte el scroll en avance y las tarjetas quedan como índice legible, imprimible y con URL compartible. El JS mínimo es el precio de esa metáfora y cabe en un bundle de 1 KB.
- **Alternativas descartadas**: mantener el popover y añadir solo el camión (dos modelos de interacción compitiendo); `animation-timeline: view()` (no permite girar el camión según la tangente de la curva); librería de scroll/GSAP (peso y a11y); scroll snapping por tramo (rompe la lectura de tarjetas largas).
- **Consecuencia**: la promesa de "cero JS" del sitio queda **retirada** y documentada como tal: es JS mínimo y declarativo, no cero.

## 2026-10-31 · Logos reales de instituciones y foco de teclado

- **Decisión**: `src/data/brands.ts` centraliza los iconos de `simple-icons` y `BrandMark.astro` los emite como SVG inline `currentColor` + `aria-hidden`; el logo de ULSA es el archivo real (`public/assets/ULSA/ulsa-logo.webp`). Cada parada es un `<li tabindex="-1">` para que el ancla del pin **mueva el foco** a la tarjeta, y el skip link se localiza por `lang`.
- **Por qué**: identificar con logo real (nunca inventado) acelera la lectura, y mover el foco al target del ancla es lo que hace que el mapa sea usable con teclado y no solo navegable con mouse.
- **Alternativas descartadas**: dejar el foco en el pin (el lector de pantalla anuncia el pin, no la historia); iconos genéricos por falta de archivo (mentira visual).

## Pendientes documentados (fase 2, post-deadline)

- API de postales: `POST /notas` (validación + rate limit por IP con TTL), `GET /notas` (aprobadas), `GET /health`.
- `/admin` visual: passphrase → JWT (HS256), cookie HttpOnly + SameSite, 15 min TTL, rate limit de login 5/15 min por IP, UI con dos listas (pendientes / aprobadas) y acciones aprobar/denegar/eliminar.
- Despliegue del stack serverless vía `sam deploy` desde máquina local, con el perfil `aws-toolkit`.
