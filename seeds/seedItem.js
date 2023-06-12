
const { Item } = require('../models');

const itemsData = [
  {
    name: 'Pickleball Shirt',
    price: 29.95,
    category: 'Apparel',
    imageurl: '/img/shirt.jpg'
  },
  {
    name: 'Pickleball Shorts',
    price: 24.95,
    category: 'Apparel',
    imageurl: '/img/shorts.jpg'
  },
  {
    name: 'Pickleball Socks',
    price: 14.95,
    category: 'Apparel',
    imageurl: '/img/socks.jpg'
  },
  {
    name: 'Pickleball Paddles',
    price: 49.95,
    category: 'Non-apparel',
    imageurl: '/img/paddles.jpg'
  }
];

const seedItems = () => Item.bulkCreate(itemsData);
module.exports = seedItems;
