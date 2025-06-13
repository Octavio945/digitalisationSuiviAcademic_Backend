'use strict';

const {Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static assiciate(models) {
      Classe.hasMany(models.Enseignement, { foreignKey: 'classe_id', as: 'enseignements'});
      Classe.hasMany(models.Inscription, {foreignKey: 'classe_id', as: 'inscriptions'});
    }
  }
  Classe.init({
    nom_classe:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    niveau:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    annee_scolaire: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Classe',
    tableName: 'classes',
  });
  return Classe;
};