import type { Locale } from '../i18n/ui';

export interface Stamp {
  id: 'leon' | 'managua' | 'online';
  label: { es: string; en: string };
}

export interface Postcard {
  id: string;
  author: string;
  role: { es: string; en: string };
  stamp: Stamp;
  text: { es: string; en: string };
}

const stamps: Record<Stamp['id'], Stamp> = {
  leon: { id: 'leon', label: { es: 'León', en: 'León' } },
  managua: { id: 'managua', label: { es: 'Managua', en: 'Managua' } },
  online: { id: 'online', label: { es: 'En línea', en: 'Online' } },
};

export const postcards: Postcard[] = [
  {
    id: 'seed-boreal',
    author: 'Equipo de Boreal Labs',
    role: { es: 'Comunidad interuniversitaria de Managua', en: 'Interuniversity community of Managua' },
    stamp: stamps.managua,
    text: {
      es: 'Mentor de proyectos universitarios: guía a estudiantes con arquitectura y paciencia. Es el mentor que uno quisiera tener a los 18.',
      en: 'University project mentor: guides students with architecture and patience. The kind of mentor you wish you had at 18.',
    },
  },
  {
    id: 'seed-hackathon',
    author: 'Jueces de Hackathon Nicaragua',
    role: { es: 'Kronox 2026 · categoría Startup', en: 'Kronox 2026 · Startup category' },
    stamp: stamps.managua,
    text: {
      es: 'Una startup completa presentada en una sola noche. Técnica sólida, historia clara y demo real.',
      en: 'A full startup pitched in one night. Solid engineering, clear story and a real demo.',
    },
  },
  {
    id: 'seed-club',
    author: 'Programming Club ULSA',
    role: { es: 'Club de programación, León', en: 'Programming club, León' },
    stamp: stamps.leon,
    text: {
      es: 'Si el club funciona es porque hay alguien detrás automatizando las cosas aburridas.',
      en: 'The club works because someone behind the scenes automates the boring parts.',
    },
  },
];

export function stampLabel(loc: Locale, s: Stamp) {
  return s.label[loc];
}
