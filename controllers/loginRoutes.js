const router = require('express').Router();
const { Item } = require('../models');
const express = require('express');
const app = express();

// Step 1: Define your route
app.get('/store', (req, res) => {
  // Step 3: Render the template
  res.render('store.hbs');
});

// ... other routes and middleware ...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

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