import type { Locale } from '../i18n/ui';

type Dict = Record<Locale, Record<string, string>>;

/** Stops and mirrors: anchor text along the journey. */
export const routeCopy: Dict = {
  es: {
    'ruta.title': 'La ruta de mi carrera',
    'ruta.intro':
      'La carretera recorre tu carrera: cada hito es una parada técnica o un mirador humano. Toca un hito para saltar a su historia.',
    'ruta.legenda.parada': 'Parada técnica',
    'ruta.legenda.mirador': 'Mirador humano',
    'ulsa.title': 'ULSA · Ingeniería en Cibernética Electrónica',
    'ulsa.body':
      'Formación de base, Programming Club y mentoring de proyectos universitarios.',
    'griteria.title': 'La Gritería · pertenencia leonesa',
    'griteria.body':
      'La Purísima y la Virgen: orgullo de donde viene la energía para construir comunidad.',
    'museo.title': 'Museo Ortiz Gurdian · la memoria de la ciudad',
    'museo.body':
      'Gigantones, marimbas y murales coloniales: la historia de León convertida en material.',
    'merced.title': 'Virgen de la Merced · la procesión de agosto',
    'merced.body':
      'Palios, alfombras y una ciudad entera saliente a la calle: la fiesta que cada año regresa.',
    'boreal.title': 'Boreal Labs · comunidad y Hackathon Nicaragua',
    'boreal.body':
      'Staff, mentoría y la categoría Startup de Kronox 2026 presentando VoxLab.',
    'tedx.title': 'TEDx Avenida Bolívar · consultor de desarrollo web',
    'tedx.body':
      'Arquitectura técnica del sitio del evento (Next.js + Firebase + Resend) hasta su cierre.',
    'online.title': 'En línea · software que va más allá del mapa',
    'online.body':
      'go-storage en pkg.go.dev, Waresis en construcción y VoxLab camino a Play Store.',
  },
  en: {
    'ruta.title': 'The route of my career',
    'ruta.intro':
      'A highway runs through your career: every milestone is a technical stop or a human lookout. Tap a milestone to jump to its story.',
    'ruta.legenda.parada': 'Technical stop',
    'ruta.legenda.mirador': 'Human lookout',
    'ulsa.title': 'ULSA · Cybernetic Electronic Engineering',
    'ulsa.body':
      'Core training, Programming Club and mentoring of university projects.',
    'griteria.title': 'La Gritería · being from León',
    'griteria.body':
      'La Purísima and the Virgin: the pride that powers community building.',
    'museo.title': 'Ortiz Gurdian Museum · the memory of the city',
    'museo.body':
      'Giant puppets, marimbas and colonial murals: León history turned into material.',
    'merced.title': 'Virgin of La Merced · the August procession',
    'merced.body':
      'Palios, carpets and a whole city out in the streets: the festival that comes back every year.',
    'boreal.title': 'Boreal Labs · community and Hackathon Nicaragua',
    'boreal.body':
      'Staff, mentoring and Kronox 2026 Startup category presenting VoxLab.',
    'tedx.title': 'TEDx Avenida Bolívar · web development consultant',
    'tedx.body':
      'Technical architecture for the event website (Next.js + Firebase + Resend) until it closed.',
    'online.title': 'Online · software beyond the map',
    'online.body':
      'go-storage on pkg.go.dev, Waresis under construction and VoxLab on its way to Play Store.',
  },
};

export function stop(loc: Locale, id: string) {
  const d = routeCopy[loc];
  return { title: d[`${id}.title`], body: d[`${id}.body`] };
}
