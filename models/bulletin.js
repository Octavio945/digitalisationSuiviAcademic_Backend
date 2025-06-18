'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bulletin extends Model {
    static associate(models) {
      Bulletin.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateur_id',
        as: 'utilisateur'
      });
    }
  }

  Bulletin.init({
    id_bulletin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    moyenne: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 20
      }
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    commentaire: {
      type: DataTypes.TEXT,
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
    modelName: 'Bulletin',
    tableName: 'Bulletins'
  });

  return Bulletin;
};