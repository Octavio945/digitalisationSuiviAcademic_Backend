'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reclamation extends Model {
    static associate(models) {
      Reclamation.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateur_id',
        as: 'utilisateur'
      });
    }
  }

  Reclamation.init({
    id_reclamation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sujet: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date_reclamation: {
      type: DataTypes.DATE,
      allowNull: false
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Utilisateurs',
        key: 'id_utilisateur'
      }
    }
  }, {
    sequelize,
    modelName: 'Reclamation',
    tableName: 'Reclamations'
  });

  return Reclamation;
};