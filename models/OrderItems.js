const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OrderItem extends Model { }

OrderItem.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1    // The quantity ordered must have a minimum of 1 to enter the Cart.
        }
    },
    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'order',   //associates the order with all ordered items
            key: 'id',
        }
    },
    itemId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'item',
            key: 'id',
        }
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'order_items'
});

module.exports = OrderItem;
