const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('main'); // Assuming 'main' is the name of your main.hbs file
});

router.get('/login', (req, res) => {

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  // Handle signup logic here
  const { username, password } = req.body;
  // Create a new user in the database, hash the password, etc.

  // Assuming signup is successful, redirect the user to the login page
  res.redirect('/login');
});

router.get('/', (req, res) => {
  res.render('main', { user: req.session.logged_in });
});
module.exports = router;

