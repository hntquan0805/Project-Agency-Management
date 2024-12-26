"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var EmployeeProfile = sequelize.define('EmployeeProfile', {
  profileCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
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
  freezeTableName: true
});
module.exports = {
  EmployeeProfile: EmployeeProfile
};