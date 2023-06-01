const router = require('express').Router();
const bookRoutes = require('./shopRoutes');

router.use('/shop', bookRoutes);

module.exports = router;
