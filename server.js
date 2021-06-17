const express = require('express'); // require the express package
const app = express(); // initialize your express app instance
const cors = require('cors');
app.use(cors()); // after you initialize your express app instance
const weatherController = require('./controller/weather.controller');
const indexController = require('./controller/index.controller');
const moviesController = require('./controller/movies.controller');
const PORT = process.env.PORT;

// a server endpoint
app.get('/', indexController); // our endpoint name

app.get('/weather', weatherController);

app.get('/movies', moviesController);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
}); // kick start the express server to work
