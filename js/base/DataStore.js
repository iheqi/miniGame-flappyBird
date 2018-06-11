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
		this.map.set(key, value);
		return this;
	}
	get(key) {
		return this.map.get(key);
	}

	destory() {

	}
}