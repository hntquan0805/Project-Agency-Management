const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DebtHistory = sequelize.define('DebtHistory', {
    agencyCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
    },
    initialDebt: {
        type: DataTypes.DOUBLE,
    },
    endDebt: {
        type: DataTypes.DOUBLE,
    },
    incurredDebt: {
        type: DataTypes.DOUBLE,
    }
}, {
    freezeTableName: true,
    tableName: 'DebtHistory',
});

module.exports = { DebtHistory };

const { Agency } = require('./agency');

DebtHistory.belongsTo(Agency, {
  foreignKey: 'agencyCode',
  targetKey: 'agencyCode',
  onUpdate: 'CASCADE',
});
