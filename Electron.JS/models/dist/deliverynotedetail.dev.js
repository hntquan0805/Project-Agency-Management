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
    Distribution = _require4.Distribution;

var _require5 = require('./inventory'),
    Inventory = _require5.Inventory;

var _require6 = require('./unit'),
    Unit = _require6.Unit;

DeliveryNoteDetail.belongsTo(DeliveryNote, {
  foreignKey: 'deliveryNoteCode',
  targetKey: 'deliveryNoteCode',
  onUpdate: 'CASCADE'
});
DeliveryNoteDetail.belongsTo(Inventory, {
  foreignKey: 'productCode',
  targetKey: 'productCode',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL' // Or another suitable delete behavior like CASCADE, depending on your use case

});
DeliveryNoteDetail.belongsTo(Unit, {
  foreignKey: 'unit',
  targetKey: 'unitName',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL' // Or another suitable delete behavior

}); // DeliveryNoteDetail.belongsTo(Distribution, {
//   foreignKey: 'productCode',
//   targetKey: 'productCode',
//   onUpdate: 'CASCADE',
//   onDelete: 'CASCADE',
// });
// DeliveryNoteDetail.belongsTo(Distribution, {
//   foreignKey: 'type',
//   targetKey: 'type',
//   onUpdate: 'CASCADE',
//   onDelete: 'CASCADE',
// });
// DeliveryNoteDetail.belongsTo(Distribution, {
//   foreignKey: 'unit',
//   targetKey: 'unit',
//   onUpdate: 'CASCADE',
//   onDelete: 'CASCADE',
// });