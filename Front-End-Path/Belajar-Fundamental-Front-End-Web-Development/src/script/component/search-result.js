import './digimon-item.js';

class SearchResult extends HTMLElement {
	constructor() {
		super();
	}

	set search(search) {
		this._search = search;
		this.render();
	}

	render() {
		this.innerHTML = "<div id='searchCon'><digimon-item></digimon-item></div>";
		console.log(this._search);
		const searchResultElement = document.querySelector(
			'#searchCon > digimon-item'
		);
		searchResultElement.digimon = this._search[0];
	}
}

customElements.define('search-result', SearchResult);
