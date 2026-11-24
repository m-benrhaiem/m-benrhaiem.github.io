import { Component, signal } from '@angular/core';
import { PROFILE } from './data/profile';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly data = PROFILE;
  protected readonly year = new Date().getFullYear();
  protected readonly menuOpen = signal(false);

  protected readonly nav: NavItem[] = [
    { id: 'profil', label: 'Profil' },
    { id: 'experience', label: 'Expérience' },
    { id: 'competences', label: 'Compétences' },
    { id: 'formation', label: 'Formation' },
    { id: 'contact', label: 'Contact' },
  ];

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
