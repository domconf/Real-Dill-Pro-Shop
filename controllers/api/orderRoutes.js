const router = require('express').Router();
const { Order, Item, OrderItem } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, (req, res) => {      //POST method adds ordered items for rendering onto order page.
    const idUser = req.session.idUser
    const { items, totalPrice } = req.body

    Order.create({ idUser, totalPrice: Number(totalPrice) }).then((savedOrder) => { //sets the display for the order page.
        return savedOrder
    }).then((savedOrder) => {
        const itemsData = items.map((item) => {     // mpa creates a new array of the ordered item's properties for checkout
            item.orderId = savedOrder.id
            item.itemId = Number(item.id)
            item.idUser = idUser
            delete item.id
            return item
        });

        return OrderItem.bulkCreate(itemsData)
    }).then((savedItems) => {
        res.status(201).json({ message: 'Your order has been placed!' })  //displays once Confirm Order is selected
    })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/', (req, res) => {                 //GET request acquires user login info and correlates it with their ordered items
    const idUser = req.session.idUser
    Order.findAll({
        where: { idUser },
        include: [{
            model: OrderItem,
            include: {
                model: Item,
                attributes: ['name', 'price', 'category', 'imageurl']
            }
        }]
    }).then((userOrders) => {
        res.json(userOrders)
    })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ message: "Internal Error" })
        })
})

module.exports = router;