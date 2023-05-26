const express = require('express');
const router = express.Router();

// Handle GET request for home page
router.get('/', (req, res) => {
  res.render('home', { isAuthenticated: req.oidc.isAuthenticated() });
});

// Handle GET request for login
router.get('/login', (req, res) => {
  res.oidc.login();
});

// Handle GET request for logout
router.get('/logout', (req, res) => {
  res.oidc.logout();
});

module.exports = router;
