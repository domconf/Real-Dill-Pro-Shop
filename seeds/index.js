const seedItem = require('./seedItem');
const userSeedData = require('./seedUser');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await userSeedData();
  await seedItem();

  process.exit(0);
};

seedAll();