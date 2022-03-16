import { useState, useEffect } from "react";
import FilmsProvider from "../data/FilmsProvider";
import FilmsList from "../components/FilmsList";

function Latest() {
	const [page, setPage] = useState(1);
	const [films, setFilms] = useState(FilmsProvider.data[page]);

	const loadMore = () => {
		setPage(page+1);
	}

	useEffect(() => {
		if (page == 1 && films.length > 0) {
			return;
		}
		console.log('Loading Page', page);
		FilmsProvider.get(page, (data) => {
			setFilms([...films, ...data]);
		});
	}, [page]);

	return <>
		<h2 title="Ordenados por popularidad">Últimos estrenos</h2>
		<FilmsList films={films}/>
		<button type="button" className="btn btn-big" onClick={loadMore}>Mostrar más</button>
	</>;
}

export default Latest;
