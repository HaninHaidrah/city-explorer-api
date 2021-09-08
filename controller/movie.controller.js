const axios =require('axios');
require('dotenv').config();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Movie=require('../models/movie.model')


const getMovie= async (request,response)=>{
    const city_name = request.query.city;
    const moviesUrl = `https://api.themoviedb.org/3/search/movie`;
  
    const getUrl = await axios.get(
      `${moviesUrl}?api_key=${MOVIE_API_KEY}&query=${city_name}`
    );
    if (city_name) {
      let result = getUrl.data.results.map((el) => {
        return new Movie( el.original_title,el.overview,el.vote_average,el.vote_count,el.poster_path,el.popularity,el.release_date)});
      if (result.length) {
        response.json(result);
      } else {
        response.send("no data");
      }
    } else {
      response.send("no data");
    }

}

module.exports=getMovie;