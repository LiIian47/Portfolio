# macOS Portfolio Simulator

Bienvenue dans mon portfolio interactif, conçu comme une simulation d'environnement de bureau macOS. Ce projet a pour but de présenter mon parcours, mes compétences et mes réalisations de manière ludique et immersive.

## Aperçu

Ce portfolio n'est pas qu'un simple site vitrine, c'est une application web complexe qui imite les fonctionnalités d'un système d'exploitation :
- **Gestion de fenêtres** : Déplacement, redimensionnement, réduction et fermeture (via `react-rnd`).
- **Dock & Menu Bar** : Navigation intuitive et accès rapide aux applications.
- **Système de Z-Index** : La fenêtre active passe toujours au premier plan.
- **Persistance** : L'état de vos fenêtres (position, taille, ouverture) est sauvegardé dans le `localStorage`.
- **Raccourcis clavier** : Support des commandes intuitives pour une navigation fluide.

## Technologies Utilisées

- **React 19** : Bibliothèque principale pour l'interface.
- **TypeScript** : Pour un développement robuste et typé.
- **Vite** : Outil de build ultra-rapide.
- **React-rnd** : Pour la gestion interactive des fenêtres (Resize & Drag).
- **EmailJS** : Pour l'envoi de mails directement depuis l'application "Mail".
- **Vanilla CSS** : Stylisation précise sans frameworks lourds pour un rendu fidèle à macOS.

## Structure des Applications (Pages)

L'écosystème du portfolio se compose de plusieurs "applications" :
- **Finder** : Ma présentation personnelle et mon parcours.
- **Note** : Liste détaillée de mes projets avec descriptions et captures d'écran.
- **Resume** : Consultation et téléchargement de mon CV.
- **Mail** : Formulaire de contact fonctionnel.
- **Shortcuts** : Guide des raccourcis clavier disponibles.
- **Liens externes** : Accès direct à GitHub et LinkedIn via le Dock.

## ⌨Raccourcis Clavier

- `Alt + Q` : Fermer la fenêtre active
- `Alt + M` : Fermer toutes les fenêtres
- `Alt + F` : Maximiser la fenêtre active
- `Alt + B` : Afficher/Masquer la barre latérale
- `Alt + I` : Ouvrir le Finder (À propos)


## Installation Locale

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/LiIian47/Portfolio.git
   cd Portfolio
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

## Structure du Projet

```text
src/
├── assets/          # Icônes, images et ressources statiques
├── components/      # Composants UI réutilisables (Dock, Window, MenuBar...)
├── context/         # Gestion de l'état global (Thème, Fenêtres)
├── hooks/           # Logique personnalisée (Raccourcis clavier)
├── pages/           # Contenu spécifique de chaque "application"
└── utils/           # Fonctions utilitaires (Formattage, Fetching)
```

---
*Réalisé avec par Lilian Davezac*
