import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLORS: Record<Theme, string> = { light: '#1f4e79', dark: '#0e141b' };

/**
 * Thème clair / sombre.
 *
 * Au chargement, le script de `index.html` pose `data-theme` sur `<html>` (choix mémorisé, sinon
 * préférence du système) avant le premier affichage. Ce service reprend cette valeur, applique les
 * bascules et suit la préférence du système tant que l'utilisateur n'a rien choisi.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly root = document.documentElement;
  readonly theme = signal<Theme>(this.root.dataset['theme'] === 'dark' ? 'dark' : 'light');

  constructor() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (savedTheme() === null) {
        this.apply(event.matches ? 'dark' : 'light');
      }
    });
  }

  /** Bascule le thème ; `origin` est le centre du bouton, d'où part l'animation circulaire. */
  toggle(origin?: { x: number; y: number }): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Stockage indisponible (navigation privée stricte) : le choix vaut pour la visite en cours.
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!origin || reduceMotion || !('startViewTransition' in document)) {
      this.apply(next);
      return;
    }

    const radius = Math.hypot(
      Math.max(origin.x, window.innerWidth - origin.x),
      Math.max(origin.y, window.innerHeight - origin.y),
    );
    const transition = document.startViewTransition(() => this.apply(next));
    transition.ready
      .then(() => {
        this.root.animate(
          {
            clipPath: [
              `circle(0px at ${origin.x}px ${origin.y}px)`,
              `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
            ],
          },
          { duration: 550, easing: 'cubic-bezier(0.2, 0.65, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      })
      .catch(() => undefined);
  }

  private apply(theme: Theme): void {
    this.root.dataset['theme'] = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
    this.theme.set(theme);
  }
}

function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}
