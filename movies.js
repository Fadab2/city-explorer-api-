const axios = require('axios');

async function handleGetMovies(req, res) {
    const { city } = req.query;
    //console.log("this is the city" + city)

    const url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_DB_API_KEY}&query=${city}&language=en-US&include_adult=false`;

    try {
        const result = await axios.get(url);
        const MoviesData = result.data.results.map(city => new Movie(city));
        //console.log(MoviesData)
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

module.exports = handleGetMovies;