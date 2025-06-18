// docs/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

// 📋 Configuration de base de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Suivi Académique',
      version: '1.0.0',
      description: 'API pour la digitalisation du suivi académique',
      contact: {
        name: 'Votre Nom',
        email: 'votre.email@exemple.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Serveur de développement'
      },
      {
        url: 'https://votre-domaine.com',
        description: 'Serveur de production'
      }
    ],
    
    // 🔐 Configuration pour l'authentification JWT
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Entrez votre token JWT obtenu lors de la connexion'
        }
      },
      
      // 📊 Schémas des données (structure de vos modèles)
      schemas: {
        // Réponse d'erreur standard
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Message d\'erreur'
            },
            error: {
              type: 'string',
              example: 'Détails de l\'erreur'
            }
          }
        },
        
        // Réponse de succès standard
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Opération réussie'
            },
            data: {
              type: 'object',
              description: 'Données retournées'
            }
          }
        },
        
        // Modèle Utilisateur
        Utilisateur: {
          type: 'object',
          properties: {
            id_utilisateur: {
              type: 'integer',
              description: 'ID unique de l\'utilisateur',
              example: 1
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Adresse email',
              example: 'user@exemple.com'
            },
            telephone: {
              type: 'string',
              description: 'Numéro de téléphone',
              example: '+229 XX XX XX XX'
            },
            statut: {
              type: 'string',
              enum: ['actif', 'inactif', 'suspendu'],
              description: 'Statut du compte',
              example: 'actif'
            }
          },
          required: ['email', 'mot_de_passe']
        },
        
        // Modèle pour l'inscription
        RegisterRequest: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'nouveau@exemple.com'
            },
            mot_de_passe: {
              type: 'string',
              minLength: 6,
              example: 'motdepasse123'
            },
            telephone: {
              type: 'string',
              example: '+229 XX XX XX XX'
            },
            role: {
              type: 'string',
              enum: ['admin', 'enseignant', 'apprenant', 'parent'],
              example: 'apprenant'
            }
          },
          required: ['email', 'mot_de_passe', 'role']
        },
        
        // Modèle pour la connexion
        LoginRequest: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'user@exemple.com'
            },
            mot_de_passe: {
              type: 'string',
              example: 'motdepasse123'
            }
          },
          required: ['email', 'mot_de_passe']
        },
        
        // Réponse de connexion
        LoginResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Connexion réussie'
            },
            data: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                user: {
                  $ref: '#/components/schemas/Utilisateur'
                }
              }
            }
          }
        }
      }
    },
    
    // 🔒 Sécurité globale (optionnel - peut être défini par route)
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  
  // 📂 Chemins vers vos fichiers de routes pour la documentation automatique
  apis: [
    './src/routes/*.js',
    './src/controllers/*.js'
  ]
};

// Générer la documentation
const specs = swaggerJsdoc(options);

module.exports = specs;

/* 
💡 EXPLICATION :

1. **openapi: '3.0.0'** : Version de la spécification OpenAPI

2. **info** : Informations générales sur votre API

3. **servers** : URLs où votre API est accessible

4. **components.securitySchemes** : Comment l'authentification fonctionne
   - bearerAuth = Token JWT dans le header Authorization

5. **components.schemas** : Structure de vos données
   - Comme des "modèles" qui décrivent vos objets
   - Réutilisables dans toute la documentation

6. **apis** : Chemins vers vos fichiers où Swagger cherchera
   la documentation (commentaires spéciaux)

🚀 PROCHAINE ÉTAPE :
Intégrer cette configuration dans votre app Express
*/