export type PinKind = 'parada' | 'mirador';

export interface Pin {
  id: string;
  kind: PinKind;
  place: string;
  /** normalised 0..100 x/y so the svg stays responsive */
  x: number;
  y: number;
}

/** The journey, reading order matters (this drives the drawn polyline order) */
export const pins: Pin[] = [
  { id: 'calasanz', kind: 'mirador', place: 'León · Colegio Calasanz', x: 22, y: 30 },
  { id: 'ulsa', kind: 'parada', place: 'León · ULSA', x: 30, y: 44 },
  { id: 'griteria', kind: 'mirador', place: 'León · La Gritería', x: 20, y: 60 },
  { id: 'boreal', kind: 'parada', place: 'Managua · Boreal Labs y Hackathon', x: 68, y: 52 },
  { id: 'tedx', kind: 'parada', place: 'Managua · TEDx Avenida Bolívar', x: 78, y: 38 },
  { id: 'online', kind: 'parada', place: 'En línea · go-storage y Waresis', x: 88, y: 72 },
];
