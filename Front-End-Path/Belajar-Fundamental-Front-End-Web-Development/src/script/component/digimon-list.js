import './digimon-item.js';

class DigimonList extends HTMLElement {
	constructor() {
		super();
	}

	set digimons(digimons) {
		this._digimons = digimons;
		this.render();
	}
	renderError() {
		this.innerHTML = `
		<h2>Error</h2>
		`;
	}

	render() {
		this._digimons.forEach((digimon) => {
			const digimonItemElement = document.createElement('digimon-item');
			digimonItemElement.digimon = digimon;
			this.appendChild(digimonItemElement);
		});
	}
}

customElements.define('digimon-list', DigimonList);
