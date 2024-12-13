'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Inventory.init({
    productCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    productName: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    quantityInStock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventory',
    freezeTableName: true,
  });
  return Inventory;
};
