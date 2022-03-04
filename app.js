const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list-crud')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongdodb connected!')
})

app.get('/', (req, res) => {
  res.send(`This is a restaurant list update!`)
})

app.listen(port, () => {
  console.log(`Express server is now listening on http://localhost:${port}`)
})