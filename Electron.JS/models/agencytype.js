const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AgencyType = sequelize.define('AgencyType', {
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    productCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    maxDebt: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'AgencyType'
});

module.exports = { AgencyType };
