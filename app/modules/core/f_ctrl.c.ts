import { Injectable } from '@angular/core';

import { f_mv } from './f_mv.c';
import { f_tr } from './f_tr.c';
import { s_gl } from './s_gl.c';

@Injectable()

export class f_ctrl {
	constructor(private scope: s_gl, private f_mv: f_mv, private f_tr: f_tr){}
	public handle(direction: string): void {
		if(!this.scope.curFigureActiveId) return;
		else if(direction === 'left') this.f_mv.left();
		else if(direction === 'right') this.f_mv.right();
		else if(direction === 'transform') this.f_tr.rotate();
		else if(direction === 'downkick') this.f_mv.downKick();
		else return;
	}
}