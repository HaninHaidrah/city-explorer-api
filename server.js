"use strict";

const express = require("express");
const app = express();
// const weatherData = require("./weather.json");
require('dotenv').config();
const PORT = process.env.PORT;
const APIKEY= process.env.WEATHER_API_KEY;
const cors = require('cors');
const { request, response } = require("express");
app.use(cors()) 

class Forecast{
  constructor(date,description){
    this.date= date;
    this.description=description
  }
}

app.get("/weather", async (request, respond) => {
 try{
   const city_name = request.query.city_name;
   const lat=request.query.lat
   const lon=request.query.lon

   const weatherURL=`https://api.weatherbit.io/v2.0/forecast/daily?city=${city_name}&key=${APIKEY}&lat=${lat}&lon${lon}`

   const gettingTheData= await axios.get(weatherURL)
    respond.json(gettingTheData);

   const UpdatedData = gettingTheData.find((el) => {
    return(el.city_name.toLowerCase() === city_name) 
    })
   respond.json(UpdatedData);
    ;
    if(UpdatedData){
      let wantedData=UpdatedData.data.map((el)=>{
      return new Forecast(el.datetime,el.weather.description)

    })
     respond.json(wantedData)
    
    }
  
    else{
    respond.send('no data');
    }
  }
  catch(err){
    respond.send(err.data)
  }

});


app.get('/movies',(request,response)=>{
const city_name=request.query.city_name
const moviesUrl=`
https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`


const getUrl= await axios.get(moviesUrl);

const newData=getUrl.map((el)=>{
  return el.title;
})
if(newData.includes(city_name)){
  response.send(getUrl)
}
else{
  response.send('no data')
}
})

app.listen(PORT, () => {
  console.log({PORT});
});
