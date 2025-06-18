'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Inscription extends Model {
    static associate(models) {
      Inscription.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateur_id',
        as: 'utilisateur'
      });
      
      Inscription.belongsTo(models.Classe, {
        foreignKey: 'classe_id',
        as: 'classe'
      });
    }
  }

  Inscription.init({
    id_inscription: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date_inscription: {
      type: DataTypes.DATE,
      allowNull: false
    },
    annee_scolaire: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Utilisateurs',
        key: 'id_utilisateur'
      }
    },
    classe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Classes',
        key: 'id_classe'
      }
    }
  }, {
    sequelize,
    modelName: 'Inscription',
    tableName: 'Inscriptions'
  });

  return Inscription;
};