export function placeholderSvg(label: string, color1 = '#065F46', color2 = '#044E3B'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}"/>
        <stop offset="100%" stop-color="${color2}"/>
      </linearGradient>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="white" fill-opacity="0.15"/>
      </pattern>
    </defs>
    <rect width="800" height="600" fill="url(#g)"/>
    <rect width="800" height="600" fill="url(#dots)"/>
    <text x="50%" y="50%" font-family="serif" font-size="32" fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

// ─── Optimized image types ────────────────────────────────────────────────────

export type OptimizedImage = {
  src: string;        // largest JPEG fallback
  srcSet: string;     // JPEG srcset
  srcSetWebp: string; // WebP srcset
  sizes: string;
  width: number;
  height: number;
  lqip: string;       // base64 data URI blurred placeholder
};

// Legacy alias kept for component compatibility
export type ImageMeta = OptimizedImage;

// ─── getImage helper ──────────────────────────────────────────────────────────

// Lazily import generated data so the file compiles before the script has run.
// loadImageData() is eagerly called at module init so IMAGE_DATA is populated
// before any component renders.
let IMAGE_DATA: Record<string, { widths: number[]; aspectRatio: number; lqip: string }> | null =
  null;

async function loadImageData() {
  if (IMAGE_DATA) return;
  try {
    const mod = await import('./generated-image-data');
    IMAGE_DATA = mod.IMAGE_DATA as typeof IMAGE_DATA;
  } catch {
    IMAGE_DATA = {};
  }
}

loadImageData();

export function getImage(
  key: string,
  sizesAttr = '(max-width: 768px) 100vw, 50vw',
): OptimizedImage {
  const data = IMAGE_DATA?.[key];
  const widths = data?.widths ?? [400, 800, 1200];
  const largest = Math.max(...widths);
  const height = data ? Math.round(largest / data.aspectRatio) : largest;

  return {
    src: `/images/${key}-${largest}.jpg`,
    srcSet: widths.map((w) => `/images/${key}-${w}.jpg ${w}w`).join(', '),
    srcSetWebp: widths.map((w) => `/images/${key}-${w}.webp ${w}w`).join(', '),
    sizes: sizesAttr,
    width: largest,
    height,
    lqip: data?.lqip ?? '',
  };
}

// ─── IMAGES const ─────────────────────────────────────────────────────────────

export const IMAGES = {
  hero: getImage('hero-clinic', '100vw'),
  doctor1: getImage('doctor-mak', '(max-width: 768px) 100vw, 600px'),
  doctor2: getImage('doctor-lam', '(max-width: 768px) 100vw, 600px'),
  location: getImage('location-chai-wan', '(max-width: 768px) 100vw, 50vw'),
  services: [
    getImage('service-general-practice', '(max-width: 768px) 100vw, 33vw'),
    getImage('service-dermatology', '(max-width: 768px) 100vw, 33vw'),
    getImage('service-colorectal-screening', '(max-width: 768px) 100vw, 33vw'),
    getImage('service-chronic-disease', '(max-width: 768px) 100vw, 33vw'),
    getImage('service-flu-vaccine', '(max-width: 768px) 100vw, 33vw'),
    getImage('service-voucher', '(max-width: 768px) 100vw, 33vw'),
  ],
};
