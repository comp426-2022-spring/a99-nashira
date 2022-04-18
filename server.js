//Define app using express
var express = require("express")
var app = express()
const fs = require('fs')

// Require database SCRIPT file
const db = require("./database.js")

const port = 5000;

// Make Express use its own built-in body parser for both urlencoded and JSON body data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(port, () => {
    console.log('App is running on %PORT%'.replace('%PORT%', port))
})

