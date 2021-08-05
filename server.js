'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const axios = require('axios');

const PORT = process.env.PORT;


class Forecast {
  constructor(day) {
    this.description = `Forecast for ${day.valid_date}: Low: ${day.low_temp}, High: ${day.high_temp} with ${day.weather.description}`;
    this.date = day.valid_date;
  }
}

class Movie {
  constructor(movie){
    this.title = movie.data.results.original_title;
    this.src = `http://image.tmdb.org/t/p/w500${movie.data.results.poster_path}`;
    this.alt = movie.data.results.title;
  }
}

app.get('/', (req, res) => {
  res.send(`Hello World!`);
});

app.get('/weather', async (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  console.log(lat, lon);
  let wxArr = [];
  let wxData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);
  try {
    response.send(wxData.data.data.map(day =>
      new Forecast(day)));
  } catch {
    response.status(404).send('Whoops, seems like there\'s a problem');
  }
}
);

app.get('/movies', async (request, response) => {
  console.log('I am here');
  let city = request.query.city;

  let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);
  console.log(movieData.data.results);
  try {
    response.send(movieData.data.results.map(movie =>
      new Movie(movie)));
  } catch {
    response.status(404).send('Whoops, seems like there\'s a problem');
  }
}
);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
