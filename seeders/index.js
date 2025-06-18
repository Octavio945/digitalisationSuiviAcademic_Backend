const { createDefaultAdmin } = require('./adminSeeder');
const db = require('../models'); 

const runSeeders = async () => {
  try {
    console.log('🌱 Démarrage du seeding...');
    
    await db.sequelize.sync();
    
    // Exécuter les seeders
    await createDefaultAdmin();
    
    console.log('✅ Tous les seeders ont été exécutés avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur durant le seeding:', error);
  } finally {
    // Fermer la connexion
    await db.sequelize.close();
  }
};

// Exécuter si appelé directement
if (require.main === module) {
  runSeeders();
}

module.exports = { runSeeders };