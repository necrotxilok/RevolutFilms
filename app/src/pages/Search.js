import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import FilmsProvider from "../data/FilmsProvider";
import FilmsList from "../components/FilmsList";

function Search() {
	let params = useParams();
	//console.log(params);

	const query = params.query;
	const [films, setFilms] = useState([]);
	const [searching, setSearching] = useState(true);

	useEffect(() => {
		console.log('Searching...', query);
		FilmsProvider.search(query, (data) => {
			setFilms(data);
			setSearching(false);
		});
	}, [query]);

	if (searching) {
		return <></>;
	}

	if (films.length) {
		return <>
			<h2>Resultados de la búsqueda</h2>
			<FilmsList films={films}/>
		</>;
	} else {
		return <h2>No se han encontrado resultados</h2>;
	}
}

export default Search;
