'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Coefficient extends Model {
    static associate(models) {
      Coefficient.belongsTo(models.Classe, {
        foreignKey: 'classe_id',
        as: 'classe'
      });
      
      Coefficient.belongsTo(models.Matiere, {
        foreignKey: 'matiere_id',
        as: 'matiere'
      });
    }
  }

  Coefficient.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    coef: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    classe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Classes',
        key: 'id_classe'
      }
    },
    matiere_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Matieres',
        key: 'id_matiere'
      }
    }
  }, {
    sequelize,
    modelName: 'Coefficient',
    tableName: 'Coefficients'
  });

  return Coefficient;
};