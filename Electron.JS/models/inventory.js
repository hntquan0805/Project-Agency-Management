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
    foreignKey: 'productCode', // Chỉ định khóa ngoại trong Distribution
    sourceKey: 'productCode', // Chỉ định khóa chính trong Inventory
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

module.exports = { Inventory };
