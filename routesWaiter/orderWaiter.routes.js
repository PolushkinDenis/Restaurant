const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Order = require('../models/Order')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/', auth, async (req, res) => {
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

router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    var id = req.body.preparingOrder._id
    var states = req.body.preparingOrder.state
    var newState = ''

    if (states == 'preparing') {
      newState = 'waiting'
    }
    if (states == 'nopaid') {
      newState = 'paid'
    }

    const orders = await Order.findByIdAndUpdate(id, { state: newState })
    await orders.save()
    res.json(orders)
  }
  catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}
)

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

router.get('/:id', auth, async (req, res) => {
  try {
    const carts = await Cart.findById(req.params.id)
    res.json(carts)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
