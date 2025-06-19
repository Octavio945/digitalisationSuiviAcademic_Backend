'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    static associate(models) {
      // Associations
      Utilisateur.hasOne(models.Admin, {
        foreignKey: 'id_utilisateur',
        as: 'admin'
      });
      
      Utilisateur.hasOne(models.Enseignant, {
        foreignKey: 'id_utilisateur',
        as: 'enseignant'
      });
      
      Utilisateur.hasOne(models.Apprenant, {
        foreignKey: 'id_utilisateur',
        as: 'apprenant'
      });
      
      Utilisateur.hasOne(models.Parent, {
        foreignKey: 'id_utilisateur',
        as: 'parent'
      });
      
      Utilisateur.hasMany(models.Inscription, {
        foreignKey: 'utilisateur_id',
        as: 'inscriptions'
      });
      
      Utilisateur.hasMany(models.Suivre, {
        foreignKey: 'utilisateur_id',
        as: 'suivres'
      });
      
      Utilisateur.hasMany(models.Reclamation, {
        foreignKey: 'utilisateur_id',
        as: 'reclamations'
      });
      
      Utilisateur.hasMany(models.Document, {
        foreignKey: 'utilisateur_id',
        as: 'documents'
      });
      
      Utilisateur.hasMany(models.Annonce, {
        foreignKey: 'utilisateur_id',
        as: 'annonces'
      });
      
      Utilisateur.hasMany(models.Bulletin, {
        foreignKey: 'utilisateur_id',
        as: 'bulletins'
      });
    }
  }

  Utilisateur.init({
    id_utilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false
    },
    doit_changer_mdp: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      alowNull: false
    }
  }, {
    sequelize,
    modelName: 'Utilisateur',
    tableName: 'Utilisateurs'
  });

  return Utilisateur;
};
