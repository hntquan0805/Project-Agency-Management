const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Unit = sequelize.define('Unit', {
    unitName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    conversionRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    baseUnit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    tableName: 'Unit',
});

module.exports = { Unit };
