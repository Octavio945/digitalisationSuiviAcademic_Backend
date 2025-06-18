'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Matiere extends Model {
    static associate(models) {
      Matiere.hasMany(models.Coefficient, {
        foreignKey: 'matiere_id',
        as: 'coefficients'
      });
      
      Matiere.hasMany(models.Seance, {
        foreignKey: 'matiere_id',
        as: 'seances'
      });
      
      Matiere.hasMany(models.Composition, {
        foreignKey: 'matiere_id',
        as: 'compositions'
      });
    }
  }

  Matiere.init({
    id_matiere: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_matiere: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Matiere',
    tableName: 'Matieres'
  });

  return Matiere;
};