// 变量缓存器   就像vuex？
export class DataStore {
	static getInstance() {
		if (!DataStore.instance) {
			DataStore.instance = new DataStore();
		}
		return DataStore.instance;
	}

	constructor() {
		this.map = new Map();
	}

	set(key, value) {
		if (typeof value === 'function') {   // 简化传参，可以直接传类名
			value = new value();
		}
		this.map.set(key, value);
		return this;
	}
	get(key) {
		return this.map.get(key);
	}

	destory() {
		this.map.clear();
	}
}