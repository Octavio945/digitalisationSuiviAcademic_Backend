'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enseignement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Enseignement.belongsTo(models.Utilisateur, { foreignKey: 'enseignant_id', as: 'enseignant' });
      Enseignement.belongsTo(models.Classe, { foreignKey: 'classe_id', as: 'classe' });
      Enseignement.belongsTo(models.Matiere, { foreignKey: 'matiere_id', as: 'matiere' });
      Enseignement.hasMany(models.EmploiDuTemps, { foreignKey: 'enseignement_id', as: 'emploisDuTemps' });
      Enseignement.hasMany(models.Note, { foreignKey: 'enseignement_id', as: 'notes' });
    }
  }
  Enseignement.init({
    enseigaant_id: DataTypes.INTEGER,
    classe_id: DataTypes.INTEGER,
    matiere_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Enseignement',
    tableName: 'enseignements',
  });
  return Enseignement;
};