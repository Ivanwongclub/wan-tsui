import { useRef, useState, useEffect } from 'react';
import { DS } from '../styles/designSystem';

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    // Already in viewport at mount — reveal immediately (handles SSR hydration case)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const frame1 = requestAnimationFrame(() => {
        const frame2 = requestAnimationFrame(() => setIsVisible(true));
        return () => cancelAnimationFrame(frame2);
      });
      return () => cancelAnimationFrame(frame1);
    }

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
