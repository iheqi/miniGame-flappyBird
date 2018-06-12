import { Sprite } from '../base/Sprite.js';
import { DataStore } from '../base/DataStore.js';


export class StartButton extends Sprite {
	constructor() {
		const image = Sprite.getImage('startButton');
		super(
			image,
			0, 0,
			image.width, image.height,
			(window.innerWidth - image.width) / 2,
			(window.innerHeight - image.height) / 2.5,
			image.width, image.height
		);
		this.dataStore = DataStore.getInstance();
	}

	draw() {
		super.draw();
		this.ctx.font = '25px Arial';
		this.ctx.fillStyle = 'black',
		this.ctx.fillText(
			'好屌啊，你的分数是: ' + this.dataStore.get('score').scoreNum + ' 分',
			window.innerWidth / 8,
			200,
			1000
		);
	}
}