'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Composition extends Model {
    static associate(models) {
      Composition.belongsTo(models.Apprenant, {
        foreignKey: 'utilisateur_id',
        as: 'apprenant'
      });
      
      Composition.belongsTo(models.Periode, {
        foreignKey: 'periode_id',
        as: 'periode'
      });
      
      Composition.belongsTo(models.Matiere, {
        foreignKey: 'matiere_id',
        as: 'matiere'
      });
      
      Composition.hasMany(models.Composer, {
        foreignKey: 'composition_id',
        as: 'composers'
      });
    }
  }

  Composition.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type_composition: {
      type: DataTypes.STRING,
      allowNull: false
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Apprenants',
        key: 'id_utilisateur'
      }
    },
    periode_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Periodes',
        key: 'id_periode'
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
    modelName: 'Composition',
    tableName: 'Compositions'
  });

  return Composition;
};