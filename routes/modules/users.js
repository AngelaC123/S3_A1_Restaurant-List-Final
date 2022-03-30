const express = require('express')
const router = express.Router()

// Login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('login', (req, res) => {
  // get data from login form -> authenticate ->  home
})


// Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // get data from register form 
  // create a user in db
})


// Logout
router.post('/logout', (req, res) => {

})


module.exports = router