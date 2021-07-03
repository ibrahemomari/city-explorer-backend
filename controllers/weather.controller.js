require('dotenv').config();
const WEATHER_BIT_KEY=process.env.WEATHER_BIT_KEY;
const axios = require('axios');
const Forecast=require('../Modules/weather.model')
const Cache=require('../tools/cache');

let cache=new Cache();
cache['data']=[];
cache['timesstamp']=Date.now();
cache['lastUpdate']='';
let curentDay=()=>{
    let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let dateTime = date;
        return dateTime;
}
const weatherController=(req,res)=>{
    let weather;
    let lat=req.query.lat;
    let lon=req.query.lon;
    let forecast=[];
    setTimeout(()=>{
        cache['data']=[];
        cache.lastUpdate=curentDay();
    },86400000);
    try{
    if(lat && lon && lat.length!==0 && lon.length!==0){
        if(cache.data.length>0){
            forecast=cache.data.map(el=> new Forecast(el));
            forecast.push({lastUpdate:cache.lastUpdate===""}?{lastUpdate:curentDay()}:{lastUpdate:cache.lastUpdate});
            console.log('======== data from cache =========');
            res.json(forecast);
        }else{
            if(lat.length!==0 && lon.length!==0 ){
                let weatherBitLinke=`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
                let weatherBitRes=axios.get(weatherBitLinke).then(response=>{
                    weather=response.data;
                        forecast=response.data.data.map((item,idx)=>{
                        return new Forecast(item);
                    })
                    forecast.push({lastUpdate:curentDay()});
                    cache['data']=weather.data;
                    console.log('======== data from API =========');
                    res.json(forecast);
                })
            }else{
                res.json({error:'error1'})
            }
        }
    }} catch{
    res.json({error:'error2'})
}
}

module.exports=weatherController;