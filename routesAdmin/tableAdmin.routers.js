const {Router} = require('express')
const Table = require('../models/Table')
const auth = require('../middleware/auth.middleware')

const router = Router()

   // Получение всех столов
router.get('/', async (req, res) => {
    try {
        const tables = await Table.find({})
        res.json(tables) 
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/create', async (req, res) => {
    try {
  
      const {name, seat} = req.body
      const booked = false
      const data = null
      const photo = '/table_images/1.jpg'

      
    const candidateTable = await Table.findOne({ name })

    if (candidateTable) {
      return res.status(400).json({ message: 'Стол под таким номером уже существует' })
    }

      const table = new Table({ name, seat, booked, data, photo})
  
      await table.save()
  
      res.status(201).json({ message: 'Стол добавлен' })
  
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