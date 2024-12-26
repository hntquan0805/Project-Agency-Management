"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var DeliveryNote = sequelize.define('DeliveryNote', {
  deliveryNoteCode: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  agencyCode: {
    type: DataTypes.STRING
  },
  deliveryDate: {
    type: DataTypes.DATE
  },
  createdBy: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true,
  tableName: 'DeliveryNote'
}); // DeliveryNote.associate = (models) => {
//     DeliveryNote.belongsTo(models.Agency, {
//         foreignKey: 'agencyCode',
//         targetKey: 'agencyCode',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//     });
//     DeliveryNote.belongsTo(models.Account, {
//         foreignKey: 'createdBy',
//         targetKey: 'personnelCode',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//     });
//     DeliveryNote.hasMany(models.DeliveryNoteDetail, {
//         foreignKey: 'deliveryNoteCode',
//         sourceKey: 'deliveryNoteCode',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//     });
// };

module.exports = {
  DeliveryNote: DeliveryNote
};

var _require3 = require('./agency'),
    Agency = _require3.Agency;

var _require4 = require('./account'),
    Account = _require4.Account;

var _require5 = require('./deliverynotedetail'),
    DeliveryNoteDetail = _require5.DeliveryNoteDetail; // Thiết lập mối quan hệ với Agency


DeliveryNote.belongsTo(Agency, {
  foreignKey: 'agencyCode',
  targetKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
}); // Thiết lập mối quan hệ với Account

DeliveryNote.belongsTo(Account, {
  foreignKey: 'createdBy',
  targetKey: 'personnelCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
}); // Thiết lập mối quan hệ với DeliveryNoteDetail

DeliveryNote.hasMany(DeliveryNoteDetail, {
  foreignKey: 'deliveryNoteCode',
  sourceKey: 'deliveryNoteCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});