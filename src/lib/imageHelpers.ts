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

export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=1920&q=80',
  doctor1: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
  doctor2: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
  location: 'https://images.unsplash.com/photo-1610847499832-918a1c3c6811?w=1200&q=80',
  services: [
    'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&q=80',
    'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
    'https://images.unsplash.com/photo-1632053002780-3c5cd7be1d97?w=800&q=80',
    'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80',
  ],
};
