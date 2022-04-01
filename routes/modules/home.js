const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant.js')
const CurrentMode = require('../../currentMode.js')


router.get('/', (req, res) => {
  const userId = req.user._id
  let sort = req.query.sort

  if (!req.query.keywords) {
    Restaurant.find({ userId })
      .lean()
      .sort(CurrentMode(sort))
      .then(restaurant => res.render('index', { restaurant }))

  } else {

    const keywords = req.query.keywords
    const keyword = req.query.keywords.trim().toLowerCase()

    return Restaurant.find({
      $and: [
        { userId },
        {
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { category: { $regex: keyword, $options: 'i' } }
          ]
        }
      ]
    })
      .lean()
      .sort(CurrentMode(sort))
      .then(restaurant => res.render('index', { restaurant, keyword: keywords, sort }))


      .catch(error => {
        console.log(error)
      })
  }

})


module.exports = router