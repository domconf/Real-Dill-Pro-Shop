const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt')

class User extends Model {
    checkPassword(clientPassword) {
        return bcrypt.compareSync(clientPassword, this.password)
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,       //id matches User with their respective items for purchase
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    username: {                         //required for user signup/login
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {                             //required for user signup/login
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {                         //required for user signup/login
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

},

    {

        hooks: {
            async beforeCreate(newData) {                                   //bcrypt hashes personal info
                newData.password = await bcrypt.hash(newData.password, 10) //saltRounds (random string for encryption) has a default of 10
                return newData
            },
            async beforeBulkCreate(usersData) {
                usersData.forEach((user) => {
                    user.password = bcrypt.hashSync(user.password, 10)
                })
            },
            async beforeUpdate(newData) {
                newData.password = await bcrypt.hash(newData.password, 10)
                return newData
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;