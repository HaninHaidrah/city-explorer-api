const axios = require("axios");
require("dotenv").config();
const APIKEY = process.env.WEATHER_API_KEY;
const Forecast = require("../models/weather.model");
const Cache = require("../helper/cache.helper");
const newCache = new Cache();

const getWeather = async (request, respond) => {
  const city_name = request.query.city;

  const dayInMilSec = 86400000;
  const oneDayPassed = (Date.now() - newCache.timeStamp) > dayInMilSec;
  if (oneDayPassed) {
    newCache = new Cache();
  }

  const returnedArray = newCache.foreCast.find((item) => {
    item.city_name;
  });
  if (returnedArray) {
    respond.json(returnedArray.data);
  } else {
    const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily`;

    const gettingTheData = await axios.get(
      `${weatherURL}?city=${city_name}&key=${APIKEY}`
    );
    if (city_name) {
      let result = gettingTheData.data.data.map((el) => {
        return new Forecast(el.datetime, el.weather.description);
      });
      if (result.length) {
        newCache.foreCast.push({
          'city_name':city_name,
          'data': result
        })
        respond.json(result);
        console.log(newCache)
      }       
      else {
        respond.send("something went wrong");
      }
    } else {
      respond.send("no data");
    }
  }
};

module.exports = getWeather;
