# Portfolio — Mohamed Ben Rhaiem

Site personnel de Mohamed Ben Rhaiem, développeur Full Stack Java / Spring Boot / Angular.
Application Angular 22 sans zone.js (zoneless), avec composants standalone, signals et syntaxe de contrôle `@for` / `@if`, déployée sur GitHub Pages.

## Lancer le site en local

Prérequis : Node.js 22.22.3+, 24.15+ ou 26 (versions exigées par Angular 22).

```bash
npm install
npm start          # http://localhost:4200
npm run build      # build de production dans dist/portfolio/browser
```

Après le premier `npm install`, versionner le fichier `package-lock.json` : le workflow utilisera alors `npm ci`.

## Mettre le contenu à jour

Tout le texte du site (profil, expériences, compétences, formation…) est dans un seul fichier :
`src/app/data/profile.ts`. Le CV téléchargeable est `public/CV_Mohamed_Ben_Rhaiem.pdf`.

## Déployer sur GitHub Pages

Le workflow `.github/workflows/deploy.yml` compile et publie le site à chaque push sur `main`.

1. Créer un dépôt public sur GitHub :
   - `m-benrhaiem.github.io` pour une adresse du type `https://m-benrhaiem.github.io/` ;
   - ou n'importe quel autre nom (par exemple `portfolio`) pour `https://m-benrhaiem.github.io/portfolio/`.
     Le workflow adapte automatiquement le chemin de base (`base-href`), y compris avec un domaine personnalisé.
2. Dans le dépôt : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
3. Pousser le code sur la branche `main` :

```bash
git remote add origin https://github.com/m-benrhaiem/<nom-du-depot>.git
git push -u origin main
```

4. Suivre le déploiement dans l'onglet **Actions** ; l'adresse du site s'affiche à la fin du job `deploy`.
   Si le premier lancement a échoué parce que Pages n'était pas encore activé, relancer le workflow
   depuis **Actions → Déploiement sur GitHub Pages → Run workflow**.

## Structure

```
src/
  index.html            métadonnées SEO, favicon
  styles.css            styles globaux (clair / sombre, responsive)
  main.ts               démarrage de l'application
  app/
    app.config.ts       configuration (détection de changements zoneless)
    app.ts              composant racine (navigation, menu mobile)
    app.html            template de la page
    data/profile.ts     contenu du portfolio
public/
  CV_Mohamed_Ben_Rhaiem.pdf
  favicon.svg
```

Police : Open Sans, auto-hébergée via le paquet npm `@fontsource/open-sans` (licence SIL Open Font License 1.1),
sous-ensemble latin uniquement, intégrée et hachée par le build Angular.
