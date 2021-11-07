const axios = require('axios');
let cache = require('./cache.js');


async function handleGetWeather(req, res) {
    const { lat, lon } = req.query;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`

    const key = 'weather-' + lat + lon;


    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
        console.log('Cache hit');
    } else {
        console.log('Cache miss');
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = axios.get(url)
            .then(response => parseWeather(response.data));
    }

    return cache[key].data;
}

console.log(cache)
function parseWeather(weatherData) {
    try {
        const weatherSummaries = weatherData.data.map(day => {
            return new Weather(day);
        });
        return Promise.resolve(weatherSummaries);
    } catch (e) {
        return Promise.reject(e);
    }
}

class weatherForecast {
    constructor(obj) {
        this.min_temp = obj.min_temp;
        this.max_temp = obj.max_temp;
        this.description = obj.weather.description;

    }
}

module.exports = handleGetWeather;