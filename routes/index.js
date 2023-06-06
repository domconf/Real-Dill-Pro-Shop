const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  });
});



module.exports = router;
