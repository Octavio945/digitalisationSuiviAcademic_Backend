'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Composer extends Model {
    static associate(models) {
      Composer.belongsTo(models.Composition, {
        foreignKey: 'composition_id',
        as: 'composition'
      });
      
      Composer.belongsTo(models.Enseignant, {
        foreignKey: 'enseignant_id',
        as: 'enseignant'
      });
    }
  }

  Composer.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    note: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 20
      }
    },
    composition_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Compositions',
        key: 'id'
      }
    },
    enseignant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Enseignants',
        key: 'id_utilisateur'
      }
    }
  }, {
    sequelize,
    modelName: 'Composer',
    tableName: 'Composers'
  });

  return Composer;
};