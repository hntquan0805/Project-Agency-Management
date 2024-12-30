const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const Agency = sequelize.define('Agency', {
    agencyCode: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.INTEGER,
    },
    onboardDate: {
        type: DataTypes.DATE,
    },
    district: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    tableName: 'Agency',
});

module.exports =  { Agency };

const { DeliveryNote } = require('./deliverynote');
const { RevenueReport } = require('./revenuereport');
const { DebtHistory } = require('./debthistory');
const { PaymentReceipt } = require('./paymentreceipt');
const { AgencyType } = require('./agencytype');

Agency.hasMany(DeliveryNote, {
  foreignKey: 'agencyCode',
  sourceKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

Agency.hasMany(RevenueReport, {
  foreignKey: 'agencyCode',
  sourceKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

Agency.hasMany(DebtHistory, {
  foreignKey: 'agencyCode',
  sourceKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

Agency.hasMany(PaymentReceipt, {
  foreignKey: 'agencyCode',
  sourceKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

Agency.belongsTo(AgencyType, {
  foreignKey: 'type',
  targetKey: 'type',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});
