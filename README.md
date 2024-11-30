# Getting Started with Create React App

Ce projet a été initialisé avec [Create React App](https://github.com/facebook/create-react-app).

## Commandes principales

### Réinstaller les modules Node.js

**Naviguez dans le dossier `frontend/src/pages`** et installez les modules :
    ```bash
    cd frontend/src/pages
    npm install
    ```

## Ajouter Tailwind CSS

Pour installer et configurer Tailwind CSS dans votre projet :

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Suivez les instructions de configuration sur la [documentation officielle de Tailwind CSS](https://tailwindcss.com/docs/installation).

### Démarrer le serveur de développement

Après avoir installé les dépendances dans le dossier correspondant, construire le serveur avec :

```bash
cd frontend
npm run build
```

Puis le démarrer à la racine avec :
```bash
export REACT_APP_DROID_HOST=<set your FQDN here>
node server.js
```

### Fichier `index.html`

Le fichier `index.html` contient le snippet pour intégrer le bot.

### Fichier `App.js`

Le fichier `App.js` correspond à l'interface front-end créée pour accueillir le bot.

## En savoir plus

- [Documentation Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [Documentation React](https://reactjs.org/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
