'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmploiDuTemps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EmploiDuTemps.belongsTo(models.Enseignement, { foreignKey: 'enseignement_id', as: 'enseignement' });
    }
  }
  EmploiDuTemps.init({
    enseignement_id: DataTypes.INTEGER,
    jour_semaine: DataTypes.STRING,
    heure_debut: DataTypes.TIME,
    heure_fin: DataTypes.TIME,
  }, {
    sequelize,
    modelName: 'EmploiDuTemps',
    tableName: 'emplois_du_temps',
  });
  return EmploiDuTemps;
};