const {Router} = require('express')
const Table = require('../models/Table')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const tables = await Table.find({})
        res.json(tables) 
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.put('/:id', async (req, res) => {
    try {
      var id = req.body.table._id
      const tables = await Table.findByIdAndUpdate(id, { booked: false })
      await tables.save()
      res.json(tables)
    }
    catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router