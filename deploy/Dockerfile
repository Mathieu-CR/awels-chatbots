# Utiliser une image Node.js comme base
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier et installer les dépendances pour le backend
COPY ./backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copier le reste des fichiers backend
COPY ./backend/ ./backend/

# Copier et installer les dépendances pour le frontend
COPY ./frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copier les fichiers frontend restants
COPY ./frontend/ ./frontend/

# Construire le frontend
RUN cd frontend && \
    npm install -D tailwindcss postcss autoprefixer && \
    npx tailwindcss init && \
    npm run build

# Lier le frontend au backend (symbolique)
RUN cd backend && ln -s ../frontend/ public

# Assurer que les permissions sont correctes pour les fichiers générés
RUN mkdir -p /app/backend/data && chown -R 1000:1000 /app

# Exposer les ports utilisés par le backend et le frontend
EXPOSE 3001

# Lancer simultanément le backend
CMD ["sh", "-c", "node backend/server.js"]
