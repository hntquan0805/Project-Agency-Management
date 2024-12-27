const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { Agency } = require('./agency');

const DebtHistory = sequelize.define('DebtHistory', {
    agencyCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
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

DebtHistory.belongsTo(Agency, {
  foreignKey: 'agencyCode',
  targetKey: 'agencyCode',
  onUpdate: 'CASCADE',
});
