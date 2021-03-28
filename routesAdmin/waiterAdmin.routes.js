const {Router} = require('express')
const Waiter = require('../models/User')
const auth = require('../middleware/auth.middleware')

const router = Router()

   // Получение всего меню
router.get('/', async (req, res) => {
    try {
        const waiters = await Waiter.find({ isAdmin: 'Waiter' })
        res.json(waiters)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})


module.exports = router