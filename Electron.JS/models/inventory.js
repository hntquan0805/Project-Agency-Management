const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Inventory = sequelize.define('Inventory', {
  productCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  productName: DataTypes.STRING,
  quantityInStock: DataTypes.INTEGER,
}, {
  freezeTableName: true,
});

Inventory.associate = function(models) {
  // define association here
  Inventory.hasMany(models.Distribution, {
    foreignKey: 'productCode',
    sourceKey: 'productCode',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

module.exports = { Inventory };
