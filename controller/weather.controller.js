const axios =require('axios');
require('dotenv').config();
const APIKEY = process.env.WEATHER_API_KEY;
const Forecast =require ('../models/weather.model')

const getWeather=async(request,respond)=>{

    const city_name = request.query.city;

    const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily`;
  
    const gettingTheData = await axios.get(
      `${weatherURL}?city=${city_name}&key=${APIKEY}`
    );
    if (city_name) {
      let result = gettingTheData.data.data.map((el) => {
        return new Forecast(el.datetime, el.weather.description);
      });
      if (result.length) {
        respond.json(result);
      } else {
        respond.send("something went wrong");
      }
    } else {
      respond.send("no data");
    }
}

module.exports=getWeather