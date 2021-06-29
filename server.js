const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const weather=require('./Data/weather.json');
const { response } = require('express');
app.use(cors());
require('dotenv').config();
// environment variable
const PORT=process.env.PORT;
const WEATHER_BIT_KEY=process.env.WEATHER_BIT_KEY;
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;

// a server endpoints
app.get('/', 
 function (req, res) { 
  res.send('Hello World') 
})

// Weather API

app.get('/weather',(req,res)=>{
    try{
    let weather;
    let lat=req.query.lat;
    let lon=req.query.lon;
    if(lat.length!==0 && lon.length!==0){
    let weatherBitLinke=`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
    let weatherBitRes=axios.get(weatherBitLinke).then(response=>{
        weather=response.data;
        let forecast=weather.data.map((item,idx)=>{
            return new Forecast(item);
        })
        res.json(forecast);
    })
}else{
    res.json({error:'error'})
}} catch{
    res.json({error:'error'})
}
});


// Movies API
app.get('/movies',(req,res)=>{
    try{
    let movies;
    let query=req.query.query
    if(query.length!=0){
    let theMoviesLinke=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${query}`;
    let theMoviesRes=axios.get(theMoviesLinke).then(response=>{
        movies=response.data.results;
        let mm=movies.map(el=>{
            return new Movies(el);
        })
        res.json(mm);
    })
}else
{
    res.json({error:'error'})
}
} catch{
    res.json({error:'error'})
}
})


class Forecast{
    constructor(weatherData){
        this.date=weatherData.valid_date;
        this.description=weatherData.weather.description;
    }
}

class Movies{
    constructor(moviesData){
        this.title=moviesData.original_title;
        this.overview=moviesData.overview;
        this.rating=moviesData.vote_average;
        this.totalReating=moviesData.vote_count
        this.image='http://image.tmdb.org/t/p/w342'+moviesData.poster_path;
        this.popularity=moviesData.popularity;
        this.releaseDate=moviesData.release_date;
    }
}

 
app.listen(PORT)