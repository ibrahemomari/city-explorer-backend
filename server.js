const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const weather=require('./Data/weather.json');
app.use(cors());
require('dotenv').config();
// environment variable
const PORT=process.env.PORT;


// a server endpoints
app.get('/', 
 function (req, res) { 
  res.send('Hello World') 
})

// Weather API
let weatherController=require('./controllers/weather.controller')
app.get('/weather',weatherController);


// Movies API
let moviesController=require('./controllers/movies.controller')
app.get('/movies',moviesController)

//
app.listen(PORT)