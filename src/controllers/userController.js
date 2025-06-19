const bcrypt = require('bcryptjs');
const { Utilisateur, Apprenant, Enseignant, Parent } = require('../../models');
const getUserRole = require('../utils/userRole');
const { v4: uuidv4 } = require('uuid'); 

//crées un utilisateur (admin uniquement)
exports.createUser = async (req, res) => {
  try {
    const {
      email,
      telephone,
      statut,
      type,
      nom,
      prenom,
      date_naissance,
      niveau_etude
    } = req.body;

    // Vérifier doublon
    const existing = await Utilisateur.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

    // Générer mot de passe temporaire
    const tempPassword = uuidv4().slice(0, 8); // ex: 'f3a9d6c2'
    const hashed = await bcrypt.hash(tempPassword, 10);

    // Créer utilisateur
    const user = await Utilisateur.create({
      email,
      telephone,
      statut,
      mot_de_passe: hashed,
      doit_changer_mdp: true,
    });

    // Lier selon le type
    if (type === 'apprenant') {
      await Apprenant.create({
        id_utilisateur: user.id_utilisateur,
        nom,
        prenom,
        date_naissance
      });
    } else if (type === 'enseignant') {
      await Enseignant.create({
        id_utilisateur: user.id_utilisateur,
        nom,
        prenom,
        niveau_etude
      });
    } else if (type === 'parent') {
      await Parent.create({
        id_utilisateur: user.id_utilisateur,
        nom,
        prenom
      });
    }

    return res.status(201).json({
      message: `Utilisateur ${type} créé avec succès`,
      email,
      mot_de_passe_temporaire: tempPassword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

//obtenir les infos d'un utilisateur (admin ou lui-même)    
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
      return res.status(403).json({ message: 'Accès interdit' });
    }

    const utilisateur = await Utilisateur.findByPk(id, {
      attributes: ['id_utilisateur', 'email', 'telephone', 'statut', 'doit_changer_mdp']
    });

    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const role = await getUserRole(utilisateur.id_utilisateur);
    return res.json({ utilisateur: { ...utilisateur.toJSON(), role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer son propre profil
exports.getProfile = async (req, res) => {
  try {
    const user = await Utilisateur.findByPk(req.user.id, {
      attributes: ['id_utilisateur', 'email', 'telephone', 'statut', 'doit_changer_mdp']
    });

    const role = await getUserRole(user.id_utilisateur);

    res.json({ user: { ...user.toJSON(), role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier son propre profil
exports.updateProfile = async (req, res) => {
  try {
    const { telephone } = req.body;
    const user = await Utilisateur.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.telephone = telephone || user.telephone;
    await user.save();

    res.json({ message: 'Profil mis à jour', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Voir tous les utilisateurs (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Utilisateur.findAll({
      attributes: ['id_utilisateur', 'email', 'telephone', 'statut']
    });

    const usersWithRoles = await Promise.all(
      users.map(async (user) => {
        const role = await getUserRole(user.id_utilisateur);
        return { ...user.toJSON(), role };
      })
    );

    res.json(usersWithRoles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier un utilisateur (admin)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { telephone, statut } = req.body;

    const user = await Utilisateur.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.telephone = telephone || user.telephone;
    user.statut = statut || user.statut;
    await user.save();

    res.json({ message: 'Utilisateur mis à jour', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un utilisateur (admin)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Utilisateur.destroy({ where: { id_utilisateur: id } });

    if (!deleted) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Activer un utilisateur
exports.activateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Utilisateur.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.statut = 'actif';
    await user.save();

    res.json({ message: 'Utilisateur activé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Désactiver un utilisateur
exports.deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Utilisateur.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.statut = 'inactif';
    await user.save();

    res.json({ message: 'Utilisateur désactivé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

