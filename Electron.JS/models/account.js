const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Account = sequelize.define('Account', {
    personnelCode: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    profileCode: {
        type: DataTypes.STRING,
    },
    position: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    tableName: 'Account',
});

// Account.associate = (models) => {
//     Account.hasMany(models.DeliveryNote, {
//         foreignKey: 'createBy',
//         sourceKey: 'personnelCode',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//     });
//     Account.belongsTo(models.EmployeeProfile, {
//         foreignKey: 'profileCode',
//         targetKey: 'profileCode',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//     });
//     Account.hasMany(models.PaymentReceipt, {
//         foreignKey: 'createBy',
//         sourceKey: 'personnelCode',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//     });
// };

module.exports = { Account };

const { DeliveryNote } = require('./deliverynote');
const { EmployeeProfile } = require('./employeeprofile');
const { PaymentReceipt } = require('./paymentreceipt');

// Thiết lập mối quan hệ với DeliveryNote
Account.hasMany(DeliveryNote, {
    foreignKey: 'createBy',
    sourceKey: 'personnelCode',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
  
  // Thiết lập mối quan hệ với EmployeeProfile
  Account.belongsTo(EmployeeProfile, {
    foreignKey: 'profileCode',
    targetKey: 'profileCode',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
  
  // Thiết lập mối quan hệ với PaymentReceipt
  Account.hasMany(PaymentReceipt, {
    foreignKey: 'createBy',
    sourceKey: 'personnelCode',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });