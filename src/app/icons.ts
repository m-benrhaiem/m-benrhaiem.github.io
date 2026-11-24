/**
 * Icônes au trait (grille 24 × 24) dessinées pour le site.
 * Chaque icône est un seul tracé SVG ; chaque sous-tracé commence par une commande « M » absolue.
 */
export const ICONS = {
  mail: 'M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z M3.5 7.5 12 13l8.5-5.5',
  download: 'M12 4v11 M7 10l5 5 5-5 M5 20h14',
  external: 'M7 17 17 7 M8.5 7H17v8.5',
  pin: 'M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z M12 8.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5z',
  server: 'M4 4.5h16v6H4z M4 13.5h16v6H4z M7.5 7.5h.01 M7.5 16.5h.01',
  layout: 'M3.5 5h17v14h-17z M3.5 9h17 M9 9v10',
  shield: 'M12 3 5 6v5.5c0 4.3 2.9 7.9 7 9.5 4.1-1.6 7-5.2 7-9.5V6l-7-3z M9 12l2.2 2.2L15.5 10',
  cycle: 'M20 11a8 8 0 0 0-14.3-4.6 M5 3.5V7h3.5 M4 13a8 8 0 0 0 14.3 4.6 M19 20.5V17h-3.5',
  database:
    'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  bank: 'M3 9.5 12 4l9 5.5 M5 10v8 M9.7 10v8 M14.3 10v8 M19 10v8 M3 20.5h18',
  sliders: 'M4 7h9 M17 7h3 M15 5v4 M4 17h4 M12 17h8 M10 15v4',
  cap: 'M2 9.5 12 5l10 4.5-10 4.5L2 9.5z M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5 M22 9.5V15',
  book: 'M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5v-15z M5 19.5A1.5 1.5 0 0 0 6.5 21H19',
  globe:
    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3z',
  pawn: 'M12 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z M9.5 9.5h5 M10.6 9.5c0 3-.9 5.4-2.6 7.5 M13.4 9.5c0 3 .9 5.4 2.6 7.5 M7 17h10l1 3.5H6L7 17z',
  code: 'M8.5 8 4.5 12l4 4 M15.5 8l4 4-4 4 M13.5 5.5l-3 13',
  award: 'M12 3a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z M8.6 13 7.5 21l4.5-2.6 4.5 2.6-1.1-8',
  arrowUp: 'M12 19V5 M5.5 11.5 12 5l6.5 6.5',
} as const;

export type IconName = keyof typeof ICONS;
