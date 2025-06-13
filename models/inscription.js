'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inscription.belongsTo(models.Utilisateur, { foreignKey: 'utilisateur_id', as: 'utilisateur' });
      Inscription.belongsTo(models.Classe, { foreignKey: 'classe_id', as: 'classe' });
      Inscription.hasMany(models.Bulletin, {foreignKey: 'inscription_id', as: 'bulletins'});
    }
  }
  Inscription.init({
    utilisateur_id: DataTypes.INTEGER,
    classe_id: DataTypes.INTEGER,
    annee_scolaire: DataTypes.STRING,
    statut: DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'Inscription',
    tableName: 'inscriptions',
  });
  return Inscription;
};