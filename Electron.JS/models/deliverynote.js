const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { Agency } = require('./agency');
const { Account } = require('./account');
const { DeliveryNoteDetail } = require('./deliverynotedetail');

const DeliveryNote = sequelize.define('DeliveryNote', {
    deliveryNoteCode: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    agencyCode: {
        type: DataTypes.STRING,
    },
    deliveryDate: {
        type: DataTypes.DATE,
    },
    createdBy: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    tableName: 'DeliveryNote',
});

module.exports = { DeliveryNote };

DeliveryNote.belongsTo(Agency, {
  foreignKey: 'agencyCode',
  targetKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

DeliveryNote.belongsTo(Account, {
  foreignKey: 'createdBy',
  targetKey: 'personnelCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

DeliveryNote.hasMany(DeliveryNoteDetail, {
  foreignKey: 'deliveryNoteCode',
  sourceKey: 'deliveryNoteCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});
