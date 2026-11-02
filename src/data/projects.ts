import type { Locale } from '../i18n/ui';

export interface Project {
  id: string;
  /** promoted projects get their own wide card */
  featured?: boolean;
  stack: string[];
  links?: { label: string; href: string }[];
  image?: string;
  /** 'cover' fills a 16:9 band, 'logo' keeps the natural ratio of a wordmark */
  imageFit?: 'cover' | 'logo';
  imageWidth?: number;
  imageHeight?: number;
  alt?: { es: string; en: string };
  gallery?: { src: string; alt: { es: string; en: string } }[];
  es: { title: string; kind: string; year: string; summary: string; depth: string[] };
  en: { title: string; kind: string; year: string; summary: string; depth: string[] };
}

export const projects: Project[] = [
  {
    id: 'voxlab',
    featured: true,
    stack: ['Go', 'Flutter', 'Python', 'PostgreSQL', 'Redis', 'LiveKit', 'Docker', 'nginx'],
    links: [{ label: 'Hackathon Nicaragua · Kronox 2026', href: 'https://www.linkedin.com/posts/andressanchezsf_de-la-idea-al-producto-ma%C3%B1ana-presentamos-activity-7513823508443840512-bk5t' }],
    image: '/assets/hackatonnic2026/hackathon-rollup-voxlab.webp',
    alt: {
      es: 'Rollup de VoxLab en la Hackathon Nicaragua: "Entrena tu voz"',
      en: 'VoxLab banner at Hackathon Nicaragua: "Train your voice"',
    },
    gallery: [
      {
        src: '/assets/hackatonnic2026/hackathon-stand-voxlab.webp',
        alt: { es: 'Stand de VoxLab con stickers, QR y lapa', en: 'VoxLab stand with stickers, QR code and keychain' },
      },
      {
        src: '/assets/hackatonnic2026/hackathon-slide-voxlab-salon.webp',
        alt: { es: 'Laptop con la presentación de VoxLab en el salón', en: 'Laptop with the VoxLab pitch running on stage' },
      },
      {
        src: '/assets/voxlab/voxlab-equipo-uam.webp',
        alt: { es: 'Equipo de UAM con camisetas de VoxLab', en: 'UAM team wearing VoxLab shirts' },
      },
    ],
    es: {
      title: 'VoxLab',
      kind: 'Startup en incubación · presentada en Hackathon Nicaragua (Kronox 2026), categoría Startup',
      year: '2026',
      summary:
        'Plataforma educativa de oratoria: práctica de habla con progresión gamificada y sesiones en vivo. Pasó por el semillero PIA de la UAM con puntaje sobresaliente; en pruebas cerradas de Play Store con ~15 vecinos probando a diario.',
      depth: [
        'Único desarrollador: backend Go + app Flutter + panel administrativo.',
        'Analizador de texto/voz en Python (FastAPI + spaCy) como microservicio independiente.',
        'Sesiones en vivo con WebRTC (LiveKit) y datos efímeros en Redis con TTL.',
        'Deploy continuo: GitHub Actions → GHCR → SSH a VPS con nginx.',
      ],
    },
    en: {
      title: 'VoxLab',
      kind: 'Startup in incubation · presented at Hackathon Nicaragua (Kronox 2026), Startup category',
      year: '2026',
      summary:
        'Educational public-speaking platform with gamified practice and live sessions. Graduated from UAM’s PIA pre-incubation with an outstanding score; now in closed Play Store testing with ~15 daily testers.',
      depth: [
        'Sole developer: Go backend + Flutter app + private admin panel.',
        'Python text/voice analyzer (FastAPI + spaCy) as an isolated microservice.',
        'Live WebRTC sessions (LiveKit) with ephemeral Redis state and TTLs.',
        'Continuous deploy: GitHub Actions → GHCR → SSH to a VPS behind nginx.',
      ],
    },
  },
  {
    id: 'waresis',
    featured: true,
    stack: ['Go', 'Gin', 'sqlc', 'PostgreSQL', 'Redis', 'Astro', 'React'],
    links: [{ label: 'RustFS en lugar de MinIO', href: 'https://github.com/D-Kale/go-storage' }],
    image: '/assets/waresis/waresis-mark.webp',
    imageFit: 'logo',
    imageWidth: 400,
    imageHeight: 369,
    alt: { es: 'Marca de Waresis', en: 'Waresis mark' },
    es: {
      title: 'Waresis',
      kind: 'ERP multi-tenant · en construcción, no público aún',
      year: '2026',
      summary:
        'ERP multi-tenant donde cada inquilino tiene su propia base de datos PostgreSQL. Aquí acabó la experiencia de la migración de La Casa del Soldador: hoy es un producto, no un proyecto de cliente.',
      depth: [
        'Database-per-tenant con landlord DB y middleware de tenancy.',
        'SQL puro tipado con sqlc: sin ORM, simpleza deliberada.',
        'Dashboard en Astro SSR + React islands.',
        'Archivos con go-storage adaptado a RustFS (MinIO quedó deprecado).',
      ],
    },
    en: {
      title: 'Waresis',
      kind: 'Multi-tenant ERP · under construction, not public yet',
      year: '2026',
      summary:
        'Multi-tenant ERP where every tenant gets its own PostgreSQL database. The La Casa del Soldador migration experience ended up here: it is a product now, not a client project.',
      depth: [
        'Database-per-tenant with a landlord DB and tenancy middleware.',
        'Type-safe pure SQL via sqlc: no ORM, deliberate simplicity.',
        'Astro SSR + React islands dashboard.',
        'Files via go-storage adapted to RustFS (MinIO was deprecated).',
      ],
    },
  },
  {
    id: 'go-storage',
    stack: ['Go', 'S3 API', 'RustFS'],
    links: [{ label: 'github.com/D-Kale/go-storage', href: 'https://github.com/D-Kale/go-storage' }],
    es: {
      title: 'go-storage',
      kind: 'Librería open source · publicada en pkg.go.dev',
      year: '2026',
      summary:
        'Abstracción de almacenamiento en Go orientada a multitenancy: interfaz mínima (Upload, Delete, Exists, GetURL) y driver S3-compatible para AWS S3 y RustFS/MinIO.',
      depth: [
        'Config de buckets y credenciales en runtime, listada por tenant.',
        'Usada hoy por VoxLab y Waresis, no solo un experimento.',
      ],
    },
    en: {
      title: 'go-storage',
      kind: 'Open source library · published on pkg.go.dev',
      year: '2026',
      summary:
        'Storage abstraction in Go built for multitenancy: a minimal interface (Upload, Delete, Exists, GetURL) and an S3-compatible driver for AWS S3 and RustFS/MinIO.',
      depth: [
        'Per-tenant buckets and credentials configured at runtime.',
        'Used today by VoxLab and Waresis, not just an experiment.',
      ],
    },
  },
  {
    id: 'manuales',
    stack: ['Laravel', 'Livewire', 'Blade'],
    links: [{ label: 'github.com/D-Kale/ManualGestor', href: 'https://github.com/D-Kale/ManualGestor' }],
    es: {
      title: 'ManualGestor',
      kind: 'Proyecto de aprendizaje',
      year: '2025',
      summary: 'CRUD de manuales con Laravel + Livewire. Lo presenté como aprendizaje: no todo proyecto es un case study y está bien decirlo así.',
      depth: ['Componentes reactivos con Livewire sin API.', 'La lección: validación y orden de dominio antes que features.'],
    },
    en: {
      title: 'ManualGestor',
      kind: 'Learning project',
      year: '2025',
      summary: 'Manuals CRUD with Laravel + Livewire. I present it as learning: not every project is a case study and that is fine.',
      depth: ['Reactive components with Livewire, no API.', 'The lesson: domain order and validation before features.'],
    },
  },
  {
    id: 'encuestas',
    stack: ['Python', 'matplotlib'],
    links: [{ label: 'github.com/D-Kale/PythonSurveyAnalizer', href: 'https://github.com/D-Kale/PythonSurveyAnalizer' }],
    es: {
      title: 'PythonSurveyAnalizer',
      kind: 'Herramienta de investigación',
      year: '2025',
      summary:
        'Convierte JSON de encuestas en frecuencias y gráficos PNG. Lo usé en mi investigación documental al salir de secundaria para no sesgar los datos con mi lectura personal: la máquina es más pragmática que yo.',
      depth: ['Validación de transcripción de datos a código.', 'Decisiones justificadas con números, no con intenciones.'],
    },
    en: {
      title: 'PythonSurveyAnalizer',
      kind: 'Research tool',
      year: '2025',
      summary:
        'Turns survey JSON into frequency stats and PNG charts. I used it for my post-secondary documentary research so my own reading would not bias the data: the machine is more pragmatic than me.',
      depth: ['Validates data transcription into code.', 'Decisions backed by numbers, not intentions.'],
    },
  },
  {
    id: 'tedx',
    stack: ['Next.js', 'Firebase', 'Resend', 'Hostinger'],
    links: [{ label: 'tedxavenidabolivar.com', href: 'https://tedxavenidabolivar.com/' }],
    es: {
      title: 'TEDx Avenida Bolívar',
      kind: 'Consultoría · web del evento',
      year: '2026',
      summary:
        'Consultor de desarrollo web del evento. El reto: un hosting compartido sin backend propio; la solución: export estático de Next.js + Firestore directo desde el navegador + correo transaccional con Resend.',
      depth: ['Formularios de voluntariado y patrocinio operando en hosting limitado.', 'Lección: arquitectura honesta para las restricciones reales.'],
    },
    en: {
      title: 'TEDx Avenida Bolívar',
      kind: 'Consulting · event website',
      year: '2026',
      summary:
        'Web development consultant for the event. The constraint: shared hosting with no backend of its own; the solution: static Next.js export + Firestore straight from the browser + transactional email via Resend.',
      depth: ['Volunteer and sponsor forms running on constrained hosting.', 'Lesson: honest architecture for real constraints.'],
    },
  },
  {
    id: 'club',
    stack: ['Python'],
    es: {
      title: 'Programming Club ULSA',
      kind: 'Tooling interno de comunidad',
      year: '2025',
      summary: 'Scripts internos para contactar participantes registrados del club. Breve a propósito: es tooling de servicio, no un producto.',
      depth: [],
    },
    en: {
      title: 'Programming Club ULSA',
      kind: 'Internal community tooling',
      year: '2025',
      summary: 'Internal scripts to reach registered club participants. Brief on purpose: it is service tooling, not a product.',
      depth: [],
    },
  },
];

export function forLocale(loc: Locale) {
  return projects.map((p) => ({
    id: p.id,
    featured: p.featured ?? false,
    stack: p.stack,
    links: p.links ?? [],
    image: p.image,
    imageFit: p.imageFit,
    imageWidth: p.imageWidth,
    imageHeight: p.imageHeight,
    alt: p.alt?.[loc],
    gallery: p.gallery ?? [],
    ...p[loc],
  }));
}
