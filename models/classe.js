'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Classe extends Model {
    static associate(models) {
      Classe.hasMany(models.Coefficient, {
        foreignKey: 'classe_id',
        as: 'coefficients'
      });
      
      Classe.hasMany(models.Seance, {
        foreignKey: 'classe_id',
        as: 'seances'
      });
      
      Classe.hasMany(models.Inscription, {
        foreignKey: 'classe_id',
        as: 'inscriptions'
      });
    }
  }

  Classe.init({
    id_classe: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_classe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    niveau: {
      type: DataTypes.STRING,
      allowNull: false
    },
    annee_scolaire: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Classe',
    tableName: 'Classes'
  });

  return Classe;
};