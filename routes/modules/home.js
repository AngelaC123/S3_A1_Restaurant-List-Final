const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant.js')

// home page - all restaurants list
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => {
      console.log('error')
      res.render('errorPage', { status: 500, error: error.message })
    })
})

// Search bar
router.get('/search', (req, res) => {

  let sort = req.query.sort
  let currentMode = ''
  switch (sort) {
    case "A > Z":
      currentMode = 'asc'
      break;
    case "Z > A":
      currentMode = 'desc'
      break;
  }


  if (!req.query.keywords) {
    Restaurant.find()
      .lean()
      .sort({ name: currentMode })
      .then(restaurant => res.render('index', { restaurant }))

  } else {

    const keywords = req.query.keywords
    const keyword = req.query.keywords.trim().toLowerCase()
    Restaurant.find() // current restaurant list
      .lean()
      .then(restaurant => {
        const restaurantSearchResults = restaurant.filter((data) => { return data.name.toLowerCase().includes(keyword) || data.category.toLowerCase().includes(keyword) })
        return restaurantSearchResults
      })
      //將restaurantSearchResults做資料處理...這裡不會寫...
      .then((restaurantSearchResults) => res.render('index', { restaurant: restaurantSearchResults, keyword: keywords }))
      .catch(error => {
        console.log('error')
        res.render('errorPage', { status: 500, error: error.message })
      })
  }
})

module.exports = router