const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

// для меню
app.use('/api/menu', require('./routes/menu.routers'))
//добавление в корзину
app.use('/api/cart', require('./routes/cart.routes'))
app.use('/api/cart/:id', require('./routes/cart.routes'))
app.use('/api/cart/clean/:id', require('./routes/cart.routes'))
app.use('/api/cart/order', require('./routes/cart.routes'))
app.use('/api/cart/order/:id', require('./routes/cart.routes'))
  

// для заказа
app.use('/api/order', require('./routes/order.routes'))
//Столы
app.use('/api/table', require('./routes/table.routes'))
app.use('/api/table/:id', require('./routes/table.routes'))

//отзыв
app.use('/api/create', require('./routes/feedback.routes'))
// все отзывы
app.use('/api/feedback', require('./routes/feedbackAll.routes'))

// админ
// список меню
app.use('/api/admin/menu', require('./routesAdmin/menuAdmin.routers'))
app.use('/api/admin/menu/:id', require('./routesAdmin/menuAdmin.routers'))
// добавить в меню
app.use('/api/admin/menu/add', require('./routesAdmin/menuAddAdmin.routes'))
// столы
app.use('/api/admin/table', require('./routesAdmin/tableAdmin.routers'))
//доюавить стол
app.use('/api/admin/table/create', require('./routesAdmin/tableAdmin.routers'))
// список официантов
app.use('/api/admin/waiter', require('./routesAdmin/waiterAdmin.routes'))


//официант
app.use('/api/waiter/order', require('./routesWaiter/orderWaiter.routes'))
app.use('/api/waiter/order/:id', require('./routesWaiter/orderWaiter.routes'))
app.use('/api/waiter/table', require('./routesWaiter/tableWaiter.routes'))
app.use('/api/waiter/table/:id', require('./routesWaiter/tableWaiter.routes'))


if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Erro', e.message)
    process.exit(1)
  }
}

start()

