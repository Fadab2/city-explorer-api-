'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);
app.get('/*', (req, res) => res.status(404).send('not found'));

async function handleGetWeather(req, res) {


    const { lat, lon } = req.query;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`


    try {
        const result = await axios.get(url);
        const forecastData = result.data.data.map(city => new weatherForecast(city));
        res.status(200).send(forecastData);

    } catch (e) {
        res.status(500).send('server error');
    }
}

class weatherForecast {
    constructor(obj) {
        this.min_temp = obj.min_temp;
        this.max_temp = obj.max_temp;
        this.description = obj.weather.description;

    }
}
// Movies 
//===============================================================
async function handleGetMovies(req, res) {


    const { city } = req.query;
    console.log("this is the city" + city)

    const url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_DB_API_KEY}&query=${city}&language=en-US&include_adult=false`;


    try {
        const result = await axios.get(url);
        const MoviesData = result.data.results.map(city => new Movie(city));
        console.log(MoviesData)
        res.status(200).send(MoviesData);

    } catch (e) {
        res.status(500).send('server error');
    }
}

class Movie {
    constructor(obj) {
        this.title = obj.title;
        this.description = obj.overview;

    }
}
app.listen(PORT, () => console.log(`hey, I am running on port: ${PORT}`));
