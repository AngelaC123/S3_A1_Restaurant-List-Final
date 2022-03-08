const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverRide = require('method-override')

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

// Home page
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// Search bar
app.get('/search', (req, res) => {

  if (!req.query.keywords) {
    res.redirect('/')
  } else {
    const keywords = req.query.keywords
    const keyword = req.query.keywords.trim().toLowerCase()
    let restaurantSearchResults = []
    Restaurant.find() // current restaurant list
      .lean()
      .then(restaurant => {
        restaurantSearchResults = restaurant.filter((data) => { return data.name.toLowerCase().includes(keyword) || data.category.toLowerCase().includes(keyword) })
      })
      .then(() => res.render('index', { restaurant: restaurantSearchResults, keyword: keywords }))
      .catch(error => console.log('error'))
  }
})

// Add new restaurant page
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const data = req.body
  return Restaurant.create(data)
    .then(res.redirect('/'))
    .catch(error => console.log('error'))
})

// Detail page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})


// Edit restaurant page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const { name, category, image, location, phone, google_map, description, rating } = req.body
  return Restaurant.findById(id)

    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.description = description
      restaurant.rating = rating
      return restaurant.save()

    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))

})

// Delete restaurant function
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})


app.listen(port, () => {
  console.log(`Express server is now listening on http://localhost:${port}`)
})