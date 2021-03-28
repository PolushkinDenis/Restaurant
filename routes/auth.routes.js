const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
  '/register',
  [
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
  try {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при регистрации'
      })
    }

  //  const {email, password, isAdmin} = req.body
    const {name, login, tel, password} = req.body

    //const candidate = await User.findOne({ email })
    const candidate = await User.findOne({ login })

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({name, login, tel, password: hashedPassword, isAdmin: 'Customer' })

    await user.save()

    res.status(201).json({ message: 'Пользователь создан' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова !!!!' })
  }
})


router.post(
  '/registerWaiters',
  [
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
  try {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при регистрации'
      })
    }

    const {name, surname,  login, tel, password} = req.body

    const candidate = await User.findOne({ login })

    if (candidate) {
      return res.status(400).json({ message: 'Пользователь с таким логином уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({name, login, tel, password: hashedPassword, isAdmin: 'Waiter', surname })

    await user.save()

    res.status(201).json({ message: 'Официант создан' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова !!!!' })
  }
})


// /api/auth/login
router.post(
  '/login',
  [
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при входе в систему'
      })
    }

    const {login, password} = req.body

    const user = await User.findOne({ login })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }

    /* ПРоверка админа
    const isAdmin = await user.isAdmin;
    if(isAdmin == 'Admin'){
      return res.status(400).json({ message: 'Не админ' })
    }*/

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id, isAdmin: user.isAdmin})

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
