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



module.exports = router