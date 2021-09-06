"use strict";

const express = require("express");
const app = express();
const weatherData = require("./weather.json");

app.get("/weather", (request, respond) => {
//   respond.json(weatherData);
  console.log(request.query.lat);

  const Lat = request.query.lat;
//   const locationLon = request.query.lon;
//   const locationSearch = request.query.searchQuery;
  const UpdatedData = weatherData.find((el) => {
    return el.lat === lat
  });
  console.log(UpdatedData,'u')
//   if (UpdatedData.length) {
//     respond.json(UpdatedData.lat);
//   } else {
//     respond.send("no data");
//   }
});

app.listen(3001, () => {
  console.log("hi");
});
