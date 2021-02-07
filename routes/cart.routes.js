const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Cart = require('../models/Cart')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {

    const {name} = req.body
    const cart = new Cart({
      name,  owner: req.user.userId
    })

    await cart.save()

    res.status(201).json({ cart })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const carts = await Cart.find({ owner: req.user.userId })
    res.json(carts)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const carts = await Cart.findById(req.params.id)
    res.json(carts)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
