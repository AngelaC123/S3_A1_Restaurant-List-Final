const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant.js')

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

// Add new restaurant page
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const data = req.body
  return Restaurant.create(data)
    .then(res.redirect('/'))
    .catch(error => {
      console.log('error')
      res.render('errorPage', { status: 500, error: error.message })
    })
})

// Detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => {
      console.log('error')
      res.render('errorPage', { status: 500, error: error.message })
    })
})


// Edit restaurant page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => {
      console.log('error')
      res.render('errorPage', { status: 500, error: error.message })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)

    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => {
      console.log('error')
      res.render('errorPage', { status: 500, error: error.message })
    })
})

// Delete restaurant function
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log('error')
      res.render('errorPage', { status: 500, error: error.message })
    })

})

module.exports = router
