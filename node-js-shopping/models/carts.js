'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Carts.init({
    userId: DataTypes.INTEGER,
    goodsId: DataTypes.STRING,
    quantity: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};