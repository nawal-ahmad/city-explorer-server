const axios = require('axios');
// const weatherData = require('../assets/weather.json');
require('dotenv').config();
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const Weather = require('../models/weather.model');

const weatherController = (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (lat && lon) {
    const weatherBitUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
    console.log(weatherBitUrl);
    axios
      .get(weatherBitUrl)
      .then((response) => {
        //first data for the axios the second data from the weatherBit
        const responseData = response.data.data.map((obj) => new Weather(obj));
        res.json(responseData);
        console.log(response.data);
      })
      .catch((error) => {
        res.send(error.message);
      });
  } else {
    res.send('please provide the proper lat and lon');
  }
};

module.exports = weatherController;
