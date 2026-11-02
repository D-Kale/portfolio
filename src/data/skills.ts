import type { Locale } from '../i18n/ui';

export interface SkillGroup {
  title: Record<Locale, string>;
  items: string[];
}

/**
 * Las herramientas con las que trabajo de verdad, agrupadas por lo que hacen.
 * Cada una aparece en un repositorio, en un VPS o en un contenedor.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: { es: 'Lenguajes', en: 'Languages' },
    items: ['Go', 'Python', 'TypeScript', 'JavaScript', 'PHP'],
  },
  {
    title: { es: 'Backend y datos', en: 'Backend & data' },
    items: ['Gin', 'PostgreSQL', 'Redis', 'sqlc', 'LiveKit', 'Laravel', 'Livewire', 'FastAPI'],
  },
  {
    title: { es: 'Frontend y producto', en: 'Frontend & product' },
    items: ['Astro', 'React', 'Next.js', 'Tailwind CSS', 'Flutter', 'Blade'],
  },
  {
    title: { es: 'Infraestructura y nube', en: 'Infrastructure & cloud' },
    items: ['Docker', 'nginx', 'AWS', 'GitHub Actions', 'Linux', 'Git', 'RustFS'],
  },
];
