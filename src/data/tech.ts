import {
  siGo,
  siFlutter,
  siPython,
  siPostgresql,
  siRedis,
  siLivekit,
  siDocker,
  siNginx,
  siGin,
  siAstro,
  siReact,
  siRustfs,
  siLaravel,
  siLivewire,
  siNextdotjs,
  siFirebase,
  siResend,
  siHostinger,
} from 'simple-icons';

export interface TechIcon {
  title: string;
  path: string;
}

/**
 * Etiqueta de stack tal como se escribe en src/data/projects.ts -> logotipo.
 * Si una etiqueta no está aquí, se muestra solo como chip de texto (nunca un icono inventado).
 * Iconos: simple-icons (CC0-1.0); los logos son marcas de sus dueños y se usan solo para identificar la tecnología.
 */
export const techIcons: Record<string, TechIcon> = {
  Go: siGo,
  Flutter: siFlutter,
  Python: siPython,
  PostgreSQL: siPostgresql,
  Redis: siRedis,
  LiveKit: siLivekit,
  Docker: siDocker,
  nginx: siNginx,
  Gin: siGin,
  Astro: siAstro,
  React: siReact,
  RustFS: siRustfs,
  Laravel: siLaravel,
  Livewire: siLivewire,
  'Next.js': siNextdotjs,
  Firebase: siFirebase,
  Resend: siResend,
  Hostinger: siHostinger,
};

export function iconFor(label: string): TechIcon | undefined {
  return techIcons[label];
}
