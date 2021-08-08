'use strict';

module.exports = showWeather;

const axios = require('axios');

class Forecast {
  constructor(day) {
    this.description = `Forecast for ${day.valid_date}: Low: ${day.low_temp}, High: ${day.high_temp} with ${day.weather.description}`;
    this.date = day.valid_date;
  }
}

async function showWeather(request, response) {
  let lat = request.query.lat;
  let lon = request.query.lon;

  let wxData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);
  let i = 0;
  while (i < 7) {
    try {
      response.send(wxData.data.data.map(day =>
        new Forecast(day)));
    } catch (error) {
      response.status(404).send('Whoops, seems like there\'s a problem');
    }
    i++;
  }
}
