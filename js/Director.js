// 导演类，控制游戏的逻辑
// 单例模式，可翻看（p60）

import { DataStore } from './base/DataStore.js';
import { UpPencil } from './runtime/UpPencil.js';
import { DownPencil } from './runtime/DownPencil.js';

export class Director {
	constructor() {
		this.dataStore = DataStore.getInstance();
	}
	static getInstance() {
		if (!Director.instance) {
			Director.instance = new Director();
		}
		return Director.instance; 
	}

	run() {
		this.check();
		if (!this.isGameOver) {             // 统筹配置
			this.dataStore.get('background').draw();

			this.pencilLogic();

			this.dataStore.get('pencils').forEach((pencil, index, pencils) => {
				pencil.draw();
			});
			this.dataStore.get('land').draw();
			this.dataStore.get('birds').draw();

			const timer = requestAnimationFrame(() => {
				this.run();
			});
			this.dataStore.set('timer', timer);
		} else {												// 游戏结束
			cancelAnimationFrame(this.dataStore.get('timer'));
			this.dataStore.destory();
		}
	}

	createPencil() {
		const minTop = window.innerHeight / 8;
		const maxTop = window.innerHeight / 2;

		const top = minTop + Math.random() * (maxTop - minTop) // 随机的高度偏移

		this.dataStore.get('pencils').push(new UpPencil(top));
		this.dataStore.get('pencils').push(new DownPencil(top));

	}
	pencilLogic() {
		const pencils = this.dataStore.get('pencils');
		if (pencils[0].x + pencils[0].width <= 0 &&     // 当铅笔要移出屏幕了
			pencils.length === 4
		) {    
			pencils.shift();
			pencils.shift();
		}

		if (pencils[0].x <= (window.innerWidth-pencils[0].width) / 2    // 当铅笔移动到超过一半了并且只有剩下两根了
			&& pencils.length === 2
		) {
			this.createPencil();
		}
	}

	birdsEvent() {
		for (let i=0; i <= 2; i++) {   // 每只鸟都操作
			// 是使不下落，设置初始y，然后加上一点击时的offsetUp，就有上升效果
			this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];  // 
		}

		this.dataStore.get('birds').time = 0; 
	}
	check() {   
		const birds = this.dataStore.get('birds');
		const land = this.dataStore.get('land');
		const pencils = this.dataStore.get('pencils');

		if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
			console.log('撞地了');
			this.isGameOver = true;
		}

		// 小鸟的边框模型
		const birdsBorder = {
			top: birds.birdsY[0],
			bottom: birds.birdsY[0] + birds.birdsHeight[0],
			left: birds.birdsX[0], 
			right: birds.birdsX[0] + birds.birdsHeight[0]
		}

		// 铅笔模型

		const len = pencils.length;
		for (let pencil of pencils) {
			const pencilBorder = {                      // 确定其坐标及占位
				top: pencil.y,
				bottom: pencil.y + pencil.height,
				left: pencil.x,
				right: pencil.x + pencil.width
			}; 

			if (Director.getInstance().isStrike(birdsBorder, pencilBorder)) {
				console.log('zhuanshangle')
				this.isGameOver = true;
			}
		}
	}

	// 判断小鸟是否和铅笔碰撞
	isStrike(bird, pencil) {
		let result = false;
		if (bird.top > pencil.bottom+10 ||                   // 判断是否重叠
			bird.bottom < pencil.top+10 ||
			bird.right < pencil.left+10 ||
			bird.left > pencil.right+10
		) {
			result = true;
		}
		return !result;
	}
}