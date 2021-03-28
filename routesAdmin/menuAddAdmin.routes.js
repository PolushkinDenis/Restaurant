const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Menu = require('../models/Menu')
const router = Router()


// /api/auth/register
router.post('/create', async (req, res) => {
  try {

    const {name, price, type, weight, structure} = req.body

    const menu = new Menu({ name, price, type, weight, structure })

    await menu.save()

    res.status(201).json({ message: 'Добавлено' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
