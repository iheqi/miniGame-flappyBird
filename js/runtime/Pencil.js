// 铅笔基类 

import { Sprite } from '../base/Sprite.js';

export class Pencil extends Sprite {
	constructor(img, top) {
		super(img, 
			0, 0, 
			img.width, img.height,
			window.innerWidth,       // x坐标刚好在屏幕的最右边
			0
		);
		this.top = top;              // 高度偏移量，两个铅笔一样

	}

	draw() {
		this.x = this.x - 2;                 // 在父类中
		super.draw(
			this.img,
			0, 0,
			this.img.width, this.img.height,
			this.x, this.y
		);
	}
}