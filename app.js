const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverRide = require('method-override')

const routes = require('./routes')
const Restaurant = require('./models/restaurant')


const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list-crud', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverRide('_method'))
app.use(routes)





app.listen(port, () => {
  console.log(`Express server is now listening on http://localhost:${port}`)
})