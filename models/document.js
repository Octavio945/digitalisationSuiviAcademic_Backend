'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    static associate(models) {
      Document.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateur_id',
        as: 'utilisateur'
      });
    }
  }

  Document.init({
    id_document: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fichier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type_document: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_document: {
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
    modelName: 'Document',
    tableName: 'Documents'
  });

  return Document;
};