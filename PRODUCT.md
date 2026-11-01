# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primarios: clientes locales y estudios pequeños** que necesitan trabajo de backend, sistemas multi-tenant o infraestructura, y que llegan buscando evidencia concreta de qué se puede entregar y con qué criterio.

**Secundarios: la comunidad** — pares, mentores y estudiantes deuniversitarios que llegan por la mentoría, las charlas y el Programming Club. Para ellos el historial de proyectos es contexto, no el objetivo.

El visitante no es un remoto genérico. Viene del entorno lejano de Nicaragua, conoce o puede verificar el contexto local (ULSA, Boreal Labs, la escena de León) y valora que la web sea honesta y directa.

## Product Purpose

Documentar la carrera de Andrés Sánchez como una ruta trazada, con orgullo y sin adornos: qué construyó, dónde lo construyó, con quién y qué dejó huella.

El sitio existe para que alguien que llega por un proyecto, un evento o una persona termine entendiendo la trayectoria completa —técnica y humana— y se quede con una imagen precisa de Andrés como constructor de sistemas y formador de gente.

El éxito es la comprensión: que el visitante pueda explicar la carrera de Andrés después de una visita, y que lo considere a él para trabajo real.

## Positioning

El argumento no es "soy un desarrollador que sabe mucho": es **la cartografía de una carrera**. Paradas técnicas (proyectos, eventos) y miradores humanos (lugares de la cultura leonesa) sobre un mismo mapa dibujado a mano. Ninguna plantilla de portfolio replica esa mezcla de oficio, territorio y gente.

El sitio no es un CV, no es una landing de servicios y no es una tienda. Es un documento navegable de una trayectoria, con la misma estructura que una ruta: se avanza, se mira, se recuerda dónde estuvo uno.

## Operating Context

- Una sola página, en español en la raíz (`/`) y en inglés en `/en/`, con el mismo contenido y un toggle visible en el header.
- Sitio 100% estático (Astro + Tailwind v4 + tokens CSS). Cero servidor en v1.
- Despliegue previsto: GitHub → AWS Amplify Hosting, región us-east-2, sin claves en el repositorio. **Nada sale a GitHub ni a AWS hasta orden explícita de Andrés.**
- Contexto actual: AWS Student Builder Challenge. La API de las postales (API Gateway + Lambda Go + DynamoDB + `/admin` con JWT) es fase 2 documentada, fuera del alcance de v1.
- La web se consume en escritorio y en móvil, con lectura larga y scroll; el contenido es denso y narrativo, no transaccional.

## Capabilities and Constraints

- Idioma: ES primero, EN como espejo completo. `hreflang` alternos y rutas manuales, sin dependencias de i18n.
- Ruta dibujada a mano, sin tiles ni Mapbox: una placa SVG con la carretera en serpentina, un camión que avanza con el scroll (script vanilla mínimo) y **un solo camino de lectura** — los pines son anclas a las tarjetas y al activarlos el foco salta a la parada. Las tarjetas quedan como índice legible, imprimible y con URL compartible.
- Los datos de contenido viven en `src/data/` (ruta, copy bilingüe, proyectos, comunidad, formación, postales, logos de stack). Todo el copy está duplicado ES/EN en la fuente: no hay archivos de traducción.
- Fotografías: las fotos reales ya están en `public/assets/` (WebP, 1400px, q80) y el retrato vive en `public/assets/portrait.webp`. `public/assets/manifest.json` inventaría cada archivo con su evento; `public/assets/README.md` documenta el criterio. Los recortes descartados se conservan **fuera** del deploy en `assets-review/`.
- Logos de stack: `simple-icons` (CC0-1.0), self-host, monocromos. Sin logo en el catálogo → chip de texto; nunca un icono inventado.
- Sin backend, sin base de datos, sin autenticación en v1. La Cajuela se alimenta de un JSON en el repositorio revisado en build.
- Sin secretos en el repositorio. IAM por rol en Amplify, nunca access keys.
- Accesibilidad: navegación por teclado, skip link, foco visible (el foco sigue al ancla del pin), objetivo de toque mínimo de 24px, `prefers-reduced-motion` respetado.
- La versión `/en` debe estar completa: no es un apéndice de la española.

## Brand Commitments

- Nombre: **Andrés Sánchez**.
- Lema: *"I build modern systems and communities that learn."* / *"Brego sistemas modernos y comunidades que aprenden."*
- **El español es la raíz, no una traducción.** El inglés abre la puerta a oportunidades internacionales como extra, nunca al revés.
- El concepto **"Cartografía"** es el mundo visual del sitio: ruta, paradas, miradores, cajuela, Postal. No es decorativo, es la estructura del argumento.
- Voz: directa, en primera persona, sin superlativos. Se admite lo que no es un case study ("lo presenté como aprendizaje"). La honestidad es parte de la marca.
- Dirección tipográfica ya decidida y comprada: **Bricolage Grotesque** (display) + **IBM Plex Mono** (datos, etiquetas, metadatos).
- Nunca inventar testimonios, clientes, métricas, precios, licencias ni afirmaciones de despliegue. Lo que no existe, no se cuenta.

## Evidence on Hand

Contenido real, ya escrito y con fuente en el repositorio:

- **Proyectos** (`src/data/projects.ts`): VoxLab (startup en incubación, hackathon Kronox 2026), Waresis (ERP multi-tenant en construcción), go-storage (librería open source en pkg.go.dev), ManualGestor (aprendizaje), PythonSurveyAnalizer (investigación), TEDx Avenida Bolívar (consultoría), Programming Club ULSA (tooling interno). Dos de ellos marcados como destacados.
- **Comunidad** (`src/data/community.ts`): Boreal Labs (staff y mentoría), Flutter Meetup Managua (charla), TechDay Nicaragua 2026, WordCamp Managua (staff, logística), TEDx (consultor), Hackathon Nicaragua (Kronox 2026).
- **Formación** (`src/data/community.ts`): ULSA Cibernética Electrónica, Harvard CS50x (completado), CS50W (en proceso), Cisco IT Essentials (completado), Aspire (en curso), Inglés B2.
- **Postales** (`src/data/postcards.ts`): tres postcards de mentores y compañeros con autor y sello.
- **Enlaces reales**: GitHub (`D-Kale`), LinkedIn (charla de hackathon), `tedxavenidabolivar.com`, pkg.go.dev.
- **Fotografías reales**: retrato, ULSA, La Gritería, Museo Ortiz Gurdian, La Merced, Boreal Labs en la Hackathon, interfaz de VoxLab, TechDay, WordCamp, VoxLab stand y equipo.
- Capturas de referencia en `docs/screenshots/`.

Ausencias que el trabajo futuro **no debe fabricar**: métricas de usuarios o ingresos, testimonios de clientes, portfolio del club, el producto Waresis en producción, y cualquier despliegue ya realizado.

## Product Principles

1. **Identidad primero, alcance después.** La raíz es española y el inglés es espejo. Cualquier decisión que contradiga la identidad local se descarta, aunque abarate el trabajo.
2. **Verdad antes que persuasión.** Nada se afirma sin evidencia en el repositorio. Un proyecto sin caso de uso se presenta como aprendizaje y se dice. La honestidad es contenido, no límite.
3. **La ruta es el argumento.** La carrera se entiende como camino con paradas técnicas y miradores humanos; no como una lista de entradas. La estructura sostiene la lectura.
4. **Estático y hermético por defecto.** El sitio funciona sin servidor. Cada capacidad nueva (backend, base de datos, auth) tiene que justificar romper esa garantía.
5. **Sistemas y gente en la misma historia.** La mentoría, los eventos y las comunidades no son una sección secundaria: son la mitad de lo que construyo.

## Accessibility & Inclusion

Objetivo **WCAG 2.2 AA**. Requisitos ya asumidos por el proyecto y a sostener: navegación completa por teclado, skip link funcional, foco visible, contraste suficiente en texto e interfaz, `prefers-reduced-motion` respetado, y contenido real en ambos idiomas.

El sitio debe seguir siendo legible y navegable con zoom al 200% y en pantallas de 360 px de ancho, y ningún texto debe depender del color para transmitir su significado.
