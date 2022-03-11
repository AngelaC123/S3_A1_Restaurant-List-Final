const express = require('express')
const restaurant = require('../../models/restaurant.js')
const router = express.Router()

const Restaurant = require('../../models/restaurant.js')



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
