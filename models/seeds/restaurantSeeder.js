const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list-crud')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Restaurant.create(restaurantList.results)
  console.log('done')
})