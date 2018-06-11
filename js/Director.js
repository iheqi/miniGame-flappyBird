// 导演类，控制游戏的逻辑
// 单例模式，可翻看（p60）

import { DataStore } from './base/DataStore.js';

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
		const bgSprite = this.dataStore.get('background');
		bgSprite.draw(); 
	}
}