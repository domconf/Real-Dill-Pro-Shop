const router = require('express').Router();
const { Item } = require('../models');

router.get('/', (req, res) => {
    res.render('login', { isLogedIn: req.session.isLogedIn })
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/store', (req, res) => {
    const allCategories = ['Apparel', 'Non-apparel']
    const category = req.query.category || allCategories
    Item.findAll({
        where: {
            category
        },
        attributes: [
            'id', 'name', 'category', 'price', 'imageurl'
        ]
    }).then((itemsData) => {
        const items = itemsData.map((item) => {
            return item.get({ plain: true })
        })
        res.render('store', { items, isLogedIn: req.session.isLogedIn })
    })
        .catch(() => {
            res.render('store', { items: [], message: 'Error' })
        })
})

module.exports = router;