"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var DeliveryNoteDetail = sequelize.define('DeliveryNoteDetail', {
  deliveryNoteCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER
  },
  unitPrice: {
    type: DataTypes.DOUBLE
  },
  totalPrice: {
    type: DataTypes.DOUBLE
  }
}, {
  freezeTableName: true,
  tableName: 'DeliveryNoteDetail'
}); // DeliveryNoteDetail.associate = (models) => {
//     DeliveryNoteDetail.belongsTo(models.DeliveryNote, {
//         foreignKey: 'deliveryNoteCode',
//         targetKey: 'deliveryNoteCode',
//         onUpdate: 'CASCADE',
//     });
//     sequelize.addConstraint('DeliveryNoteDetail', {
//         fields: ['productCode', 'type', 'unit'], // Các trường tham gia khóa ngoại
//         type: 'foreign key',
//         name: 'fk_deliverynote_distribution', // Tên khóa ngoại
//         references: {
//             table: 'Distribution',
//             fields: ['productCode', 'type', 'unit'], // Trường liên kết
//         },
//         onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//     });
// };

module.exports = {
  DeliveryNoteDetail: DeliveryNoteDetail
};

var _require3 = require('./deliverynote'),
    DeliveryNote = _require3.DeliveryNote;

var _require4 = require('./distribution'),
    Distribution = _require4.Distribution; // Thiết lập mối quan hệ với DeliveryNote


DeliveryNoteDetail.belongsTo(DeliveryNote, {
  foreignKey: 'deliveryNoteCode',
  targetKey: 'deliveryNoteCode',
  onUpdate: 'CASCADE'
}); // Thiết lập khóa ngoại với Distribution

DeliveryNoteDetail.belongsTo(Distribution, {
  foreignKey: ['productCode', 'type', 'unit'],
  targetKey: ['productCode', 'type', 'unit'],
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});