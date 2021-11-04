'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./weather.json');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.get('/weather', handleGetWeather);
app.get('/*', (re, res) => res.status(404).send('not found'));


function handleGetWeather(req, res) {

    const cityName = req.query.city;
    const lat = req.query.lat;
    const lon = req.query.lon;
    try {
        console.log(cityName);
        const cityToSend = weather.find(city => {

            if ((city.lat === lat && city.lon === lon) || city.city_name === cityName) {

                return true
            }
            return false;
        });

        if (cityToSend) {
            const forecastData = cityToSend.data.map(city => new weatherForecast(city));
            res.status(200).send(forecastData);

        } else {
            res.status(404).send('Not found');
        }

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

app.listen(PORT, () => console.log(`hey, I am running on port: ${PORT}`));
