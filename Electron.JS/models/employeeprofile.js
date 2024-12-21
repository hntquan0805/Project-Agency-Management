const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const EmployeeProfile = sequelize.define('EmployeeProfile', {
  profileCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  fullName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  gender: DataTypes.STRING,
  cccd: DataTypes.STRING,
  dob: DataTypes.DATE,
  address: DataTypes.STRING,
  phone: DataTypes.STRING,
  status: DataTypes.STRING
}, {
  freezeTableName: true,
});

EmployeeProfile.associate = function(models) {
  // define association here
};

module.exports = { EmployeeProfile };