const ui = {
  es: {
    'site.title': 'Andrés Sánchez — Ingeniero en Cibernética y desarrollador',
    'site.description':
      'Construyo sistemas modernos con Go, Astro y comunidad en Nicaragua. Portafolio de Andrés Sánchez.',
    'lang.toggle': 'EN',
  },
  en: {
    'site.title': 'Andrés Sánchez — Cybernetics engineer & developer',
    'site.description':
      'I build modern systems with Go, Astro and community in Nicaragua. Andrés Sánchez’s portfolio.',
    'lang.toggle': 'ES',
  },
} as const;

export type Locale = keyof typeof ui;
export type TranslationKey = keyof (typeof ui)['es'];
export const locales: Locale[] = ['es', 'en'];
export const localePath: Record<Locale, string> = { es: '/', en: '/en/' };

export function ui_for(lang: Locale) {
  return ui[lang];
}

export { ui };
