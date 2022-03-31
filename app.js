const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverRide = require('method-override')
const session = require('express-session')

const app = express()
const port = 3000

const routes = require('./routes')
const Restaurant = require('./models/restaurant')
require('./config/mongoose.js')


app.use(express.static('public'))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'RestaurantListSecret',
  resave: false,
  saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverRide('_method'))
app.use(routes)





app.listen(port, () => {
  console.log(`Express server is now listening on http://localhost:${port}`)
})