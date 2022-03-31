const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverRide = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const port = 3000

const usePassport = require('./config/passport')
const routes = require('./routes')
const Restaurant = require('./models/restaurant')
require('./config/mongoose.js')


app.use(express.static('public'))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'RestaurantListSecret',
  resave: false,
  saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverRide('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

app.listen(port, () => {
  console.log(`Express server is now listening on http://localhost:${port}`)
})