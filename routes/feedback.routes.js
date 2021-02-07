const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Feedback = require('../models/Feedback')
const router = Router()


// /api/auth/register
router.post('/create', async (req, res) => {
  try {

    const {name, comment} = req.body

    const feedback = new Feedback({ name, comment })

    await feedback.save()

    res.status(201).json({ message: 'Отзыв оставлен' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
