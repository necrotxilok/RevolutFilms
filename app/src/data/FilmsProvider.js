
let currentPage = 1;

const FilmsProvider = {
	data: {1: []},
	mylist: [],
	voted: {},
	get: (page, callback) => {
		var cached = FilmsProvider.data[page];
		if (cached && cached.length) {
			callback(cached);
			return;
		}
		fetch('/api/films/' + page).then((response) => {
			return response.json();
		}).then((data) => {
			FilmsProvider.data[page] = data.results;
			callback(data.results);
		})/*.catch(() => {
			console.error('Something went wrong');
		});*/
	},
	search: (query, callback) => {
		fetch('/api/search/' + encodeURIComponent(query)).then((response) => {
			return response.json();
		}).then((data) => {
			callback(data.results);
		})/*.catch(() => {
			console.error('Something went wrong');
		});*/
	},
	getMyList: () => {
		if (FilmsProvider.mylist.length) {
			console.log('ready');
			return FilmsProvider.mylist;
		}

		const listRaw = localStorage.getItem('mylist');
		let list = listRaw ? JSON.parse(listRaw) : [];

		const votedRaw = localStorage.getItem('voted');
		let voted = votedRaw ? JSON.parse(votedRaw) : {};

		FilmsProvider.mylist = list;
		FilmsProvider.voted = voted;

		return list;
	},
	getVote: (film) => {
		return FilmsProvider.voted[film.id] || null;
	},
	save: (film, vote) => {
		if (FilmsProvider.voted[film.id]) {
			FilmsProvider.delete(film.id);
		}

		const raw = localStorage.getItem('mylist');
		let list = raw ? JSON.parse(raw) : [];

		list.push(film);
		FilmsProvider.mylist = list;
		localStorage.setItem('mylist', JSON.stringify(list));

		FilmsProvider.voted[film.id] = vote;
		localStorage.setItem('voted', JSON.stringify(FilmsProvider.voted));
	},
	delete: (id) => {
		const raw = localStorage.getItem('mylist');
		let list = raw ? JSON.parse(raw) : [];

		let final = list.filter((film) => {
			return film.id != id;
		});
		FilmsProvider.mylist = final;
		localStorage.setItem('mylist', JSON.stringify(final));

		delete FilmsProvider.voted[id];
		localStorage.setItem('voted', JSON.stringify(FilmsProvider.voted));
	}
};

window.FilmsProvider = FilmsProvider;

export default FilmsProvider;
