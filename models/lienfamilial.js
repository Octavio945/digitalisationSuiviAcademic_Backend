'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LienFamilial extends Model {
    static associate(models) {
      LienFamilial.belongsTo(models.Parent, {
        foreignKey: 'utilisateur_id',
        as: 'parent'
      });
      
      LienFamilial.belongsTo(models.Apprenant, {
        foreignKey: 'apprenant_id',
        as: 'apprenant'
      });
    }
  }

  LienFamilial.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Parents',
        key: 'id_utilisateur'
      }
    },
    apprenant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Apprenants',
        key: 'id_utilisateur'
      }
    }
  }, {
    sequelize,
    modelName: 'LienFamilial',
    tableName: 'LienFamilials'
  });

  return LienFamilial;
};