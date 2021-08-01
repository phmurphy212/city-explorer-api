'use strict';
console.log('Hello World, from our FIRST server');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT;

let wxData = require('./data/weather.json');

class Forecast {
  constructor(description, date) {
    this.description = description;
    this.date = date;
  }
}

app.get('/', (req, res) => {
  res.send(`Hello World!`);
});

app.get('/weather', (request, response) => {
  let searchQuery = request.query.city;
  let wxArr = [];
  if (searchQuery) {
    console.log(searchQuery);
    let localWx = wxData.find((city) => city.city_name === searchQuery);

    if (localWx) {
      console.log(localWx);
      localWx.data.map((wxInfo) => {
        wxArr.push(new Forecast(`Low: ${wxInfo.low_temp}, High: ${wxInfo.high_temp} with ${wxInfo.weather.description}`, wxInfo.datetime)
        );
      });
    } else {
      response.status(404).send('Whoops, seems like there\'s a problem');
    }
  }
  response.send(wxArr);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
