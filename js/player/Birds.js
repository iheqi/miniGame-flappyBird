// 循环的渲染三只小鸟
// 其实是循环渲染图片的三个部分


import { Sprite } from '../base/Sprite.js';

export class Birds extends Sprite {
	constructor() {
		const image = Sprite.getImage('birds');
		super(
			image, 0, 0, 
			image.width, image.height,
			0, 0, image.width, image.height
		);

		// 小鸟的三种状态需要一个数组去存储
		// 小鸟的宽34，小鸟的高是24。上下边距是10，小鸟左右边距是9

		this.clippingX = [
			9, 
			9 + 34 + 18, 
			9 + 34 + 18 + 34 + 18
		];
		this.clippingY = [10, 10, 10];

		this.clippingWidth = [34, 34, 34];
		this.clippingHeight = [24, 24, 24];

		this.birdX = window.innerWidth / 4;   // 初始X位置(其实不用变化)
		this.birdsX = [this.birdX, this.birdX, this.birdX];

		this.birdY = window.innerWidth / 2;   // 初始Y位置
		this.birdsY = [this.birdY, this.birdY, this.birdY];

		this.birdWidth = 34;
		this.birdsWidth = [this.birdWidth, this.birdWidth, this.birdWidth];

		this.birdHeight = 24;
		this.birdsHeight = [this.birdHeight, this.birdHeight, this.birdHeight];

		// this.y = [this.birdY, this.birdY, this.birdY];
		this.index = 0;                    // 第几只小鸟
		this.count = 0;

		this.time = 0;						// 小鸟自由落体时间
	}
	
	draw() {
		// 切换三只小鸟的速度
		const speed = 0.2;
		this.count = this.count + speed;

		if (this.index >= 2) {
			this.count = 0;
		}

		this.index = Math.floor(this.count);
		super.draw(
			this.img,
			this.clippingX[this.index], this.clippingY[this.index],
			this.clippingWidth[this.index], this.clippingHeight[this.index],
			this.birdsX[this.index], this.birdsY[this.index],
			this.birdsWidth[this.index], this.birdsHeight[this.index]
		);
	}
}