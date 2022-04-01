const bcrypt = require('bcryptjs/dist/bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/user')

module.exports = app => {

  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
  },
    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, req.flash('warning_msg', 'This email is not registered!'))
          }
          return bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) {
                return done(null, false, req.flash('warning_msg', 'Email or Password is incorrect!'))
              }
              return done(null, user)
            })
        })
        .catch(err => done(err, false))
    }))

  passport.use(new FacebookStrategy({

    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']

  },

    (accessToken, refreshToken, profile, done) => {

      const { email, name } = profile._json
      User.findOne({ email })
        .then(user => {

          // user has login with this fb account
          if (user) return done(null, user)

          // user has not login with this fb account
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => {
              return User.create({
                name,
                email,
                password: hash
              })
            })
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}