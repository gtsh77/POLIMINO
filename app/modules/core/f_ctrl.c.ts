// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// If it is not possible or desirable to put the notice in a particular
// file, then You may include the notice in a location (such as a LICENSE
// file in a relevant directory) where a recipient would be likely to look
// for such a notice.

// POLIMINO 2-D WEB PUZZLE GAME
// Copyright (C) 2017  Anton Makridin
// Telegram: http://t.me/gtsh77, Email: me@anton-makridin.ru

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