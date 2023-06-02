const router = require('express').Router();
const Shop = require('../../models/Shop');

// GET all items
router.get('/', (req, res) => {
  // Get all items from the shop table
  Shop.findAll().then((shopData) => {
    res.json(shopData);
  });
});

// GET all apparel items
router.get('/apparel', (req, res) => {
  Shop.findAll({
    // Order by name in ascending order
    order: ['id'],
    where: {
      // Only get items that have this boolean set to TRUE
      is_apparel: true
    },
    attributes: {
      // Don't include these fields in the returned data
      exclude: []
    }
  }).then((shopData) => {
    res.json(shopData);
  });
});

router.get('/edition1', (req, res) => {
  Shop.findAll({
    // Order by name in ascending order
    order: ['id'],
    where: {
      // Only get items that have this boolean set to TRUE
      edition: 1
    },
    attributes: {
      // Don't include these fields in the returned data
      exclude: []
    }
  }).then((shopData) => {
    res.json(shopData);
  });
});

// GET a single item
router.get('/:id', (req, res) => {
  // Find a single book by its primary key (book_id)
  Shop.findByPk(req.params.id).then((shopData) => {
    res.json(shopData);
  });
});

// CREATE a shop item
router.post('/', (req, res) => {
  Shop.create(req.body)
    .then((newBook) => {
      res.json(newBook);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE multiple shop items
router.post('/seed', (req, res) => {
  Shop.bulkCreate([
    {
      name: 'First Place Trophy',
      price: '$14.99',
      serialno: '1426',
      edition: 1,
      is_apparel: false
    },
    {
      name: '1990-2023 Dill Ball Almanac',
      price: '$9.99',
      serialno: '5696',
      edition: 1,
      is_apparel: false
    },
    {
      name: "PickleBall",
      price: '$4.99',
      serialno: '1584',
      edition: 2,
      is_apparel: false
    },
    {
      name: 'Signed PickleBall Jersey',
      price: '$99.99',
      serialno: '7360',
      edition: 2,
      is_apparel: true
    },
    {
      name: 'At-Home PickleBall Court',
      price: '$149.99',
      serialno: '8592',
      edition: 3,
      is_apparel: false
    },
    {
      name: 'PickleBall 2023 Stainless-Steel Plaque',
      price: '$59.99',
      serialno: '1939',
      edition: 1,
      is_apparel: false
    },
    {
      name: 'PickleBall Summer Shorts',
      price: '$29.99',
      serialno: '3352',
      edition: 1,
      is_apparel: true
    },
    {
      name: 'PickleBall Summer Shirt',
      price: '$29.99',
      serialno: '7545',
      edition: 1,
      is_apparel: true
    },
    {
      name: 'PickleBall Indoor/Outdoor Socks',
      price: '$89.99',
      serialno: '4423',
      edition: 1,
      is_apparel: true
    }

  ])
    .then(() => {
      res.send('Database seeded!');
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
