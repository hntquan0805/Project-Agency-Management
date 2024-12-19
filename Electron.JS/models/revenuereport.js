const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RevenueReport = sequelize.define('RevenueReport', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  agentCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberOfDeliveryNotes: DataTypes.INTEGER,
  totalValue: DataTypes.DOUBLE,
  rate: DataTypes.DECIMAL
}, {
  freezeTableName: true,
});

RevenueReport.associate = function(models) {
  this.belongsTo(models.Agency, {
    foreignKey: 'agencyCode',
    targetKey: 'agencyCode',
    onUpdate: 'CASCADE',
  });
};

module.exports = { RevenueReport };