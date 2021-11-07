const axios = require('axios');
let cache = require('./cache.js');

async function handleGetMovies(req, res) {
    const { city } = req.query;
    console.log("this is the city" + city)

    const url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_DB_API_KEY}&query=${city}&language=en-US&include_adult=false`;

    const key = 'movie-' + city;

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
        console.log('Cache hit');
    } else {
        console.log('Cache miss');
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = axios.get(url);
            .then(response => parseMovies(response.data));
    }
    return cache[key].data;
}

function parseMovies(movieData) {
    try {
        const movieSummaries = movieData.results.map(day => {
            return new Movie(day);
        });
        return Promise.resolve(movieSummaries);
    } catch (e) {
        return Promise.reject(e);
    }
}

class Movie {
    constructor(obj) {
        this.title = obj.title;
        this.description = obj.overview;

    }
}

module.exports = handleGetMovies;