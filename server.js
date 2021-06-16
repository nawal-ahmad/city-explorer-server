const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;
// const weatherData = require('./data/weather.json');
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const MOVIE_DB_KEY = process.env.MOVIE_DB_KEY;
const axios = require('axios');
const { response } = require('express');

app.use(cors());
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  if (lat && lon) {
    const weatherBitURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
    axios
      .get(weatherBitURL)
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
});

class Weather {
  constructor(weatherData) {
    this.description = weatherData.weather.description;
    this.date = weatherData.valid_date;
  }
}

app.get('/movies', (req, res) => {
  const query = req.query.query;
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_KEY}&query=${req.query.query}`;
  axios
    .get(movieUrl)
    .then((response) => {
      const moviesList = response.body.results.map((obj) => new Movie(obj));
      res.send(moviesList);
      console.log(response.body);
    })
    .catch((error) => {
      console.error;
    });
});

class Movie {
  constructor(movieData) {
    this.title = movieData.original_title;
    this.overview = movieData.overview;
    this.poster = 'http://image.tmdb.org/t/p/w342' + movieData.poster_path;
    this.rating = movieData.vote_average;
  }
}
app.listen(PORT);
