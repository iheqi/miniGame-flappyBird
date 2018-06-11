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
		this.dataStore.get('background').draw();

		this.pencilLogic();

		this.dataStore.get('pencils').forEach((pencil, index, pencils) => {
			pencil.draw();
		});
		this.dataStore.get('land').draw();

		requestAnimationFrame(() => {
			this.run();
		});
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
}