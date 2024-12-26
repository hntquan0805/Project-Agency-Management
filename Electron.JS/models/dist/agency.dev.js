"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var Agency = sequelize.define('Agency', {
  agencyCode: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.INTEGER
  },
  onboardDate: {
    type: DataTypes.DATE
  },
  district: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true,
  tableName: 'Agency'
});
module.exports = {
  Agency: Agency
};

var _require3 = require('./deliverynote'),
    DeliveryNote = _require3.DeliveryNote;

var _require4 = require('./revenuereport'),
    RevenueReport = _require4.RevenueReport;

var _require5 = require('./debthistory'),
    DebtHistory = _require5.DebtHistory;

var _require6 = require('./paymentreceipt'),
    PaymentReceipt = _require6.PaymentReceipt;

var _require7 = require('./agencytype'),
    AgencyType = _require7.AgencyType; // Thiết lập mối quan hệ với DeliveryNote


Agency.hasMany(DeliveryNote, {
  foreignKey: 'agencyCode',
  sourceKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
}); // Thiết lập mối quan hệ với RevenueReport

Agency.hasMany(RevenueReport, {
  foreignKey: 'agencyCode',
  sourceKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
}); // Thiết lập mối quan hệ với DebtHistory

Agency.hasMany(DebtHistory, {
  foreignKey: 'agencyCode',
  sourceKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
}); // Thiết lập mối quan hệ với PaymentReceipt

Agency.hasMany(PaymentReceipt, {
  foreignKey: 'agencyCode',
  sourceKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
}); // Thiết lập mối quan hệ với AgencyType

Agency.belongsTo(AgencyType, {
  foreignKey: 'type',
  targetKey: 'type',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});