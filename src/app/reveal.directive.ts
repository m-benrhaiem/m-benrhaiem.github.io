import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute, signal } from '@angular/core';
import { motionAllowed } from './motion';

/**
 * Fait apparaître l'élément (fondu et léger glissement) quand il entre dans la fenêtre.
 *
 * `<div appReveal>` ou `<div [appReveal]="120">` pour un délai en millisecondes.
 * Avec « réduire les animations », l'élément est affiché immédiatement.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.is-visible]': 'visible()',
    '[style.--reveal-delay]': 'delay() + "ms"',
  },
})
export class RevealDirective {
  readonly delay = input(0, {
    alias: 'appReveal',
    transform: (value: unknown) => numberAttribute(value, 0),
  });

  protected readonly visible = signal(false);

  constructor() {
    const host: HTMLElement = inject(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!motionAllowed()) {
        this.visible.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      );
      observer.observe(host);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
