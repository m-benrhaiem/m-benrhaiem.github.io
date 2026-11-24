import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ICONS, type IconName } from './icons';

/** Icône décorative en SVG, qui prend la couleur du texte (`currentColor`). */
@Component({
  selector: 'app-icon',
  template: `<svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  ><path [attr.d]="path()" /></svg>`,
  host: { class: 'icon' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  protected readonly path = computed(() => ICONS[this.name()]);
}
