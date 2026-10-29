import type { Locale } from '../i18n/ui';

type Dict = Record<Locale, Record<string, string>>;

/** Stops and mirrors: anchor text along the journey. */
export const routeCopy: Dict = {
  es: {
    'ruta.title': 'La ruta de mi carrera',
    'ruta.intro': 'Cada punto es una parada (técnica) o un mirador (humano). El viaje se lee desde León hacia afuera.',
    'ruta.legenda.parada': 'Parada técnica',
    'ruta.legenda.mirador': 'Mirador humano',
    'calasanz.title': 'Colegio Calasanz · primer código',
    'calasanz.body': 'Camino al crucero: donde aprendí a pensar en problemas antes que en lenguajes.',
    'ulsa.title': 'ULSA · Ingeniería en Cibernética Electrónica',
    'ulsa.body': 'Formación de base, Programming Club y mentoring de proyectos universitarios.',
    'griteria.title': 'La Gritería · pertenencia leonesa',
    'griteria.body': 'La Purísima y la Virgen: orgullo de donde viene la energía para construir comunidad.',
    'boreal.title': 'Boreal Labs · comunidad y Hackathon Nicaragua',
    'boreal.body': 'Staff, mentoría y la categoría Startup de Kronox 2026 presentando VoxLab.',
    'tedx.title': 'TEDx Avenida Bolívar · consultor de desarrollo web',
    'tedx.body': 'Arquitectura técnica del sitio del evento (Next.js + Firebase + Resend) hasta su cierre.',
    'online.title': 'En línea · software que va más allá del mapa',
    'online.body': 'go-storage en pkg.go.dev, Waresis en construcción y VoxLab camino a Play Store.',
  },
  en: {
    'ruta.title': 'The route of my career',
    'ruta.intro': 'Every point is either a technical stop or a human lookout. The journey reads from León and outward.',
    'ruta.legenda.parada': 'Technical stop',
    'ruta.legenda.mirador': 'Human lookout',
    'calasanz.title': 'Colegio Calasanz · first code',
    'calasanz.body': 'Camino al crucero: where I learned to think in problems before languages.',
    'ulsa.title': 'ULSA · Cybernetic Electronic Engineering',
    'ulsa.body': 'Core training, Programming Club and mentoring of university projects.',
    'griteria.title': 'La Gritería · being from León',
    'griteria.body': 'La Purísima and the Virgin: the pride that powers community building.',
    'boreal.title': 'Boreal Labs · community and Hackathon Nicaragua',
    'boreal.body': 'Staff, mentoring and Kronox 2026 Startup category presenting VoxLab.',
    'tedx.title': 'TEDx Avenida Bolívar · web development consultant',
    'tedx.body': 'Technical architecture for the event website (Next.js + Firebase + Resend) until it closed.',
    'online.title': 'Online · software beyond the map',
    'online.body': 'go-storage on pkg.go.dev, Waresis under construction and VoxLab on its way to Play Store.',
  },
};

export function stop(loc: Locale, id: string) {
  const d = routeCopy[loc];
  return { title: d[`${id}.title`], body: d[`${id}.body`] };
}
