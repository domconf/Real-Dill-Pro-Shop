const { User } = require('../models');

const seedUserData = [
    {
        username: 'hinnenk2',
        email: 'example@email.com',
        password: 'password'
    }
]

const userSeed = () => User.bulkCreate(seedUserData);
module.exports = userSeed;