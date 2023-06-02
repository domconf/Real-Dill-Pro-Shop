const router = require('express').Router();
const shopRoutes = require('./shopRoutes');

router.use('/shop', shopRoutes);

module.exports = router;
