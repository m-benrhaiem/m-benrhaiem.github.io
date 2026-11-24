import { DestroyRef, Directive, ElementRef, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { motionAllowed } from './motion';

const numberFormat = new Intl.NumberFormat('fr-FR');
const DURATION_MS = 1600;

/**
 * Compteur animé : affiche 0 puis compte jusqu'à la valeur cible quand l'élément devient visible,
 * et termine sur le texte exact fourni (par exemple « 550 000+ »).
 *
 * `<strong [appCountUp]="550000" countUpText="550 000+" #counter="countUp">{{ counter.display() }}</strong>`
 * Sans valeur cible, ou avec « réduire les animations », le texte final est affiché directement.
 */
@Directive({ selector: '[appCountUp]', exportAs: 'countUp' })
export class CountUpDirective {
  readonly target = input<number | undefined>(undefined, { alias: 'appCountUp' });
  readonly text = input.required<string>({ alias: 'countUpText' });

  /** Valeur intermédiaire pendant l'animation ; `null` affiche le texte final. */
  private readonly current = signal<number | null>(motionAllowed() ? 0 : null);

  readonly display = computed(() => {
    const current = this.current();
    const finalText = this.text();
    if (this.target() === undefined || current === null) {
      return finalText;
    }
    const suffix = finalText.replace(/^[\d\s]+/, '');
    return numberFormat.format(current).replace(/\s/g, ' ') + suffix;
  });

  constructor() {
    const host: HTMLElement = inject(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const target = this.target();
      if (target === undefined || this.current() === null) {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            this.animate(target);
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(host);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private animate(target: number): void {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      if (progress < 1) {
        const eased = 1 - Math.pow(1 - progress, 3);
        this.current.set(Math.round(target * eased));
        requestAnimationFrame(step);
      } else {
        this.current.set(null);
      }
    };
    requestAnimationFrame(step);
  }
}
