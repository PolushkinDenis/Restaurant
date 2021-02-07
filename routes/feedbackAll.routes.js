const {Router} = require('express')
const Feedback = require('../models/Feedback')
const auth = require('../middleware/auth.middleware')

const router = Router()

//генерация
router.post('/generate', async (req, res) => {
    try {
        const {name} = req.body
        const feedback = new Feedback({
          name,  comment
        })
    
        await feedback.save()
    
        res.status(201).json({ feedback })
      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
})
   // Получение всего отзывов
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({})
        res.json(feedbacks)
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