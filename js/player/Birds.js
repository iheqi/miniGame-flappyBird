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

		this.y = [this.birdY, this.birdY, this.birdY];    // 保存初始位置
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

		const g = 0.98 / 5;          // 重力加速度   

		// 一开始时，小鸟从中间先自动飞高一点，体验较好
		const offsetUp = 30;

		// 小鸟下落位移
		const offsetY = (g * this.time * (this.time -  offsetUp)) / 2;  // 自由落体

		for (let i=0; i <= 2; i++) {       // 每只鸟
			this.birdsY[i] = this.y[i] + offsetY;        // 设置高度
		}
		this.time++;

		super.draw(
			this.img,
			this.clippingX[this.index], this.clippingY[this.index],   // 裁剪起点，相对于源图像
			this.clippingWidth[this.index], this.clippingHeight[this.index],   // 裁剪的长度和宽度
			this.birdsX[this.index], this.birdsY[this.index],               // 裁剪后的图像的坐标，相对于canvas
			this.birdsWidth[this.index], this.birdsHeight[this.index]       // 裁剪后的图像的宽高
		);
	}
}