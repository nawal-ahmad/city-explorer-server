const express = require('express'); // require the express package
const app = express(); // initialize your express app instance
const weatherData = require('./data/weather.json');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;
// const MOVIE_DB_KEY = process.env.MOVIE_DB_KEY;

app.use(cors()); // after you initialize your express app instance
// a server endpoint
app.get(
  '/', // our endpoint name
  function (req, res) {
    // callback function of what we should do with our request
    res.send('Hello World'); // our endpoint function response
  }
);

app.get('/weather', (req, res) => {
  const responseData = weatherData.data.map((obj) => new Weather(obj));
  res.json(responseData);
});

// Modeling data
class Weather {
  constructor(weatherData) {
    this.description = weatherData.weather.description;
    this.date = weatherData.valid_date;
  }
}
// app.get('/movies', (req, res) => {
//   const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_KEY}&query=${req.query.query}`;
//   superagent.get(movieUrl).then( movieRes => {
//     const moviesList = movieRes.body.results.map( data => new Movie(data));
//     res.send(moviesList)
//   }).catch(error => {console.error});
// });

// class Movie{
//   constructor(data){
//     this.title = data.original_title;
//     this.overview = data.overview;
//     this.poster = 'http://image.tmdb.org/t/p/w342' + data.poster_path;
//     this.rating = data.vote_average
//   }
// }
app.listen(PORT); // kick start the express server to work.
