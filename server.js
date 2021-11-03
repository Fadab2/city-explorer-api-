'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get('/hello', (request, response) => { response.send('Hey, there!') });
app.get('/weather', handleGetWeather);

function handleGetWeather(req, res) {
    res.status(200).send(weather);
}
app.listen(3001, () => console.log(`hey, I am a server on port: ${PORT}`));
