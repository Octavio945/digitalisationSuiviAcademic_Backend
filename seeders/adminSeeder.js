// seeders/adminSeeder.js
const bcrypt = require('bcryptjs');
const { Utilisateur, Admin } = require('../models'); 
const createDefaultAdmin = async () => {
  try {
    // Vérifier si un admin existe déjà
    const existingAdmin = await Utilisateur.findOne({
      where: { email: 'admin@suiviacademic.com' },
    });

    if (existingAdmin) {
      console.log('👤 Un compte admin existe déjà');
      return;
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Créer l'utilisateur admin
    const adminUser = await Utilisateur.create({
      email: 'admin@suiviacademic.com',
      mot_de_passe: hashedPassword,
      telephone: '+229 55 99 42 36',
      statut: 'actif'
    });

    // Créer l'entrée Admin liée
    await Admin.create({
      id_utilisateur: adminUser.id_utilisateur
    });

    console.log('✅ Compte admin créé avec succès!');
    console.log('📧 Email: admin@suiviacademic.com');
    console.log('🔐 Mot de passe: admin123');
    console.log('⚠️  Pensez à changer le mot de passe après la première connexion!');

  } catch (error) {
    console.error('❌ Erreur lors de la création du compte admin:', error);
    throw error;
  }
};

module.exports = { createDefaultAdmin };

// Si ce fichier est exécuté directement
if (require.main === module) {
  createDefaultAdmin()
    .then(() => {
      console.log('🎉 Seeding terminé');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Erreur durant le seeding:', error);
      process.exit(1);
    });
}