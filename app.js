const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')

const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list-crud')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongdodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))


app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))

})

app.listen(port, () => {
  console.log(`Express server is now listening on http://localhost:${port}`)
})