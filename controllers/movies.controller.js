require('dotenv').config();
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;
const axios = require('axios');
const Movies=require('../Modules/movies.modal');

const moviesController=(req,res)=>{
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
}

module.exports=moviesController;