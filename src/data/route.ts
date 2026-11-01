import type { Locale } from '../i18n/ui';

export type PinKind = 'parada' | 'mirador';

export interface Pin {
  id: string;
  kind: PinKind;
  /** short label drawn on the road post */
  short: Record<Locale, string>;
  /** full place, shown on the stop card */
  place: Record<Locale, string>;
  /** kilometre along the journey */
  km: number;
  /** index of the road node where the milestone sits */
  at: number;
  image?: string;
  alt?: Record<Locale, string>;
  /** real logo of the institution, shown on the stop card */
  logo?: string;
  logoAlt?: Record<Locale, string>;
}

/**
 * The journey, reading order matters: it walks León before flying east to
 * Managua and then out to the online work.
 */
export const pins: Pin[] = [
  {
    id: 'ulsa',
    kind: 'parada',
    short: { es: 'ULSA', en: 'ULSA' },
    place: { es: 'León · ULSA', en: 'León · ULSA' },
    km: 0,
    at: 1,
    image: '/assets/ULSA/ulsa-edificio-rotulo.webp',
    alt: {
      es: 'Fachada de la ULSA con el rótulo de la universidad',
      en: 'ULSA facade with the university sign',
    },
    logo: '/assets/ULSA/ulsa-logo.webp',
    logoAlt: { es: 'Logotipo de ULSA', en: 'ULSA logo' },
  },
  {
    id: 'griteria',
    kind: 'mirador',
    short: { es: 'Gritería', en: 'Gritería' },
    place: { es: 'León · La Gritería', en: 'León · La Gritería' },
    km: 12,
    at: 3,
    image: '/assets/concepcion/griteria-purisima-resplandor.webp',
    alt: {
      es: 'Altar de La Purísima en La Gritería, iluminado por velas',
      en: 'La Purísima altar at La Gritería, lit by candles',
    },
  },
  {
    id: 'museo',
    kind: 'mirador',
    short: { es: 'Museo', en: 'Museum' },
    place: { es: 'León · Museo Ortiz Gurdian', en: 'León · Ortiz Gurdian Museum' },
    km: 22,
    at: 5,
    image: '/assets/museo/museo-gigantona-marionetas.webp',
    alt: {
      es: 'Gigantona de marionetas en el Museo Ortiz Gurdian',
      en: 'Giant puppet in the Ortiz Gurdian Museum',
    },
  },
  {
    id: 'merced',
    kind: 'mirador',
    short: { es: 'Merced', en: 'Merced' },
    place: { es: 'León · Virgen de la Merced', en: 'León · Virgin of La Merced' },
    km: 34,
    at: 7,
    image: '/assets/merced/merced-palio-virgen.webp',
    alt: {
      es: 'Palio de la Virgen de la Merced en la procesión por León',
      en: 'Palio of the Virgin of La Merced in the procession through León',
    },
  },
  {
    id: 'boreal',
    kind: 'parada',
    short: { es: 'Boreal Labs', en: 'Boreal Labs' },
    place: { es: 'Managua · Boreal Labs y Hackathon', en: 'Managua · Boreal Labs & Hackathon' },
    km: 48,
    at: 9,
    image: '/assets/hackatonnic2026/hackathon-stand-boreal.webp',
    alt: {
      es: 'Stand de Boreal Labs en la Hackathon Nicaragua 2026',
      en: 'Boreal Labs stand at Hackathon Nicaragua 2026',
    },
  },
  {
    id: 'tedx',
    kind: 'parada',
    short: { es: 'TEDx', en: 'TEDx' },
    place: { es: 'Managua · TEDx Avenida Bolívar', en: 'Managua · TEDx Avenida Bolívar' },
    km: 58,
    at: 11,
  },
  {
    id: 'online',
    kind: 'parada',
    short: { es: 'En línea', en: 'Online' },
    place: { es: 'En línea · go-storage y Waresis', en: 'Online · go-storage & Waresis' },
    km: 72,
    at: 13,
    image: '/assets/hackatonnic2026/hackathon-app-ui.webp',
    alt: {
      es: 'Interfaz de VoxLab, la aplicación de consultas en vivo',
      en: 'VoxLab interface, the live polls application',
    },
  },
];

/** Kilometre where the truck finishes the journey. */
export const totalKm = 78;

export interface RoadNode {
  x: number;
  y: number;
}

/** Road plate: 420 x 900 user units, the road snakes from top to bottom. */
export const ROAD_W = 420;
export const ROAD_H = 900;

/**
 * Control points of the road. Milestones sit on the lateral extremes, so the
 * snake turns at every stop and the truck visibly banks through each curve.
 */
export const roadNodes: RoadNode[] = [
  { x: 240, y: 30 },
  { x: 320, y: 92 },
  { x: 240, y: 154 },
  { x: 160, y: 216 },
  { x: 240, y: 278 },
  { x: 320, y: 340 },
  { x: 240, y: 402 },
  { x: 160, y: 464 },
  { x: 240, y: 526 },
  { x: 320, y: 588 },
  { x: 240, y: 650 },
  { x: 160, y: 712 },
  { x: 240, y: 774 },
  { x: 320, y: 836 },
  { x: 240, y: 890 },
];

interface Cubic {
  p0: RoadNode;
  p1: RoadNode;
  p2: RoadNode;
  p3: RoadNode;
}

function cubics(nodes: RoadNode[]): Cubic[] {
  const out: Cubic[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const p0 = nodes[i - 1] ?? nodes[i];
    const p1 = nodes[i];
    const p2 = nodes[i + 1];
    const p3 = nodes[i + 2] ?? nodes[i + 1];
    out.push({
      p0,
      p1: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
      p2: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 },
      p3: p2,
    });
  }
  return out;
}

function cubicAt(c: Cubic, t: number): RoadNode {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const d = 3 * u * t * t;
  const e = t * t * t;
  return {
    x: a * c.p0.x + b * c.p1.x + d * c.p2.x + e * c.p3.x,
    y: a * c.p0.y + b * c.p1.y + d * c.p2.y + e * c.p3.y,
  };
}

/** The road as an SVG path: smooth Catmull-Rom through the control points. */
export function roadPath(): string {
  const segs = cubics(roadNodes);
  let d = `M ${roadNodes[0].x} ${roadNodes[0].y}`;
  for (const c of segs) {
    d += ` C ${c.p1.x} ${c.p1.y} ${c.p2.x} ${c.p2.y} ${c.p3.x} ${c.p3.y}`;
  }
  return d;
}

const SAMPLES = 40;

/** Arc length fraction (0..1) of every road node, used to sync the truck. */
export const roadNodeFractions: number[] = (() => {
  const segs = cubics(roadNodes);
  const lengths: number[] = [0];
  let acc = 0;
  let prev = roadNodes[0];
  for (const c of segs) {
    for (let i = 1; i <= SAMPLES; i++) {
      const pt = cubicAt(c, i / SAMPLES);
      acc += Math.hypot(pt.x - prev.x, pt.y - prev.y);
      prev = pt;
    }
    lengths.push(acc);
  }
  return lengths.map((l) => l / acc);
})();
