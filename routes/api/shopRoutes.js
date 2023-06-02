const router = require('express').Router();
const Book = require('../../models/Book');

// GET all books
router.get('/', (req, res) => {
  // Get all books from the book table
  Book.findAll().then((bookData) => {
    res.json(bookData);
  });
});

// GET all paperback books
router.get('/paperbacks', (req, res) => {
  Book.findAll({
    // Order by title in ascending order
    order: ['title'],
    where: {
      // Only get books that have this boolean set to TRUE
      is_paperback: true
    },
    attributes: {
      // Don't include these fields in the returned data
      exclude: ['is_paperback', 'edition']
    }
  }).then((bookData) => {
    res.json(bookData);
  });
});

// GET a single book
router.get('/:id', (req, res) => {
  // Find a single book by its primary key (book_id)
  Book.findByPk(req.params.id).then((bookData) => {
    res.json(bookData);
  });
});

// CREATE a book
router.post('/', (req, res) => {
  Book.create(req.body)
    .then((newBook) => {
      res.json(newBook);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE multiple books
router.post('/seed', (req, res) => {
  Book.bulkCreate([
    {
      title: 'First Place Trophy',
      price: '$14.99',
      isbn: '978',
      pages: 336,
      edition: 1,
      is_paperback: false
    },
    {
      title: 'Third Edition Almanac',
      price: '$9.99',
      isbn: '978',
      pages: 500,
      edition: 1,
      is_paperback: true
    },
    {
      title: "Dill Ball",
      price: '$4.99',
      isbn: '978',
      pages: 192,
      edition: 2,
      is_paperback: true
    },
    {
      title: 'Signed Dill Ball Jersey',
      price: '$99.99',
      isbn: '978',
      pages: 352,
      edition: 2,
      is_paperback: false
    },
    {
      title: 'At-Home Dill Ball Court',
      price: '$149.99',
      isbn: '978',
      pages: 672,
      edition: 3,
      is_paperback: false
    },
    {
      title: 'Dill Ball 2023 Stainless-Steel Plaque',
      price: '$59.99',
      isbn: '979',
      pages: 256,
      edition: 1,
      is_paperback: true
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
