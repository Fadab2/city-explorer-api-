const axios = require('axios');

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

module.exports = handleGetWeather;