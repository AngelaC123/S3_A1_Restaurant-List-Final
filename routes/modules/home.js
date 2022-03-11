const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant.js')
const CurrentMode = require('../../public/javascripts/currentMode.js')

// home page - all restaurants list
router.get('/', (req, res) => {


  let sort = req.query.sort


  if (!req.query.keywords) {
    Restaurant.find()
      .lean()
      .sort(CurrentMode(sort))
      .then(restaurant => res.render('index', { restaurant }))

  } else {

    const keywords = req.query.keywords
    const keyword = req.query.keywords.trim().toLowerCase()

    return Restaurant.find({ $or: [{ name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }] })
      .lean()
      .sort(CurrentMode(sort))
      .then(restaurant => res.render('index', { restaurant, keyword: keywords, sort }))


      .catch(error => {
        console.log('error')
        res.render('errorPage', { status: 500, error: error.message })
      })
  }

})


module.exports = router