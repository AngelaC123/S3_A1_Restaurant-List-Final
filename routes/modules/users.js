const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

// Login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))


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
        if (password !== confirmPassword) {
          console.log('Error! password and confirm password do not match') // add flash msg here
          return res.render('register', { name, email, password, confirmPassword })
        }
        return User.create({ name, email, password })
          .then(() => res.redirect('/users/login'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

// Logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router