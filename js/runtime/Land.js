import { Sprite } from '../base/Sprite.js';

export class Land extends Sprite {
	constructor() {
		const image = Sprite.getImage('land');
		super(
			image, 0, 0, 
			image.width, image.height, 
			0, window.innerHeight-image.height,   // 坐标
		);

		this.landX = 0;
		this.landSpeed = 2;
	}

	draw() {
		this.landX += this.landSpeed;
		// 当地面移动到要出屏幕时
		if (this.landX > (this.img.width - window.innerWidth)) {

			this.landX = 0;   
		}
		super.draw(
			this.img,
			this.srcX,
			this.srcY,
			this.srcW,
			this.srcH,
			-this.landX,       // 地面向左移动
			this.y,

		); 
	}
}