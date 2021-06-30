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

module.exports=Movies;