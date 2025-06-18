'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      Admin.belongsTo(models.Utilisateur, {
        foreignKey: 'id_utilisateur',
        as: 'utilisateur'
      });
    }
  }

  Admin.init({
    id_utilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Utilisateurs',
        key: 'id_utilisateur'
      }
    }
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admins'
  });

  return Admin;
};