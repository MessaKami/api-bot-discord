# API Bot Discord

API NestJS avec Docker pour le bot Discord.

## 🚀 Installation

### Prérequis
- Docker et Docker Compose
- Node.js 20.x (pour le développement local)
- Un compte Docker Hub

### Configuration
1. Copiez le fichier d'exemple des variables d'environnement :
```bash
cp .env.example .env
```

2. Modifiez les variables dans `.env` selon vos besoins

### Développement
```bash
# Démarrer les conteneurs
docker compose -f docker-compose.dev.yml up -d

# Voir les logs
docker compose -f docker-compose.dev.yml logs -f
```

### Production
Le déploiement en production est automatisé via GitHub Actions.

## 📦 Déploiement

### Prérequis VPS
- Docker et Docker Compose installés
- Utilisateur avec accès sudo
- Clés SSH configurées

### Configuration GitHub
Ajoutez ces secrets dans votre dépôt GitHub :
- `DOCKER_USERNAME`: Nom d'utilisateur Docker Hub
- `DOCKER_TOKEN`: Token d'accès Docker Hub
- `VPS_HOST`: Adresse IP du VPS
- `VPS_USERNAME`: Utilisateur SSH
- `VPS_SSH_KEY`: Clé SSH privée
- Variables PostgreSQL et Redis (voir .env.example)

### Déploiement manuel
```bash
# Sur le VPS
cd /var/www/api-bot-discord
docker compose -f docker-compose.dev.yml up -d
```

## 🔧 Architecture

- NestJS avec Fastify
- PostgreSQL pour la base de données
- Redis pour le cache
- Nginx comme reverse proxy
- Docker pour la conteneurisation
- GitHub Actions pour le CI/CD