const axios = require('axios');
const { response } = require('express');
require('dotenv').config();
const MOVIE_DB_KEY = process.env.MOVIE_DB_KEY;
const Movie = require('../models/movie.model');

const moviesController = (req, res) => {
  const cityName = req.query.query;

  if (cityName) {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_KEY}&query=${cityName}`;
    axios
      .get(movieUrl)
      .then((response) => {
        const resData = response.data.results.map((obj) => new Movie(obj));
        res.json(resData);
        console.log(response.data);
      })
      .catch((error) => {
        res.send('error from movies api site');
      });
  } else {
    res.send('please provide the city query = city name');
  }
};
module.exports = moviesController;
