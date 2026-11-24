/**
 * Vrai si les animations au défilement peuvent être jouées : navigateur compatible
 * (IntersectionObserver) et aucune préférence système « réduire les animations ».
 */
export function motionAllowed(): boolean {
  return (
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
