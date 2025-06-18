'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Suivre extends Model {
    static associate(models) {
      Suivre.belongsTo(models.Seance, {
        foreignKey: 'seance_id',
        as: 'seance'
      });
      
      Suivre.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateur_id',
        as: 'utilisateur'
      });
    }
  }

  Suivre.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date_suivre: {
      type: DataTypes.DATE,
      allowNull: false
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Seances',
        key: 'id_seance'
      }
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
    modelName: 'Suivre',
    tableName: 'Suivres'
  });

  return Suivre;
};