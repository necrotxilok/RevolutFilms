import "./Main.css";
import logo from "../logo.png";

import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useNavigate, useParams } from "react-router-dom";
import { gsap } from "gsap";

import actions from "../actions";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import FilmDetail from "../components/FilmDetail";
import FilmsProvider from "../data/FilmsProvider";

const LOADING = 0;
const LOADED = 1;

function Main() {
	const [layoutStatus, setLayoutStatus] = useState(LOADING);
	const [modal, setModal] = useState(null);
	const [message, setMessage] = useState(null);

	const params = useParams();
	const query = params.query;

	const header = useRef();

	const navigate = useNavigate();
	const loading = () => {
		return layoutStatus === LOADING;
	}
	const searchRef = useRef();
	const search = (e) => {
		e.preventDefault();
		var query = searchRef.current.value.trim();
		if (!query) {
			return;
		}
		//console.log('search uri', encodeURI(query.replaceAll(' ', '+')));
		navigate('/search/' + encodeURI(query.replaceAll(' ', '+')), {replace: true});
	}

	actions.openModal = (props) => {
		//console.log('Opening Modal');
		document.body.className = 'no-scroll';
		setModal(<FilmDetail {...props}/>);
	}

	actions.closeModal = () => {
		document.body.className = '';
		setModal(null);
	}

	actions.showMessage = (msg) => {
		setMessage(msg);
	}

	useEffect(() => {
		if (!loading()) {
			return;
		}
		//console.log('Top', header.current.offsetTop);
		window.scrollTo(0, header.current.offsetTop);
		/*window.addEventListener('resize', () => {
			window.scrollTo(0, header.current.offsetTop);
		}, true);*/
		gsap.to('.app-start', {
			delay: 0.5,
			duration: 1.5,
			ease: "power2.inOut",
			opacity: 0,
			onComplete: () => {
				setLayoutStatus(LOADED);
			}
		});
		FilmsProvider.getMyList();
	});

	useEffect(() => {
		if (!query) {
			searchRef.current.value = '';
		}
	}, [query]);

	//console.log('Render Main Layout');

	return (
	    <div className="app">
			<div className="action-toolbar">
				<div className="container">
					<div className="left">
						<NavLink to="" className="link">Inicio</NavLink>
						<NavLink to="mylist" className="link">Mis Pelis</NavLink>
					</div>
					<div className="right">
						<div className="search-box">
							<form onSubmit={search}>
								<input type="text"
									ref={searchRef}
									defaultValue={query ? decodeURI(query).replaceAll('+', ' ') : ""}
									placeholder="Buscar película"/>
								<button className="btn">Buscar</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<header className="app-header flex-v-center" ref={header}>
				<h1>Revolut Films</h1>
			</header>
			<div className="app-body container">
				<section>
					<Outlet />
				</section>
			</div>
			<footer className="app-footer">
				Desarrollado por <a href="https://dchiloeches.com" target="_blank" rel="noreferrer">dchiloeches</a> @ 2022
			</footer>
			{modal && <Modal>{modal}</Modal>}
			{message && <Toast message={message}/>}
			{loading() && <div className="app-start flex-v-center"><img src={logo}/><h1>Revolut Films</h1></div>}
	    </div>
	);
}

export default Main;
