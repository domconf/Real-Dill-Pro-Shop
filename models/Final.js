const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Final extends Model { }

Final.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Final: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'final'
    }
);

module.exports = Final;