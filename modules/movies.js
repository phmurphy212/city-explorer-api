'use strict';

let cache = require('./cache.js');
const axios = require('axios');

module.exports = showMovies;



class Movie {
  constructor(movie) {
    this.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';
    this.alt = movie.title;
  }
}

async function showMovies(query) {
  let key = 'movie-' + query;
  if (cache[key] && (Date.now() - cache[key].timestamp < 84000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`)
      .then(response => parseMovie(response.data));
  }
  return cache[key].data;
}
function parseMovie(movieData) {
  try {
    const movieSummaries =
      movieData.results.map(movie => {
        return new Movie(movie);
      });
    return Promise.resolve(movieSummaries);
  } catch (error) {
    return Promise.reject(error);
  }
}
