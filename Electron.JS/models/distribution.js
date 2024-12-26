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

// Distribution.associate = function(models) {
//   // define association here
//   Distribution.belongsTo(models.Inventory, {
//     foreignKey: 'productCode',
//     targetKey: 'productCode',
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE',
//   });
//   Distribution.belongsTo(models.Unit, {
//     foreignKey: 'unit',
//     targetKey: 'unitName',
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE',
//   });
// };

module.exports = { Distribution };

const { Inventory } = require('./inventory');
const { Unit } = require('./unit');

// Thiết lập mối quan hệ với Inventory
Distribution.belongsTo(Inventory, {
  foreignKey: 'productCode',
  targetKey: 'productCode',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

// Thiết lập mối quan hệ với Unit
Distribution.belongsTo(Unit, {
  foreignKey: 'unit',
  targetKey: 'unitName',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
