import ReactDOM from "react-dom";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Main";
import Latest from "./pages/Latest";
import Search from "./pages/Search";
import MyList from "./pages/MyList";
import NoPage from "./pages/NoPage";

import AppContext from "./AppContext";
import actions from "./actions";

function App() {
	const [updated, setUpdated] = useState(Date.now());
	actions.reload = () => {
		setUpdated(Date.now());
	}
	return (<AppContext.Provider value={updated}>
	    <BrowserRouter>
		    <Routes>
				<Route path="/" element={<Layout />}>
					{/*<Route index element={<Navigate replace to="/search" />} />*/}
					<Route path="" element={<Latest />} />
					<Route path="search/:query" element={<Search />} />
					<Route path="mylist" element={<MyList />} />
					<Route path="*" element={<NoPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</AppContext.Provider>);
}

export default App;
