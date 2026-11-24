import { Component, computed, input, output, signal } from '@angular/core';
import type { PortfolioProject, Screenshot } from './data/profile';
import { IconComponent } from './icon';

/** Largeur d'affichage des captures, selon la mise en page de la grille (voir styles.css). */
const SIZES_FEATURED = '(max-width: 640px) calc(100vw - 40px), (max-width: 900px) calc(50vw - 32px), 548px';
const SIZES_DEFAULT = '(max-width: 640px) calc(100vw - 40px), (max-width: 900px) calc(50vw - 32px), 357px';

/**
 * Carte d'un projet : captures d'écran (avec sélecteur s'il y en a plusieurs), description et technologies.
 * Un clic sur la capture demande son agrandissement dans la visionneuse.
 */
@Component({
  selector: 'app-project-card',
  imports: [IconComponent],
  templateUrl: './project-card.html',
})
export class ProjectCardComponent {
  readonly project = input.required<PortfolioProject>();
  /** Agrandissement demandé : index de la capture affichée. */
  readonly zoom = output<number>();

  protected readonly active = signal(0);
  protected readonly shot = computed(() => this.project().images[this.active()]);
  protected readonly sizes = computed(() => (this.project().featured ? SIZES_FEATURED : SIZES_DEFAULT));

  protected srcset(image: Screenshot): string {
    return `${image.small} 640w, ${image.src} ${image.width}w`;
  }
}
