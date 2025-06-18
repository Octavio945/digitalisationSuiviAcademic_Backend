'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Seance extends Model {
    static associate(models) {
      Seance.belongsTo(models.Classe, {
        foreignKey: 'classe_id',
        as: 'classe'
      });
      
      Seance.belongsTo(models.Matiere, {
        foreignKey: 'matiere_id',
        as: 'matiere'
      });
      
      Seance.belongsTo(models.Enseignant, {
        foreignKey: 'enseignant_id',
        as: 'enseignant'
      });
      
      Seance.hasMany(models.Suivre, {
        foreignKey: 'seance_id',
        as: 'suivres'
      });
    }
  }

  Seance.init({
    id_seance: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    jour: {
      type: DataTypes.STRING,
      allowNull: false
    },
    heure_debut: {
      type: DataTypes.TIME,
      allowNull: false
    },
    heure_fin: {
      type: DataTypes.TIME,
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
    modelName: 'Seance',
    tableName: 'Seances'
  });

  return Seance;
};