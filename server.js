// require Express.js
const express = require('express')

const app = express()
// require morgan and fs
const morgan = require('morgan')
const fs = require('fs')
// require database script file

// const logdb = require('./src/services/database.js')
const db = require('./src/services/database.js')

const cors = require('cors')
app.use(cors())

// server static HTML files
app.use(express.static('./public'))

const args = require('minimist')(process.argv.slice(2))
const port = args.port || process.env.PORT || 5000

const server = app.listen(port, () => {
  console.log('App listening on port %PORT%'.replace('%PORT%', port))
})

// Allow JSON body messages on all endpoints
app.use(express.json())
// Allow URL encoded body messages on all endpoints
app.use(express.urlencoded({extended: true }))

//Define base endpoint
app.get('/app/', (req, res) => {
  res.statusCode = 200 
  res.statusMessage = 'OK'
  res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'})
  res.end(res.statusCode + ' ' + res.statusMessage)
})

// backend for asking questions
app.post('/app/dailyLog', (req, res, next) => {
  let data = {
      uname: req.body.uname,
      name: req.body.name,
      sleep: req.body.sleep,
      sleepQuality: req.body.sleepQuality,
      appetite: req.body.appetite,
      mood: req.body.mood,
      reflect: req.body.reflect
  }

  const stmt = db.prepare('INSERT INTO mentalTracker (uname, name, sleep, sleepQuality, appetite, mood, reflect) VALUES (?, ?, ?, ?, ?, ?, ?)')
  const info = stmt.run(data.uname, data.name, data.sleep, data.sleepQuality, data.appetite, data.mood, data.reflect)
  res.status(200).json({'uname': data.uname, 'name': data.name, 'sleep': data.sleep, 'sleepQuality': data.sleepQuality, 'appetite': data.appetite, 'mood': data.mood, 'reflect': data.reflect})
})

app.get('/app/dailyLogResults', (req, res, next) => {
  const stmt = db.prepare('SELECT * FROM mentalTracker ORDER BY id DESC LIMIT 1').get()
  res.status(200).json(stmt)
})

//default response for any other request
app.use(function(req, res) {
  res.status(404).send('404 NOT FOUND')
})
