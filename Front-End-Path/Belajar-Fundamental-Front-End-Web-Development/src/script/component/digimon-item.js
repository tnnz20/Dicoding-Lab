class DigimonItem extends HTMLElement {
	constructor() {
		super();
	}

	set digimon(digimon) {
		this._digimon = digimon;
		this.render();
	}

	render() {
		this.innerHTML = `
        <div class="card_item">
             <img src="${this._digimon.img}" alt="Digimon Img">
             <h3>${this._digimon.name}</h3>
             <p>${this._digimon.level}</p>
        </div>
        `;
	}
}

customElements.define('digimon-item', DigimonItem);
