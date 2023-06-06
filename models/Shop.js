const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Shop extends Model {}

Shop.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.STRING
    },
    stock: {
      type: DataTypes.INTEGER
    },
    edition: {
      type: DataTypes.INTEGER
    },
    is_apparel: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'shop'
  }
);

module.exports = Shop;
