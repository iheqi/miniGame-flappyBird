import { Pencil } from './Pencil.js';
import { Sprite } from '../base/Sprite.js';

export class DownPencil extends Pencil {
	constructor(top) {
		const img = Sprite.getImage('pencilDown');
		super(img, top);
	}
	draw() {
        let gap = this.height / 5;
        this.y = this.top + gap;

		super.draw();
	}
}