'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Matiere extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Matiere.hasMany(models.Enseignement, { foreignKey: 'matiere_id', as: 'enseignements' });
    }
  }
  Matiere.init({
    nom_matiere: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coefficient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Matiere',
    tableName: 'matieres',
  });
  return Matiere;
};