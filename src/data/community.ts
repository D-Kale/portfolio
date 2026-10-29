import type { Locale } from '../i18n/ui';

type DictEntry = { es: string; en: string; href?: string; badge?: string };

export interface CommunityStop {
  id: string;
  title: DictEntry;
  summary: DictEntry;
}

export const community: CommunityStop[] = [
  {
    id: 'boreal-staff',
    title: { es: 'Boreal Labs · staff y mentoría universitaria', en: 'Boreal Labs · staff and university mentoring' },
    summary: {
      es: 'Miembro de Operaciones en la comunidad interuniversitaria: mentoría de proyectos, decisiones de arquitectura y soporte web.',
      en: 'Operations member of the interuniversity community: project mentoring, architecture decisions and web support.',
    },
  },
  {
    id: 'flutter-meetup',
    title: { es: 'Flutter Meetup Managua · charla', en: 'Flutter Meetup Managua · talk' },
    summary: {
      es: '“Tu app móvil no es un servidor de bolsillo”: por qué la lógica pesada vive en el backend. Mi regla: si no ejecuta píxeles, va en el servidor.',
      en: '“Your mobile app is not a pocket server”: why heavy logic belongs in the backend. My rule: if it doesn’t render pixels, it lives on the server.',
    },
  },
  {
    id: 'techday',
    title: { es: 'TechDay Nicaragua 2026', en: 'TechDay Nicaragua 2026' },
    summary: {
      es: 'Asistencia en representación de Boreal Labs: ciberseguridad, IA generativa y entrenamiento de modelos con ESET, Nutanix y Dell.',
      en: 'Attending on behalf of Boreal Labs: cybersecurity, generative and agentic AI, model training with ESET, Nutanix and Dell.',
    },
  },
  {
    id: 'wordcamp',
    title: { es: 'WordCamp Managua 2026 · staff', en: 'WordCamp Managua 2026 · staff' },
    summary: {
      es: 'Voluntario de logística y servicio en los 14 años de la comunidad WordPress de Nicaragua: puentes entre diseño, marketing y desarrollo.',
      en: 'Logistics and service volunteer for WordPress community’s 14th year in Nicaragua: bridges between design, marketing and development.',
    },
  },
  {
    id: 'tedx-rol',
    title: { es: 'TEDx Avenida Bolívar · consultor', en: 'TEDx Avenida Bolívar · consultant' },
    summary: {
      es: 'Guía técnica del sitio del evento hasta su cierre: decisiones de arquitectura, código base y despliegue en hosting compartido.',
      en: 'Technical guide for the event website until it closed: architecture decisions, codebase and deployment on shared hosting.',
    },
  },
  {
    id: 'hackathon',
    title: { es: 'Hackathon Nicaragua · Kronox 2026', en: 'Hackathon Nicaragua · Kronox 2026' },
    summary: {
      es: 'Décima edición: presenté VoxLab en categoría Startup con Boreal Labs. No se ganó, se ganó experiencia y una dirección.',
      en: 'Tenth edition: I pitched VoxLab in the Startup category with Boreal Labs. We did not win; we gained experience and a direction.',
    },
  },
];

export interface FormationItem {
  id: string;
  title: DictEntry;
  summary: DictEntry;
  status?: { es: string; en: string };
}

export const formation: FormationItem[] = [
  {
    id: 'ulsa-title',
    title: { es: 'ULSA · Ingeniería en Cibernética Electrónica', en: 'ULSA · Cybernetic Electronic Engineering' },
    summary: {
      es: 'Universidad Tecnológica La Salle, León. Formación de base de hardware, sistemas y control.',
      en: 'Universidad Tecnológica La Salle, León. Core training in hardware, systems and control.',
    },
  },
  {
    id: 'cs50',
    title: { es: 'Harvard CS50x', en: 'Harvard CS50x' },
    summary: {
      es: 'Fundamentos completados: algoritmos, memoria, C y Python con criterio.',
      en: 'Completed foundations: algorithms, memory, C and Python with judgment.',
    },
    status: { es: 'Completado', en: 'Completed' },
  },
  {
    id: 'cs50w',
    title: { es: 'Harvard CS50W', en: 'Harvard CS50W' },
    summary: {
      es: 'Programming web con Django, SQL y JavaScript.',
      en: 'Web programming with Django, SQL and JavaScript.',
    },
    status: { es: 'En proceso', en: 'In progress' },
  },
  {
    id: 'cisco',
    title: { es: 'Cisco · IT Essentials', en: 'Cisco · IT Essentials' },
    summary: { es: 'Hardware, redes y soporte: la base antes de la nube.', en: 'Hardware, networking and support: the layer under the cloud.' },
    status: { es: 'Completado', en: 'Completed' },
  },
  {
    id: 'aspire',
    title: { es: 'Aspire', en: 'Aspire' },
    summary: {
      es: 'Programa de emprendimiento que toma el lugar de InnovaBootcamp con más renombre: habilidades idénticas, comunidad más amplia.',
      en: 'Entrepreneurship program replacing InnovaBootcamp with more reach: same skills, wider community.',
    },
    status: { es: 'En curso', en: 'In progress' },
  },
  {
    id: 'idiomas',
    title: { es: 'Inglés B2', en: 'English B2' },
    summary: {
      es: 'Documentación técnica, PR y llamadas sin sustitutos.',
      en: 'Technical docs, PR review and calls without stand-ins.',
    },
  },
];

export function pick(loc: Locale, d: DictEntry): string {
  return d[loc];
}
