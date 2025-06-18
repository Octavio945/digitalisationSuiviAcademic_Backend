'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Periode extends Model {
    static associate(models) {
      Periode.hasMany(models.Composition, {
        foreignKey: 'periode_id',
        as: 'compositions'
      });
    }
  }

  Periode.init({
    id_periode: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_periode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Periode',
    tableName: 'Periodes'
  });

  return Periode;
};