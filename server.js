"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const getWeather=require('./controller/weather.controller');
const getMovie = require("./controller/movie.controller");
const PORT = process.env.PORT;




app.get("/weather", getWeather)

app.get("/movies",getMovie) 

app.listen(PORT, () => {});
