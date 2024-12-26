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

// Agency.associate = (models) => {
//     Agency.hasMany(models.DeliveryNote, {
//         foreignKey: 'agencyCode',
//         sourceKey: 'agencyCode',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//     });
//     Agency.hasMany(models.RevenueReport, {
//         foreignKey: 'agencyCode',
//         sourceKey: 'agencyCode',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//     });
//     Agency.hasMany(models.DebtHistory, {
//         foreignKey: 'agencyCode',
//         sourceKey: 'agencyCode',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//     });
//     Agency.hasMany(models.PaymentReceipt, {
//         foreignKey: 'agencyCode',
//         sourceKey: 'agencyCode',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//     });
//     Account.belongsTo(models.AgencyType, {
//         foreignKey: 'type',
//         targetKey: 'type',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//     });
// };

module.exports =  { Agency };

const { DeliveryNote } = require('./deliverynote');
const { RevenueReport } = require('./revenueteport');
const { DebtHistory } = require('./debthistory');
const { PaymentReceipt } = require('./paymentreceipt');
const { AgencyType } = require('./agencytype');

// Thiết lập mối quan hệ với DeliveryNote
Agency.hasMany(DeliveryNote, {
  foreignKey: 'agencyCode',
  sourceKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

// Thiết lập mối quan hệ với RevenueReport
Agency.hasMany(RevenueReport, {
  foreignKey: 'agencyCode',
  sourceKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

// Thiết lập mối quan hệ với DebtHistory
Agency.hasMany(DebtHistory, {
  foreignKey: 'agencyCode',
  sourceKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

// Thiết lập mối quan hệ với PaymentReceipt
Agency.hasMany(PaymentReceipt, {
  foreignKey: 'agencyCode',
  sourceKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

// Thiết lập mối quan hệ với AgencyType
Agency.belongsTo(AgencyType, {
  foreignKey: 'type',
  targetKey: 'type',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

