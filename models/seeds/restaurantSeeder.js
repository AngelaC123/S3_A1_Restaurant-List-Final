const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')
const db = require('../../config/mongoose.js')


db.once('open', () => {
  Restaurant.create(restaurantList.results)
    .then(() => {
      console.log('restaurantSeeder done')
      db.close
    })
    .catch(err => console.log(err))
    .finally(() => process.exit())

})