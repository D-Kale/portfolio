# Assets publicados

Lo que el sitio sirve desde `/assets/`. Todo es **WebP** (1400px, q80), salvo
`portrait.webp` (800x1000, 4:5) y el SVG de respaldo.

**Total:** 25 archivos, 1,9 MB. El inventario exacto de cada uno (origen, evento,
sección) está en `manifest.json`.

## Que se publica y por que

| Archivo | Que muestra | Seccion |
|---|---|---|
| `portrait.webp` | Retrato real de Andres con camisa oscura y lanyard | Hero |
| `ULSA/ulsa-campus.webp` | Campus de ULSA con fachada azul y palmera | Formacion |
| `ULSA/ulsa-edificio-rotulo.webp` | Edificio de ULSA con rotulo 'Aprendamos para Servir' | Formacion |
| `ULSA/ulsa-logo.webp` | Logotipo de ULSA en verde | Formacion |
| `logos/tedx-avenida-bolivar.webp` | Logotipo de TEDx Avenida Bolivar | La ruta (parada) y Comunidad |
| `logos/cisco-networking-academy.webp` | Logotipo de Cisco Networking Academy | Formacion |
| `logos/cs50.webp` | Logotipo de Harvard CS50 | Formacion |
| `logos/aspire-institute.webp` | Logotipo de Aspire Institute | Formacion |
| `tedx/landing-tedx.webp` | Landing del sitio del TEDx Avenida Bolivar que construi | La ruta (parada) y Comunidad |
| `concepcion/griteria-purisima-resplandor.webp` | Estatua de la Purisima con aureola de rayos sobre nube | La ruta (mirador) |
| `merced/merced-palio-virgen.webp` | Palio dorado con la Virgen cargado entre fieles | La ruta (mirador) |
| `museo/museo-gigantona-marionetas.webp` | Gigantona de vestido azul con marionetas | La ruta (mirador) |
| `hackatonnic2026/hackathon-stand-boreal.webp` | Stand de Boreal Labs con una persona | Comunidad |
| `hackatonnic2026/hackathon-foto-equipo.webp` | Foto de equipo en el stand de Hackathon Nicaragua 2026 | Comunidad |
| `hackatonnic2026/hackathon-pasillo-banner.webp` | Pasillo con cartel de Hackathon Nicaragua | Comunidad |
| `hackatonnic2026/hackathon-stand-voxlab.webp` | Stand de VoxLab con stickers, QR y lapa | El taller |
| `hackatonnic2026/hackathon-rollup-voxlab.webp` | Rollup de VoxLab 'Entrena tu voz' | El taller |
| `hackatonnic2026/hackathon-slide-voxlab-salon.webp` | Laptop con slide de VoxLab en el salon | El taller |
| `hackatonnic2026/hackathon-app-ui.webp` | Laptop con la interfaz de la app VoxLab | El taller |
| `flutter/flutter-charla-andres-2.webp` | Andres exponiendo junto a la diapositiva | Comunidad |
| `techday/techday-huawei-db.webp` | Escenario Huawei sobre operaciones de base de datos | Comunidad |
| `wordcamp/wordcamp-foto-grupal.webp` | Foto grupal de todo el evento | Comunidad |
| `voxlab/voxlab-equipo-uam.webp` | Equipo UAM con camisetas de VoxLab en las escaleras | El taller |
| `waresis/waresis-mark.webp` | Marca "W" de Waresis | El taller |
| `placeholders/portrait.svg` | Marcador de posicion mientras carga el retrato real | Hero (fallback) |

## Logos sobre placa clara

Los logos oficiales con tinta oscura (TEDx, Cisco, CS50, ULSA) se muestran sobre
una **placa clara** (`--logo-plate`) dentro de un sitio oscuro; los que ya son
claros (Aspire, marca de Waresis) van directos sobre el fondo. La placa conserva
el color real de la marca: no lo filtra ni lo invierte.

## Lo que no se publica

Se revisaron 91 imagenes; solo 25 entran al sitio. Las demas viven fuera del
deploy y fuera del repositorio, en `assets-review/` (ignorado por git):

- `assets-review/unwired/` — fotos revisadas y validas que ningun modulo
  enlaza hoy. Se pueden usar mas adelante sin volver a la original.
- `assets-review/<evento>/` — descartes por comida, texturas, duplicados o
  capturas de pantalla.
- `assets-review/logos-source/` — originales PNG de los logos (los logos del
  sitio se derivaron de ahi).

Regla: **una imagen se publica si y solo si el sitio la enlaza.** Un archivo en
`public/` que no aparece en `src/` solo infla el peso del deploy.

Para agregar una foto: dejarla en `public/assets/<evento>/`, registrarla en
`manifest.json` y enlazarla desde `src/data/route.ts`, `src/data/projects.ts` o
`src/data/community.ts`. Si no se enlaza, no se publica.
