const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Utilisateur } = require('../../models');
const getUserRole = require('../utils/userRole');
const { generateToken } = require('../utils/jwt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    const user = await Utilisateur.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    if (user.statut !== 'actif') return res.status(403).json({ message: 'Compte inactif' });

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const role = await getUserRole(user.id_utilisateur);
    const token = generateToken({ id: user.id_utilisateur, email: user.email, role });

    return res.status(200).json({
      token,
      user: {
        id: user.id_utilisateur,
        email: user.email,
        telephone: user.telephone,
        statut: user.statut,
        role,
        doit_changer_mdp: user.doit_changer_mdp
      },
      message: user.doit_changer_mdp
        ? 'Veuillez changer votre mot de passe'
        : 'Connexion réussie'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { ancien_mdp, nouveau_mdp } = req.body;
    const user = await Utilisateur.findByPk(req.user.id);

    const match = await bcrypt.compare(ancien_mdp, user.mot_de_passe);
    if (!match) return res.status(401).json({ message: 'Mot de passe actuel incorrect' });

    const hashed = await bcrypt.hash(nouveau_mdp, 10);
    user.mot_de_passe = hashed;
    user.doit_changer_mdp = false;
    await user.save();

    res.status(200).json({ message: 'Mot de passe changé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Token requis' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Token invalide ou expiré' });

      const user = await Utilisateur.findByPk(decoded.id);
      if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

      const role = await getUserRole(user.id_utilisateur);
      const newToken = generateToken({ id: user.id_utilisateur, email: user.email, role });
      res.status(200).json({ token: newToken });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Utilisateur.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Email introuvable' });

    const token = crypto.randomBytes(32).toString('hex');
    user.reset_token = token;
    user.reset_token_expires = new Date(Date.now() + 3600000); // 1h
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: 'Réinitialisation de mot de passe',
      html: `<p>Voici votre lien de réinitialisation : <a href="${resetLink}">${resetLink}</a></p>`
    });

    res.status(200).json({ message: 'Lien de réinitialisation envoyé par email' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, nouveau_mdp } = req.body;
    const user = await Utilisateur.findOne({
      where: {
        reset_token: token,
        reset_token_expires: { [require('sequelize').Op.gt]: new Date() }
      }
    });

    if (!user) return res.status(400).json({ message: 'Lien invalide ou expiré' });

    const hashed = await bcrypt.hash(nouveau_mdp, 10);
    user.mot_de_passe = hashed;
    user.reset_token = null;
    user.reset_token_expires = null;
    await user.save();

    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Utilisateur.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.email_verifie = true;
    await user.save();

    res.status(200).json({ message: 'Email vérifié avec succès' });
  } catch (error) {
    res.status(400).json({ message: 'Lien de vérification invalide' });
  }
};
