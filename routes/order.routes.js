const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Order = require('../models/Order')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/', auth,  async (req, res) => {
  try {

    var sum = 0;
    var dishes = ''
    var i =0;
    var j = 1;
    const {carts} = req.body
    
    dishes += carts[0].name 
     while(i<carts.length ){
       sum += carts[i].price
       i++;
     }

     while(j<carts.length ){
        dishes += ', ' + carts[j].name 
        j++;
      }

      const users = await User.findById(req.user.userId)
      const name = users.name

    const order = new Order({
        dishes, sum, date: Date.now(), owner: req.user.userId, state: 'preparing', name
    })

    await order.save()

    res.status(201).json({ order })
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

router.get('/:id', auth, async (req, res) => {
  try {
    const carts = await Cart.findById(req.params.id)
    res.json(carts)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
