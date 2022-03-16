import { useState, useEffect, useContext } from "react";
import FilmsProvider from "../data/FilmsProvider";
import FilmsList from "../components/FilmsList";

import AppContext from "../AppContext";

function MyList() {
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
	}, [updated]);

	return <>
		<h3>Pelis Buenas</h3>
		{goodFilms.length
			? <FilmsList films={goodFilms}/>
			: <div style={{color:"#777"}}>Todavía no has puntuado ninguna película buena.</div>}
		<h3>Pelis Malas</h3>
		{badFilms.length
			? <FilmsList films={badFilms}/>
			: <div style={{color:"#777"}}>Todavía no has puntuado ninguna película mala.</div>}
	</>;
}

export default MyList;
