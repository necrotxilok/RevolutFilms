import { useState, useEffect, useContext } from "react";
import FilmsProvider from "../data/FilmsProvider";
import FilmsList from "../components/FilmsList";

import AppContext from "../AppContext";

function MyList() {
	const [loading, setLoading] = useState(true);
	const [goodFilms, setGoodFilms] = useState([]);
	const [badFilms, setBadFilms] = useState([]);

	const updated = useContext(AppContext);

	useEffect(() => {
		const list = FilmsProvider.getMyList();
		setGoodFilms(list.filter((film) => {
			return FilmsProvider.getVote(film) == 'good';
		}));
		setBadFilms(list.filter((film) => {
			return FilmsProvider.getVote(film) == 'bad';
		}));
		setLoading(false);
	}, [updated]);

	if (loading) {
		return null;
	}

	return <>
		<h2>Pelis Buenas</h2>
		{goodFilms.length
			? <FilmsList films={goodFilms}/>
			: <div style={{color:"#777"}}>Todavía no has puntuado ninguna película buena.</div>}
		<h2>Pelis Malas</h2>
		{badFilms.length
			? <FilmsList films={badFilms}/>
			: <div style={{color:"#777"}}>Todavía no has puntuado ninguna película mala.</div>}
	</>;
}

export default MyList;
