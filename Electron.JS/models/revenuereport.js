const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { Agency } = require('./agency');

const RevenueReport = sequelize.define('RevenueReport', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true,
  },
  agencyCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
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