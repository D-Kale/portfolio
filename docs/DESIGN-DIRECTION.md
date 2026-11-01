# Design direction v3 — Cartografía

Stack fijo: Astro 5 estático, Tailwind v4, tokens CSS en `@layer base`. **Cero JS salvo lo que se gane su lugar.**
Concepto fijo: cartografía de una carrera — paradas técnicas + miradores humanos, de León hacia afuera.

---

## 1. Material 3 traducido a este proyecto

### 1.1 Superficies: se eligió la base fría (Opción B)

> **Decisión tomada (2026-10-30): Opción B — base fría + acento ámbar.** M3 se usa como gramática de forma, elevación y movimiento; la semilla cálida vive en `--route` (ámbar) y `--jungle`, y **el ámbar tiñe superficies elevadas puntuales** (`--elev-route`) en vez de recalentar todos los neutros. Implementado en `src/styles/tokens.css`.

M3 deriva **todo** el sistema de un color semilla. Si la semilla es nuestro ámbar `#f59e0b`, los neutros salen **cálidos** (martillos de marrón), no el azul-negro actual. Es la diferencia entre un M3 ortodoxo y el esquema actual (base fría + acento cálido).

**Opción A — M3 ortodoxo (cálido).** Superficies derivadas del ámbar. Más "material", más suave, más coherente tonalmente. Cambia la temperatura del sitio.

```
--surface-container-lowest: #0e0d08
--surface-container-low:    #1c1a12
--surface-container:       #211f18
--surface-container-high:  #2c2920
--surface-container-highest:#37342a
--on-surface:              #eae2d6
--on-surface-variant:      #d2c7b6
--outline:                 #9a907f
--outline-variant:         #4d463a
```

**Opción B — base fría, acento cálido (ELEGIDA, implementada).** Conserva la identidad azul-noche y usa M3 solo para forma, elevación y motion.

```
--surface-lowest: #0d0e13
--surface-low:    #11131a
--surface:        #161923
--surface-high:   #1c202c
--surface-highest:#222736
--ink:            #e8eaf0
--ink-soft:       #8f95a8
--outline:        #6b7186
--outline-variant:#383d4c
```

> Conflicto declarado: M3 puro = Opción A. La marca "cartografía nocturna de León" aguanta mejor la B. **Se eligió B**, y el ámbar se usa para elevar superficies puntuales (elevación teñida, §1.2), que es donde M3 aporta de verdad en oscuro.

### 1.2 Elevación como tinte, no como sombra

En oscuro M3 **no** oscurece con sombra: sube el tono de la superficie. `--shadow-card` queda solo para elementos flotantes reales; la separación entre tarjetas la hace la escala de superficies.

```
--elev-0: var(--surface-lowest)
--elev-1: var(--surface-low)
--elev-2: var(--surface)
--elev-3: var(--surface-high)
--elev-4: var(--surface-highest)
--elev-route: color-mix(in oklab, var(--route) 9%, var(--surface-high)) /* tarjeta/pin activa */
```
Regla: una tarjeta en reposo usa `--elev-1`; al hover/focus sube a `--elev-2`; la seleccionada usa `--elev-route`. Se conserva **una** sombra suave solo para elementos flotantes reales (el camión sobre el asfalto), nunca para separar tarjetas.

### 1.3 Forma

M3 shape scale → nuestros tokens:

| M3 | valor | uso aquí |
|---|---|---|
| extra-small | 4px | chips/badges |
| small | 8px | `--radius-s` botones, chips |
| medium | 12px | — |
| large | 16px | `--radius-m` tarjetas (sube de 14 a 16) |
| extra-large | 28px | placa del mapa |
| full | 9999px | píldoras de estado |

### 1.4 Tipografía (M3 type scale × nuestras fuentes)

| Rol | Fuente | tamaño / interlínea / peso / tracking |
|---|---|---|
| display-large | Bricolage | `clamp(2.5rem, 5vw, 3.5rem)` / 1.05 / 800 / -0.03em |
| headline-medium | Bricolage | 2rem / 1.15 / 700 / -0.02em |
| title-large | Bricolage | 1.375rem / 1.25 / 700 / -0.01em |
| body-large | Bricolage | 1.0625rem / 1.6 / 400 / 0 |
| body-medium | Bricolage | 0.9375rem / 1.6 / 400 / 0 |
| label-large | Plex Mono | 0.75rem / 1.4 / 500 / 0.04em |
| label-small (datos) | Plex Mono | 0.6875rem / 1.35 / 600 / 0.06em |

Regla de mono (ya en el craft floor): Plex Mono **solo** para datos, etiquetas y metadatos cortos — jamás párrafos ni `uppercase` largo.

### 1.5 Motion (reemplaza el único `--ease-out`)

```
--ease-emphasized:            cubic-bezier(0.2, 0, 0, 1);
--ease-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1);
--ease-emphasized-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);
--ease-standard:              cubic-bezier(0.2, 0, 0, 1);
--dur-short:  150ms;  /* hover, color */
--dur-medium: 300ms;  /* panel, elevación */
--dur-long:   500ms;  /* entrada de sección */
--motion-draw: 1400ms;/* se conserva para el trazo del mapa */
```

### 1.6 Qué descartar de M3

FAB, dynamic color picker, theme switcher (somos dark por marca), app bars densos, ripple, píldora para todo, chips de filtro, navegación por rail. M3 es aquí una **gramática de superficie y movimiento**, no un kit de app.

---

## 2. Qué robar de porfolio.dev (y qué no)

Estructura real: header con nav + toggle de idioma → hero (retrato + badge "Disponible" → bio con negritas + CTAs) → la ruta (carretera + paradas) → experiencia numerada → proyectos (imagen + título + chips de stack + enlaces) → comunidad y formación → sobre mí → footer.

| # | Robar | Por qué | Adaptado a cartografía |
|---|---|---|---|
| 1 | Badge de estado con punto pulsante | Señal inmediata de disponibilidad | "Disponible para proyectos y mentoría" junto al retrato; pulso CSS, sin emoji |
| 2 | Negritas dentro de la bio | Escaneo sin cambiar el tamaño | Resaltar `Go`, `Astro`, `ULSA`, `León` en el párrafo del hero |
| 3 | **Tarjeta de proyecto: imagen + chips de stack + enlaces** | Es exactamente lo que falta en "El taller" | Imagen real (VoxLab app/lapa, UAM, TEDx) + chips con logo + enlace real |
| 4 | Chips de stack con logo | Reconocimiento instantáneo | Logo simple-icons en mono + etiqueta de texto |
| 5 | Lista numerada de trayectoria | Ordena sin tarjetas | Alimenta "Formación" (ULSA, CS50x, CS50W, Cisco, Aspire, Inglés) |
| 6 | Enlaces Code/Preview por proyecto | Acción explícita | GitHub / pkg.go.dev / sitio del evento |
| 7 | Retrato grande junto al texto | Ancla humana | Ya lo tenemos; ahora con la foto real |
| 8 | Densidad baja, secciones cortas | Se lee en scroll | Mantener; hoy ya es denso |
| 9 | Imagen dentro de cada bloque de proyecto | Apoyo visual | Fotos por evento en comunidad y miradores |

**No copiar:** selector Light/Dark/System (somos dark), enfoque "creador de contenido", lista plana de empleos (nuestro argumento es el mapa), chips solo-texto sin logo.

---

## 3. Logos de tecnologías — IMPLEMENTADO

- **Fuente:** paquete npm `simple-icons@16.36.0` (iconos CC0-1.0; los logos son marcas de sus dueños — se usan para identificar la tecnología, no como endorsement). Self-host, sin CDN.
- **Mapa:** `src/data/tech.ts` exporta `techIcons: Record<string, TechIcon>` con imports **nombrados** (tree-shaking) y `iconFor(label)`. La clave es exactamente la etiqueta de stack escrita en `src/data/projects.ts`.
- **Render:** componente Astro `src/components/TechChip.astro` emite **SVG inline** con `fill="currentColor"`, `aria-hidden="true"`, y el nombre de la tecnología como **texto visible** al lado (14px svg + 12px mono). Nunca el logo solo como única etiqueta.
- **Estilo:** monocromo `--ink-soft` en reposo, `--route` cuando el proyecto está activo. Nada de color corporativo (rompe la paleta).
- **Sin logo en el catálogo** (`sqlc`, `S3 API`, `Blade`, `matplotlib`): chip de **texto** mono. Nunca un icono genérico inventado.
- **Accesibilidad:** el logo es decorativo (`aria-hidden`), el texto es la etiqueta real.

---

## 4. Reactividad sin framework (de más barato a más caro)

| Técnica | Coste | A11y | Dónde paga aquí |
|---|---|---|---|
| **Script vanilla** (`getPointAtLength` + tangente) | **~1 KB** | foco gestionado a mano | **Camión scroll-driven + resalte pin ↔ tarjeta** |
| `:has()` | 0 | heredada del elemento | No usado: el resalte lo calcula el script |
| scroll-driven (`animation-timeline: view()`) | 0 | respetar `prefers-reduced-motion` | Descartado: no permite girar el camión según la tangente de la curva |
| `@starting-style` + `transition-behavior: allow-discrete` | 0 | — | No usado: no quedan popovers |
| `<details>/<summary>` | 0 | nativa, foco y teclado gratis | Fichas plegables de proyecto (profundidad técnica) |
| Popover API (`popover` + `popovertarget`) | 0 | nativa | Descartada (2026-10-31): el pin es un ancla a la tarjeta |
| CSS anchor positioning (`anchor()`) | 0 | — | Descartado con el popover |
| `:target` | 0 | el foco salta al target | Base del pin actual (`href="#stop-{id}"`) |
| View Transitions (`ClientRouter`) | ~2-4 KB | anima entre `/` y `/en/` | Transición de idioma; cuidado con reduce-motion |
| Isla Astro mínima | 1-5 KB | depende | No hace falta: JS plano, sin framework |

### 4.1 Modelo de interacción del mapa — IMPLEMENTADO (v2, 2026-10-31)

El pin dejó de ser un botón con popover: ahora es un **ancla a su parada**, y la carretera tiene un solo camino de lectura.

```html
<a class="ruta-pin" href="#stop-merced" data-pin="merced" aria-label="Merced · Mirador humano · km 34">
  <span class="ruta-pin-index">4</span>
  <span class="ruta-pin-label">…</span>
</a>

<li class="ruta-stop" id="stop-merced" tabindex="-1">
  <article class="ruta-card"> … foto, estado, copy real … </article>
</li>
```

Por qué gana:
- **Un solo modelo**: no hay dos formas de abrir la misma parada (popover *y* tarjeta), así que no hay estados que sincronizar.
- **Teclado y foco**: `tabindex="-1"` en la parada hace que el ancla **mueva el foco** a la tarjeta; `scroll-margin-top` la deja bajo el header. El lector de pantalla anuncia la historia, no el pin.
- **URL compartible**: `#stop-merced` es una dirección directa a la parada.
- **Indexable y legible**: las tarjetas son texto plano en el DOM, sin diálogo modal.
- **El mapa es el argumento**: el camión (script vanilla) avanza con el scroll y marca la parada activa; las tarjetas se atenúan y se resaltan con el mismo estado.

`prefers-reduced-motion`: si está activo, el script no se instala — el camino queda estático, sin camión en movimiento y sin atenuado de tarjetas.

Alternativa descartada: mantener el popover y añadir el camión (dos modelos compitiendo). El popover quedó registrado en `DECISIONS.md` (2026-10-30) junto con su reemplazo.

---

## 5. Inventario de componentes v3 — IMPLEMENTADO

| Componente | Superficie | Forma | Interacción |
|---|---|---|---|
| `Hero.astro` | `--surface-lowest` | — | Retrato real 4:5 con `object-cover` + tratamiento oscuro; badge de disponibilidad; negritas en la bio (`Go`, `Astro`) |
| `RouteMap.astro` | `--surface-low` | 28px | Placa SVG (carretera en serpentina) + pines numerados + camión scroll-driven; sticky en escritorio y en móvil |
| Tarjetas de parada (dentro de `RouteMap`) | `--elev-1` → `--elev-2` hover | 16px | Foto 16:9 + estado parada/mirador + copy real; ancla `#stop-{id}` con `tabindex="-1"` para que el foco salte a la tarjeta |
| `Workshop.astro` | `--elev-1` → `--elev-2` | 16px | Banner 16:9 + chips con logo + `<details>` para la profundidad técnica + galería 3-up |
| `CommunityEducation.astro` | `--elev-1` | 16px | Tarjetas de comunidad con foto 16:9; ULSA como tarjeta destacada; formación como filas con borde inferior + chip de estado |
| `Cajuela.astro` (postales) | `--elev-1`, borde `--route`/30 | 16px | Reposo, cita 1px |
| `Footer.astro` | `--surface-lowest` | — | Enlaces |

**Dónde una superficie elevada reemplaza a la tarjeta plana:** tarjeta de proyecto activa, tarjeta de parada activa.
**Dónde una foto reemplaza al texto:** miradores (Gritería, Merced, Museo), proyectos con material (VoxLab, Hackathon, TEDx, Waresis), comunidad (Flutter, TechDay, WordCamp, Hackathon), formación (ULSA).

### 5.1 Mecánica del mapa implementada

- El SVG dibuja la carretera como **una sola curva** (`path` con shoulder, asfalto, eje discontinuo y trazo recorrido) en un `viewBox` de 420×900; los pines y las tarjetas viven fuera del SVG, en HTML.
- Cada pin es un `<a href="#stop-{id}">` con caja propia (34×34 en escritorio, 24×24 en móvil: objetivo de toque mínimo de WCAG 2.2) y número visible; la etiqueta con km y nombre se oculta por debajo de 1024px porque colisiona.
- La placa es **sticky**: en escritorio vive a la izquierda de las tarjetas (columna 280–420px) y en móvil se queda pegada arriba (44svh) mientras las tarjetas pasan por debajo.
- Un script **vanilla** calcula el avance: `path.getPointAtLength()` da la posición del camión y un punto 1px adelante da la tangente para girarlo. El trazo ámbar recorrido se dibuja con `stroke-dasharray`.
- El estado activo (pin + tarjeta) se sincroniza con la tarjeta más cercana al centro de lectura; solo con JS el atenuado se aplica, así que **sin JS las tarjetas se ven todas completas**.
- `prefers-reduced-motion`: el script no se instala → no hay movimiento, no hay atenuado, y la ruta se lee como una lista de paradas.
- **Ojo al sistema de coordenadas:** las coordenadas del pin salen del `viewBox` (`--pin-x`, `--pin-y` en %) y la placa escala con `aspect-ratio`; mezclar unidades de `viewBox` y de porcentaje fue lo que desplazaba los pines 8px en la versión anterior.

---

## 6. Fuentes

- Material Design 3 — color roles, elevation, shape, motion: https://m3.material.io/styles
- Material 3 motion easing/tokens: https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
- SVG `getPointAtLength()` (MDN): https://developer.mozilla.org/en-US/docs/Web/SVG/GeometryElement/getPointAtLength
- simple-icons: https://github.com/simple-icons/simple-icons
- porfolio.dev (estructura): https://porfolio.dev/
