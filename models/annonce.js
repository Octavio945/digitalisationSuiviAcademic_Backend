'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Annonce extends Model {
    static associate(models) {
      Annonce.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateur_id',
        as: 'utilisateur'
      });
    }
  }

  Annonce.init({
    id_annonce: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titre_annonce: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contenu_annonce: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date_annonce: {
      type: DataTypes.DATE,
      allowNull: false
    },
    visibilite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    images_annonce: {
      type: DataTypes.STRING,
      allowNull: true
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
    modelName: 'Annonce',
    tableName: 'Annonces'
  });

  return Annonce;
};