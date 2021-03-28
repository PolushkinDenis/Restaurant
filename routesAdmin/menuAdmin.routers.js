const {Router} = require('express')
const Menu = require('../models/Menu')
const Cart = require('../models/Cart')
const auth = require('../middleware/auth.middleware')

const router = Router()


router.post('/', auth, async (req, res) => {
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
   // Получение всего меню
router.get('/', async (req, res) => {
    try {
        const menus = await Menu.find({})
        res.json(menus) 
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.delete('/:id', async (req, res)=>{
  try {
    var id = req.body
    var iid = id.items

    const menus = await Menu.findByIdAndRemove(iid)
    await menus.save()

    res.json(menus)
    
 } catch (e) {
     res.status(500).json({ message: e })
 }
})

router.get('/:id', async (req, res)=>{

  try{

    const menus = await Menu.findById(req.params.id)
    res.json(menus + "QQQQQ")
  }catch (e){
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