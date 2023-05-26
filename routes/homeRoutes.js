// Handle GET request for home page
router.get('/', (req, res) => {
    res.render('home', { isAuthenticated: req.oidc.isAuthenticated() });
  });
  
  // Handle GET request for login
  router.get('/login', (req, res) => {
    res.oidc.login({ returnTo: '/profile' });
  });
  
  // Handle GET request for logout
  router.get('/logout', (req, res) => {
    req.oidc.logout();
    res.redirect('/');
  });
  
  module.exports = router;