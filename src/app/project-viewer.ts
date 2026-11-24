import { Component, ElementRef, Injector, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import type { PortfolioProject } from './data/profile';
import { IconComponent } from './icon';

/** Distance horizontale (px) au-delà de laquelle un glissement change de capture. */
const SWIPE_DISTANCE = 50;

/**
 * Visionneuse plein écran des captures d'un projet, basée sur <dialog> :
 * focus piégé dans la fenêtre, fermeture avec Échap, retour du focus sur la carte à la fermeture.
 * Flèches gauche / droite (clavier ou boutons) et glissement au doigt pour passer d'une capture à l'autre.
 */
@Component({
  selector: 'app-project-viewer',
  imports: [IconComponent],
  templateUrl: './project-viewer.html',
})
export class ProjectViewerComponent {
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly injector = inject(Injector);
  private swipeStart: number | null = null;
  /** Vrai juste après un glissement : le clic qui le suit ne doit pas fermer la visionneuse. */
  private swiped = false;

  protected readonly project = signal<PortfolioProject | null>(null);
  protected readonly index = signal(0);
  protected readonly count = computed(() => this.project()?.images.length ?? 0);
  /** Capture affichée, dans un tableau pour que @for recrée l'image (et rejoue son animation) à chaque changement. */
  protected readonly shots = computed(() => {
    const project = this.project();
    return project ? [project.images[this.index()]] : [];
  });

  open(project: PortfolioProject, index = 0): void {
    this.project.set(project);
    this.index.set(index);
    // Ouverture une fois le contenu rendu, pour que le focus aille directement sur le bouton « Fermer ».
    afterNextRender(
      () => {
        const dialog = this.dialog().nativeElement;
        if (!dialog.open) {
          dialog.showModal();
        }
      },
      { injector: this.injector },
    );
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  protected step(delta: number): void {
    const count = this.count();
    if (count > 1) {
      this.index.update((index) => (index + delta + count) % count);
    }
  }

  protected onClose(): void {
    this.project.set(null);
  }

  /** Un clic sur le fond (hors image, légende et boutons) ferme la visionneuse. */
  protected onDialogClick(event: MouseEvent): void {
    if (this.swiped) {
      this.swiped = false;
      return;
    }
    const target = event.target instanceof Element ? event.target : null;
    if (target && !target.closest('img, button, figcaption, .viewer-bar')) {
      this.close();
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this.step(event.key === 'ArrowRight' ? 1 : -1);
    }
  }

  protected onPointerDown(event: PointerEvent): void {
    this.swipeStart = event.clientX;
    this.swiped = false;
  }

  protected onPointerUp(event: PointerEvent): void {
    if (this.swipeStart === null) {
      return;
    }
    const distance = event.clientX - this.swipeStart;
    this.swipeStart = null;
    if (Math.abs(distance) > SWIPE_DISTANCE) {
      this.swiped = true;
      this.step(distance < 0 ? 1 : -1);
    }
  }
}
