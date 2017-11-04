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

interface ISettings {
	maxRows: number;
	maxColumns: number;
}

@Injectable()

export class s_gl {
	constructor(){
		for(let i: number = 0; i < this.settings.maxRows; i++){
			this.rows.push(0);
		}
		for(let i: number = 0; i < this.settings.maxColumns; i++){
			this.cols.push(0);
		}
	}
	private cols: number[] = [];
	private rows: number[] = [];
	public linesStriked: number = 0;
	public level: number = 0;
	public curFigureActiveId: string = null;
	public isNewFigure: boolean = false;
	public settings: ISettings = {
		'maxRows': 24,
		'maxColumns': 12
	}
	public rcFigures: string[] = ['a','a2','b','c','c2','d','d2','e','e2','n','n2','m','m2','l','h','f','k','g'];
	//public rcFigures: string[] = ['a','a2','b'];
	public bag: string[] = [];
	public move: any = null;
	public speed: number = 1000;
	public downKickTimer: any = null;
	public isInited: boolean = false;
}