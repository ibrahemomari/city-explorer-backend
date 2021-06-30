
require('dotenv').config();
const WEATHER_BIT_KEY=process.env.WEATHER_BIT_KEY;
const axios = require('axios');
const Forecast=require('../Modules/weather.model')

const weatherController=(req,res)=>{
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
}

module.exports=weatherController;