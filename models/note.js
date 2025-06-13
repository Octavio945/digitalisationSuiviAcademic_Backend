'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Note.belongsTo(models.Enseignement, { foreignKey: 'enseignement_id', as: 'enseignement' });
      Note.belongsTo(models.Inscription, { foreignKey: 'inscription_id', as: 'inscription' });
    }
  }
  Note.init({
    enseignement: DataTypes.INTEGER,
    inscription: DataTypes.INTEGER,
    note: DataTypes.FLOAT,
    appreciation: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Note',
    tableName: 'notes',
  });
  return Note;
};