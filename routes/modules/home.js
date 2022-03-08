const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant.js')

// home page - all restaurants list
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// Search bar
router.get('/search', (req, res) => {

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
        return restaurantSearchResults
      })
      .then(() => res.render('index', { restaurant: restaurantSearchResults, keyword: keywords }))
      .catch(error => console.log('error'))
  }
})

module.exports = router