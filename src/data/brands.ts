import { siCisco, siTed, siWordpress } from 'simple-icons';

export interface BrandIcon {
  title: string;
  path: string;
}

/**
 * Logos de instituciones (monocromos, simple-icons CC0-1.0) para identificar
 * de dónde viene cada experiencia. Si una institución no está aquí, se muestra
 * solo su nombre: nunca un icono genérico inventado.
 */
export const brandIcons: Record<string, BrandIcon> = {
  Cisco: siCisco,
  TED: siTed,
  WordPress: siWordpress,
};

export function brandIconFor(label: string): BrandIcon | undefined {
  return brandIcons[label];
}
