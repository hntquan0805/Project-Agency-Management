const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const Distribution = sequelize.define('Distribution', {
  productCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  price: DataTypes.DOUBLE,
}, {
  freezeTableName: true,
  tableName: 'Distribution'
});

module.exports = { Distribution };

const { Inventory } = require('./inventory');

Distribution.belongsTo(Inventory, {
  foreignKey: 'productCode',
  targetKey: 'productCode',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

Distribution.belongsTo(Inventory, {
  foreignKey: 'unit',
  targetKey: 'unit',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
