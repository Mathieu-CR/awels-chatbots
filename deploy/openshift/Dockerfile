# Utiliser une image Node.js comme base
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier et installer les dépendances pour le backend
COPY /backend/package*.json ./backend/
COPY /backend/server.js ./backend/
COPY /backend/auth/auth.json ./backend/auth/

# Copier et installer les dépendances pour le frontend
COPY /frontend/public ./frontend/public/
COPY /frontend/src ./frontend/src/
COPY /frontend/package*.json ./frontend/
COPY /frontend/*.config.js ./frontend/

# Construire le frontend
RUN cd frontend && \
    npm install -D tailwindcss postcss autoprefixer && \
    npx tailwindcss init
RUN cd frontend && \
    npm run build

# Construire le backend
RUN cd backend && \
    ln -s ../frontend/ frontend && \
    npm install --production

# Exposer les ports utilisés par le backend et le frontend
EXPOSE 3001

# Lancer simultanément le backend et un serveur pour le frontend
CMD ["sh", "-c", "node backend/server.js"]
