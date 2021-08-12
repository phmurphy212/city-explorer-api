'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT;

const weather = require('./modules/weather.js');
const movies = require('./modules/movies.js');

app.get('/', (req, res) => {
  res.send(`Hello World!`);
});

app.get('/weather', weather);

app.get('/movies', movies);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
