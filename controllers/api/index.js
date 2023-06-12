const router = require('express').Router();
const orderRoutes = require('./orderRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);

module.exports = router;