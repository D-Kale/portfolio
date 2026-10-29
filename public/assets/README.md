# MANIFEST de assets

Vos solo soltás los archivos con estos **nombres exactos** en la carpeta indicada
(creala si no existe), y el sitio los toma automáticamente. Si un archivo falta,
el placeholder sigue visible y nada se rompe.

Formato esperado: **WebP o JPG optimizado**, máx 1600 px de lado largo, calidad ~80.

| Archivo destino (`public/assets/`) | Qué es | Sugerencia de crop |
|---|---|---|
| `portrait.jpg` | Tu foto (la de la ficha con lanyard) | vertical 4:5, nitidez suave |
| `voxlab-logo.webp` | Logo VoxLab (la lapa) | cuadrado 512×512, fondo transparente |
| `voxlab-booth.webp` | Stand de Boreal Labs con la lapa en Hackathon Nicaragua | horizontal 3:2 |
| `voxlab-banner.webp` | Rollup rojo "Entrena tu voz..." | vertical 2:3 |
| `voxlab-tv.webp` | Pantalla con el slide de VoxLab | horizontal 4:3 |
| `uam-team.webp` | Equipo UAM Innovaction en las escaleras | horizontal 4:3 |
| `hackathon-hall.webp` | Pasillo con cartel de Hackathon Nicaragua | horizontal panorámica 16:9 |
| `hackathon-entrada.webp` | Cartel de hackathon/ 20 26 con el equipo | horizontal 3:2 |
| `waresis-logo.webp` | Marca Wareis (el W) | cuadrado 512×512, fondo transparente |
| `waresis-wordmark.webp` |我好 Wareis tipográfico | landscape 16:9 |
| `merced.webp` | (pendiente vos) Virgen de la Merced / celebración | cualquiera, 1 imagen |
| `griteria.webp` | (pendiente vos) La Gritería / La Purísima | cualquiera, 1 imagen |
| `ortiz-gurdian.webp` | (pendiente vos) Museo Ortiz Gurdian | cualquiera, 1 imagen |
| `calasanz.webp` | (pendiente vos) Colegio Calasanz camino al crucero | cualquiera, 1 imagen |
| `flutter-meetup.webp` | (pendiente vos) Puntás en la Flutter Meetup de Managua | horizontal 3:2 |
| `techday.webp` | (pendiente vos) TechDay Nicaragua | horizontal 3:2 |
| `wordcamp.webp` | (pendiente vos) WordCamp Managua | horizontal 3:2 |

## Reglas

1. **Nada más que eso**: no tocar código. La página busca primero el archivo real,
   si no está muestra el placeholder.
2. Pesa cada foto < 250 KB idealmente. puedo ayudarte con un comando para
   comprimirlas si querés (`pnpm squoosh` etc.) — pedímelo.
3. Los textos alternativos (alt) ya están escritos en el código para que si vos
   reemplazás la imagen mantenza accesibilidad sin retocar nada.

## De dónde sacarlas

Tienes varias ya enviadas al chat y otras pendientes; para las faltantes, los links
de Instagram/LinkedIn que ya me diste sirven de referencia visual cuando escribamos
los alt y las historias.
