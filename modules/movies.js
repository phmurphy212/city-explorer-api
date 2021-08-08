'use strict';

module.exports = showMovies;

const axios = require('axios');


class Movie {
  constructor(movie) {
    this.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';
    this.alt = movie.title;
  }
}

async function showMovies(request, response) {

  let query = request.query.search;

  try {
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`);

    response.send(movieData.data.results.map(movie => new Movie(movie)));
  } catch (error){
    response.status(404).send('Whoops, seems like there\'s a problem');
  }
}
