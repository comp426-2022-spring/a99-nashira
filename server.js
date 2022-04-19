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

app.get('/app/', (req, res) => {
    const statusCode = 200;
    const statusMessage = 'OK';
    res.status(statusCode).end(statusCode + ' ' + statusMessage);
    res.type("text/plain");
})

// app.get('/app/SignUp/:username/:password', (req, res) => {
//     //checks if user name and password already exists


//     if(result["COUNT(*)"] != 0){
//         res.status(200).send("Enter different username");
//     } else {


//     }
// })

app.get('/app/LogIn/:username/:password', (req, res) => {
    //checks if user name and password are in databse, if so, takes user to home page and gives data to front end
    const stmt = db.prepare("SELECT * FROM mentalTracker WHERE username='" + req.params.username + "' AND password= '" + req.params.password + "'")
    const data = stmt.get()
    if(data === undefined){
        res.send("Incorrect username or password. Please try again!")
    }
    const username = data.username
    const record = data.record
})



//app.use(initialize fields in database) create account

//delete account

//login 



