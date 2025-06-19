const { Admin, Enseignant, Apprenant, Parent } = require('../../models');

const getUserRole = async (userId) => {
  if (await Admin.findOne({ where: { id_utilisateur: userId } })) return 'admin';
  if (await Enseignant.findOne({ where: { id_utilisateur: userId } })) return 'enseignant';
  if (await Apprenant.findOne({ where: { id_utilisateur: userId } })) return 'apprenant';
  if (await Parent.findOne({ where: { id_utilisateur: userId } })) return 'parent';
  return 'inconnu';
};

module.exports = getUserRole;
