import '../component/digimon-list.js';
import '../component/search-bar.js';
import '../component/search-result.js';

import axios from 'axios';
import _, { result } from 'lodash';

const baseURL = 'https://digimon-api.vercel.app/api/digimon';
const baseSEARCH = 'https://digimon-api.vercel.app/api/digimon/name/';

const main = () => {
	const searchBarElement = document.querySelector('search-bar');
	const digimonListElement = document.querySelector('digimon-list');
	const digimonSearch = document.querySelector('search-result');

	// search digimon
	const searchDigimons = async (keyword) => {
		await axios
			.get(`${baseSEARCH}${keyword}`)
			.then((result) => {
				digimonSearch.search = result.data;
			})
			.catch((error) => {
				console.error(error);
				renderEror();
			});
	};

	const onButtonSearchClicked = async () => {
		try {
			await searchDigimons(searchBarElement.value);
		} catch (message) {
			console.log(message);
		}
	};

	// list Digimon
	const renderResult = async () => {
		try {
			await axios
				.get(baseURL)
				.then((result) => {
					digimonListElement.digimons = _.slice(_.shuffle(result.data), 0, 12);
				})

				.catch((er) => console.error(er));
		} catch (err) {
			fallbackResult;
			console.error(err);
		}
	};

	const fallbackResult = (message) => {
		digimonListElement.renderError(message);
	};

	const renderEror = (message) => {
		digimonSearch.innerHTML = `
		<h2>Tidak ditemukan!</h2>
		`;
	};

	// init
	searchBarElement.clickEvent = onButtonSearchClicked;
	renderResult();
};

export default main;
