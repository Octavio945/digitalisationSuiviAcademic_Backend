'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enseignant extends Model {
    static associate(models) {
      Enseignant.belongsTo(models.Utilisateur, {
        foreignKey: 'id_utilisateur',
        as: 'utilisateur'
      });
      
      Enseignant.hasMany(models.Seance, {
        foreignKey: 'enseignant_id',
        as: 'seances'
      });
      
      Enseignant.hasMany(models.Composer, {
        foreignKey: 'enseignant_id',
        as: 'composers'
      });
    }
  }

  Enseignant.init({
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
    niveau_etude: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Enseignant',
    tableName: 'Enseignants'
  });

  return Enseignant;
};