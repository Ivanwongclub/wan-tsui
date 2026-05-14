export const DS = {
  colors: {
    primary: '#065F46',
    primaryDark: '#044E3B',
    primaryLight: '#ECFDF5',
    accent: '#9F3A1A',
    accentDark: '#7C2E15',
    accentLight: '#FBE9DE',
    ink: '#1C1917',
    body: '#57534E',
    muted: '#A8A29E',
    paper: '#FAFAF9',
    surface: '#FFFFFF',
    border: '#E7E5E4',
    borderStrong: '#D6D3D1',
    terraLight: '#F4A57A',
  },
  fonts: {
    heading: "'Noto Serif TC', 'PingFang TC', Georgia, serif",
    body: "'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', 'Plus Jakarta Sans', Inter, sans-serif",
  },
  animation: {
    duration: { fast: '150ms', base: '240ms', slow: '400ms', image: '600ms' },
    ease: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    scroll: { threshold: 0.15, rootMargin: '0px 0px -40px 0px', translateY: '16px' },
  },
} as const;
