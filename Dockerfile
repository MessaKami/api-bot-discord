# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY src/package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Installation des dépendances de build
RUN npm i -g @nestjs/cli && \
    npm i -D @types/node

COPY src/package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY src/. .
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app

# Installation des dépendances système nécessaires
RUN apk add --no-cache tini

# Création d'un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copie des fichiers nécessaires
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/views ./views
COPY --from=builder --chown=nestjs:nodejs /app/public ./public
COPY --from=builder --chown=nestjs:nodejs /app/dist/migrations ./dist/migrations

# Configuration des variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Exposition du port
EXPOSE $PORT

# Passage à l'utilisateur non-root
USER nestjs

# Utilisation de Tini comme init
ENTRYPOINT ["/sbin/tini", "--"]

# Commande de démarrage
CMD ["node", "dist/main"] 