const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()

const Restaurant = require('../../models/restaurant')



// Add new restaurant page
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, img, location, phone, google_map, rating, description } = req.body

  return Restaurant.create(
    { userId, name, category, img, location, phone, google_map, rating, description }
  )
    .then((restaurant) => {
      return restaurant
    })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      // res.render('errorPage', { status: 500, error: error.message })
    })
})

// Detail page
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => {
      console.log(error)
      // res.render('errorPage', { status: 500, error: error.message })
    })
})

// Edit restaurant page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => {
      console.log(error)
      // res.render('errorPage', { status: 500, error: error.message })
    })
})



router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      let data = req.body
      data.userId = userId
      restaurant = Object.assign(restaurant, data)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => {
      console.log(error)
      // res.render('errorPage', { status: 500, error: error.message })
    })
})

// Delete restaurant function
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findById({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      // res.render('errorPage', { status: 500, error: error.message })
    })

})

module.exports = router
