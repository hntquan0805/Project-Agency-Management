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
});
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
// Thiết lập quan hệ với Distribution cho từng cặp khóa

DeliveryNoteDetail.belongsTo(Distribution, {
  foreignKey: 'productCode',
  // Trường khóa ngoại 1
  targetKey: 'productCode',
  // Trường khóa chính tương ứng
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
DeliveryNoteDetail.belongsTo(Distribution, {
  foreignKey: 'type',
  // Trường khóa ngoại 2
  targetKey: 'type',
  // Trường khóa chính tương ứng
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
DeliveryNoteDetail.belongsTo(Distribution, {
  foreignKey: 'unit',
  // Trường khóa ngoại 3
  targetKey: 'unit',
  // Trường khóa chính tương ứng
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});