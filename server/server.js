import dotenv from 'dotenv';
import fetch from 'node-fetch';
import express from 'express';

dotenv.config();

if (!process.env.TMDB_API_KEY) {
	console.log('ERROR: Falta la clave TMDB_API_KEY en el archivo .env para acceder a la API de TMDB (https://www.themoviedb.org/)')
	process.exit(1);
}
const TMDB_API_KEY = process.env.TMDB_API_KEY;
console.log('TMDB API KEY >> ' + TMDB_API_KEY);

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api/hello", (req, res) => {
	res.json({ message: "Hola Mundo! :)" });
});

app.get("/api/films/:page", async (req, res) => {
	//console.log(req.params);
	const API = "https://api.themoviedb.org/3/movie/popular?api_key=" + TMDB_API_KEY + "&language=es-ES&page=" + req.params.page;
	//console.log('Fetching data from ' + API);
	const response = await fetch(API);
    if (response.status === 200) {
		//console.log('Respuesta 200??');
		const data = await response.json();
		//console.log(data);
		res.json(data);
    } else {
		//console.log('Uhhh, error!!');
    	throw new Error('Something bad happened :(');
    }
});

app.get("/api/search/:query", async (req, res) => {
	//console.log(req.params);
	const API = "https://api.themoviedb.org/3/search/movie?api_key=" + TMDB_API_KEY + "&language=es-ES&query=" + req.params.query;
	//console.log('Fetching data from ' + API);
	const response = await fetch(API);
    if (response.status === 200) {
		//console.log('Respuesta 200??');
		const data = await response.json();
		//console.log(data);
		res.json(data);
    } else {
		//console.log('Uhhh, error!!');
    	throw new Error('Something bad happened :(');
    }
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
