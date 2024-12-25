const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Distribution = sequelize.define('Distribution', {
  productCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: DataTypes.DOUBLE,
}, {
  freezeTableName: true,
  tableName: 'Distribution'
});

Distribution.associate = function(models) {
  // define association here
  Distribution.belongsTo(models.Inventory, {
    foreignKey: 'productCode', // Trường trong Distribution tham chiếu đến Inventory
    targetKey: 'productCode', // Trường trong Inventory
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
  Distribution.belongsTo(models.Unit, {
    foreignKey: 'unit',
    targetKey: 'unitName',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
};

module.exports = { Distribution };
