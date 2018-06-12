import { DataStore } from '../base/DataStore.js'

export class Score {
	constructor() {
		this.ctx = DataStore.getInstance().ctx;
		this.scoreNum = 0;
		this.isScore = true;
	}

	draw() {
		this.ctx.font = '25px Arial';
		this.ctx.fillStyle = 'black',
		this.ctx.fillText(
			this.scoreNum,
			window.innerWidth / 2,
			30,
			1000
		);
	}
}