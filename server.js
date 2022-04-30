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
const { restart } = require('nodemon')
app.use(cors())

// server static HTML files
app.use(express.static('./public'))

const args = require('minimist')(process.argv.slice(2))
const port = args.port || process.env.PORT || 5555

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
  res.statusMessage = 'OK Working'
  res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'})
  res.end(res.statusCode + ' ' + res.statusMessage)
})

// backend for asking questions
app.post('/app/dailyLog/', (req, res, next) => {
  // let data = {
  //     uname: req.body.uname,
  //     name: req.body.name,
  //     sleep: req.body.sleep,
  //     sleepQuality: req.body.sleepQuality,
  //     appetite: req.body.appetite,
  //     mood: req.body.mood,
  //     reflect: req.body.reflect
  // }

  // const stmt = db.prepare('INSERT INTO mentalTracker (uname, name, sleep, sleepQuality, appetite, mood, reflect) VALUES (?, ?, ?, ?, ?, ?, ?)')
  // const info = stmt.run(data.uname, data.name, data.sleep, data.sleepQuality, data.appetite, data.mood, data.reflect)
  // res.status(200).json({'uname': data.uname, 'name': data.name, 'sleep': data.sleep, 'sleepQuality': data.sleepQuality, 'appetite': data.appetite, 'mood': data.mood, 'reflect': data.reflect})
  let data = {
    uname: req.body.uname,
    name: req.body.name,
    sleep: req.body.sleep,
    sleepQuality: req.body.sleepQuality,
    appetite: req.body.appetite,
    mood: req.body.mood,
    reflect: req.body.reflect
}
  const stmt = db.prepare("UPDATE mentalTracker SET name='"+ data.name +"' ,mood='"+ data.mood +"',sleep='"+ data.sleep +"',sleepQuality='"+ data.sleepQuality +"',appetite='"+ data.appetite +"',reflect='"+ data.reflect +"' WHERE uname='" + req.params.uname + "'")

  return res.status(200).send({'name': data.name, 'sleep': data.sleep, 'sleepQuality': data.sleepQuality, 'appetite': data.appetite, 'mood': data.mood, 'reflect': data.reflect})
})

app.get('/app/dailyLogResults', (req, res, next) => {
  const stmt = db.prepare('SELECT * FROM mentalTracker ORDER BY id DESC LIMIT 1').get()
  res.status(200).json(stmt)
})

app.post('/app/signup/', (req, res, next) =>{
   const stmt = db.prepare("SELECT COUNT(*) FROM mentalTracker where uname='" + req.body.uname + "'")
   const search = stmt.get()
   console.log(search)
   if(search["COUNT(*)"] !== 0){
     return res.status(200).send({message: "This username already exists, please try another one!"})
   }
   else{
       createAccount = db.prepare("INSERT INTO mentalTracker (uname, name, sleep, sleepQuality, appetite, mood, reflect) VALUES (?, ?, ?, ?, ?, ?, ?)")
       createAccount.run(
         String(req.body.uname),
         String(""),
         String(0),
         String(""),
         String(""),
         String(""),
         String("")
       )
       return res.status(200).send({message: "Your account has been created! Login in to your account!"})
   }
})

app.post('/app/login/', (req, res) =>{
  const stmt = db.prepare("SELECT * FROM mentalTracker where uname='" + req.body.uname + "'")
  const search = stmt.get()
  if(search === undefined){
    return res.status(200).send({message:"Invalid password"})
  }

  const uname = search.uname
  const mood = search.mood
  return res.status(200).send({uname: uname, message: "Logged in!"})

})

//default response for any other request
app.use(function(req, res) {
  res.status(404).send('404 NOT FOUND')
})
