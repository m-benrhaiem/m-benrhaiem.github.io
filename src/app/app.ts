import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PROFILE } from './data/profile';
import { CountUpDirective } from './count-up.directive';
import { IconComponent } from './icon';
import { RevealDirective } from './reveal.directive';
import { ThemeService } from './theme.service';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-root',
  imports: [NgOptimizedImage, IconComponent, RevealDirective, CountUpDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: { '(document:keydown.escape)': 'closeMenu()' },
})
export class App {
  protected readonly data = PROFILE;
  protected readonly year = new Date().getFullYear();
  protected readonly menuOpen = signal(false);
  /** Vrai dès que la page a défilé : ombre sous l'en-tête. */
  protected readonly scrolled = signal(false);
  /** Section visible au centre de l'écran : lien actif dans la navigation. */
  protected readonly activeSection = signal('');

  private readonly themeService = inject(ThemeService);
  protected readonly isDark = computed(() => this.themeService.theme() === 'dark');

  protected readonly nav: NavItem[] = [
    { id: 'profil', label: 'Profil' },
    { id: 'experience', label: 'Expérience' },
    { id: 'competences', label: 'Compétences' },
    { id: 'formation', label: 'Formation' },
    { id: 'contact', label: 'Contact' },
  ];

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        return;
      }

      const sectionSpy = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.activeSection.set(entry.target.id);
            }
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      document.querySelectorAll('main section[id]').forEach((section) => sectionSpy.observe(section));

      const sentinel = document.getElementById('scroll-sentinel');
      const headerSpy = new IntersectionObserver(([entry]) => this.scrolled.set(!entry.isIntersecting));
      if (sentinel) {
        headerSpy.observe(sentinel);
      }

      destroyRef.onDestroy(() => {
        sectionSpy.disconnect();
        headerSpy.disconnect();
      });
    });
  }

  protected toggleTheme(event: Event): void {
    const button = event.currentTarget as HTMLElement | null;
    const rect = button?.getBoundingClientRect();
    this.themeService.toggle(rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
