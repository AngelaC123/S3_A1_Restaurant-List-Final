const express = require('express')
const router = express.Router()

const User = require('../../models/user')

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
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email })
    .then(user => {
      // check if email exist
      if (user) {
        console.log('Error! The email is registed already') // add flash msg here
        res.render('register', {
          name, email, password, confirmPassword
        })
      } else {
        // check if password === confirmPassword
        if (password !== confirmPassword) {
          console.log('Error! password and confirm password do not match') // add flash msg here
          return res.render('register', { name, email, password, confirmPassword })
        }
        return User.create({ name, email, password })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})


// Logout
router.post('/logout', (req, res) => {

})


module.exports = router