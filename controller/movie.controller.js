const axios = require("axios");
require("dotenv").config();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Movie = require("../models/movie.model");
const Cache = require("../helper/cache.helper");
const newCache = new Cache();

const getMovie = async (request, response) => {
  const city_name = request.query.city;
  const dayInMilSec = 86400000;
  const oneDayPassed = (Date.now() - newCache.timeStamp) > dayInMilSec;
  if (oneDayPassed) {
    newCache = new Cache();
  }
  const filteredArray = newCache.movie.find((item) => {
    item.name;
  });
  if (filteredArray) {
    response.json(filteredArray.data);
  } else {
    const moviesUrl = `https://api.themoviedb.org/3/search/movie`;

    const getUrl = await axios.get(
      `${moviesUrl}?api_key=${MOVIE_API_KEY}&query=${city_name}`
    );
    if (city_name) {
      let result = getUrl.data.results.map((el) => {
        return new Movie(
          el.original_title,
          el.overview,
          el.vote_average,
          el.vote_count,
          el.poster_path,
          el.popularity,
          el.release_date
        );
      });
      if (result.length) {
       newCache.movie.push({
         'city_name':city_name,
         'data':result
       });
        response.json(result);
      } else {
        response.send("no data");
      }
    } else {
      response.send("no data");
    }
  }
};

module.exports = getMovie;
