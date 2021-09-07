"use strict";

const express = require("express");
const app = express();
const weatherData = require("./weather.json");
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
app.use(cors()) 

class Forecast{
  constructor(date,description){
    this.date= date;
    this.description=description
  }
}

app.get("/weather", (request, respond) => {
 try{
   const city_name = request.query.city_name;
   const UpdatedData = weatherData.find((el) => {
    return(el.city_name.toLowerCase() === city_name) 
    });
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


app.listen(PORT, () => {
  console.log({PORT});
});
