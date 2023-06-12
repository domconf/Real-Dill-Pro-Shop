const router = require('express').Router();
const { User } = require('../../models');

router.post('/', (req, res) => {
    const { username, email, password } = req.body

    User.create({ username, email, password }).then((savedUser) => {
        req.session.save(() => {
            req.session.idUser = savedUser.id
            req.session.username = savedUser.username
            req.session.email = savedUser.email
            req.session.isLogedIn = true

            res.status(200).json({ message: "Entry Granted" })
        })
    })
        .catch((error) => {
            console.log(error)
        })
})

router.post('/login', (req, res) => {                           //Sets up regulations for user login
    const { username, password } = req.body
    User.findOne({ where: { username } }).then((dbUser) => {
        if (!dbUser) {
            return res.status(400).json({ message: "Incorrect User" })
        }
        const validPassword = dbUser.checkPassword(password)
        if (!validPassword) {
            return res.status(400).json({ message: "Incorrect Password" })
        }

        req.session.save(() => {
            req.session.idUser = dbUser.id
            req.session.username = dbUser.username
            req.session.email = dbUser.email
            req.session.isLogedIn = true

            res.json({ message: "Login Successful" })
        })
    })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ message: "Invalid login" })
        })
})

router.post('/logout', (req, res) => {          //ends login status upon using the POST request to logout
    if (req.session.isLogedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })

    }
    else { res.status(404).end() }
})

module.exports = router;