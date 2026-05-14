import { useRef, useState, useEffect } from 'react';
import { DS } from '../styles/designSystem';

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  // Start visible — handles SSR and reduced-motion correctly without flash
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // already visible, do nothing
    }
    const el = ref.current;
    if (!el) return;

    // If element is already in viewport, leave it visible — no animation needed
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      return;
    }

    // Below the fold — hide it now, then animate in when it scrolls into view
    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: DS.animation.scroll.threshold, rootMargin: DS.animation.scroll.rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
