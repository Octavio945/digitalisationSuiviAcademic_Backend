'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    static associate(models) {
      Parent.belongsTo(models.Utilisateur, {
        foreignKey: 'id_utilisateur',
        as: 'utilisateur'
      });
      
      Parent.hasMany(models.LienFamilial, {
        foreignKey: 'utilisateur_id',
        as: 'liensFamiliaux'
      });
    }
  }

  Parent.init({
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
    }
  }, {
    sequelize,
    modelName: 'Parent',
    tableName: 'Parents'
  });

  return Parent;
};