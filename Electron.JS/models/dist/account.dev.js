"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var Account = sequelize.define('Account', {
  personnelCode: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  profileCode: {
    type: DataTypes.STRING
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
    PaymentReceipt = _require5.PaymentReceipt; // Thiết lập mối quan hệ với DeliveryNote


Account.hasMany(DeliveryNote, {
  foreignKey: 'createBy',
  sourceKey: 'personnelCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
}); // Thiết lập mối quan hệ với EmployeeProfile

Account.belongsTo(EmployeeProfile, {
  foreignKey: 'profileCode',
  targetKey: 'profileCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
}); // Thiết lập mối quan hệ với PaymentReceipt

Account.hasMany(PaymentReceipt, {
  foreignKey: 'createBy',
  sourceKey: 'personnelCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});