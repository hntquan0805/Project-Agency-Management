"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var Account = sequelize.define('Account', {
  username: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    // Mật khẩu
    allowNull: false
  },
  position: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true,
  tableName: 'Account'
});
module.exports = {
  Account: Account
};

var _require3 = require('./deliverynote'),
    DeliveryNote = _require3.DeliveryNote;

var _require4 = require('./employeeprofile'),
    EmployeeProfile = _require4.EmployeeProfile;

var _require5 = require('./paymentreceipt'),
    PaymentReceipt = _require5.PaymentReceipt;

Account.hasMany(DeliveryNote, {
  foreignKey: 'createdBy',
  sourceKey: 'username',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});
Account.belongsTo(EmployeeProfile, {
  foreignKey: 'username',
  targetKey: 'profileCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});
Account.hasMany(PaymentReceipt, {
  foreignKey: 'createdBy',
  sourceKey: 'username',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});