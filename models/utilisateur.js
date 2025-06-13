'use strict ';
const {Model, DataTypes} = require('sequelize');

module.export = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    static associate(models) {
      Utilisateur.hasMany(models.Enseignement, {foreignKey: 'enseignant_id', as : 'enseignements'});
      Utilisateur.hasMany(models.Inscription, {foreignKey: 'utilisateur_id', as: 'inscriptions'});
      Utilisateur.hasMany(models.Reclamation, {foreignkey: 'utilisateur_id', as: 'reclamations'});
      Utilisateur.hasMany(models.Document, {foreignKey: 'utilisateur_id', as: 'documents'});
      Utilisateur.hasMany(models.Presence, {foreignKey: 'ensiegnant_id', as: 'presences'});
      Utilisateur.hasMany(models.Annonce, {foreignKey: 'auteur_id', as: 'annonces'});
      Utilisateur.hasMany(models.LienFamilial, {foreignKey: 'utilisateur_id', as: 'lienFamiliaux'});
      Utilisateur.hasMany(models.LienFamilial, {foreignKey: 'parent_id', as: 'enfants'});
    }
  }

  Utilisateur.init({
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_naissance:{
      type: DataTypes.DATEONLY, 
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type:{
      type: DataTypes.ENUM('admin', 'enseignant','apprenant', 'parent'),
      allowNull: false
    },
    statut: {
      type: DataTypes.ENUM('actif', 'inactif'),
      allowNull: false,
      defaultValue: 'actif'
    },
  }, {
    sequelize,
    modelName: 'Utilisateur',
    tableName: 'utilisateurs',
  });
  return Utilisateur;
}