import { useState, useEffect } from "react";

import './Films.css';

import FilmItem from "./FilmItem";

function FilmsList({films}) {
	if (!films.length) {
		return "";
	}
	console.log("Render Films List", films);
	return <div className="films-list">
		{films.map((film, index) => {
			return <FilmItem
				key={"film-item"+index}
				id={film.id}
				title={film.title}
				image={film.poster_path || film.image}
				overview={film.overview}
			/>
		})}
	</div>;
}

export default FilmsList;
