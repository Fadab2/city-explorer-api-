'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const handleGetWeather = require('./weather.js');
const handleGetMovies = require('./movies.js');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);
app.get('/*', (req, res) => res.status(404).send('not found'));

app.listen(PORT, () => console.log(`hey, I am running on port: ${PORT}`));
