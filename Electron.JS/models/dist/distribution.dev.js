"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var Distribution = sequelize.define('Distribution', {
  productCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: DataTypes.DOUBLE
}, {
  freezeTableName: true,
  tableName: 'Distribution'
});

Distribution.associate = function (models) {
  // define association here
  Distribution.belongsTo(models.Inventory, {
    foreignKey: 'productCode',
    targetKey: 'productCode',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  Distribution.belongsTo(models.Unit, {
    foreignKey: 'unit',
    targetKey: 'unitName',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
};

module.exports = {
  Distribution: Distribution
};