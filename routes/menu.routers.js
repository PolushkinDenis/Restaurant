const {Router} = require('express')
const Menu = require('../models/Menu')
const Cart = require('../models/Cart')
const auth = require('../middleware/auth.middleware')

const router = Router()

//генерация
/*router.post('/generate', auth, async (req, res) => {
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
})*/
router.post('/', auth, async (req, res) => {
    try {
  
      const {name} = req.body
      const cart_data = await Menu.findById(name)

      const cart = new Cart({
        name: cart_data.name, price: cart_data.price,  owner: req.user.userId
      })
  
      await cart.save()
  
      res.status(201).json({ cart })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })
   // Получение всего меню
router.get('/', async (req, res) => {
    try {
        const menus = await Menu.find({})
        res.json(menus)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
    // получение меню по типу 
router.get('/:type', async (req, res)=> {
    try {
       const menus = await Menu.findById(req.params.type)
       res.json(menus)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})



module.exports = router