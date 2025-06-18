'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Apprenant extends Model {
    static associate(models) {
      Apprenant.belongsTo(models.Utilisateur, {
        foreignKey: 'id_utilisateur',
        as: 'utilisateur'
      });
      
      Apprenant.hasMany(models.LienFamilial, {
        foreignKey: 'apprenant_id',
        as: 'liensFamiliaux'
      });
      
      Apprenant.hasMany(models.Composition, {
        foreignKey: 'utilisateur_id',
        as: 'compositions'
      });
    }
  }

  Apprenant.init({
    id_utilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Utilisateurs',
        key: 'id_utilisateur'
      }
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_naissance: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Apprenant',
    tableName: 'Apprenants'
  });

  return Apprenant;
};