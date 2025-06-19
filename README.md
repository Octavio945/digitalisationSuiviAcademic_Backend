# Digitalisation Suivi Académique – Backend

API Node.js/Express pour la gestion et le suivi académique (utilisateurs, classes, matières, notes, présences, bulletins, etc.).

## 🚀 Fonctionnalités principales

- Authentification JWT (admin, enseignant, apprenant, parent)
- Gestion des utilisateurs et rôles
- Gestion des classes, matières, emplois du temps
- Saisie et consultation des notes
- Suivi des présences
- Génération de bulletins
- Gestion des documents, annonces, réclamations, liens familiaux
- Documentation Swagger intégrée

## 🛠️ Stack technique

- **Node.js** / **Express**
- **PostgreSQL** (via Sequelize)
- **Swagger** pour la documentation API
- **JWT** pour l’authentification

## 📦 Installation

1. **Clone le repo**
   ```bash
   git clone <url-du-repo>
   cd digitalisationSuiviAcademic_Backend
   ```

2. **Installe les dépendances**
   ```bash
   npm install
   ```

3. **Configure l’environnement**
   - Copie `.env.example` en `.env` et adapte les valeurs à ton environnement.

4. **Crée la base de données PostgreSQL** (si besoin)

5. **Lance les migrations**
   ```bash
   npx sequelize-cli db:migrate
   ```

6. **(Optionnel) Seed un admin par défaut**
   ```bash
   npx sequelize-cli db:seed --seed seeders/adminSeeder.js
   ```

7. **Démarre le serveur**
   ```bash
   npm start
   ```

## 📚 Documentation API

- Accède à la documentation interactive Swagger sur [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## 📁 Structure du projet

```
.
├── src/
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── docs/
├── migrations/
├── seeders/
├── config/
│   └── config.js
├── .env.example
├── package.json
└── README.md
```

## 👨‍💻 Auteurs

- HOUNYE Octavio Michel
- MOUTAWAKIL Bouraiman

---

**Licence** : ISC

---

> Pour toute question ou contribution, ouvre une issue ou une pull request !