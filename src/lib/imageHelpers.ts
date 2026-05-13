export function placeholderSvg(label: string, color1 = '#065F46', color2 = '#044E3B'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}"/>
        <stop offset="100%" stop-color="${color2}"/>
      </linearGradient>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.15)"/>
      </pattern>
    </defs>
    <rect width="800" height="600" fill="url(#g)"/>
    <rect width="800" height="600" fill="url(#dots)"/>
    <text x="50%" y="50%" font-family="serif" font-size="32" fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

export type ImageMeta = { src: string; width: number; height: number };

export const IMAGES = {
  hero: { src: '/images/hero-clinic.jpg', width: 1920, height: 1080 },
  doctor1: { src: '/images/doctor-mak.jpg', width: 800, height: 1000 },
  doctor2: { src: '/images/doctor-lam.jpg', width: 800, height: 1000 },
  location: { src: '/images/location-chai-wan.jpg', width: 1200, height: 900 },
  services: [
    { src: '/images/service-general-practice.jpg', width: 800, height: 600 },
    { src: '/images/service-dermatology.jpg', width: 800, height: 600 },
    { src: '/images/service-colorectal-screening.jpg', width: 800, height: 600 },
    { src: '/images/service-chronic-disease.jpg', width: 800, height: 600 },
    { src: '/images/service-flu-vaccine.jpg', width: 800, height: 600 },
    { src: '/images/service-voucher.jpg', width: 800, height: 600 },
  ],
};
