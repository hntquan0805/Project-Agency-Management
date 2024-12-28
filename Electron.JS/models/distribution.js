const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { Inventory } = require('./inventory');
const { Unit } = require('./unit');

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

Distribution.belongsTo(Inventory, {
  foreignKey: 'productCode',
  targetKey: 'productCode',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

Distribution.belongsTo(Unit, {
  foreignKey: 'unit',
  targetKey: 'unitName',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
