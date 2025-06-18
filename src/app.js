// src/app.js ou votre fichier principal Express
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger');

const app = express();

// 📋 Middlewares de base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📚 Configuration Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "API Suivi Académique - Documentation",
  swaggerOptions: {
    docExpansion: "none",
    filter: true,
    showRequestDuration: true
  }
}));

// 📄 Route pour récupérer la spec JSON (optionnel)
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecs);
});

// 🏠 Route d'accueil avec lien vers la documentation
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API Suivi Académique',
    documentation: '/api-docs',
    version: '1.0.0'
  });
});

// 📍 Vos routes API (à créer dans les prochaines étapes)
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// ... autres routes

// 🚫 Middleware pour les routes non trouvées
app.use(/(.*)/, (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    availableRoutes: {
      documentation: '/api-docs',
      home: '/'
    }
  });
});

// 💥 Middleware de gestion d'erreurs globales
app.use((error, req, res, next) => {
  console.error('Erreur:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

module.exports = app;

/* 
💡 EXPLICATION DE CHAQUE PARTIE :

1. **swaggerUi.serve, swaggerUi.setup()** :
   - Crée une interface web à l'URL /api-docs
   - Vous pourrez voir et tester toutes vos routes

2. **Options de personnalisation** :
   - explorer: true = Barre de recherche
   - docExpansion: "none" = Routes fermées par défaut
   - filter: true = Possibilité de filtrer les routes

3. **Route /api-docs.json** :
   - Retourne la documentation au format JSON
   - Utile pour les outils externes

4. **Route d'accueil /** :
   - Page d'accueil avec infos de base
   - Lien vers la documentation

5. **Middleware 404** :
   - Gère les routes qui n'existent pas
   - Retourne une erreur JSON standardisée

6. **Middleware d'erreurs** :
   - Gère toutes les erreurs de l'application
   - Affiche la stack trace en développement

🚀 COMMENT TESTER :

1. Démarrez votre serveur : npm start
2. Allez sur : http://localhost:3000/api-docs
3. Vous verrez l'interface Swagger !

PROCHAINE ÉTAPE : Créer votre premier controller avec documentation
*/