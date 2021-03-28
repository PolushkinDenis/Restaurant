const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Order = require('../models/Order')

const auth = require('../middleware/auth.middleware')
const Table = require('../models/Table')
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
    const tables = await Table.findByIdAndUpdate(id, { booked: true })
    await tables.save()
    res.json(tables)
  }
  catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
