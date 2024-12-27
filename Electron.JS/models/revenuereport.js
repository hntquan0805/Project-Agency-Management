const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { Agency } = require('./agency');

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

module.exports = { RevenueReport };

RevenueReport.belongsTo(Agency, {
  foreignKey: 'agencyCode',
  targetKey: 'agencyCode',
  onUpdate: 'CASCADE',
});