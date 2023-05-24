const express = require('express');
const router = express.Router();

// Define a GET route
router.get('/', (req, res) => {
  res.render('home'); // Assuming you have a 'home' template in your views folder
});

module.exports = router;
