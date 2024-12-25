const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Regulation = sequelize.define('Regulation', {
    name: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    agencyTypeCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    maxAgenciesPerDistrict: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    districtCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'Regulation'
});

module.exports = { Regulation };
