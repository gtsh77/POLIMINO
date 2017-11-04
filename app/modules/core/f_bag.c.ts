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
import { s_gl } from './s_gl.c';

@Injectable()

export class f_bag {
	constructor(private scope: s_gl){}
	public generate(): string[] {
		let arr: string[] = [];
		let newBag: string[] = [];
		//наполним временной массив
		for(let a in this.scope.rcFigures){
			arr.push(this.scope.rcFigures[a]);
		}
		//рандомно наполним сумку
		while(arr.length){
			let num: number = Math.round(Math.random()* (arr.length - 1));
			newBag.push(arr[num]);
			arr.splice(num,1);
		}
		return newBag;
	}
}