const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

// Login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',
  (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
      req.flash('warning_msg', 'Email or Password is empty')
    }
    next()
  },
  passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/'
  }))


// Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  User.findOne({ email })
    .then(user => {
      // check if email exist
      if (!email || !password || !confirmPassword) {
        errors.push({ message: 'Email, Password and Confirm Password is required ' })
      }
      if (user) {
        errors.push({ message: 'This email is registed already!' })
        res.render('register', {
          errors, name, email, password, confirmPassword
        })
      } else {
        if (password !== confirmPassword) {
          errors.push({ message: 'Password and Confirm Password do not match!' })
          return res.render('register', {
            errors, name, email, password, confirmPassword
          })
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
  req.flash('success_msg', 'You have logout!')
  res.redirect('/users/login')
})

module.exports = router