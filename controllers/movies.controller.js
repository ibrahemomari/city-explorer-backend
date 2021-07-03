require('dotenv').config();
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;
const axios = require('axios');
const Movies=require('../Modules/movies.modal');
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
const moviesController=(req,res)=>{
    let movies;
    let query=req.query.query;
    let moviesArray=[];
    setTimeout(()=>{
        cache['data']=[];
        cache.lastUpdate=curentDay();
    },86400000);
    try{
    if(query && query.length!==0 ){
        if(cache.data.length>0){
            moviesArray=cache.data.map(el=> new Movies(el));
            moviesArray.push({lastUpdate:cache.lastUpdate===""}?{lastUpdate:curentDay()}:{lastUpdate:cache.lastUpdate});
            console.log('======== data from cache =========');
            res.json(moviesArray); 
        }else{
            if(query.length!=0){
                let theMoviesLinke=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${query}`;
                let theMoviesRes=axios.get(theMoviesLinke).then(response=>{
                    movies=response.data.results;
                    moviesArray=movies.map(el=>{
                        return new Movies(el);
                    })
                    moviesArray.push({lastUpdate:curentDay()});
                    cache['data']=response.data.results;
                    console.log('======== data from API =========');
                    res.json(moviesArray);
                })
            }else
            {
                res.json({error:'error'})
            }
        }
    }} catch{
    res.json({error:'error'})
}
}

module.exports=moviesController;