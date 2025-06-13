'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LienFamilial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LienFamilial.init({
    temporaire: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LienFamilial',
  });
  return LienFamilial;
};