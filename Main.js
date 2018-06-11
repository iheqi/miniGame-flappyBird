// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourceLoader } from './js/base/ResourceLoader.js';
import { DataStore } from './js/base/DataStore.js';
import { Director } from './js/Director.js';
import { Background } from './js/runtime/Background.js';
import { Land } from './js/runtime/Land.js';



export class Main {
	constructor() {
		this.canvas = document.getElementById('game_canvas');
		this.ctx = this.canvas.getContext('2d');
		this.dataStore = DataStore.getInstance();
		this.director = Director.getInstance();

		const loader = ResourceLoader.create();
		loader.onLoaded(map => this.onResourceFirstLoaded(map));
	}
	onResourceFirstLoaded(map) {
		this.dataStore.ctx = this.ctx;
		this.dataStore.res = map;
		this.init();
	}
	init() {

		this.dataStore
			.set('background', Background)
			.set('land', Land)
			.set('pencils', []);          // 铅笔数组
		this.director.createPencil();     // 在游戏开始前创建铅笔
		this.director.run();
	}
}