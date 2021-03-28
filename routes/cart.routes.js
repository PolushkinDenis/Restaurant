const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Cart = require('../models/Cart')
const Order = require('../models/Order')

const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {

    const { name } = req.body
    const cart = new Cart({
      name, owner: req.user.userId
    })

    await cart.save()

    res.status(201).json({ cart })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

//получить товары козины
router.get('/', auth, async (req, res) => {
  try {
    const carts = await Cart.find({ owner: req.user.userId })
    res.json(carts)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
//заказы пользователя
router.get('/order', auth, async (req, res) => {
  try {
    const orders = await Order.find({ owner: req.user.userId })
    res.json(orders)
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

router.put('/order/:id', async (req, res) => {
  try {
    var id = req.body
    var id = req.body.preparingOrder._id
    const orders = await Order.findByIdAndUpdate(id, { state: 'nopaid' })
    await orders.save()
    res.json(orders)
  }
  catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.delete('/:id', async (req, res) => {
  try {

    var id = req.body
    var iid = id.removeCart

    const carts = await Cart.findByIdAndRemove(iid)
    await carts.save()

    res.json(carts)

  } catch (e) {
    res.status(500).json({ message: e })
  }
})

router.delete('/clean/:id', auth, async (req, res) => {
  try {
    const carts = await Cart.deleteMany({ owner: req.user.userId })
    await carts.save()

    res.json(carts)

  } catch (e) {
    res.status(500).json({ message: e })
  }
})

module.exports = router
