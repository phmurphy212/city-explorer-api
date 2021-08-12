'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT;

const weather = require('./modules/weather.js');

const movies = require('./modules/movies.js');

app.get('/weather', weatherHandler);

app.get('/movies', movieHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

function movieHandler(request, response) {
  const {search} = request.query;
  movies(search)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
