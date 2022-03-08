const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')
const db = require('../../config/mongoose.js')


db.once('open', () => {
  Restaurant.create(restaurantList.results)
  console.log('done')
})