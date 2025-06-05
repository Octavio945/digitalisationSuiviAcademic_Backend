# 🎓 Plateforme de Digitalisation du Suivi Académique - Backend

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791.svg)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7+-red.svg)](https://redis.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Description

Backend API REST pour la plateforme de digitalisation du suivi académique développée dans le cadre du projet de fin d'études en Informatique, Réseaux et Télécommunications.

**Auteurs :** HOUNYE Octavio Michel & BOURAÏMA Constantin Alao Moutawakil  
**Institution :** École Supérieure d'Informatique, de Gestion et des Sciences  
**Année :** 2024-2025

## 🎯 Objectifs du Projet

Cette plateforme vise à digitaliser intégralement le suivi académique des élèves de la maternelle jusqu'à la fin des études universitaires, en offrant :

- **Gestion complète des utilisateurs** (écoles, classes, apprenants, enseignants)
- **Suivi automatisé des parcours scolaires** (notes, absences, orientations)
- **Génération de statistiques avancées** et tableaux de bord personnalisés
- **Communication facilitée** entre tous les acteurs éducatifs

## 🚀 Technologies Utilisées

### Backend
- **Node.js 18+** - Runtime JavaScript
- **Express.js** - Framework web minimaliste
- **PostgreSQL 14+** - Base de données relationnelle
- **Sequelize** - ORM pour JavaScript
- **Redis** - Cache et gestion des sessions
- **JWT** - Authentification sécurisée

### Sécurité
- **bcrypt** - Hachage des mots de passe
- **Helmet** - Protection des headers HTTP
- **CORS** - Gestion des origines croisées
- **Rate Limiting** - Protection contre les attaques DDoS

### Outils de Développement
- **Jest** - Tests unitaires et d'intégration
- **ESLint** - Analyse statique du code
- **Prettier** - Formatage automatique
- **Swagger** - Documentation API

## 📁 Structure du Projet

```
backend/
├── src/
│   ├── config/           # Configuration (DB, Redis, Swagger)
│   ├── controllers/      # Logique métier des endpoints
│   ├── middleware/       # Middlewares personnalisés
│   ├── models/          # Modèles Sequelize (DB)
│   ├── routes/          # Définition des routes API
│   ├── services/        # Services métier réutilisables
│   ├── utils/           # Utilitaires et helpers
│   ├── migrations/      # Migrations de base de données
│   ├── seeders/         # Données de test/initialisation
│   ├── uploads/         # Fichiers uploadés
│   └── server.js        # Point d'entrée de l'application
├── tests/               # Tests automatisés
├── logs/                # Logs de l'application
├── .env.example         # Variables d'environnement exemple
└── package.json         # Dépendances et scripts
```

## ⚙️ Installation et Configuration

### Prérequis
- Node.js 18 ou supérieur
- PostgreSQL 14 ou supérieur
- Redis 7 ou supérieur
- Git

### 1. Cloner le Projet
```bash
git clone <url-du-repo>
cd suivi-academique/backend
```

### 2. Installation des Dépendances
```bash
npm install
```

### 3. Configuration de l'Environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer les variables d'environnement
nano .env
```

### 4. Variables d'Environnement Requises
```env
# Application
NODE_ENV=development
PORT=5000

# JWT
JWT_SECRET=votre_secret_jwt_super_long_et_complexe
JWT_EXPIRE=7d

# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_NAME=suivi_academique_dev
DB_USER=postgres
DB_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Email (optionnel)
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 5. Configuration de la Base de Données
```bash
# Créer la base de données
createdb suivi_academique_dev

# Exécuter les migrations
npm run db:migrate

# Peupler avec des données de test (optionnel)
npm run db:seed
```

## 🏃‍♂️ Démarrage de l'Application

### Mode Développement
```bash
npm run dev
# L'API sera accessible sur http://localhost:5000
```

### Mode Production
```bash
npm start
```

### Avec Docker (optionnel)
```bash
# Démarrer PostgreSQL et Redis
docker-compose up -d

# Puis démarrer l'application
npm run dev
```

## 📊 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm start` | Démarrage en mode production |
| `npm run dev` | Démarrage en mode développement avec nodemon |
| `npm test` | Exécution des tests |
| `npm run test:watch` | Tests en mode surveillance |
| `npm run lint` | Vérification du code avec ESLint |
| `npm run lint:fix` | Correction automatique ESLint |
| `npm run format` | Formatage du code avec Prettier |
| `npm run db:migrate` | Exécution des migrations |
| `npm run db:seed` | Peuplement de la DB |
| `npm run db:reset` | Reset complet de la DB |

## 🌐 Endpoints API Principaux

### Authentification
- `POST /api/auth/login` - Connexion utilisateur
- `POST /api/auth/register` - Inscription
- `POST /api/auth/refresh` - Renouvellement du token
- `POST /api/auth/logout` - Déconnexion

### Gestion des Écoles
- `GET /api/schools` - Liste des écoles
- `POST /api/schools` - Créer une école
- `PUT /api/schools/:id` - Modifier une école
- `DELETE /api/schools/:id` - Supprimer une école

### Gestion des Élèves
- `GET /api/students` - Liste des élèves
- `POST /api/students` - Inscrire un élève
- `GET /api/students/:id` - Détails d'un élève
- `PUT /api/students/:id` - Modifier un élève

### Gestion des Notes
- `GET /api/grades/:studentId` - Notes d'un élève
- `POST /api/grades` - Saisir des notes
- `PUT /api/grades/:id` - Modifier une note

### Statistiques
- `GET /api/stats/dashboard` - Tableau de bord général
- `GET /api/stats/student/:id` - Statistiques élève
- `GET /api/stats/class/:id` - Statistiques classe

📖 **Documentation complète :** `http://localhost:5000/api-docs` (Swagger UI)

## 🏗️ Architecture et Modules

### Module Gestion des Utilisateurs
- Création et administration des profils (écoles, classes, apprenants)
- Gestion des droits d'accès par rôles (RBAC)
- Authentification sécurisée multi-facteurs
- Communication inter-acteurs

### Module Gestion des Parcours Scolaires
- Système d'évaluation multi-formats
- Suivi d'assiduité automatisé
- Gestion des orientations et transitions
- Génération automatique des bulletins

### Module Statistiques
- Indicateurs de performance individuels
- Statistiques d'établissement
- Tableaux de bord analytiques personnalisés
- Rapports exportables

## 🧪 Tests

### Exécution des Tests
```bash
# Tous les tests
npm test

# Tests unitaires uniquement
npm run test:unit

# Tests d'intégration
npm run test:integration

# Coverage des tests
npm run test:coverage
```

### Types de Tests
- **Tests unitaires** : Fonctions utilitaires, services
- **Tests d'intégration** : Endpoints API, base de données
- **Tests de charge** : Performance sous charge

## 🔒 Sécurité

### Mesures Implémentées
- **Chiffrement des mots de passe** avec bcrypt + sel unique
- **Tokens JWT** avec expiration et refresh
- **Protection CSRF/XSS** via Helmet
- **Rate Limiting** contre le brute force
- **Validation stricte** des entrées utilisateur
- **Audit trail** de toutes les actions sensibles

### Conformité
- **RGPD** : Protection des données personnelles
- **Principe du moindre privilège**
- **Chiffrement AES-256** des données sensibles

## 📝 Standards de Code

### Conventions
- **ESLint** : Configuration stricte pour la qualité
- **Prettier** : Formatage automatique uniforme
- **Commits conventionnels** : feat, fix, docs, etc.
- **Nomenclature** : camelCase pour variables, PascalCase pour classes

### Architecture
- **Pattern MVC** : Séparation claire des responsabilités
- **Services** : Logique métier réutilisable
- **Middleware** : Fonctionnalités transversales
- **Error Handling** : Gestion centralisée des erreurs

## 🚀 Déploiement

### Environnements
- **Développement** : Configuration locale
- **Test** : Pipeline CI/CD automatisé
- **Production** : Serveur cloud sécurisé

### Docker
```bash
# Build de l'image
docker build -t suivi-academique-backend .

# Démarrage avec compose
docker-compose up -d
```

## 📈 Monitoring et Logs

### Logs
- **Winston** : Gestion centralisée des logs
- **Niveaux** : error, warn, info, debug
- **Rotation** : Archivage automatique
- **Format** : JSON structuré pour analyse

### Monitoring
- **Health Check** : `/health` endpoint
- **Métriques** : Performance et utilisation
- **Alertes** : Notification des incidents

## 🤝 Contribution

### Workflow Git
1. Fork du projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit des changements (`git commit -m 'feat: ajouter nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

### Standards
- Code coverage > 80%
- Tests passants obligatoires
- Review de code par 2 personnes minimum
- Documentation à jour

## 🐛 Résolution de Problèmes

### Problèmes Courants

**Erreur de connexion DB :**
```bash
# Vérifier que PostgreSQL fonctionne
pg_isready -h localhost -p 5432

# Vérifier les credentials dans .env
```

**Erreur Redis :**
```bash
# Tester la connexion Redis
redis-cli ping
# Doit retourner "PONG"
```

**Port déjà utilisé :**
```bash
# Trouver le processus sur le port 5000
lsof -i :5000
# Tuer le processus si nécessaire
```

## 📞 Support

- **Email :** octaviohounye123@gmail.com
- **Issues :** [GitHub Issues](lien-vers-issues)
- **Documentation :** [Wiki du projet](lien-vers-wiki)

## 📋 Roadmap

### Version 1.0 (Actuelle)
- ✅ Gestion des utilisateurs de base
- ✅ Authentification JWT
- ✅ CRUD écoles/classes/élèves
- ✅ Système de notes

### Version 1.1 (Prochaine)
- 🔄 Module de communication avancé
- 🔄 Génération de bulletins PDF
- 🔄 Notifications push
- 🔄 API mobile

### Version 2.0 (Future)
- 📋 Intelligence artificielle pour l'orientation
- 📋 Module de paiement en ligne
- 📋 Intégration systèmes ministériels
- 📋 Plateforme d'échange international

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Développé avec ❤️ par l'équipe Suivi Académique**

*Pour toute question technique, consultez la documentation API ou contactez l'équipe de développement.*