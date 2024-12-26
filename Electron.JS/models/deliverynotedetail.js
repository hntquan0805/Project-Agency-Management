const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DeliveryNoteDetail = sequelize.define('DeliveryNoteDetail', {
    deliveryNoteCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    unitPrice: {
        type: DataTypes.DOUBLE,
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
    },
}, {
    freezeTableName: true,
    tableName: 'DeliveryNoteDetail',
});

// DeliveryNoteDetail.associate = (models) => {
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

module.exports = { DeliveryNoteDetail };

const { DeliveryNote } = require('./deliverynote');
const { Distribution } = require('./distribution');

// Thiết lập mối quan hệ với DeliveryNote
DeliveryNoteDetail.belongsTo(DeliveryNote, {
  foreignKey: 'deliveryNoteCode',
  targetKey: 'deliveryNoteCode',
  onUpdate: 'CASCADE',
});

// Thiết lập khóa ngoại với Distribution
// Thiết lập quan hệ với Distribution cho từng cặp khóa
DeliveryNoteDetail.belongsTo(Distribution, {
    foreignKey: 'productCode', // Trường khóa ngoại 1
    targetKey: 'productCode',  // Trường khóa chính tương ứng
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
  
  DeliveryNoteDetail.belongsTo(Distribution, {
    foreignKey: 'type', // Trường khóa ngoại 2
    targetKey: 'type',  // Trường khóa chính tương ứng
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
  
  DeliveryNoteDetail.belongsTo(Distribution, {
    foreignKey: 'unit', // Trường khóa ngoại 3
    targetKey: 'unit',  // Trường khóa chính tương ứng
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
  
